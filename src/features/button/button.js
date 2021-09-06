import React from 'react';
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Button = (props) => {
const dynamicButton = props =>
  css`
    background-color: ${props.color};
    color: white;
    min-width: 2.5rem;
    border: solid 2px transparent;
    border-radius: 0.4em; 
    width: 100%;

    :disabled{
        opacity: 0.5;
      }

    &:hover:not(:disabled) {
        color: ${props.hoverColor? 'white' : props.color};
        border-color: ${props.hoverColor? props.hoverColor : 'currentColor'};
        background-color: ${props.hoverColor? props.hoverColor : 'transparent'};
      }
  `
  const StyledButton = styled.button`
    ${dynamicButton};
`;

  return(
    <StyledButton
        color={props.color}
        hoverColor={props.hoverColor}
        type={props.type} 
        onMouseEnter={props.onMouseEnter} 
        onMouseLeave={props.onMouseLeave} 
        disabled={props.disabled} 
        onClick={props.onClick}>
        {props.children}
    </StyledButton>
  )
}

export default Button;
