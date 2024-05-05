import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
  title: string;
  description: string;
  open: boolean;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="error">
          Annuler
        </Button>
        <Button onClick={props.onConfirm} color="success" variant="outlined">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
