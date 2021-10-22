import React from 'react';
import styled from 'styled-components';

interface InputProps {
  setData: (data: string) => void;
  type?: string;
  placeholder?: string;
  margin?: string;
  focus?: boolean;
  onEnter?: () => void;
  id?: string;
}

const InputBox = styled.input`
  border: 1px solid #d1d1d1;
  height: 45px;
  padding-left: 10px;
  outline: none;
  font-size: 15px;
  margin: ${({ margin }: { margin: string | undefined }) =>
    margin ? margin : 0};

  &::placeholder {
    opacity: 0.7;
  }
`;

const Input = ({
  setData,
  placeholder,
  type,
  onEnter,
  focus,
  margin,
  id,
}: InputProps) => {
  return (
    <InputBox
      onChange={(e) => setData(e.target.value)}
      id={id}
      placeholder={placeholder}
      autoFocus={focus}
      type={type}
      margin={margin}
      onKeyDown={(e) =>
        e.keyCode === 13 && typeof onEnter === 'function' && onEnter()
      }
    />
  );
};

export default Input;
