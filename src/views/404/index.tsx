import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
type Props = {};

function NotFound({}: Props) {
  const navigator = useNavigate();
  const [number, setNumber] = useState(3);
  useEffect(() => {
    setTimeout(() => {
      navigator('/');
    }, 3000);
    setTimeout(() => {
      setNumber(2);
    }, 1000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setNumber(number - 1);
    }, 1000);
  }, [number]);
  return (
    <Main>
      <h1>Not Found</h1>
      <h3>찾으시는 페이지가 존재하지 않습니다.</h3>
      <h3>{number}초 후 페이지가 이동합니다.</h3>
    </Main>
  );
}

export default NotFound;
