import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storesData from "../stores.json"; // ✅ Import initial store data
import { Store } from "../types";

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: storesData, // ✅ Set initial state from JSON
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
    updateStore: (state, action: PayloadAction<Store[]>) => {
      state.stores = [...action.payload]; // ✅ Update entire store list
    },
    removeStore: (state, action: PayloadAction<number>) => {
      state.stores = state.stores.filter(
        (store) => store.seqNo !== action.payload
      );
    },
  },
});

export const { addStore, updateStore, removeStore } = storeSlice.actions;
export default storeSlice.reducer;
