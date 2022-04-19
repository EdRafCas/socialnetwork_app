import React,{useState} from 'react';
import styled from 'styled-components';
import {Link}from 'react-router-dom';
import {Formulary, FormularyInput}  from '../Elements/ElementsFormulary';
import theme from '../Theme.js';
import DatePicker from './DatePicker';
import {ButtonContainer} from '../Elements/ElementsFormulary';


const RegistrationContainer =styled.div`
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      width:100%;
      height:100%;
      padding:1rem;
      /* margin-top:-50px;
      margin-left:-200px; */
      border: solid ${theme.BorderColor} 1px;
      /* background:rgba(91, 112, 131, 0.8); */
      background:Black;
      opacity:1;
      
`
const RegistrationBox=styled.div`
      display:flex;
      flex-direction:column;
      border: solid ${theme.BorderColor} 1px;
      width:100%;
      max-height:80%;
      max-width:40rem;
`
const RegistrationInputContainer=styled.div`
      width:100%;
      /* border: solid ${theme.BorderColor} 1px; */
      position:relative;
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items:center;
      gap:1rem;
`
const RedirectContainer=styled.div`
      display:flex;
      flex-direction:row;
      gap:3px;
`
const LogInNow =styled(Link)`
      color:${theme.Text};
`
const LinkContainer=styled.div`
      display:flex;
      flex-direction:row;
      justify-content:flex-start;
      border: solid ${theme.BorderColor} 1px;
      padding: 0.5rem 0.5rem;
`
const ReturnToLogin=styled(Link)`
      display:flex;
      flex-direction:row;
      justify-content:center;
      width:2rem;
      font-size:1rem;
      color:white;
      border: solid ${theme.BorderColor} 1px;
      padding:5px;
      text-decoration:none;
      border-radius:50%;
      :hover{
            background:rgba(91, 112, 131, 0.8);
      }
`
const SpanInputInitial =styled.span`
      position:absolute;
      font-size:1rem;
      pointer-events:none;
      transition: none;
      color:transparent;
      left:3px;
      top:1px;       
`
const SpanInputFinal =styled.span`
      position:absolute;
      font-size:11px;
      pointer-events:none;
      transition: 0.2s ease all;
      left:3px;
      top:1px;
      color:${theme.Text};  
`
const ButtonSignUp =styled.button`
      height:3rem;
      width:100%;
      border-radius:20px;
      font-weight:800;
      font-size:1rem;
      :hover{
            opacity:0.8;
      }
      :active{
            opacity:0.6;
      }
      

`


const RegistrationPage = () => {

      const [nameHolder, changeNameHolder] =useState("")
      const [lastnameHolder, changeLastnameHolder] =useState("")
      const [aliasHolder, changeAliasHolder] =useState("")
      const [emailHolder, changeEmailHolder] =useState("")
      const [passwordHolder, changePasswordHolder] =useState("")
      const [password2Holder, changePassword2Holder] =useState("")

      const handleChange =(e)=>{
            switch(e.target.name){
                  case 'name':
                        changeNameHolder(e.target.value);
                        break;
                  case 'lastname':
                        changeLastnameHolder(e.target.value);
                        break;
                  case 'alias':
                        changeAliasHolder(e.target.value);
                        break;
                  case 'email':
                        changeEmailHolder(e.target.value);
                        break;
                  case 'password':
                        changePasswordHolder(e.target.value);
                        break;
                  case 'password2':
                        changePassword2Holder(e.target.value);
                        break;
                  default:
                        break;
            }
      }

      return ( 
            <RegistrationContainer>
                  <RegistrationBox>
                        <LinkContainer>
                           <ReturnToLogin to="/">X</ReturnToLogin>   
                        </LinkContainer>
                        <Formulary SignUpFormulary>
                              <>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="text"
                                          name="name"
                                          value={nameHolder}
                                          placeholder="Name"
                                          onFocus="this.placeholder=''"
                                          onChange={handleChange}
                                    />
                                    {nameHolder ==="" ?
                                          <SpanInputInitial>Name</SpanInputInitial> :
                                          <SpanInputFinal>Name</SpanInputFinal>
                                    }  
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="text"
                                          name="lastname"
                                          value={lastnameHolder}
                                          placeholder="Lastname"
                                          onChange={handleChange}
                                    />
                                    {lastnameHolder ==="" ?
                                          <SpanInputInitial> Lastname</SpanInputInitial> :
                                          <SpanInputFinal>Lastname</SpanInputFinal>
                                    }
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="text"
                                          name="alias"
                                          value={aliasHolder}
                                          placeholder="Alias"
                                          onChange={handleChange}
                                    />
                                    {aliasHolder ==="" ?
                                          <SpanInputInitial> Alias</SpanInputInitial> :
                                          <SpanInputFinal>Alias</SpanInputFinal>
                                    }   
                              </RegistrationInputContainer>
                              <RegistrationInputContainer>
                                    <FormularyInput Registration
                                          type="email"
                                          name="email"
                                          value={emailHolder}
                                          placeholder="Email"
                                          onChange={handleChange}
                                    />
                                    {emailHolder ==="" ?
                                          <SpanInputInitial>Email</SpanInputInitial> :
                                          <SpanInputFinal>Email</SpanInputFinal>
                                    }
                              </RegistrationInputContainer>
                              <RegistrationInputContainer >
                                    <FormularyInput Registration
                                          type="password"
                                          name="password"
                                          value={passwordHolder}
                                          placeholder="Password"
                                          onChange={handleChange}
                                    />
                                    {passwordHolder ==="" ?
                                          <SpanInputInitial>Password</SpanInputInitial> :
                                          <SpanInputFinal>Password</SpanInputFinal>
                                    }  
                              </RegistrationInputContainer>
                              <RegistrationInputContainer >
                                    <FormularyInput Registration
                                          type="password2"
                                          name="password2"
                                          value={password2Holder}
                                          placeholder="Password"
                                          onChange={handleChange}
                                    />
                                    {passwordHolder ==="" ?
                                          <SpanInputInitial>Confirm password</SpanInputInitial> :
                                          <SpanInputFinal>Confirm password</SpanInputFinal>
                                    }  
                              </RegistrationInputContainer>
                              </>
                              <DatePicker/>
                              <ButtonContainer>
                                    <ButtonSignUp type="submit" name="sendMesssage">Continue</ButtonSignUp>
                              </ButtonContainer>
                        </Formulary>
                  </RegistrationBox>
                  <RedirectContainer><p>Alreay have an account?</p><LogInNow to={"/"}>Log in now!</LogInNow></RedirectContainer>
            </RegistrationContainer> 
      );
}
 
export default RegistrationPage;