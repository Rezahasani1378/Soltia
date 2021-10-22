import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '@/components/Common/Modal';
import Login from '@/components/Login/Login';
import { useSelector } from 'react-redux';
import { resetError, selectUser } from '@/redux/slices/User';
import UserMenu from '@/components/UserMenu/UserMenu';
import { useAppDispatch } from '@/redux';
import RBAC from '@/components/RBAC/RBAC';

const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 94px;
  border-bottom: 1px solid #f1f1f1;

  @media screen and (max-width: 540px) {
    padding: 0 20px;
  }
`;

const LoginText = styled.span`
  cursor: pointer;
  color: #3c4859;
  font-size: 13px;
  font-weight: 600;
`;

const UserRole = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  margin-right: 4px;
`;

const Accessibility = styled.span`
  @media screen and (max-width: 540px) {
    display: none;
  }
`;

const Navigation = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (!isLoginOpen) dispatch(resetError());
  }, [isLoginOpen]);

  useEffect(() => {
    if (user.username) setIsLoginOpen(false);
  }, [user]);

  return (
    <Container>
      <figure>
        <img src="/logo.png" alt="Soltia" />
      </figure>

      <UserRole>
        <RBAC allowedRoles={['premium']}>
          <Icon src="/premium.png" alt="Premium" />
          Premium{'\u00A0'}
          <Accessibility>Accessibility!</Accessibility>
        </RBAC>
        <RBAC allowedRoles={['staff']}>
          <Icon src="/staff.png" alt="Staff" />
          Staff{'\u00A0'}
          <Accessibility>Accessibility!</Accessibility>
        </RBAC>
      </UserRole>

      {user.username ? (
        <UserMenu name={user.username} />
      ) : (
        <LoginText onClick={() => setIsLoginOpen(true)}>Sign In</LoginText>
      )}

      <Modal
        isOpen={isLoginOpen}
        setIsOpen={(isOpen: boolean) => setIsLoginOpen(isOpen)}
      >
        <Login />
      </Modal>
    </Container>
  );
};

export default Navigation;
