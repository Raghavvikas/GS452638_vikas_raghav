// src/types.ts
export interface Store {
  id?: number; // ID is hidden, but still needed for Redux
  seqNo: number; // Renamed from "Seq No." to match TS convention
  store: string;
  city: string;
  state: string;
}

export interface Sku{
  id: number;
  sku: string;
  price: number;
  cost: number;
}
