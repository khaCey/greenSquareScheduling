import React from 'react';
import { Button, Group } from '@mantine/core';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  border: ${props => (props.selected ? '2px solid #00994d' : '2px solid #d4d4d4')};
  background-color: ${props => (props.selected ? '#00994d' : 'white')};
  color: ${props => (props.selected ? 'white' : props.disabled ? '#d4d4d4' : '#00994d')};
  width: 100%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: bold;
`;

const TimeslotPicker = ({ timeslots, selectedTime, setSelectedTime }) => (
  <Group direction="column" spacing="sm" style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'center'}}>
    {timeslots.map(({ time, isDisabled }) => (
      <StyledButton
        key={time}
        variant="outline"
        disabled={isDisabled}
        selected={selectedTime === time}
        onClick={() => !isDisabled && setSelectedTime(time)}
      >
        {time}
      </StyledButton>
    ))}
  </Group>
);

export default TimeslotPicker;
