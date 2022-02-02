import hexSlotFunction from './hexSlots'
import slotArrayXYZ from './slotArrayXYZ'


function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    // if (unit=="K") { dist = dist * 1.609344 }
    // if (unit=="N") { dist = dist * 0.8684 }
    return dist;
  }
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

function bearing(lat1, lon1, lat2, lon2) {
  const startLat = toRadians(lat1);
  const startLng = toRadians(lon1);
  const destLat = toRadians(lat2);
  const destLng = toRadians(lon2);

  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x = Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
}

const hexSlotsDictionary = (slots) => {
  var dict = {}
  slots.forEach(element => {
    let x = element.coordinate[0]
    let y = element.coordinate[1]
    let z = element.coordinate[2]
    let key = x + "-" + y + "-" + z
    dict[key] = null
  })
  return dict
}

const lerp = (x, y, a) => x * (1 - a) + y * a
const invlerp = (a, b, v) => clamp((v - a) / (b - a))
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

const sizeIcons = (placeDistance, minDist, maxDist) => {

  let t = invlerp(minDist, maxDist, placeDistance)
  return lerp(125, 50, t)

}

const sizeIconsZ = (placeDistance, minDist, maxDist) => {

  let t = invlerp(minDist, maxDist, placeDistance)
  return lerp(0, -5, t)

}

const hex = true
let preSlots
let hexSlots

// 

const _createXYZ = (angle) => {

  let _hexArray = hexSlotFunction()
  let newArray = []
  for (let index = 0; index < _hexArray.length; index++) {
    let element = _hexArray[index]
    let coor = element.coordinate
    let vect = element.posVector
    //distance along plane of vertices
    let _dist = Math.sqrt((vect[0] * vect[0]) + (vect[1] * vect[1]))

    //z distance btw parallel place and vertice / z position
    const _opposite = Math.sin(angle) * _dist
    // distance of transformed point on the plane parralel to screen from origin
    const _adjacent = Math.cos(angle) * _dist * 5

    // angle from origin along parrallel plane
    let _angle = Math.atan2(vect[1], vect[0]) - Math.PI / 2

    let newX = _adjacent * Math.sin(_angle) * -1
    let newY = _adjacent * Math.cos(_angle)
    let newZ = _opposite * -1

    element.posVector = [newX, newY, newZ]
    newArray.push(element)
  }
  return newArray
}






const _OrderDistanceSeperate = (places, defaultCenter, selectedPlace) => {
  console.log(defaultCenter)
  let center = {}
  if (selectedPlace) {
    center.lat = selectedPlace.businessLocation.coordinates[1]
    center.lng = selectedPlace.businessLocation.coordinates[0]
  } else {
    center = defaultCenter
  }
  var closestDistance = 0
  var farthestDistance = 1000
  places.forEach((element, index) => {
    let distA = distance(element.businessLocation.coordinates[1], element.businessLocation.coordinates[0], center.lat, center.lng)
    element.distance = distA
    if (index === 0) {
      closestDistance = distA
    }
    if (index === 10 || index === places.length - 1) {
      farthestDistance = distA
    }
  })

  places.sort(function (a, b) {
    return a.distance - b.distance
  })
  return places
}



const AssignMolecularDict = (_places, defaultCenter, selectedPlace) => {



  let newXyz = slotArrayXYZ

  let places = _OrderDistanceSeperate(_places, defaultCenter, selectedPlace)

  let coordDict = {}
  let multiDict = {}
  let slotDict = {}

  

  let newCenter = places[0]

  // console.log("AssignMolecular", center.lat, selectedPlace)
  let nearestAssignedPlace = newCenter
  const zeroObject = [0, 0, 0]
  console.log(places.length + " count")
  // console.log(JSON.stringify(newCenter.company_name))

  multiDict[newCenter._id] = {
    cubeCoor: zeroObject,
    posVector: zeroObject
  }


  coordDict[newCenter._id] = zeroObject

  slotDict["0-0-0"] = nearestAssignedPlace

  // places.forEach(function (element, index) {
  for (let index = 1; index < places.length; index++) {
    var element = places[index]

    var closestDistance = distance(places[index].businessLocation.coordinates[1], places[index].businessLocation.coordinates[0], newCenter.businessLocation.coordinates[1], newCenter.businessLocation.coordinates[0])
    for (let index2 = 0; index2 < index; index2++) {
      if (index !== index2) {
        var comparedPlace = places[index2]
        let comparedDistance = distance(places[index].businessLocation.coordinates[1], places[index].businessLocation.coordinates[0], places[index2].businessLocation.coordinates[1], places[index2].businessLocation.coordinates[0])
        if (comparedDistance < closestDistance) {
          closestDistance = comparedDistance
          nearestAssignedPlace = comparedPlace
        }
      }
    }
    //get angle from nearestAssignedPlace to newPlace
    const angle = bearing(nearestAssignedPlace.businessLocation.coordinates[1], nearestAssignedPlace.businessLocation.coordinates[0], places[index].businessLocation.coordinates[1], places[index].businessLocation.coordinates[0])

    for (let slotIndex = 1; slotIndex < newXyz.length - 1; slotIndex++) {
      // let slot = hexSlots[slotIndex]
      let slot = newXyz[slotIndex]
      let position = slot.posVector
      // console.log(position + "/")
      let coordinates = slot.coordinate
      // let nearestPlacePosition = nearestAssignedPlace.posVector

      let nearestPlacePosition 
      let nearestPlaceCoordinates
      if (multiDict[nearestAssignedPlace._id]) {
        // console.log("checking multi Dict" + multiDict)
        nearestPlacePosition = multiDict[nearestAssignedPlace._id].posVector
        nearestPlaceCoordinates = multiDict[nearestAssignedPlace._id].cubeCoor

      } else {
        nearestPlacePosition = [0,0,0]
        nearestPlaceCoordinates = [0,0,0]
      }

      let newPositionX = position[0] + nearestPlacePosition[0]
      let newPositionY = position[1] + nearestPlacePosition[1]
      let newPositionZ = position[2] + nearestPlacePosition[2]
      // let nearestPlaceCoordinates = nearestAssignedPlace.coordinates

      // why does this fail sometime? bc you are grabbing places that are not assigned to multiDict

      let newCoordinateX = coordinates[0] + nearestPlaceCoordinates[0]
      let newCoordinateY = coordinates[1] + nearestPlaceCoordinates[1]
      let newCoordinateZ = coordinates[2] + nearestPlaceCoordinates[2]
      let newCoordinateKey = newCoordinateX + "-" + newCoordinateY + "-" + newCoordinateZ
      if (slotDict[newCoordinateKey]) {
        continue
      }
      if ((slot.rangeMax < slot.rangeMin &&
          (angle >= slot.rangeMin || angle < slot.rangeMax)) ||
        (angle >= slot.rangeMin && angle < slot.rangeMax)) {
        // console.log(angle + "  " + slot.rangeMin + "btw" + slot.rangeMax)
        element.coordinates = [newCoordinateX, newCoordinateY, newCoordinateZ]
        element.posVector = [newPositionX, newPositionY, newPositionZ]
        slotDict[newCoordinateKey] = element


        const cubeObject = {
          x: newCoordinateX,
          y: newCoordinateY,
          z: newCoordinateZ
        }
        const posObject = {
          x: newPositionX,
          y: newPositionY,
          z: newPositionY
        }

        const _cubeObject = [newCoordinateX, newCoordinateY, newCoordinateZ]
        const _posObject = [newPositionX, newPositionY, newPositionZ]

        const obj = {
          cubeCoor: _cubeObject,
          posVector: _posObject
        }
        multiDict[element._id] = obj
        break
      }
    }
  }


  let obj = {
    _orderedPlacesResponse: places,
    _slotDictResponse: slotDict,
    _multiDictResponse: multiDict
  }
  return obj

  // return multiDict

  // return places

}


const AssignHexDict = (_places, defaultCenter, selectedPlace) => {

  let newXyz = slotArrayXYZ
  let multiDict = {}
  let slotDict = {}

  const zeroObject = [0, 0, 0]
  // console.log(JSON.stringify(newCenter.company_name))

  var closestDistance = 0
  var farthestDistance = 1000


  let places = _OrderDistanceSeperate(_places, defaultCenter, selectedPlace)

//   console.log(places)

  let newCenterPlace = places[0]


  multiDict[newCenterPlace._id] = {
      cubeCoor: zeroObject,
      posVector: zeroObject
    }
  
 

  slotDict["0-0-0"] = newCenterPlace

  for (let index = 1; index < places.length; index++) {
      var element = places[index]
      const angle = bearing(newCenterPlace.businessLocation.coordinates[1], newCenterPlace.businessLocation.coordinates[0], element.businessLocation.coordinates[1], element.businessLocation.coordinates[0])
   
    for (let slotIndex = 1; slotIndex < newXyz.length - 1; slotIndex++) {
      let slot = newXyz[slotIndex]
      let position = slot.posVector
      let coordinates = slot.coordinate
      let newCoordinateKey = slot.coordinate[0] + "-" + slot.coordinate[1] + "-" + slot.coordinate[2]
      if (slotDict[newCoordinateKey]) {
          continue
        }


      if ((slot.rangeMax < slot.rangeMin &&
          (angle >= slot.rangeMin || angle < slot.rangeMax)) ||
        (angle >= slot.rangeMin && angle < slot.rangeMax)) {
        // console.log(angle + "  " + slot.rangeMin + "btw" + slot.rangeMax)
        
        element.cubeVector = coordinates
        element.posVector = position
        slotDict[newCoordinateKey] = element
        const obj = {
          cubeCoor: coordinates,
          posVector: position
        }
        multiDict[element._id] = obj
        break
      }
    }
  };

  let obj = {
      _orderedPlacesResponse: places,
      _slotDictResponse: slotDict,
      _multiDictResponse: multiDict
    }
    return obj
}





export {
  hexSlotsDictionary,
  AssignMolecularDict,
  AssignHexDict,
  _createXYZ
}

