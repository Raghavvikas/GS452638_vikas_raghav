import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SalesEntry {
  store: string;
  sku: string;
  salesUnits: number;
  price: number;
  cost: number;
}

interface PlanningState {
  salesData: SalesEntry[];
}

const initialState: PlanningState = {
  salesData: [
    { store: "Nashville Melody Music Store", sku: "Rugged Utility Jacket", salesUnits: 200, price: 44.99, cost: 23.00 },
    { store: "Chicago Charm Boutique", sku: "Floral Chiffon Wrap Dress", salesUnits: 200, price: 149.99, cost: 65.00 },
    { store: "Miami Breeze Apparel", sku: "Lace-Up Combat Boots", salesUnits: 199, price: 24.99, cost: 24.00 },
    { store: "Nashville Melody Music Store", sku: "Silk Embroidered Kimono", salesUnits: 198, price: 109.99, cost: 78.50 },
    { store: "Chicago Charm Boutique", sku: "Textured Knit Pullover", salesUnits: 198, price: 54.99, cost: 42.00 },
    { store: "Detroit Motor Gear", sku: "Oversized Cat-Eye Sunglasses", salesUnits: 197, price: 159.99, cost: 95.00 },
    { store: "Phoenix Sunwear", sku: "Tassel Fringe Handbag", salesUnits: 196, price: 79.99, cost: 44.50 },
  ],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setPlanningData: (state, action: PayloadAction<PlanningState["salesData"]>) => {
      state.salesData = action.payload;
    },
    updateSalesUnits: (state, action: PayloadAction<{ store: string; sku: string; salesUnits: number }>) => {
      const item = state.salesData.find((entry) => entry.store === action.payload.store && entry.sku === action.payload.sku);
      if (item) {
        item.salesUnits = action.payload.salesUnits;
      }
    },
  },
});

export const { setPlanningData, updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
