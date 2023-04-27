import * as React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
`;

const LoginTab = styled.div`
  background-color: white;
  width: 50vw;
  height: 25vh;
`;
function Login() {
  return (
    <Background>
      <LoginTab />
    </Background>
  );
}
export default Login;
