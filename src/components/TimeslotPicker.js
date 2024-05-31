import React from 'react';
import { Button, Group } from '@mantine/core';

const TimeslotPicker = ({ timeslots, selectedTime, setSelectedTime }) => (
  <Group direction="column" spacing="sm" style={{ width: '100%', maxWidth: '400px' }}>
    {timeslots.map(({ time, isDisabled }) => (
      <Button
        key={time}
        variant="outline"
        disabled={isDisabled}
        style={{
          border: selectedTime === time ? '2px solid #1c7ed6' : '2px solid #d4d4d4',
          backgroundColor: selectedTime === time ? '#1c7ed6' : 'white',
          color: selectedTime === time ? 'white' : isDisabled ? '#d4d4d4' : '#1c7ed6',
          width: '100%',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        onClick={() => !isDisabled && setSelectedTime(time)}
      >
        {time}
      </Button>
    ))}
  </Group>
);

export default TimeslotPicker;
