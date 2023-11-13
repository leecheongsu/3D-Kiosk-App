import React from 'react';
import { LinearProgress } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  opacity: ${(props: Props) => (props.isLoading ? 1 : 0)};
`;
type Props = { isLoading: boolean };

function Loading({ isLoading }: Props) {
  return (
    <Container isLoading={isLoading}>
      <LinearProgress />
    </Container>
  );
}

export default Loading;
