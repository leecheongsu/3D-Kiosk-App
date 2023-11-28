import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import styled from "@emotion/styled";
import { makeStyles } from "@mui/styles";
import { theme } from "@styles/theme";

const useStyles = makeStyles({
  dialog: {
    height: "100vh",
    minWidth: "600px",
    maxWidth: "100vw",
    padding: "55px 45px 30px 45px",
    position: "absolute",
    right: 10,
    top: 0,
    boxShadow: "none",
    transition: "ease-in",
    backgroundColor: "#fff",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "transparent",
    zIndex: theme.zIndex.modal - 1,
  },
  dialogHeader: {},
  dialogContent: {},
  dialogButton: {},
});

const StyledDialogContent = styled(DialogContent)`
  height: 100%;
  overflow-y: auto;
`;

function Side({ open, onClose, title, content, actions }) {
  const classes = useStyles();

  return (
    <>
      {open && <div className={classes.overlay} />}
      <Dialog classes={{ paper: classes.dialog }} open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <StyledDialogContent>{content}</StyledDialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </>
  );
}

export default Side;
