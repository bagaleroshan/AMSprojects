import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

interface DeleteConfirmationProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      onClose={onCancel}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Delete
        <IconButton
          aria-label="close"
          onClick={onCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle> */}
      <DialogContent>
        <Typography gutterBottom>Are you sure you want to delete?</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
