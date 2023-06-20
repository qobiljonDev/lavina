export type TRowSelection = {
  selectItem: Array<any>;
  setSelectItem: any;
};

export interface ICustomTable {
  page?: number;
  setPage?: any;
  total?: number;
  rowsPerPage?: number;
  setRowsPerPage?: any;
  columns: Array<any>;
  dataSrc: Array<any>;
  onRowClick?: any;
  isLoading?: boolean;
  isChecked?: boolean;
  rowSelection?: TRowSelection;
  setFilter?: any;
  filter?: string | any;
  hiddenPagination?: Boolean;
}
