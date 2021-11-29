
import create from 'zustand'

const [useStore] = create(set => ({
    places: [],
    orderedPlaces: [],
    placeCoordDict: { 0: [0, 0, 0] },
    coordPlaceDict: {},
    centerId: null,
    centerPlace: null,
    draggedCenter: {lat: JSON.stringify(process.env.REACT_APP_LATITUDE), lng: JSON.stringify(process.env.REACT_APP_LONGITUDE)},
    Depth1Places: [],
    positionCenter: [0, 0, 0],
    centerHexPosition: [0, 0, 0],
    displacedCenterHexPosition: [0, 0, 0],
    camPosition: [0, 0, 20],
    indexPosVector: {},
    hexDict: {},
    multiDict: {},
    mapPosDict: {},
    selectedPlace: {},
    hovering: false,
    orderedPlacesDict: {},
    gridView: true,
    maxViewable: 10,
    maxViewableDepth: 4,
    setPlaces: (places) => set((state) => ({
        ...state,
        places
    })),
    setOrderedPlaces: (orderedPlaces) => set((state) => ({
        ...state,
        orderedPlaces
    })),
    setMaxViewableDepth: (maxViewableDepth) => set((state) => ({
        ...state,
        maxViewableDepth
    })),
    setMaxViewable: (maxViewable) => set((state) => ({
        ...state,
        maxViewable
    })),
    setGridView: (gridView) => set((state) => ({
        ...state,
        gridView
    })),
    setHovering: (hovering) => set((state) => ({
        ...state,
        hovering
    })),
    setCenterPlace: (centerPlace) => set((state) => ({
        ...state,
        centerPlace
    })),
    setDraggedCenter: (draggedCenter) => set((state) => ({
        ...state,
        draggedCenter
    })),
    setDepth1Places: (depth1Places) => set((state) => ({
        ...state,
        depth1Places
    })),
    setCenterId: (centerId) => set((state) => ({
        ...state,
        centerId
    })),
    setCenterHexPosition: (centerHexPosition) => set((state) => ({
        ...state,
        centerHexPosition
    })),
    setDisplacedCenterHexPosition: (displacedCenterHexPosition) => set((state) => ({
        ...state,
        displacedCenterHexPosition
    })),
    setCamPosition: (camPosition) => set((state) => ({
        ...state,
        camPosition
    })),
    setPositionCenter: (positionCenter) => set((state) => ({
        ...state,
        positionCenter
    })),
    setPlaceCoordDict: (placeCoordDict) => set((state) => ({
        ...state,
        placeCoordDict
    })),
    setMultiDict: (multiDict) => set((state) => ({
        ...state,
        multiDict
    })),
    setHexDict: (hexDict) => set((state) => ({
        ...state,
        hexDict
    })),
    setIndexPosVector: (indexPosVector) => set((state) => ({
        ...state,
        indexPosVector
    })),
    setMapPosDict: (mapPosDict) => set((state) => ({
        ...state,
        mapPosDict
    })),
    setOrderedPlacesDict: (orderedPlacesDict) => set((state) => ({
        ...state,
        orderedPlacesDict
    })),
    setSelectedPlace: (selectedPlace) => set((state) => ({
        ...state,
        selectedPlace
    })),
    removeAllCoor: () => set({ places: { 0: [0, 0, 0] } })
}))


export default useStore