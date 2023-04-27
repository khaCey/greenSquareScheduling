import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #00994D;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f5f5f5;
  &:focus {
    outline: none;
  }
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #00994D;
  cursor: pointer;
`;

function LoginPage() {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Employee Number:', employeeNumber);
    console.log('Password:', password);
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2 style={{ color: '#00994D' }}>Login</h2>
        <FormInput
          type="text"
          placeholder="Employee Number"
          value={employeeNumber}
          onChange={(event) => setEmployeeNumber(event.target.value)}
          required
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <FormButton type="submit">Login</FormButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default LoginPage;
