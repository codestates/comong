import React, { useState } from 'react';
import { postUsers } from '../../apis/api/users';
import ButtonBasic from '../../components/common/button/ButtonBasic';
import Modal from '../../components/common/modal/Modal';
import SellerJoinModalContent from '../../components/common/modal/SellerJoinModalContent';
import BasicInfo from '../../components/form/BasicInfo';
import ErrorMessage from '../../components/Input/ErrorMessage';
import { IJoinForm, IJoinPartial } from './GeneralJoin';

function SellerJoin() {
  const [joinForm, setJoinForm] = useState<IJoinForm>({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: 0,
    postal_code: '',
    address1: '',
    address2: '',
    dob: '',
    role: 1,
    likes: [],
  });
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fillJoinForm = (obj: IJoinPartial) => {
    setJoinForm({ ...joinForm, ...obj });
  };

  const checkRequiredForm = (form: IJoinForm) => {
    if (form.name && form.email && form.password) {
      return true;
    }
    return false;
  };

  const submitForm = () => {
    console.log(joinForm);
    const isFormValid = checkRequiredForm(joinForm);
    if (!isFormValid) {
      setMessage('작성 내용을 확인해주세요');
      return;
    }
    setMessage('');
    postUsers(joinForm);
    setShowModal(true);
  };

  return (
    <form>
      <BasicInfo fillJoinForm={fillJoinForm}></BasicInfo>
      <ErrorMessage>{message}</ErrorMessage>
      <ButtonBasic
        buttonClickHandler={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        회원가입 신청
      </ButtonBasic>
      {showModal && (
        <Modal modalClosedNavigate="/">
          <SellerJoinModalContent
            setShowModal={setShowModal}
          ></SellerJoinModalContent>
        </Modal>
      )}
    </form>
  );
}

export default SellerJoin;
