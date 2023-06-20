import { useState } from "react";
import { get } from "lodash";
import { Chip, Grid } from "@mui/material";

import { useAppSelector } from "store/hooks";
import CustomTable from "components/CustomTable";
import SearchForm from "components/FIelds/SearchForm";
import EntityContainer from "modules/containers";

import PermissionDialog from "components/Dialog";
import EditBook from "./EditBook";

import "./style.scss";

export interface DataType {
  key: number;
  id?: number;
  title: string;
  author: string;
  isbn: string;
  actions: any;
}
type DataColumnsType = {
  title: string;
  key: string;
  dataKey?: string;
  render?: any;
  minWidth?: number;
};

const status = {
  0: "New",
  1: "Reading",
  2: "Finished",
};
const statusColor = {
  0: "primary",
  1: "default",
  2: "success",
  3: "info",
  4: "warning",
  5: "error",
};

function BooksList() {
  const [search, setSearch] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);

  const columns: DataColumnsType[] = [
    {
      title: "№",
      dataKey: "key",
      key: "key",
      render: (item: DataType, index: number) => index + 1,
    },
    {
      title: "Book image",
      dataKey: "url",
      key: "url",
      render: (item: DataType) => {
        return (
          <img
            style={{ width: "120px", height: "120px" }}
            src={get(item, !!search ? "cover" : "book.cover")}
            alt="bookImage"
          />
        );
      },
    },
    {
      title: "Kitob nomi",
      dataKey: !!search ? "title" : "book.title",
      key: !!search ? "title" : "book.title",
    },
    {
      title: "Muallif",
      dataKey: !!search ? "author" : "book.author",
      key: !!search ? "author" : "book.author",
    },
    {
      title: "Isbn",
      dataKey: !!search ? "isbn" : "book.isbn",
      key: !!search ? "isbn" : "book.isbn",
      minWidth: 200,
    },
    {
      title: "Status",
      dataKey: "status",
      key: "status",
      render: (item: DataType) => {
        return (
          <>
            {get(item, "status", undefined) !== undefined ? (
              <Chip
                label={status[get(item, "status", 0)]}
                size="small"
                color={
                  get(statusColor, get(item, "status", 0), "primary") as
                    | "default"
                    | "primary"
                    | "success"
                    | "info"
                    | "warning"
                    | "error"
                    | "secondary"
                }
              />
            ) : (
              "Not Status this book"
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "actions",
      dataKey: "actions",
      minWidth: 220,
      render: (item: DataType) => {
        return (
          <div className="edit-book">
            <div className="book-icon cur-pointer">
              <EditBook
                item={item}
                url={`/books/${get(item, !!search ? "id" : "book.id")}`}
                method="PATCH"
                queryKey={`/books${!!search ? "/" + search : ""}`}
              />
            </div>
            <div className="cur-pointer">
              <PermissionDialog
                url={`/books/${get(item, !!search ? "id" : "book.id")}`}
                queryKey={`/books${!!search ? "/" + search : ""}`}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="page-book">
      <Grid container>
        <Grid item xs={6}>
          <EditBook
            url="/books"
            method="POST"
            isCreate={true}
            queryKey={`/books${!!search ? "/" + search : ""}`}
          />
        </Grid>
        <Grid item xs={6} className="search-form" justifyContent={"flex-end"}>
          <SearchForm {...{ search, setSearch }} />
        </Grid>
      </Grid>
      <div className="table-list">
        <EntityContainer.All
          url={`/books${!!search ? "/" + search : ""}`}
          queryOptions={{
            refetchOnWindowFocus: false,
            retry: 0,
            enabled: !!user.key,
          }}
        >
          {({ query, data }) => {
            const { isFetched } = query;

            return (
              <CustomTable
                isLoading={!isFetched}
                columns={[...columns]}
                dataSrc={data || []}
              />
            );
          }}
        </EntityContainer.All>
      </div>
    </div>
  );
}

export default BooksList;
