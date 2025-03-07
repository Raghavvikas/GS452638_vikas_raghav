import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import skuData from "../sku.json";

interface SKU {
  id: number;
  sku: string;
  price: number;
  cost: number;
}

interface SKUState {
  skus: SKU[];
}

const initialState: SKUState = {
  skus: skuData,
};

const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.skus.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
    removeSKU: (state, action: PayloadAction<number>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
  },
});

export const { addSKU, updateSKU, removeSKU } = skuSlice.actions;
export default skuSlice.reducer;
