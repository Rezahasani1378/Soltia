import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const ButtonElement = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  background-color: #24cbc7;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  text-decoration: none;

  &:after {
    content: ' \\2192';
    font-size: 20px;
    margin-bottom: 4px;
    transition: 0.3s margin-left ease;
  }

  &:hover {
    &:after {
      margin-left: 5px;
    }
  }
`;

const Button = ({ onClick, text }: ButtonProps) => {
  return <ButtonElement onClick={() => onClick()}>{text}</ButtonElement>;
};

export default Button;
