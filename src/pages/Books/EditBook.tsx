import * as React from "react";
import { Method } from "axios";
import { get } from "lodash";
import { toast } from "react-toastify";

import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField, Box, Modal, Typography } from "@mui/material";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Icons } from "components";
import { Api } from "services";
import { DataType } from ".";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type TCretaeBook = {
  isCreate?: boolean;
  method?: Method;
  url?: string;
  item?: DataType;
  queryKey?: string;
};
export default function EditBook({
  isCreate = false,
  method,
  url,
  item,
  queryKey,
}: TCretaeBook) {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      const sendData = JSON.stringify(data);
      const editBook = JSON.stringify({ ...item, status: Number(data.status) });
      try {
        await Api({
          url,
          method,
          data: isCreate ? sendData : editBook,
        });
        queryClient.invalidateQueries([queryKey]);
        handleOpen();
        toast.success("Success");
      } catch (error) {
        toast.error(get(error, "response.data.message", "Xatolik"));
      }
    },
  });

  return (
    <div>
      {isCreate ? (
        <Button onClick={handleOpen} variant="contained">
          Create Book
        </Button>
      ) : (
        <Icons.Edit onClick={handleOpen} />
      )}
      <Modal
        open={open}
        onClose={handleOpen}
        className="edit-book"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            textAlign="center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {isCreate ? "Create a book" : " Edit a book"}
          </Typography>
          <form
            className="mt-30"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();

              let obj: object;
              const value = get(event, "target.0.value");

              obj = {
                [isCreate ? "isbn" : "status"]: value,
              };
              mutate({ ...obj });
            }}
          >
            <TextField
              name="name"
              defaultValue={get(item, "status", undefined)}
              type={isCreate ? "text" : "number"}
              fullWidth={true}
              id="outlined-basic"
              label={isCreate ? "Isbn" : "Status"}
              variant="outlined"
              autoComplete="off"
            />
            <br />
            <Grid container className="mt-20">
              <LoadingButton
                loading={isLoading}
                style={{ height: "48px" }}
                color="primary"
                fullWidth={true}
                variant="contained"
                type="submit"
              >
                Save
              </LoadingButton>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
