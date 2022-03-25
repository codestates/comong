import { useState } from 'react';
import styled from 'styled-components';
import { IJoinPartial } from '../../pages/join/GeneralJoin';
import { useAppSelector } from '../../redux/configStore.hooks';
import ButtonBasic from '../common/button/ButtonBasic';

const Wrapper = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
`;

const PostalWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  height: 45px;
  padding: 1rem;
  margin-bottom: 4px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.colors.lightGrey};

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const InputPostal = styled(Input)`
  width: 30%;
`;

interface IInputAddress {
  fillJoinForm: (obj: IJoinPartial) => void;
}

function InputAddress({ fillJoinForm }: IInputAddress) {
  const { userinfo } = useAppSelector((state) => state.userSlice);

  const getAddress = () => {
    const script = document.createElement('script');
    let width = 0;
    if (window.innerWidth > 1200) {
      width = window.innerWidth;
    } else {
      width = window.innerWidth / 2;
    }
    script.innerHTML = `new daum.Postcode({
      oncomplete: function(data) {
        let addr = '';
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }
        const postalCode = document.getElementById("join-postalcode");
        postalCode.setAttribute('value', data.zonecode);
        postalCode.dispatchEvent(new Event('change', { bubbles: true }));

        const address1 =document.getElementById("join-address1");
        address1.setAttribute('value', addr);
        address1.dispatchEvent(new Event('change', { bubbles: true }));

        document.getElementById("join-address2").focus();
      }
  }).open({
    left: ${width},
    top: (window.screen.height / 4)
  });`;

    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
  };

  const fillAddressInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    fillJoinForm({ [name]: value });
  };

  return (
    <Wrapper>
      <Title>배송지</Title>
      <PostalWrapper>
        <InputPostal
          id="join-postalcode"
          name="postal_code"
          value={userinfo?.postal_code}
          placeholder="우편번호"
          onChange={fillAddressInput}
          disabled
        />
        <ButtonBasic
          type="small"
          buttonClickHandler={(e) => {
            e.preventDefault();
            getAddress();
          }}
        >
          주소 찾기
        </ButtonBasic>
      </PostalWrapper>
      <Input
        id="join-address1"
        name="address1"
        value={userinfo?.address1}
        onChange={fillAddressInput}
        placeholder="주소"
        disabled
      />
      <Input
        id="join-address2"
        name="address2"
        value={userinfo?.address2}
        onChange={fillAddressInput}
        placeholder="상세주소"
      />
    </Wrapper>
  );
}

export default InputAddress;
