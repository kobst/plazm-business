import create from 'zustand';

const [useStore] = create((set) => ({
  profile: null,
  businessDetailProfile: null,
  detailId: null,
  tabSelected: -1,
  listTabSelected: 2,
  view: '',
  selectedList: null,
  selectedListId: null,
  searchIndex: null,
  listClickedFromSearch: null,
  myFeedIndex: null,
  listIndex: null,
  favoriteIndex: null,
  userDataId: null,
  discoverBtn: false,
  readMore: false,
  places: [],
  orderedPlaces: [],
  placeCoordDict: {0: [0, 0, 0]},
  coordPlaceDict: {},
  centerId: null,
  centerPlace: null,
  sublocality: '',
  city: '',
  userLocation: {
    lat: process.env.REACT_APP_LATITUDE,
    lng: process.env.REACT_APP_LONGITUDE,
  },
  draggedLocation: {
    lat: process.env.REACT_APP_LATITUDE,
    lng: process.env.REACT_APP_LONGITUDE,
  },
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
  gridMode: false,
  maxViewable: 10,
  maxViewableDepth: 4,
  setProfile: (profile) =>
    set((state) => ({
      ...state,
      profile,
    })),
  setBusinessDetailProfile: (businessDetailProfile) =>
    set((state) => ({
      ...state,
      businessDetailProfile,
    })),
  setDetailId: (detailId) =>
    set((state) => ({
      ...state,
      detailId,
    })),
  setTabSelected: (tabSelected) =>
    set((state) => ({
      ...state,
      tabSelected,
    })),
  setListTabSelected: (listTabSelected) =>
    set((state) => ({
      ...state,
      listTabSelected,
    })),
  setView: (view) =>
    set((state) => ({
      ...state,
      view,
    })),
  setSelectedList: (selectedList) =>
    set((state) => ({
      ...state,
      selectedList,
    })),
  setSelectedListId: (selectedListId) =>
    set((state) => ({
      ...state,
      selectedListId,
    })),
  setSearchIndex: (searchIndex) =>
    set((state) => ({
      ...state,
      searchIndex,
    })),
  setListClickedFromSearch: (listClickedFromSearch) =>
    set((state) => ({
      ...state,
      listClickedFromSearch,
    })),
  setMyFeedIndex: (myFeedIndex) =>
    set((state) => ({
      ...state,
      myFeedIndex,
    })),
  setListIndex: (listIndex) =>
    set((state) => ({
      ...state,
      listIndex,
    })),
  setFavoriteIndex: (favoriteIndex) =>
    set((state) => ({
      ...state,
      favoriteIndex,
    })),
  setUserDataId: (userDataId) =>
    set((state) => ({
      ...state,
      userDataId,
    })),
  setDiscoverBtn: (discoverBtn) =>
    set((state) => ({
      ...state,
      discoverBtn,
    })),
  setReadMore: (readMore) =>
    set((state) => ({
      ...state,
      readMore,
    })),
  setPlaces: (places) =>
    set((state) => ({
      ...state,
      places,
    })),
  setOrderedPlaces: (orderedPlaces) =>
    set((state) => ({
      ...state,
      orderedPlaces,
    })),
  setMaxViewableDepth: (maxViewableDepth) =>
    set((state) => ({
      ...state,
      maxViewableDepth,
    })),
  setMaxViewable: (maxViewable) =>
    set((state) => ({
      ...state,
      maxViewable,
    })),
  setGridView: (gridView) =>
    set((state) => ({
      ...state,
      gridView,
    })),
  setGridMode: (gridMode) =>
    set((state) => ({
      ...state,
      gridMode,
    })),
  setHovering: (hovering) =>
    set((state) => ({
      ...state,
      hovering,
    })),
  setCenterPlace: (centerPlace) =>
    set((state) => ({
      ...state,
      centerPlace,
    })),
  setSublocality: (sublocality) =>
    set((state) => ({
      ...state,
      sublocality,
    })),
  setCity: (city) =>
    set((state) => ({
      ...state,
      city,
    })),
  setUserLocation: (userLocation) =>
    set((state) => ({
      ...state,
      userLocation,
    })),
  setDraggedLocation: (draggedLocation) =>
    set((state) => ({
      ...state,
      draggedLocation,
    })),
  setDepth1Places: (depth1Places) =>
    set((state) => ({
      ...state,
      depth1Places,
    })),
  setCenterId: (centerId) =>
    set((state) => ({
      ...state,
      centerId,
    })),
  setCenterHexPosition: (centerHexPosition) =>
    set((state) => ({
      ...state,
      centerHexPosition,
    })),
  setDisplacedCenterHexPosition: (displacedCenterHexPosition) =>
    set((state) => ({
      ...state,
      displacedCenterHexPosition,
    })),
  setCamPosition: (camPosition) =>
    set((state) => ({
      ...state,
      camPosition,
    })),
  setPositionCenter: (positionCenter) =>
    set((state) => ({
      ...state,
      positionCenter,
    })),
  setPlaceCoordDict: (placeCoordDict) =>
    set((state) => ({
      ...state,
      placeCoordDict,
    })),
  setMultiDict: (multiDict) =>
    set((state) => ({
      ...state,
      multiDict,
    })),
  setHexDict: (hexDict) =>
    set((state) => ({
      ...state,
      hexDict,
    })),
  setIndexPosVector: (indexPosVector) =>
    set((state) => ({
      ...state,
      indexPosVector,
    })),
  setMapPosDict: (mapPosDict) =>
    set((state) => ({
      ...state,
      mapPosDict,
    })),
  setOrderedPlacesDict: (orderedPlacesDict) =>
    set((state) => ({
      ...state,
      orderedPlacesDict,
    })),
  setSelectedPlace: (selectedPlace) =>
    set((state) => ({
      ...state,
      selectedPlace,
    })),
  removeAllCoor: () => set({places: {0: [0, 0, 0]}}),
}));

export default useStore;
