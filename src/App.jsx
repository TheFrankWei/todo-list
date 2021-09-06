import React from 'react';
import styled from '@emotion/styled';
import  Table  from './features/table/Table';
import { useDispatch } from 'react-redux';
import {
  clearUser
} from './features/user/userSlice';
import './App.css';
import { keyframes } from "@emotion/react"

import StyledButton from './features/button/button';

const Bounce = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(-18px);
    }
`
const AppContainer = styled.div`
  display: grid;
  justify-items: center;
`;

const Title = styled.h1`
  padding: 1rem 0rem 0.2rem 0rem;
  font-size: 2rem;  
  animation: ${Bounce} 4s linear infinite alternate}    
`;

const StyledLogout = styled.div`
  position: fixed;
  right: 0px;
  top 0px;
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
`;

const App = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUser());
  }

  return(
    <AppContainer>

      <StyledLogout>
        <StyledButton color="#778899" onClick={handleLogout}>Logout</StyledButton>
      </StyledLogout>

      <div>
        <Title>My To-Do List</Title>
      </div>

      <div>
        <Table/>
      </div>

    </AppContainer>
  )
}


export default App;
