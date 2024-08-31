import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root'); // For accessibility

const StyledModal = styled(Modal)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const CloseButton = styled.button`
  font-size: 32px;
  cursor: pointer;
  background: none;
  border: none;
  color: #fff;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  max-width: 500px;
  width: 100%;
`;

function ModalComponent({ isOpen, onRequestClose, content }) {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="overlay"
    >
      <CloseButton onClick={onRequestClose}>
        &times;
      </CloseButton>
      <ModalContent>
        {content}
      </ModalContent>
    </StyledModal>
  );
}

export default ModalComponent;
