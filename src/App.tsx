import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker } from '@mantine/dates';
import { Text, Title, MantineProvider, Button } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './Demo.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import AppointmentForm from './components/AppointmentForm';
import TimeslotPicker from './components/TimeslotPicker';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Loader from './components/Loader'; // Correct import

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Tokyo");

const theme = {
  colorScheme: 'light',
  colors: {
    brand: ['#E0F7EC', '#B3EFD5', '#80E7BD', '#4DDEA6', '#1AD68E', '#00994d', '#008744', '#00703B', '#005A32', '#004429'],
  },
  primaryColor: 'brand',
};

const minHourInterval = parseInt(process.env.REACT_APP_HOUR, 10) || 1; // Fallback to 1 hour if not set
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

console.log('Min Hour Interval:', minHourInterval);
console.log('API URL:', apiUrl);
console.log('API Key:', apiKey);

const generateTimeslots = (selectedDate, appointmentHours) => {
  const timeslots = [];
  const startHour = 10;
  const endHour = (selectedDate.day() === 0 || selectedDate.day() === 1) ? 17 : 21;

  const now = dayjs();
  const selectedDay = dayjs(selectedDate).startOf('day');
  const isToday = selectedDay.isSame(now, 'day');
  const isTomorrow = selectedDay.isSame(now.add(1, 'day'), 'day');
  
  const minAllowedTime = now.add(minHourInterval, 'hour');

  for (let hour = startHour; hour < endHour; hour++) {
    const appointmentCount = appointmentHours.filter(h => h.hour === hour && (h.status === 'reserved' || h.status === 'scheduled')).length;
    const timeslotTime = selectedDay.hour(hour).minute(0).second(0); // Exact timeslot time
    
    // Disable timeslots for today if the interval is within the same day or more than 24 hours
    const isDisabledToday = isToday && timeslotTime.isBefore(minAllowedTime);
    // Disable timeslots for tomorrow if the interval is 24 hours or more
    const isDisabledTomorrow = isTomorrow && minHourInterval >= 24 && timeslotTime.isBefore(minAllowedTime);

    const isDisabled = appointmentCount >= 2 || isDisabledToday || isDisabledTomorrow;

    console.log(`Timeslot: ${timeslotTime.format('HH:mm')}, Disabled: ${isDisabled}`);
    
    timeslots.push({ time: `${hour}:00`, isDisabled });
  }
  return timeslots;
};

const Background = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  align-items: center;
  height: 150vh;
`;

const StyledDatePickerContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
`;

const TimePickerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  min-height: 200px; /* Adjust this as necessary */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().add(1, 'day').toDate()); // Default to tomorrow
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentHours, setAppointmentHours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [timePickerLoading, setTimePickerLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      const fetchAppointments = async () => {
        setTimePickerLoading(true);
        try {
          const response = await axios.get(`${apiUrl}appointment`, {
            headers: { 'x-api-key': apiKey },
          });
          const hours = response.data
            .filter(app => dayjs(app.startDate).tz(dayjs.tz.guess()).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD'))
            .map(app => ({
              hour: dayjs(app.startDate).tz(dayjs.tz.guess()).hour(),
              status: app.status
            }));
          setAppointmentHours(hours);
          setAppointments(response.data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        } finally {
          setTimePickerLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [selectedDate]);

  const timeslots = selectedDate && !timePickerLoading ? generateTimeslots(dayjs(selectedDate), appointmentHours) : [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowDatePicker(true);
    }, 1500); // Simulate loading time
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log('Appointment created: {dummy data}');
        alert("Appointment created successfully!");
      }, 1500); // Simulate API call time
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert("Error creating appointment.");
    }
  };

  return (
    <MantineProvider theme={theme}>
      <Background>
        <Container>
          {loading && <Loader />}
          <CSSTransition
            in={!formSubmitted}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
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
          </CSSTransition>
          {showDatePicker && (
            <>
              <Title order={2}>Select a Date & Time</Title>
              <StyledDatePickerContainer>
                <DatePicker
                  allowDeselect
                  value={selectedDate}
                  onChange={setSelectedDate}
                  fullWidth
                  size="lg"
                  hideOutsideDates
                  minDate={dayjs().add(1, 'day').toDate()} // Disable dates before tomorrow
                  classNames={{ day: classes.boldText }}
                />
              </StyledDatePickerContainer>
              {selectedDate && (
                <>
                  <Title order={3}>{dayjs(selectedDate).format('dddd, MMMM D')}</Title>
                  <TimePickerWrapper>
                    {timePickerLoading && (
                      <SpinnerOverlay>
                        <Loader />
                      </SpinnerOverlay>
                    )}
                    <TimeslotPicker
                      timeslots={timeslots}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                    />
                  </TimePickerWrapper>
                </>
              )}
              <Button onClick={handleBookAppointment} style={{ marginTop: '10px' }}>Book Appointment</Button>
            </>
          )}
        </Container>
      </Background>
    </MantineProvider>
  );
};

export default App;
