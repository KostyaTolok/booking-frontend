import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function AppDialog(props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="warning" onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button color="warning" onClick={props.onConfirm}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AppDialog;
