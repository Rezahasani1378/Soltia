import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  animation: 0.05s blur-animation ease;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  background-color: #000000a8;

  /* if backdrop support: very transparent and blurred */
  @supports (
    (-webkit-backdrop-filter: blur(7px)) or (backdrop-filter: blur(7px))
  ) {
    background-color: #00000040;
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
  }

  @keyframes blur-animation {
    from {
      backdrop-filter: blur(0);
    }
    to {
      backdrop-filter: blur(7px);
    }
  }
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 30px;
  padding: 20px;
`;

const Modal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children:
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {

  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLTextAreaElement;

    const isOutsideClicked = target.id === 'modalOutside';
    if (isOutsideClicked) setIsOpen(false);
  };

  return isOpen ? (
    <ModalContainer id="modalOutside" onClick={(event) => handleClose(event)}>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  ) : null;
};

export default Modal;
