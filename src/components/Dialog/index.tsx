import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

import { get } from "lodash";
import { Method } from "axios";

import { Icons } from "components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "services";

import "./style.scss";

type TPermission = {
  url: string;
  method?: Method;
  data?: Array<object> | string;
  queryKey?: string;
};

const PermissionDialog = ({
  url = "/book",
  method = "DELETE",
  queryKey = "",
}: TPermission) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen((prev) => !prev);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        await Api({
          url,
          method,
        });

        handleOpen();
        queryClient.invalidateQueries([queryKey]);
        toast.success("Muvaffaqiyatli o'chirildi");
      } catch (error) {
        toast.error(get(error, "response.data.message", "Xatolik"));
      }
    },
  });

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <div onClick={handleOpen} className="hover">
        <Icons.Delete />
      </div>
      <Dialog
        className="permission-dialog"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <div className="px-3 pt-3 mb-2">
            Do you want to delete this book ?
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid className="btn-group">
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              color="error"
              variant="contained"
              onClick={() => mutate()}
            >
              Delete
            </LoadingButton>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionDialog;
