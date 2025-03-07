import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storeReducer from "../redux/storeSlice";
import skuReducer from "../redux/skuSlice";
import planningReducer from "../redux/planningSlice";
import authReducer from "../redux/authSlice";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import calendarReducer from "../redux/calendarSlice";
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  stores: storeReducer,
  skus: skuReducer,
  planning: planningReducer,
  calendar: calendarReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
