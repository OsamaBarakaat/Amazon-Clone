import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframe animation for 404 text
const bounce = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-20px);
  }
  50% {
    transform: translateX(20px);
  }
  75% {
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(0);
  }
`;

// Define styled components for Error404 component
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #f94144;
  margin-bottom: 2rem;
  animation: ${bounce} 1s ease-in-out infinite;
`;

const Message = styled.p`
  font-size: 2rem;
  color: #f8961e;
`;

const Error = () => {
  return (
    <Container>
      <Title>Error 404: Page Not Found</Title>
      <Message>Sorry, the page you are looking for does not exist.</Message>
    </Container>
  );
};

export default Error;
