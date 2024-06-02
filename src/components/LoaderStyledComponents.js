// LoaderStyledComponents.js
import styled from 'styled-components';

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #00994d;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
