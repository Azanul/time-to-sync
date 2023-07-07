import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "name",
                flex: 1,
                headerName: translate("categories.fields.name"),
                minWidth: 200,
                headerAlign: "center",
                align: "center"
            },
            {
                field: "color",
                flex: 1,
                headerName: translate("categories.fields.color"),
                type: "text",
                minWidth: 200,
                renderCell: function render({ row }) {
                  return (
                      <div style={{backgroundColor: "#"+row.color, textAlign: "center", height: "80%", width: "80%"}}>
                        #{row.color}
                      </div>
                  );
                },
                headerAlign: "center",
                align: "center"
            },
            {
                field: "actions",
                headerName: translate("table.actions"),
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
            <DataGrid {...dataGridProps} columns={columns} autoHeight  />
        </List>
    );
};
