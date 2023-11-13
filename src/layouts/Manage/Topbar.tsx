import React from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router';
const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.div`
  width: 100px;
  height: 100%;
  background-color: #000;
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const AvatarWrapper = styled(Avatar)`
  cursor: pointer;
  margin: 0 20px;
`;
type Props = {};

function Topbar({}: Props) {
  const navigator = useNavigate();
  return (
    <Wrapper>
      <Logo onClick={() => navigator('/home')}>LOGO</Logo>
      <AvatarWrapper onClick={() => navigator('/login')} />
    </Wrapper>
  );
}

export default Topbar;
