import React, { useState } from 'react';
import styled from 'styled-components';
import { logout } from '@/redux/slices/User';
import { useAppDispatch } from '@/redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Name = styled.div`
  cursor: pointer;
`;

const Logout = styled.div`
  text-align: center;
  cursor: pointer;
  color: #ff0000a3;
`;

const UserMenu = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container>
      <Name onClick={() => setIsMenuOpen(!isMenuOpen)}>{name}</Name>
      {isMenuOpen && <Logout onClick={() => dispatch(logout())}>Logout</Logout>}
    </Container>
  );
};

export default UserMenu;
