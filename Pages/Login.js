import React, { useState } from 'react';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const ToggleLabel = styled.span`
  margin-right: 10px;
`;

const ToggleInput = styled.input`
  margin-right: 10px;
`;

const Login = ({ isAuthenticated, loginHandler, debugMode }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleEmployeeNumberChange = (e) => {
    setEmployeeNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginHandler(employeeNumber, password, debugMode);
  };

  const handleToggleDebugMode = () => {
    loginHandler(employeeNumber, password, !debugMode);
  };

  return (
    <LoginWrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Employee Number"
          value={employeeNumber}
          onChange={handleEmployeeNumberChange}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit">Login</Button>
      </Form>
      <ToggleWrapper>
        <ToggleLabel>Debug Mode:</ToggleLabel>
        <ToggleInput type="checkbox" checked={debugMode} onChange={handleToggleDebugMode} />
      </ToggleWrapper>
    </LoginWrapper>
  );
};

export default Login;
