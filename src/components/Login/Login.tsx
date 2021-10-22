import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useSelector } from 'react-redux';
import {
  fetchLogin,
  resetError,
  selectLoginError,
  selectUser,
} from '@/redux/slices/User';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectLoginError);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(fetchLogin({ usernameOrEmail: username, password }));
  };

  useEffect(() => {
    if (user.username && typeof localStorage !== 'undefined') {
      toast.success(user.message, { position: 'top-center' });
      dispatch(resetError());
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center' });
      dispatch(resetError());
    }
  }, [error]);

  return (
    <Container>
      <Title>Sign in</Title>
      <Input
        setData={(username: string) => setUsername(username.toLowerCase())}
        placeholder="Username or Email"
        focus
      />
      <Input
        setData={(password: string) => setPassword(password)}
        placeholder="Password"
        type="password"
        margin="20px 0 20px 0"
        onEnter={() => password && handleLogin()}
      />
      <Button text="Login" onClick={() => handleLogin()} />
    </Container>
  );
};

export default Login;
