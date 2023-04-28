import React, { useState } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Greeting = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 2rem;
`;

const YearSelector = styled.select`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const MonthTable = styled.table`
  border-collapse: collapse;
  text-align: center;
  margin-top: 2rem;
`;

const MonthTableHeader = styled.th`
  padding: 0.5rem;
  background-color: #C7E9B0;
  color: #333;
`;

const MonthTableCell = styled.td`
  padding: 0.5rem;
  background-color: #DDFFBB;
  color: #333;
`;

const Dashboard = ({ employeeNumber }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  // For demonstration purposes, the hours worked for each month are randomly generated
  const hoursWorked = {};
  for (let i = 0; i < 12; i++) {
    hoursWorked[i] = Math.floor(Math.random() * 100);
  }

  return (
    <DashboardContainer>
      <Greeting>Hello, employee {employeeNumber}!</Greeting>
      <YearSelector value={year} onChange={handleYearChange}>
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
        <option value={2021}>2021</option>
      </YearSelector>
      <MonthTable>
        <thead>
          <tr>
            <MonthTableHeader>Month</MonthTableHeader>
            <MonthTableHeader>Hours Worked</MonthTableHeader>
          </tr>
        </thead>
        <tbody>
          {[...Array(12).keys()].map((monthIndex) => (
            <tr key={monthIndex}>
              <MonthTableCell>{new Date(year, monthIndex).toLocaleString('default', { month: 'long' })}</MonthTableCell>
              <MonthTableCell>{hoursWorked[monthIndex]}</MonthTableCell>
            </tr>
          ))}
        </tbody>
      </MonthTable>
    </DashboardContainer>
  );
};

export default Dashboard;
