import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 400px;
  height: 200px;
  position: relative;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 150px;
  }
`;

interface ModalProps {
  children: JSX.Element;
  modalClosedNavigate?: string;
}

function Modal({ children, modalClosedNavigate }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const openModalHandler = () => {
    if (!!modalClosedNavigate) {
      navigate(modalClosedNavigate);
    }
    setIsOpen(!isOpen);
  };

  return (
    <ModalContainer>
      {isOpen === true ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>{children}</ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
}

export default Modal;
