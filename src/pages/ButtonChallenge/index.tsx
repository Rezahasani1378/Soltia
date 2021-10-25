import React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const Button = styled.button`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #F1A85C;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  border: 2px #989898 solid;
  cursor: pointer;

  &:after {
    width: 60px;
    height: 60px;
    content: '\\2715';
    font-size: 35px;
    margin-left: 14px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const ButtonChallenge = () => {
  const handleClick = () => {
    toast.success('Clicked on the button!', { position: 'top-center' });
  }

  return <Button onClick={() => handleClick()}>Delete</Button>
}

export default ButtonChallenge
