import { socket } from '../App';
import { useAppDispatch } from '../redux/configStore.hooks';
import { addNotification } from '../redux/modules/userSlice';
import useNotification from './useNotification';

function useSocket(): {
  enterRoom: (room: string) => Promise<void>;
} {
  const pushNotification = useNotification();
  const dispatch = useAppDispatch();

  const makeOption = (data: any, text: string) => {
    return {
      image: `${data.itemInfo[0].image_src}`,
      timestamp: Math.floor(Date.now()),
      body: `${text}\n${data.itemInfo[0].title}`,
    };
  };

  const enterRoom = async (room: string) => {
    socket.emit('join_room', room);
    console.log('소켓 일 하는 중', socket.connected);
    socket.on('notificationToClient', (data) => {
      console.log('socket', data);
      const payStatus = data.data.status;
      const shippingStatus = data.data.shipping_status;
      let pushNotificationOptions;
      if (payStatus === 'paid') {
        if (!shippingStatus) {
          console.log('알림1 - 결제까지');
          pushNotificationOptions = makeOption(
            data,
            '[구매 알림] 배송을 준비해주세요',
          );
        } else if (shippingStatus === 'processing') {
          console.log('알림1 - 배송준비');
          pushNotificationOptions = makeOption(data, '상품 준비중입니다');
        } else if (shippingStatus === 'intransit') {
          console.log('알림1 - 배송시작');
          pushNotificationOptions = makeOption(data, '배송이 시작되었습니다');
        }

        pushNotification &&
          pushNotificationOptions &&
          pushNotification('코몽', pushNotificationOptions);

        const today = new Date();
        const month =
          today.getMonth() < 10 ? `0${today.getMonth()}` : today.getMonth();
        const date =
          today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
        const newData = {
          ...data,
          read: false,
          updatedAt: `${today.getFullYear()}-${month}-${date}T`,
        };
        dispatch(addNotification(newData));
      }
    });
  };

  return { enterRoom };
}

export default useSocket;
