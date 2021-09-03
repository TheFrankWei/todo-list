import React from 'react';
import styled from '@emotion/styled';
import  Table  from './features/table/Table';
import { useDispatch } from 'react-redux';
import {
  clearUser
} from './features/user/userSlice';
import './App.css';
import { keyframes } from "@emotion/react"

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
  font-size: 3rem;  
  animation: ${Bounce} 4s linear infinite alternate}    
`;

const StyledLogout = styled.button`
  position: absolute;
  right: 0px;
  top 0px;
  margin: 0.5rem .5rem .5rem .5rem;
  
  background-color: #778899;
  color: white;
  border: solid 2px transparent;
  border-radius: 0.4em; 

  &:hover {
    color: #778899;
    border-color: currentColor;
    background-color: white;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUser());
  }

  return(
    <AppContainer>

      <StyledLogout onClick={handleLogout}>
        Logout
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
