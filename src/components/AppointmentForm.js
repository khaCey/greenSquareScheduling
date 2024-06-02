import React from 'react';
import { Title, TextInput, Button } from '@mantine/core';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
`;

const AppointmentForm = ({ name, setName, email, setEmail, phoneNumber, setPhoneNumber, handleSubmit, selectedDate, selectedTime }) => (
  <Form onSubmit={handleSubmit}>
    <TextInput
      label="Name"
      placeholder="Your name"
      value={name}
      onChange={(event) => setName(event.currentTarget.value)}
    />
    <TextInput
      label="Email"
      placeholder="Your email"
      value={email}
      onChange={(event) => setEmail(event.currentTarget.value)}
    />
    <TextInput
      label="Phone Number"
      placeholder="Your phone number"
      value={phoneNumber}
      onChange={(event) => setPhoneNumber(event.currentTarget.value)}
    />
    <Title order={3}>Selected Date: {selectedDate ? dayjs(selectedDate).format('dddd, MMMM D') : 'None'}</Title>
    <Title order={3}>Selected Time: {selectedTime || 'None'}</Title>
    <Button type="submit" fullWidth style={{ marginTop: '10px' }}>Next</Button>
  </Form>
);

export default AppointmentForm;
