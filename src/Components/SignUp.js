import React from 'react';
import styled from 'styled-components';
import {Link}from 'react-router-dom'


const RegistrationContainer =styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100%;
  /* margin-top:-50px;
  margin-left:-200px; */
  border: solid white 1px;
  /* background:rgba(91, 112, 131, 0.8); */
  background:Black;
  opacity:0.9;
`
const RegistrationFormulary=styled.form`

      display:flex;
      flex-direction:column;
      border: solid white 1px;
      width:40rem;
      height:40rem;

`
const RedirectContainer=styled.div`
  display:flex;
  flex-direction:row;
  gap:3px;
`

const LogInNow =styled(Link)`
      color:white;

`
const ButtonContainer=styled.div`
      display:flex;
      flex-direction:row;
      justify-content:flex-start;
      border: solid white 1px;

`
const ReturnToLogin=styled(Link)`
      display:flex;
      flex-direction:row;
      
      justify-content:center;
      width:3rem;
      font-size:2rem;
      color:white;
      border: solid white 1px;
      padding:5px;
      text-decoration:none;
      border-radius:50%;
      :hover{
            background:rgba(91, 112, 131, 0.8);
      }


`
const RegistrationPage = () => {
      return ( 
            <RegistrationContainer>
                  <>
                  <RegistrationFormulary>
                        <ButtonContainer>
                           <ReturnToLogin to="/">X</ReturnToLogin>   
                        </ButtonContainer>
                        
                  </RegistrationFormulary>
                  <RedirectContainer><p>Alreay have an account?</p><LogInNow to={"/"}>Log in now!</LogInNow></RedirectContainer>
                  </>
                  
            </RegistrationContainer> 
      );
}
 
export default RegistrationPage;