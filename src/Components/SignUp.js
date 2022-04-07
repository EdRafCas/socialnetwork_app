import React from 'react';
import styled from 'styled-components';
import {Link}from 'react-router-dom'


const RegistrationContainer =styled.div`

`

const SignUp =styled(Link)`
color:white;


`
const RedirectContainer=styled.div`
  display:flex;
  flex-direction:row;
  gap:3px;
`

const LogInNow =styled(Link)`
color:white;


`

const RegistrationPage = () => {
      return ( 
            <RegistrationContainer>
                 <RedirectContainer><p>Alreay have an account?</p><LogInNow to={"/"}>Log in now!</LogInNow></RedirectContainer>
            </RegistrationContainer> 
      );
}
 
export default RegistrationPage;