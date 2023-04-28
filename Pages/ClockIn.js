import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ddffbb;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: #a4bc92;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b3c99c;
  }
`;

const ClockIn = () => {
  const history = useHistory();

  const handleBack = () => {
    history.push('/dashboard');
  };

  return (
    <Container>
      <h1>Clock In</h1>
      <Button onClick={handleBack}>Back to Dashboard</Button>
    </Container>
  );
};


export default ClockIn;
