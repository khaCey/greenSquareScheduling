import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker } from '@mantine/dates';
import { Text, Title, Button, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './Demo.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import AppointmentForm from './components/AppointmentForm';
import TimeslotPicker from './components/TimeslotPicker';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Tokyo");

const theme = createTheme();

const generateTimeslots = (selectedDate, appointmentHours) => {
  const timeslots = [];
  const startHour = 10;
  const endHour = (selectedDate.day() === 0 || selectedDate.day() === 1) ? 17 : 21;

  for (let hour = startHour; hour < endHour; hour++) {
    const appointmentCount = appointmentHours.filter(h => h === hour).length;
    const isDisabled = appointmentCount >= 2;
    timeslots.push({ time: `${hour}:00`, isDisabled });
  }
  return timeslots;
};

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().toDate());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentHours, setAppointmentHours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (selectedDate) {
      const fetchAppointments = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}appointment`, {
            headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
          });
          const hours = response.data
            .filter(app => dayjs(app.startDate).tz(dayjs.tz.guess()).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD'))
            .map(app => dayjs(app.startDate).tz(dayjs.tz.guess()).hour());
          setAppointmentHours(hours);
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [selectedDate]);

  const timeslots = selectedDate && !loading ? generateTimeslots(dayjs(selectedDate), appointmentHours) : [];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}appointment`, {
        startDate: dayjs(selectedDate).hour(parseInt(selectedTime.split(':')[0])).minute(0).second(0).format(),
        endDate: dayjs(selectedDate).hour(parseInt(selectedTime.split(':')[0]) + 1).minute(0).second(0).format(),
        title: 'Lesson Appointment',
        description: 'English lesson appointment',
        createdBy: '1', // Replace with actual user ID
        status: 'scheduled',
        name,
        email,
        phoneNumber
      }, {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
      });
      console.log('Appointment created:', response.data);
      alert("Appointment created successfully!");
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert("Error creating appointment.");
    }
  };

  return (
    <MantineProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100vh'}}>
        <div style={{ display: 'flex', width: '400px', flexDirection: 'column', alignItems: 'center'}}>
          <AppointmentForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleSubmit={handleSubmit}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
          <Title order={2}>Select a Date & Time</Title>
          <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'center'}}>
            <DatePicker
              allowDeselect
              value={selectedDate}
              onChange={setSelectedDate}
              fullWidth
              size="lg"
              hideOutsideDates
              classNames={classes}
            />
          </div>
          {selectedDate && (
            <>
              <Title order={3}>{dayjs(selectedDate).format('dddd, MMMM D')}</Title>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                <TimeslotPicker
                  timeslots={timeslots}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              )}
            </>
          )}
        </div>
      </div>
    </MantineProvider>
  );
};

export default App;
