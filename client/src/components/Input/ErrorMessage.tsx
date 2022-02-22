import styled from 'styled-components';

const Message = styled.div`
  color: red;
  font-size: 14px;

  &.success {
    color: green;
  }
`;

interface IErrorMessage {
  success?: boolean;
  children?: string;
}

function ErrorMessage({ children, success }: IErrorMessage) {
  return <Message className={success ? 'success' : ''}>{children}</Message>;
}

export default ErrorMessage;
