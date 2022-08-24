import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Link}from 'react-router-dom';
import {InputContainer, Formulary, FormularyInput, ButtonContainer, Button} from '../Elements/ElementsFormulary';
import {signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import {auth} from '../firebase/FirebaseConfig';
import Alert from '../Elements/Alert';
import LogoutButton from './LogoutButton';

const AccountManagement = styled.div`
  width:auto;
  min-width:40%;
  height:auto;
  padding:1rem 1rem;
  display:flex;
  flex-direction:column;
  align-content:center;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
`
const SignUpContainer=styled.div`
  display:flex;
  flex-direction:row;
  gap:1px;
`
const SignUp =styled(Link)`
  background:none;
  color:${theme.Text};
  /* border:solid ${theme.BorderColor} 1px; */
`


const Login = ({email, emailChange, password, passwordChange, alert, changeAlert, stateAlert, changeStateAlert}) => {

  const navigate = useNavigate();

  const handleChange = (e) =>{
        if(e.target.name ==="email"){
          emailChange(e.target.value)
          /* console.log(email) */
        }
        if(e.target.name==="password"){
          passwordChange(e.target.value)
          /* console.log(password) */
        }
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    changeStateAlert(false);
    changeAlert({});

    const regularExpressionEmail=/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!regularExpressionEmail.test(email)){
          changeStateAlert(true);
          changeAlert({
                type:'error',
                message: 'Please enter a valid email'
          })
          return;
    }

    if(email === "" || password === ""){
          changeStateAlert(true);
          changeAlert({
                type:'error',
                message: 'Please fill all fields'
          })
          return;
    }
    try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/");
          console.log("Logged in")
    } catch(error){
          changeStateAlert(true)
          let message;
          switch(error.code){
            case 'auth/wrong-password':
                  message = "The password provided is incorrect"
                  break;
            case 'auth/user-not-found':
                  message = "The email was not found"
                  break;
            default:
                  message = 'An error ocurred while trying to log in'
                  break;
          }
         changeAlert({
               type:'error',
               message:message
         });
    }

};

  

      return ( 
      <AccountManagement>
          <Formulary LoginUpFormulary onSubmit={handleSubmit}>
            <InputContainer>
              <FormularyInput
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={handleChange}
              />
            </InputContainer>
            <InputContainer>
              <FormularyInput
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={handleChange}/>
            </InputContainer>
            <ButtonContainer>
              <Button type="submit" ><p>Login</p></Button>
            </ButtonContainer>
            <LogoutButton/>
            <SignUpContainer><span>Don't own an account?</span><span><SignUp to="/SignUp">Sign up</SignUp></span>
            </SignUpContainer> 
          </Formulary>
        <Alert type={alert.type}
                message={alert.message}
                stateAlert={stateAlert}
                changeStateAlert={changeStateAlert}
        />
      </AccountManagement>
      );
}
 
export default Login;
