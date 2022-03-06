import Router from './Router';
import GlobalStyles from './GlobalStyles';
import { Socket, io } from 'socket.io-client';
import { config } from './config/config';

const env = 'development';
const { url } = config[env];

export interface ServerToClientEvents {
  notificationToClient: (data: any) => any;
  joinedRoom: (data: any) => any;
}

export interface ClientToServerEvents {
  join_room: (room: string) => void;
  notificationToServer: (data: any) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `${url}/app`,
);

function App() {
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
