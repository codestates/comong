import { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 200px;
`;
const useNotification = (title: string, options: {}) => {
  if (!('Notification' in window)) {
    return;
  }

  const fireNotif = () => {
    /* 권한 요청 부분 */
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          /* 권한을 요청받고 nofi를 생성해주는 부분 */
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      /* 권한이 있을때 바로 noti 생성해주는 부분 */
      console.log('here');
      console.log(Notification.permission);
      new Notification(title, options);
    }
  };
  return fireNotif;
};

function Test() {
  const triggerNotif = useNotification('테스트 상점', {
    body: 'notification body test',
  });

  return (
    <Wrapper>
      <button onClick={triggerNotif}>알람</button>
    </Wrapper>
  );
}

export default Test;
