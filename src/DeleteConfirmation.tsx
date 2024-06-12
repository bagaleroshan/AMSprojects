import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import * as React from "react";

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
      <DialogContent>
        <Typography gutterBottom>Are you sure you want to delete?</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          sx={{ "&:hover": { background: "#FF7F7F", color: "white" } }}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{ "&:hover": { background: "#90EE90", color: "white" } }}
          onClick={onConfirm}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
