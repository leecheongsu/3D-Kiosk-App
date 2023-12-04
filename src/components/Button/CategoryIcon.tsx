import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { DehazeRounded } from '@mui/icons-material';
import React from 'react';

/**
 * NOTICE. isLeftAlign 카멜케이스 경고창 무시해도됨.
 */

const CategoryIconButton = styled((props) => (
  <IconButton {...props}>
    <DehazeRounded sx={{ color: '#fff' }} />
  </IconButton>
))<{ isLeftAlign?: boolean }>`
  ${(props) => (props.isLeftAlign ? 'left: 3vw;' : 'right: 3vw;')}
  margin-top: -33px;
  width: 56px;
  height: 56px;
  background: #094fad;
  border-radius: 100px;
  transition: all 0.2s;
  z-index: 100;
  position: fixed;
  top: 50%;
  padding: 0;

  &::after {
    content: '';
    position: fixed;
    top: 50%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    ${(props) => (props.isLeftAlign ? 'border-right-color: #094fad;' : 'border-left-color: #094fad;')}
    ${(props) => (props.isLeftAlign ? 'border-left : 0;' : 'border-right: 0;')}
    margin-top: -10px;
    ${(props) => (props.isLeftAlign ? 'margin-left: -60px;' : 'margin-left: 60px')}
  }
`;

export default CategoryIconButton;
