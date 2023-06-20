import React, { useEffect } from "react";
import { get } from "lodash";
import {
  Table,
  Paper,
  TableRow,
  TableHead,
  TableBody,
  Checkbox,
  TableCell,
  TableContainer,
} from "@mui/material";

import { ICustomTable } from "./Type";
import { Spinner } from "components";

import "./customTable.scss";

const CustomTable = ({
  columns,
  dataSrc = [],
  onRowClick,
  isLoading = false,
  isChecked = false,
  rowSelection = {
    selectItem: [],
    setSelectItem: () => {},
  },
}: ICustomTable) => {
  const { selectItem, setSelectItem } = rowSelection;
  const [lastSelectedItem, setLastSelectedItem] = React.useState(null);

  // ========================= CHECKBOX SELECT ITEM ============================ //
  const handleSelectItem = (event: any, newSelectedRowKeys: any) => {
    const idKey = "id";
    const isShiftDown = event.nativeEvent.shiftKey;
    const hasBeenSelected = selectItem?.some(
      (a) => a[idKey] === newSelectedRowKeys[idKey]
    );

    // SHIFT DOWN CONDITION
    if (isShiftDown) {
      const newSelectedItems = getNewSelectedItems(
        dataSrc,
        newSelectedRowKeys[idKey]
      );
      setSelectItem((prev: Array<any>) => {
        const data = [...prev, ...newSelectedItems];
        return Object.values(
          data.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
        );
      });
      // HASBEEN SELECTED ITEM
      if (hasBeenSelected)
        setSelectItem(() =>
          selectItem.filter(
            (item) => !newSelectedItems.some((a) => a[idKey] === item[idKey])
          )
        );
      // SHIFT DOWN CONDITION FALSE
    } else {
      setLastSelectedItem(newSelectedRowKeys.id);
      hasBeenSelected
        ? setSelectItem(
            selectItem.filter((a) => a[idKey] !== newSelectedRowKeys[idKey])
          )
        : setSelectItem((prev: Array<any>) => [...prev, newSelectedRowKeys]);
    }
  };

  // ========================= NEW SELECT ITEM FIND INDEX ============================ //

  const getNewSelectedItems = (items: Array<any>, index: number) => {
    const currentSelectedIndex = items.findIndex((item) => item.id === index);
    const lastSelectedIndex = items.findIndex(
      (item) => item.id === lastSelectedItem
    );

    return items.slice(
      Math.min(lastSelectedIndex, currentSelectedIndex),
      Math.max(lastSelectedIndex, currentSelectedIndex) + 1
    );
  };

  // ========================= All CHECKBOX SELECT ============================ //

  const onSelectAllChange = () =>
    selectItem.length === dataSrc.length
      ? setSelectItem([])
      : setSelectItem(dataSrc);

  useEffect(() => {
    if (dataSrc.length) setSelectItem([]);

    // eslint-disable-next-line
  }, [dataSrc]);

  if (isLoading) return <Spinner position="absolute" />;

  if (dataSrc.length < 1) {
    return (
      <h2 style={{ width: "100%", textAlign: "center" }}>Not Found Book</h2>
    );
  }

  return (
    <Paper className="custom-table" sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "max-content" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {isChecked && (
                <TableCell
                  width={40}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selectItem.length > 0 &&
                      dataSrc?.length > selectItem.length
                    }
                    checked={dataSrc?.length === selectItem.length}
                    onChange={onSelectAllChange}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
              )}
              {columns.map((column: any) => (
                <TableCell
                  key={column.title}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth + "px",
                    width: column.minWidth + "px",
                    maxWidth: column?.maxWidth + "px",
                  }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(dataSrc)
              ? dataSrc.map((item: any, index) => {
                  const checked = selectItem?.some(
                    (i) => i.id === get(item, "id")
                  );
                  return (
                    <TableRow
                      hover
                      key={Math.floor(Math.random() * 1000)}
                      tabIndex={-1}
                      role="checkbox"
                      onClick={() => onRowClick && onRowClick(item)}
                    >
                      {isChecked && (
                        <TableCell onClick={(event) => event.stopPropagation()}>
                          <Checkbox
                            color="primary"
                            checked={checked}
                            onChange={(event) => handleSelectItem(event, item)}
                          />
                        </TableCell>
                      )}
                      {columns.map((column, index1) =>
                        column.render ? (
                          <TableCell
                            key={Math.floor(Math.random() * 1000)}
                            style={{
                              minWidth: column.minWidth + "px",
                              width: column.minWidth + "px",
                              maxWidth: column?.maxWidth + "px",
                            }}
                          >
                            {column.render(item, index)}
                          </TableCell>
                        ) : (
                          <TableCell
                            key={Math.floor(Math.random() * 1000)}
                            style={{
                              minWidth: column.minWidth + "px",
                              width: column.minWidth + "px",
                              maxWidth: column?.maxWidth + "px",
                            }}
                          >
                            {get(item, `${column.dataKey}`)}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default React.memo(CustomTable);
