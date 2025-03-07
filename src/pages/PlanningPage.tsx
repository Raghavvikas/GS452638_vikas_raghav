import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { updateSalesUnits } from "../redux/planningSlice";

interface SalesData {
  [key: string]: {
    salesUnits: number;
  };
}

interface PlanningState {
  salesData: SalesData;
}
interface SalesEntry {
  store: string;
  sku: string;
  salesUnits: number;
  price: number;
  cost: number;
}


const PlanningPage: React.FC = () => {
  const dispatch = useDispatch();

  // ✅ Get Data from Redux Store
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const salesData = useSelector((state: RootState) => state.planning.salesData);
  const calendar = useSelector((state: RootState) => state.calendar.weeks); // ✅ Added Calendar

  // ✅ Color Formatting for GM %
  const getGMPercentStyle = (gmPercent: number) => {
    if (gmPercent >= 40) return { backgroundColor: "#2ecc71", color: "#fff" }; // Green
    if (gmPercent >= 10) return { backgroundColor: "#f1c40f", color: "#000" }; // Yellow
    if (gmPercent >= 5) return { backgroundColor: "#e67e22", color: "#fff" }; // Orange
    return { backgroundColor: "#e74c3c", color: "#fff" }; // Red
  };

  const salesDataMap = useMemo(() => {
    return salesData.reduce((acc, entry) => {
      acc[`${entry.store}-${entry.sku}`] = entry;
      return acc;
    }, {} as Record<string, SalesEntry>);
  }, [salesData]);
  

  const rowData = useMemo(() => {
    return stores.flatMap((store) =>
      skus.map((sku) => {
        const key = `${store.store}-${sku.sku}`;
        const salesEntry = salesDataMap[key];
  
        return {
          store: store.store,
          sku: sku.sku,
          price: sku.price,
          cost: sku.cost,
          salesUnits: salesEntry ? salesEntry.salesUnits : 0, // ✅ Now correctly referencing
        };
      })
    );
  }, [stores, skus, salesDataMap]);
  
  

  // ✅ Handle Sales Units Change
  const onCellValueChanged = useCallback(
    (params: any) => {
      if (params.colDef.field === "salesUnits") {
        dispatch(updateSalesUnits({ store: params.data.store, sku: params.data.sku, salesUnits: Number(params.newValue) }));
      }
    },
    [dispatch]
  );

  // ✅ Define AG-Grid Columns
  const columnDefs: ColDef[] = [
    { headerName: "Store", field: "store", pinned: "left", editable: false },
    { headerName: "SKU", field: "sku", pinned: "left", editable: false },
    { headerName: "Sales Units", field: "salesUnits", editable: true },

    // ✅ Dynamically Generate Columns for Each Week
    ...calendar.map((week) => ({
      headerName: `Week ${week.weekNumber} (${week.month})`,
      children: [
        {
          headerName: "Sales Units",
          field: `salesUnits-${week.id}`,
          editable: true,
          valueGetter: (params:any) => params.data[`salesUnits-${week.id}`] || 0,
          valueSetter: (params:any) => {
            params.data[`salesUnits-${week.id}`] = Number(params.newValue);
            return true;
          },
        },
        {
          headerName: "Sales Dollars",
          field: `salesDollars-${week.id}`,
          valueGetter: (params:any) => {
            const units = params.data[`salesUnits-${week.id}`] || 0;
            return (units * params.data.price).toFixed(2);
          },
        },
        {
          headerName: "GM Dollars",
          field: `gmDollars-${week.id}`,
          valueGetter: (params:any) => {
            const units = params.data[`salesUnits-${week.id}`] || 0;
            return (units * (params.data.price - params.data.cost)).toFixed(2);
          },
        },
        {
          headerName: "GM %",
          field: `gmPercent-${week.id}`,
          valueGetter: (params:any) => {
            const salesDollars = params.data[`salesUnits-${week.id}`] * params.data.price;
            const gmDollars = params.data[`salesUnits-${week.id}`] * (params.data.price - params.data.cost);
            return salesDollars > 0 ? ((gmDollars / salesDollars) * 100).toFixed(2) : "0.00";
          },
          cellStyle: (params:any) => getGMPercentStyle(parseFloat(params.value)),
        },
      ],
    })),
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%", marginTop: 20 }}>
      <AgGridReact
        domLayout="autoHeight"
        className="ag-theme-alpine"
        columnDefs={columnDefs}
        rowData={rowData}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
};

export default PlanningPage;
