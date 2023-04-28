import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LogoPlaceholder = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #b3c99c;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #c7e9b0;
  padding: 2rem;
  border-radius: 8px;
`;

const LoginInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  outline: none;
`;

const LoginButton = styled.button`
  background-color: #a4bc92;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`;

const Login = ({ isAuthenticated, loginHandler, debugMode }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (debugMode) {
      loginHandler('', '', true); // pass empty strings and debug mode flag
    } else {
      loginHandler(employeeNumber, password, false); // authenticate user normally
    }
  };

  return (
    <LoginContainer>
      <LogoPlaceholder />
      <LoginForm onSubmit={handleSubmit}>
        <LoginInput
          type="text"
          placeholder="Employee number"
          value={employeeNumber}
          onChange={(event) => setEmployeeNumber(event.target.value)}
        />
        <LoginInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
