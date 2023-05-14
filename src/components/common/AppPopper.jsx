import { ClickAwayListener, Fade, Paper, Popper } from "@mui/material";

function AppPopper(props) {
  function handleClose() {
    props.setOpen(false);
  }

  return (
    <Popper
      open={props.open}
      anchorEl={props.anchorEl}
      placement={"bottom-start"}
      transition
      sx={{ zIndex: 1, width: 350 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper sx={{ marginTop: 0.2 }}>
            <ClickAwayListener onClickAway={handleClose}>{props.children}</ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

export default AppPopper;
