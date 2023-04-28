import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ClockInOut from './ClockInOut';

const Dashboard = () => {
  const [hours, setHours] = useState({
    march: 200,
    april: 150,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Container variants={containerVariants} initial="hidden" animate="visible">
      <Header variants={itemVariants}>Dashboard</Header>
      <Content>
        <Row variants={itemVariants}>
          <Title>March</Title>
          <Hours>{hours.march}</Hours>
        </Row>
        <Row variants={itemVariants}>
          <Title>April</Title>
          <Hours>{hours.april}</Hours>
        </Row>
      </Content>
      <ClockInOut />
    </Container>
  );
};

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(motion.h1)`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const Title = styled.span`
  font-size: 20px;
`;

const Hours = styled.span`
  font-size: 20px;
`;

export default Dashboard;
