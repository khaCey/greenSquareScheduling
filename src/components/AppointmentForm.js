import React from 'react';
import { Title, TextInput, Button } from '@mantine/core';
import dayjs from 'dayjs';

const AppointmentForm = ({ name, setName, email, setEmail, phoneNumber, setPhoneNumber, handleSubmit, selectedDate, selectedTime }) => (
  <form onSubmit={handleSubmit} style={{ marginTop: '20px', width: '100%', maxWidth: '400px' }}>
    <TextInput
      label="Name"
      placeholder="Your name"
      value={name}
      onChange={(event) => setName(event.currentTarget.value)}
      required
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
    <Button type="submit" fullWidth style={{ marginTop: '10px' }}>Book Appointment</Button>
  </form>
);

export default AppointmentForm;
