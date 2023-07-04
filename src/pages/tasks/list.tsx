import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const TaskList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: translate("ID"),
        type: "number",
        minWidth: 30,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "title",
        flex: 2,
        headerName: translate("Title"),
        minWidth: 200,
        headerAlign: "center",
      },
      {
        field: "created_at",
        flex: 1,
        headerName: translate("Created At"),
        minWidth: 100,
        align: "center",
        headerAlign: "center",
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "due_date",
        flex: 1,
        headerName: translate("Due Date"),
        minWidth: 100,
        align: "center",
        headerAlign: "center",
        renderCell: function render({ value }) {
          if (!value) {
            return "∞";
          }
          return <DateField value={value} />;
        },
      },
      {
        field: "impact",
        headerName: translate("Impact"),
        type: "number",
        minWidth: 30,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "confidence",
        headerName: translate("Confidence"),
        type: "number",
        minWidth: 30,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "effort",
        headerName: translate("Effort"),
        type: "number",
        minWidth: 30,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "rice",
        headerName: translate("RICE"),
        type: "number",
        minWidth: 30,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "actions",
        headerName: translate("Actions"),
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [translate],
  );

  return (
    <List>
      <DataGrid {...dataGridProps}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            // override default props
            showQuickFilter: true,
          }
        }}
        columns={columns}
        autoHeight />
    </List>
  );
};
