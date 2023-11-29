import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import { theme } from '@styles/theme';
import { IconButton } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';
import styled from '@emotion/styled';

const Container = styled(Dialog)`
  height: '100vh';
  min-width: '500px';
  max-width: '20vw';
  padding: '55px 45px 30px 45px';
  position: 'fixed';
  right: 0;
  top: 0;
  box-shadow: 'none';
  transition: 'ease-in';
  background-color: '#fff';
  .MuiBackdrop-root {
    background-color: transparent;
  }
`;




const useStyles = makeStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    width: '100vw',
    height: '100vh',
    zIndex: theme.zIndex.modal - 1,
  },
  title: {
    fontSize: '31px !important',
    lineHeight: '47px',
    verticalAlign: 'baseline',
    marginTop: '7px',
    textTransform: 'uppercase',
    color: '#094fad',
    fontWeight: 'bold',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
  },
  contentBody: {
    margin: '30px',
    fontSize: '16px',
    verticalAlign: 'baseline',
  },
  imageContainer: {
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentInner: {
    height: '250px',
    overflowY: 'scroll',
  },
  closeIcon: {
    color: '#094fad',
    position: 'absolute',
    top: '23px',
    width: '40px',
    height: '40px',
    boxSizing: 'border-box',
    zIndex: '100',
  },
});

function Side({ open, onClose, value, actions }) {
  const classes = useStyles();

  return (
    <>
      {open && (
        <div className={classes.overlay}>
          <Container open={open} onClose={onClose}>
            <IconButton onClick={actions} sx={{ display: 'flex', justifyContent: 'right' }}>
              <HighlightOff classes={{ root: classes.closeIcon }} />
            </IconButton>
            <DialogTitle classes={{ root: classes.title }}>{value.title}</DialogTitle>
            <div className={classes.contentBody}>
              <div className={classes.imageContainer}>
                {value.imageUrl && <img src={value.imageUrl} alt="NONE" style={{ width: '410px', height: '205px' }} />}
              </div>
              <p className={classes.contentInner}>{value.text}</p>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Side;
