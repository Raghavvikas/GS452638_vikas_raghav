import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { addSKU, updateSKU, removeSKU } from "../../redux/skuSlice";
import { ColDef } from "ag-grid-community";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Card } from "react-bootstrap";
import "./skus.css"; // Import external styles
import { Sku } from "types";

const SKUsPage: React.FC = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);
  const rowData: Sku[] = useMemo(() => skus, [skus]);

  const columnDefs: ColDef[] = [
    {
      headerName: "", // Add a header name for clarity
      field: "actions", // Ensure field name is correctly defined
      cellRenderer: (params: any) => (
        <RiDeleteBin6Line
          className="delete-icon"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeSKU(params.data.id));
          }}
        />
      ),
      width: 80,
      sortable: false,
      filter: false,
      editable: true,
      pinned: "left", // Ensure it's pinned to the first column
    },
    {
      headerName: "SKU",
      field: "sku",
      editable: true,
      pinned: "left",
    },
    {
      headerName: "Price",
      field: "price",
      editable: true,
      valueFormatter: (params) => `$ ${params.value.toFixed(2)}`,
    },
    {
      headerName: "Cost",
      field: "cost",
      editable: true,
      valueFormatter: (params) => `$ ${params.value.toFixed(2)}`,
    },
  ];

  return (
    <div className="sku-container">
      <Card className="border-0 shadow-sm sku-card">
        <Card.Body>
          <div className="ag-theme-alpine">
            <AgGridReact
              key={Date.now()}
              columnDefs={columnDefs}
              rowData={rowData}
              domLayout="autoHeight"
              className="ag-theme-alpine"
              pagination={true}
              paginationPageSize={10}
              paginationAutoPageSize={false}
              suppressHorizontalScroll={true}
              onCellValueChanged={(params) => dispatch(updateSKU(params.data))}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SKUsPage;
