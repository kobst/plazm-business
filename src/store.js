import { configureStore} from '@reduxjs/toolkit';
import businessReducer from './reducers/businessReducer';
import eventReducer from './reducers/eventReducer';
import consumerReducer from './reducers/consumerReducer';
import listReducer from './reducers/listReducer';
import placeReducer from './reducers/placeReducer';
import userReducer from './reducers/userReducer';
import myFeedReducer from './reducers/myFeedReducer';
import searchReducer from './reducers/searchReducer';

export default configureStore({
  reducer: {
    business:  businessReducer,
    event: eventReducer,
    consumer: consumerReducer,
    list: listReducer,
    place: placeReducer,
    user: userReducer,
    myFeed: myFeedReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }),
});

