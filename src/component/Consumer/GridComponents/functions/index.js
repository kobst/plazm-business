import hexSlotFunction from './hexSlots';
import slotArrayXYZ from './slotArrayXYZ';

function distance(lat1, lon1, lat2, lon2) {
	if (lat1 == lat2 && lon1 == lon2) {
		return 0;
	} else {
		const radlat1 = (Math.PI * lat1) / 180;
		const radlat2 = (Math.PI * lat2) / 180;
		const theta = lon1 - lon2;
		const radtheta = (Math.PI * theta) / 180;
		let dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		dist = dist * 60 * 1.1515;
		// if (unit=="K") { dist = dist * 1.609344 }
		// if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function toRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function toDegrees(radians) {
	return (radians * 180) / Math.PI;
}

function bearing(lat1, lon1, lat2, lon2) {
	const startLat = toRadians(lat1);
	const startLng = toRadians(lon1);
	const destLat = toRadians(lat2);
	const destLng = toRadians(lon2);

	const y = Math.sin(destLng - startLng) * Math.cos(destLat);
	const x =
		Math.cos(startLat) * Math.sin(destLat) -
		Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
	let brng = Math.atan2(y, x);
	brng = toDegrees(brng);
	return (brng + 360) % 360;
}

const hexSlotsDictionary = (slots) => {
	const dict = {};
	slots.forEach((element) => {
		const x = element.coordinate[0];
		const y = element.coordinate[1];
		const z = element.coordinate[2];
		const key = x + '-' + y + '-' + z;
		dict[key] = null;
	});
	return dict;
};

const _createXYZ = (angle) => {
	const _hexArray = hexSlotFunction();
	const newArray = [];
	for (let index = 0; index < _hexArray.length; index++) {
		const element = _hexArray[index];
		const vect = element.posVector;
		// distance along plane of vertices
		const _dist = Math.sqrt(vect[0] * vect[0] + vect[1] * vect[1]);

		// z distance btw parallel place and vertice / z position
		const _opposite = Math.sin(angle) * _dist;
		// distance of transformed point on the plane parralel to screen from origin
		const _adjacent = Math.cos(angle) * _dist * 5;

		// angle from origin along parrallel plane
		const _angle = Math.atan2(vect[1], vect[0]) - Math.PI / 2;

		const newX = _adjacent * Math.sin(_angle) * -1;
		const newY = _adjacent * Math.cos(_angle);
		const newZ = _opposite * -1;

		element.posVector = [newX, newY, newZ];
		newArray.push(element);
	}
	return newArray;
};

const _OrderDistanceSeperate = (places, defaultCenter, selectedPlace) => {
	let center = {};
	if (selectedPlace) {
		center.lat = selectedPlace.businessLocation.coordinates[1];
		center.lng = selectedPlace.businessLocation.coordinates[0];
	} else {
		center = defaultCenter;
	}
	places.forEach((element, index) => {
		let closestDistance = 0;
		let farthestDistance = 0;
		const distA = distance(
			element.businessLocation.coordinates[1],
			element.businessLocation.coordinates[0],
			center.lat,
			center.lng
		);
		element.distance = distA;
		if (index === 0) {
			closestDistance = distA;
		}
		if (index === 10 || index === places.length - 1) {
			farthestDistance = distA;
		}
	});

	places.sort(function (a, b) {
		return a.distance - b.distance;
	});
	return places;
};

const assignMolecularDict = (_places, defaultCenter, selectedPlace) => {
	const newXyz = slotArrayXYZ;

	const places = _OrderDistanceSeperate(_places, defaultCenter, selectedPlace);

	const coordDict = {};
	const multiDict = {};
	const slotDict = {};

	const newCenter = places[0];

	let nearestAssignedPlace = newCenter;
	const zeroObject = [0, 0, 0];

	multiDict[newCenter._id] = {
		cubeCoor: zeroObject,
		posVector: zeroObject,
	};

	coordDict[newCenter._id] = zeroObject;

	slotDict['0-0-0'] = nearestAssignedPlace;

	// places.forEach(function (element, index) {
	for (let index = 1; index < places.length; index++) {
		const element = places[index];

		let closestDistance = distance(
			places[index].businessLocation.coordinates[1],
			places[index].businessLocation.coordinates[0],
			newCenter.businessLocation.coordinates[1],
			newCenter.businessLocation.coordinates[0]
		);
		for (let index2 = 0; index2 < index; index2++) {
			if (index !== index2) {
				const comparedPlace = places[index2];
				const comparedDistance = distance(
					places[index].businessLocation.coordinates[1],
					places[index].businessLocation.coordinates[0],
					places[index2].businessLocation.coordinates[1],
					places[index2].businessLocation.coordinates[0]
				);
				if (comparedDistance < closestDistance) {
					closestDistance = comparedDistance;
					nearestAssignedPlace = comparedPlace;
				}
			}
		}
		// get angle from nearestAssignedPlace to newPlace
		const angle = bearing(
			nearestAssignedPlace.businessLocation.coordinates[1],
			nearestAssignedPlace.businessLocation.coordinates[0],
			places[index].businessLocation.coordinates[1],
			places[index].businessLocation.coordinates[0]
		);

		for (let slotIndex = 1; slotIndex < newXyz.length - 1; slotIndex++) {
			// let slot = hexSlots[slotIndex]
			const slot = newXyz[slotIndex];
			const position = slot.posVector;
			const coordinates = slot.coordinate;
			// let nearestPlacePosition = nearestAssignedPlace.posVector

			let nearestPlacePosition;
			let nearestPlaceCoordinates;
			if (multiDict[nearestAssignedPlace._id]) {
				nearestPlacePosition =
					multiDict[nearestAssignedPlace._id].posVector;
				nearestPlaceCoordinates =
					multiDict[nearestAssignedPlace._id].cubeCoor;
			} else {
				nearestPlacePosition = [0, 0, 0];
				nearestPlaceCoordinates = [0, 0, 0];
			}

			const newPositionX = position[0] + nearestPlacePosition[0];
			const newPositionY = position[1] + nearestPlacePosition[1];
			const newPositionZ = position[2] + nearestPlacePosition[2];
			// let nearestPlaceCoordinates = nearestAssignedPlace.coordinates

			// why does this fail sometime? bc you are grabbing places that are not assigned to multiDict

			const newCoordinateX = coordinates[0] + nearestPlaceCoordinates[0];
			const newCoordinateY = coordinates[1] + nearestPlaceCoordinates[1];
			const newCoordinateZ = coordinates[2] + nearestPlaceCoordinates[2];
			const newCoordinateKey =
				newCoordinateX + '-' + newCoordinateY + '-' + newCoordinateZ;
			if (slotDict[newCoordinateKey]) {
				continue;
			}
			if (
				(slot.rangeMax < slot.rangeMin &&
					(angle >= slot.rangeMin ||
						angle < slot.rangeMax)) ||
				(angle >= slot.rangeMin && angle < slot.rangeMax)
			) {
				element.coordinates = [
					newCoordinateX,
					newCoordinateY,
					newCoordinateZ,
				];
				element.posVector = [newPositionX, newPositionY, newPositionZ];
				slotDict[newCoordinateKey] = element;

				const _cubeObject = [
					newCoordinateX,
					newCoordinateY,
					newCoordinateZ,
				];
				const _posObject = [newPositionX, newPositionY, newPositionZ];

				const obj = {
					cubeCoor: _cubeObject,
					posVector: _posObject,
				};
				multiDict[element._id] = obj;
				break;
			}
		}
	}

	const obj = {
		_orderedPlacesResponse: places,
		_slotDictResponse: slotDict,
		_multiDictResponse: multiDict,
	};
	return obj;

	// return multiDict

	// return places
};

const assignHexDict = (_places, defaultCenter, selectedPlace) => {
	const newXyz = slotArrayXYZ;
	const multiDict = {};
	const slotDict = {};

	const zeroObject = [0, 0, 0];

	const places = _OrderDistanceSeperate(_places, defaultCenter, selectedPlace);
	const newCenterPlace = places[0];

	multiDict[newCenterPlace._id] = {
		cubeCoor: zeroObject,
		posVector: zeroObject,
	};

	slotDict['0-0-0'] = newCenterPlace;

	for (let index = 1; index < places.length; index++) {
		const element = places[index];
		const angle = bearing(
			newCenterPlace.businessLocation.coordinates[1],
			newCenterPlace.businessLocation.coordinates[0],
			element.businessLocation.coordinates[1],
			element.businessLocation.coordinates[0]
		);

		for (let slotIndex = 1; slotIndex < newXyz.length - 1; slotIndex++) {
			const slot = newXyz[slotIndex];
			const position = slot.posVector;
			const coordinates = slot.coordinate;
			const newCoordinateKey =
				slot.coordinate[0] +
				'-' +
				slot.coordinate[1] +
				'-' +
				slot.coordinate[2];
			if (slotDict[newCoordinateKey]) {
				continue;
			}

			if (
				(slot.rangeMax < slot.rangeMin &&
					(angle >= slot.rangeMin ||
						angle < slot.rangeMax)) ||
				(angle >= slot.rangeMin && angle < slot.rangeMax)
			) {
				element.cubeVector = coordinates;
				element.posVector = position;
				slotDict[newCoordinateKey] = element;
				const obj = {
					cubeCoor: coordinates,
					posVector: position,
				};
				multiDict[element._id] = obj;
				break;
			}
		}
	}

	const obj = {
		_orderedPlacesResponse: places,
		_slotDictResponse: slotDict,
		_multiDictResponse: multiDict,
	};
	return obj;
};

export {hexSlotsDictionary, assignMolecularDict, assignHexDict, _createXYZ};
