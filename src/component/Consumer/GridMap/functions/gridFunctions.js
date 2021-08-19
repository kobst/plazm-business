import hexSlotFunction from './hexSlots'


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

const createXYZ = (angle) => {

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



const AssignMolecular = (places, defaultCenter, selectedPlace) => {
  let _dict
  let xyzSlots
  let newXyz
  if (hex) {
    let preSlots = hexSlotFunction()
    // hexSlots = addZIndex(preSlots, 0.414)
    // xyzSlots = addXYZIndex(preSlots, 0.414)
    // newXyz = createXYZ(preSlots, 0.414)
    // _dict = vectorDict(hexSlots)    
    // console.log(xyzSlots)
    newXyz = createXYZ(1.04)


  } else {
    // hexSlots = squareSlotFunction()
  }

  // to re-assign positions on every update...
  let center = {}
  if (selectedPlace) {
    center.lat = selectedPlace.location.coordinates[1]
    center.lng = selectedPlace.location.coordinates[0]
  } else {
    center = defaultCenter
  }

  // let center = defaultCenter
  // const slotDict = hexSlotsDictionary(hexSlots)
  let slotDict = {}
  // hexSlots.forEach(element => {
  //     element.occupied = false
  // })

  var closestDistance = 0
  var farthestDistance = 1000
  places.forEach((element, index) => {
    let distA = distance(element.location.coordinates[1], element.location.coordinates[0], center.lat, center.lng)
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

  let newCenter = places[0]
  var newPlaces = []
  // console.log("AssignMolecular", center.lat, selectedPlace)

  let nearestAssignedPlace = newCenter
  // places.forEach(function (element, index) {
  for (let index = 0; index < places.length; index++) {
    var element = places[index]
    if (index === 0) {
      nearestAssignedPlace = element
      nearestAssignedPlace.posVector = [0, 0, 0]
      nearestAssignedPlace.coordinates = [0, 0, 0]
      element.posVector = [0, 0, 0]
      // element.index = index
      element.connector = element
      element.size = sizeIcons(element.distance, closestDistance, farthestDistance)
      element.position = [0, 0, 0]
      slotDict['0-0-0'] = element

      // newPlaces.push(element)
      continue
    }
    // var element = places[index]

    var closestDistance = distance(places[index].location.coordinates[1], places[index].location.coordinates[0], newCenter.location.coordinates[1], newCenter.location.coordinates[0])
    for (let index2 = 0; index2 < index; index2++) {
      if (index !== index2) {
        var comparedPlace = places[index2]
        let comparedDistance = distance(places[index].location.coordinates[1], places[index].location.coordinates[0], places[index2].location.coordinates[1], places[index2].location.coordinates[0])
        if (comparedDistance < closestDistance) {
          closestDistance = comparedDistance
          nearestAssignedPlace = comparedPlace
        }
      }
    }
    //get angle from nearestAssignedPlace to newPlace
    const angle = bearing(nearestAssignedPlace.location.coordinates[1], nearestAssignedPlace.location.coordinates[0], places[index].location.coordinates[1], places[index].location.coordinates[0])

    for (let slotIndex = 1; slotIndex < newXyz.length - 1; slotIndex++) {
      // let slot = hexSlots[slotIndex]
      let slot = newXyz[slotIndex]
      let position = slot.posVector
      // console.log(position + "/")
      let coordinates = slot.coordinate
      let nearestPlacePosition = nearestAssignedPlace.posVector
      let newPositionX = position[0] + nearestPlacePosition[0]
      let newPositionY = position[1] + nearestPlacePosition[1]
      let newPositionZ = position[2] + nearestPlacePosition[2]
      let nearestPlaceCoordinates = nearestAssignedPlace.coordinates
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
        slotDict[newCoordinateKey] = element
        element.coordinates = [newCoordinateX, newCoordinateY, newCoordinateZ]
        // element.index = index
        element.connector = nearestAssignedPlace
        element.size = sizeIcons(element.distance, closestDistance, farthestDistance)
        let testZ = sizeIconsZ(element.distance, closestDistance, farthestDistance)
        // let _posVector = _dict[newCoordinateKey]
        // console.log(newCoordinateKey + " " + _posVector)
        element.posVector = [newPositionX, newPositionY, newPositionZ]
        // element.posVector = _posVector
        // console.log(newCoordinateKey + "  z " + console.log(newPositionZ))
        // newPlaces.push(element)
        // console.log(newElement.company_name + " - " + newElement.posVector)
        break
      }
    }
  }


  return [places, slotDict, closestDistance, farthestDistance]
}


const OrderDistance = (places, center) => {
  // let center = {}
  // if (selectedPlace) {
  //   center.lat = selectedPlace.location.coordinates[1]
  //   center.lng = selectedPlace.location.coordinates[0]
  // } else {
  //   center = defaultCenter
  // }
  var closestDistance = 0
  var farthestDistance = 1000
  places.forEach((element, index) => {
    let distA = distance(element.location.coordinates[1], element.location.coordinates[0], center.lat, center.lng)
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



const _AssignMolecularDict = (places) => {

  let newXyz = createXYZ(1.04)
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

    var closestDistance = distance(places[index].location.coordinates[1], places[index].location.coordinates[0], newCenter.location.coordinates[1], newCenter.location.coordinates[0])
    for (let index2 = 0; index2 < index; index2++) {
      if (index !== index2) {
        var comparedPlace = places[index2]
        let comparedDistance = distance(places[index].location.coordinates[1], places[index].location.coordinates[0], places[index2].location.coordinates[1], places[index2].location.coordinates[0])
        if (comparedDistance < closestDistance) {
          closestDistance = comparedDistance
          nearestAssignedPlace = comparedPlace
        }
      }
    }
    //get angle from nearestAssignedPlace to newPlace
    const angle = bearing(nearestAssignedPlace.location.coordinates[1], nearestAssignedPlace.location.coordinates[0], places[index].location.coordinates[1], places[index].location.coordinates[0])

    for (let slotIndex = 1; slotIndex < newXyz.length - 1; slotIndex++) {
      // let slot = hexSlots[slotIndex]
      let slot = newXyz[slotIndex]
      let position = slot.posVector
      // console.log(position + "/")
      let coordinates = slot.coordinate
      // let nearestPlacePosition = nearestAssignedPlace.posVector

      let nearestPlacePosition = multiDict[nearestAssignedPlace._id].posVector

      let newPositionX = position[0] + nearestPlacePosition[0]
      let newPositionY = position[1] + nearestPlacePosition[1]
      let newPositionZ = position[2] + nearestPlacePosition[2]
      // let nearestPlaceCoordinates = nearestAssignedPlace.coordinates
      let nearestPlaceCoordinates = multiDict[nearestAssignedPlace._id].cubeCoor


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

  return multiDict
}



const _orderDistance = (places, defaultCenter, selectedPlace) => {
  let center = {}
  if (selectedPlace) {
    center.lat = selectedPlace.location.coordinates[1]
    center.lng = selectedPlace.location.coordinates[0]
  } else {
    center = defaultCenter
  }
  var closestDistance = 0
  var farthestDistance = 1000
  places.forEach((element, index) => {
    console.log(element)
    let distA = distance(element.location.coordinates[1], element.location.coordinates[0], center.lat, center.lng)
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

  let newXyz = createXYZ(1.04)
  // to re-assign positions on every update...
  // let center = {}
  // if (selectedPlace) {
  //   center.lat = selectedPlace.location.coordinates[1]
  //   center.lng = selectedPlace.location.coordinates[0]
  // } else {
  //   center = defaultCenter
  // }

  let coordDict = {}
  let multiDict = {}
  let slotDict = {}

  let places = _orderDistance(_places, defaultCenter, selectedPlace)

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

    var closestDistance = distance(places[index].location.coordinates[1], places[index].location.coordinates[0], newCenter.location.coordinates[1], newCenter.location.coordinates[0])
    for (let index2 = 0; index2 < index; index2++) {
      if (index !== index2) {
        var comparedPlace = places[index2]
        let comparedDistance = distance(places[index].location.coordinates[1], places[index].location.coordinates[0], places[index2].location.coordinates[1], places[index2].location.coordinates[0])
        if (comparedDistance < closestDistance) {
          closestDistance = comparedDistance
          nearestAssignedPlace = comparedPlace
        }
      }
    }
    //get angle from nearestAssignedPlace to newPlace
    const angle = bearing(nearestAssignedPlace.location.coordinates[1], nearestAssignedPlace.location.coordinates[0], places[index].location.coordinates[1], places[index].location.coordinates[0])

    for (let slotIndex = 1; slotIndex < newXyz.length - 1; slotIndex++) {
      // let slot = hexSlots[slotIndex]
      let slot = newXyz[slotIndex]
      let position = slot.posVector
      // console.log(position + "/")
      let coordinates = slot.coordinate
      // let nearestPlacePosition = nearestAssignedPlace.posVector

      let nearestPlacePosition = multiDict[nearestAssignedPlace._id].posVector

      let newPositionX = position[0] + nearestPlacePosition[0]
      let newPositionY = position[1] + nearestPlacePosition[1]
      let newPositionZ = position[2] + nearestPlacePosition[2]
      // let nearestPlaceCoordinates = nearestAssignedPlace.coordinates
      let nearestPlaceCoordinates = multiDict[nearestAssignedPlace._id].cubeCoor


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

  return multiDict
}




const AssignMolecularComplete = (places, defaultCenter, selectedPlace) => {

  let newXyz
  newXyz = createXYZ(1.04)
  // to re-assign positions on every update...
  let center = {}
  if (selectedPlace) {
    center.lat = selectedPlace.location.coordinates[1]
    center.lng = selectedPlace.location.coordinates[0]
  } else {
    center = defaultCenter
  }

  let coordDict = {}
  let multiDict = {}
  let slotDict = {}
  var closestDistance = 0
  var farthestDistance = 1000
  places.forEach((element, index) => {
    let distA = distance(element.location.coordinates[1], element.location.coordinates[0], center.lat, center.lng)
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

  slotDict["0-0-0"] = newCenter

  // places.forEach(function (element, index) {
  for (let index = 1; index < places.length; index++) {
    var element = places[index]

    var closestDistance = distance(places[index].location.coordinates[1], places[index].location.coordinates[0], newCenter.location.coordinates[1], newCenter.location.coordinates[0])
    for (let index2 = 0; index2 < index; index2++) {
      if (index !== index2) {
        var comparedPlace = places[index2]
        let comparedDistance = distance(places[index].location.coordinates[1], places[index].location.coordinates[0], places[index2].location.coordinates[1], places[index2].location.coordinates[0])
        if (comparedDistance < closestDistance) {
          closestDistance = comparedDistance
          nearestAssignedPlace = comparedPlace
        }
      }
    }
    //get angle from nearestAssignedPlace to newPlace
    const angle = bearing(nearestAssignedPlace.location.coordinates[1], nearestAssignedPlace.location.coordinates[0], places[index].location.coordinates[1], places[index].location.coordinates[0])

    for (let slotIndex = 1; slotIndex < newXyz.length - 1; slotIndex++) {
      // let slot = hexSlots[slotIndex]
      let slot = newXyz[slotIndex]
      let position = slot.posVector
      // console.log(position + "/")
      let coordinates = slot.coordinate
      // let nearestPlacePosition = nearestAssignedPlace.posVector

      let nearestPlacePosition = multiDict[nearestAssignedPlace._id].posVector

      let newPositionX = position[0] + nearestPlacePosition[0]
      let newPositionY = position[1] + nearestPlacePosition[1]
      let newPositionZ = position[2] + nearestPlacePosition[2]
      // let nearestPlaceCoordinates = nearestAssignedPlace.coordinates
      let nearestPlaceCoordinates = multiDict[nearestAssignedPlace._id].cubeCoor


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


        const _cubeObject = [newCoordinateX, newCoordinateY, newCoordinateZ]
        const _posObject = [newPositionX, newPositionY, newPositionZ]


        let cubeString = newCoordinateX + "-" + newCoordinateY + "-" + newCoordinateZ

        const obj = {
          cubeCoor: _cubeObject,
          posVector: _posObject
        }
        multiDict[element._id] = obj
        break
      }
    }
  }

  return [multiDict, slotDict]
}





const AssignHex = (places, defaultCenter, selectedPlace) => {

  let center = {}
  if (selectedPlace) {
    center.lat = selectedPlace.location.coordinates[1]
    center.lng = selectedPlace.location.coordinates[0]
  } else {
    center = defaultCenter
  }

  // let center = defaultCenter

  const hexSlots = hexSlotFunction()
  // const hexSlots = squareSlotFunction()
  const slotDict = hexSlotsDictionary(hexSlots)

  hexSlots.forEach(element => {
    element.occupied = false
  })

  var closestDistance = 0
  var farthestDistance = 1000
  var distances = []
  places.forEach((element, index) => {
    let distA = distance(element.location.coordinates[1], element.location.coordinates[0], center.lat, center.lng)
    element.distance = distA
    distances.push(distA)
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

  let newCenterPlace = places[0]

  var newPlaces = []

  places.forEach(element => {
    var newElement = element
    const angle = bearing(newCenterPlace.location.coordinates[1], newCenterPlace.location.coordinates[0], element.location.coordinates[1], element.location.coordinates[0])
    newElement.angle = angle
    for (let slot of hexSlots) {
      if (slot.occupied === true) {
        continue
      }
      if ((slot.rangeMax < slot.rangeMin &&
          (angle >= slot.rangeMin || angle < slot.rangeMax)) ||
        (angle >= slot.rangeMin && angle < slot.rangeMax)) {
        // console.log(angle + "  " + slot.rangeMin + "btw" + slot.rangeMax)
        element.posVector = slot.posVector
        newElement.posVector = slot.posVector
        newPlaces.push(newElement)
        slot.occupied = true
        break
      }
    }
  });

  return [newPlaces, closestDistance, farthestDistance]
}






const createGrid = () => {








}


export {
  hexSlotsDictionary,
  sizeIcons,
  distance,
  bearing,
//   AssignMolecular,
  AssignMolecularDict,
  createXYZ,
//   AssignHex, 
  OrderDistance,

}

