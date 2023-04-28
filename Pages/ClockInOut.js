import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ClockInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Button = styled(motion.button)`
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

const ClockOutButton = styled(Button)`
  background-color: #FF4136;
`;

const ClockIn = () => {
  const [clockedIn, setClockedIn] = useState(false);

  const handleClockInOut = () => {
    setClockedIn(!clockedIn);
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <ClockInWrapper>
      {clockedIn ? (
        <div>
          <h1>You are currently clocked in.</h1>
          <ClockOutButton onClick={handleClockInOut}>Clock Out</ClockOutButton>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Click the button below to clock in.</h1>
          <Button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            onClick={handleClockInOut}
          >
            Clock In
          </Button>
        </motion.div>
      )}
    </ClockInWrapper>
  );
};

export default ClockIn;
