
import create from 'zustand'

const [useStore] = create(set => ({
    places: [],
    placeCoordDict: { 0: [0, 0, 0] },
    centerId: null,
    centerPlace: null,
    positionCenter: [0, 0, 0],
    centerHexPosition: [0, 0, 0],
    camPosition: { "x": 0, "y": 0, "z": 20 },
    indexPosVector: {},
    hexDict: {},
    multiDict: {},
    mapPosDict: {},
    hovering: false,
    orderedPlaces: {},
    gridView: true,
    maxViewable: 10,
    maxViewableDepth: 3,
    setPlaces: (places) => set((state) => ({
        ...state,
        places
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
    setCenterId: (centerId) => set((state) => ({
        ...state,
        centerId
    })),
    setCenterHexPosition: (centerHexPosition) => set((state) => ({
        ...state,
        centerHexPosition
    })),
    setCamPosition: (camPosition) => set((state) => ({
        ...state,
        camPosition
    })),
    setPositionCenter: (positionCenter) => set((state) => ({
        ...state,
        positionCenter
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
    setOrderedPlaces: (orderedPlaces) => set((state) => ({
        ...state,
        orderedPlaces
    })),
    removeAllCoor: () => set({ places: { 0: [0, 0, 0] } })
}))


export default useStore