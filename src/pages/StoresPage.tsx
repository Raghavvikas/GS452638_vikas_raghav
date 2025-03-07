import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { updateStore, removeStore } from "../redux/storeSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  RowDragEndEvent,
  ColDef,
} from "ag-grid-community";
import { Store } from "../types";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const StoresPage: React.FC = () => {
  const storeData = useSelector((state: RootState) => state.stores.stores);
  const dispatch = useDispatch();

  // ✅ Handle Delete
  const handleDelete = (storeId: number) => {
    dispatch(removeStore(storeId));
  };

  // ✅ Column Definitions
  const columnDefs: ColDef<Store>[] = useMemo(
    () => [
      {
        headerName: "", // Empty header for delete icon
        cellRenderer: (params: any) => (
          <RiDeleteBin6Line
            className="delete-icon"
            style={{ cursor: "pointer", color: "grey" }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.data.seqNo);
            }}
          />
        ),
        width: 60,
        rowDrag: true,
        editable: true,
      },
      {
        headerName: "", // Empty header for drag icon
        cellRenderer: () => <RxDragHandleHorizontal className="drag-handle" />,
        width: 50,
        rowDrag: true,
        editable: true,
      },
      {
        headerName: "S. No.",
        field: "seqNo",
        width: 100,
        editable: true,
        rowDrag: true,
      },
      {
        headerName: "Store",
        field: "store",
        editable: true,
        rowDrag: true,
      },
      {
        headerName: "City",
        field: "city",
        editable: true,
        rowDrag: true,
      },
      {
        headerName: "State",
        field: "state",
        editable: true,
        rowDrag: true,
      },
    ],
    []
  );

  // ✅ Memoize rowData to prevent unnecessary re-renders
  const rowData: Store[] = useMemo(() => storeData, [storeData]);

  // ✅ Handle Row Drag & Update Redux Store Order
  const handleRowDragEnd = (event: RowDragEndEvent<Store, any>) => {
    const fromIndex = event.node.rowIndex;
    const toIndex = event.overIndex;

    if (typeof fromIndex === "number" && typeof toIndex === "number") {
      const updatedRows = [...storeData];
      const [movedRow] = updatedRows.splice(fromIndex, 1);
      updatedRows.splice(toIndex, 0, movedRow);
      dispatch(updateStore(updatedRows)); // ✅ Update Redux state
    }
  };

  const handleCellEdit = (params: any) => {
    const { id, store, city, state, isNew } = params.data;

    const updatedStores = storeData.map((s) =>
      s.id === id ? { ...s, [params.column.colId]: params.newValue } : s
    );

    if (isNew && store && city && state) {
      // If all fields are filled, save to Redux and remove isNew flag
      const finalStores = updatedStores.map((s) =>
        s.id === id ? { ...s, isNew: false } : s
      );
      dispatch(updateStore(finalStores));
    } else {
      dispatch(updateStore(updatedStores));
    }
  };

  return (
    <div className="store-container">
      <div
        className="ag-theme-alpine"
        style={{
          margin: "0 10% 0 0",
          width: "90%",
          maxWidth: "100%",
          height: "90%",
          overflowX: "auto",
        }}
      >
        <AgGridReact
          className="ag-theme-alpine"
          columnDefs={columnDefs}
          rowData={rowData}
          suppressHorizontalScroll={true}
          rowDragManaged={true}
          rowDragEntireRow={true}
          animateRows={true}
          domLayout="autoHeight" // Auto adjust height
          onRowEditingStarted={handleCellEdit}
          onRowDragEnd={handleRowDragEnd}
          onCellValueChanged={handleCellEdit} // Save edits to Redux
        />
      </div>
    </div>
  );
};

export default StoresPage;
