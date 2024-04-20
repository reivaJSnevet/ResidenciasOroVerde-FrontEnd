import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";

function ReusableDialog({ open, onClose, title, content, onConfirm }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ReusableDialog;
