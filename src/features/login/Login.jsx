import React, {useEffect, useState,} from 'react';
import styled from '@emotion/styled';
import {User} from '@emotion-icons/boxicons-solid/User';
import {LockAlt} from '@emotion-icons/boxicons-solid/LockAlt';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
    getUser,
    fetchAsync,
    setAuth
  } from '../user/userSlice';


const LoginContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: space-between;
`

const Title = styled.h1`
  padding: 1rem 0rem 0.2rem 0rem;
  font-size: 2.5em;      
`;

const Label = styled.label`
  font-size: 0.8rem; 
  margin-left: 1rem;
`;

const Error= styled.div`
    display: block;
    color: #B22222;
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
`

const InputContainer = styled.div`
    border: 2px solid black;
    display: flex;
    width:100%;
    box-sizing: border-box;
    margin-bottom: 0.5rem;
    border-radius: 0.4em;  
    overflow: hidden;
    &:hover {
      border-style: dashed;
    }
    :focus-within{
      border: 2px dashed #191970;
    }
    input:not(:focus):not(:placeholder-shown):invalid {
      border: 2px dashed #B22222;
      ${Error} {
        display: block !important;
      }
    }
    input:not(:focus):not(:placeholder-shown):valid {
      border: 2px solid #2E8B57;
    }
    
`

const StyledInput = styled.input`
    display: inline-block;
    border: none;
    outline: none;
    font-size: 0.7rem; 
    overflow: visible;
    flex: 1;
`
const StyledUser = styled(User)`
    width: 1rem;
    display: inline;
`
const StyledLock = styled(LockAlt)`
    width: 1rem;
    display: inline;
`

const LoginButton = styled.button`
    margin-top: 1rem;
    background-color: #191970;
    color: white;
    border: solid 2px transparent;
    border-radius: 0.4em;  
    display: inline-block;
    width: 100%;

    &:hover {
      color: #191970;
      border-color: currentColor;
      background-color: white;
    }
    :disabled{
      opacity: 0.5;
    }
`

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
 
  const isAuthenticated = useSelector((state) => state.user.auth);
  const [username, setUsername] = useState('');
  const [usernameValidity, setUsernameValidity] = useState();
  const [password, setPassword] = useState('');
  const [passwordValidity, setPasswordValidity] = useState();
  
  useEffect(()=>{
    let isAuth = localStorage.getItem('isAuth');
    if(isAuth){
        dispatch(setAuth(isAuth));
        }
    },[])

  const handleLogin = (e) => {
      e.preventDefault();
        dispatch(fetchAsync({'email':username, 'password': password})).then(()=>{
            if(isAuthenticated){
                history.push('/home');
            }
        });
  }

  const checkValidity = (type) => {
    switch(type){
      case 'username':
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        username && !re.test(String(username).toLowerCase())? setUsernameValidity(false): setUsernameValidity(true);
        break;
      case 'password':
        (password && (password.length<4 || password.length>16))? setPasswordValidity(false): setPasswordValidity(true);
        break;
      default:
        break;
    }
  }

  return(
    <LoginContainer>
        
      <Title>Rapptr Labs</Title>
      <form onSubmit={handleLogin}>

      <Label>Email</Label>
        <InputContainer>
            <StyledUser/>
            <StyledInput type='email' placeholder='user@rapptrlabs.com' value={username} onChange={e => setUsername(e.target.value)} onBlur={(e)=>checkValidity('username')}required pattern=".{1,50}" />
        </InputContainer>
        {usernameValidity === false  && <Error>Not a valid email</Error>}

        <Label>Password</Label>
        <InputContainer>
        <StyledLock/>
        <StyledInput placeholder='Must be at least 4 characters' value={password} onChange={e => setPassword(e.target.value)} onBlur={(e)=>checkValidity('password')} required pattern=".{4,16}"  title="Password must be 4-16 characters."/>
        </InputContainer>
        {passwordValidity === false && <Error>Not a valid password</Error>}

        <LoginButton type="submit">login</LoginButton>
        </form>
    </LoginContainer>
  )
}


export default Login;
