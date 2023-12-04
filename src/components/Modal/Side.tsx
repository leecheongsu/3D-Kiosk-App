import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';
import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const Container = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: transparent;
  }
  .css-11qlgps-MuiPaper-root-MuiDialog-paper {
    margin: 0;
    max-height: 100vh;
  }
`;

const useStyles = makeStyles({
  container: {
    height: '100vh',
    minWidth: '500px',
    maxWidth: '20vw',
    position: 'fixed',
    right: 0,
    top: 0,
    boxShadow: 'none',
    transition: 'ease-in',
    display: 'flex',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    width: '100vw',
    height: '100vh',
    zIndex: theme.zIndex.modal - 1,
  },
  closeBtnContainer: {
    position: 'fixed',
    zIndex: 9999,
    right: '520px',
    top: '10px',
  },
  parentTitle: {
    fontSize: "1rem",
    textTransform: "uppercase",
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    bottom: 50,
    color: "#fff",
    zIndex: 9999,
    border: '1px solid',
    borderRadius: '25px',
  },
  title: {
    fontSize: '1.5rem',
    lineHeight: '2.5rem',
    verticalAlign: 'baseline',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  header: {
    fontSize: '1rem',
    verticalAlign: 'baseline',
  },
  content: {
    height: '45vh',
    overflowY: 'scroll',
    color: '#1E2A3B',
    textAlign: 'justify',
    fontFamily: 'Spoga Han Sans Neo',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '170%',
    padding: '25px',
  },
  footer: {
    position: 'relative',
    zIndex: 1000,
    width: '100px',
    height: '100px',
    marginLeft: '25px',
    marginTop: '45px',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
});

function Side({ open, onClose, value, actions }) {
  const classes = useStyles();

  return (
    <>
      {open && (
        // <div className={classes.overlay}>
        <Container classes={{ paper: classes.container }} open={open} onClose={onClose}>
          <div className={classes.closeBtnContainer}>
            <IconButton onClick={actions} sx={{ padding: 0 }}>
              <HighlightOff sx={{ color: '#fff', width: '40px', height: '40px' }} />
            </IconButton>
          </div>
          <div className={classes.header}>
            <div className={classes.imageContainer}>
              {value.imageUrl && <img src={value.imageUrl} alt="NONE" style={{ width: '100%', height: '30vh' }} />}
              {/*<DialogTitle classes={{ root: classes.parentTitle }}>부모이름</DialogTitle>*/}
              <DialogTitle classes={{ root: classes.title }}>{value.title}</DialogTitle>
            </div>
          </div>
          <div className={classes.content}>
            <p>{value.text}</p>
          </div>
          <div className={classes.footer}>
            {value.qrUrl && <img src={value.qrUrl} alt="NONE" style={{ width: '100%', height: '100%' }} />}
          </div>
        </Container>
        // </div>
      )}
    </>
  );
}

export default Side;
