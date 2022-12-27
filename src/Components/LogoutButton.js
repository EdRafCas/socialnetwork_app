import React from 'react';
import theme from '../Theme';
import styled from 'styled-components';
import { auth } from '../firebase/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ButtonContainer=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-evenly;
  width:6rem;
  gap:1rem;
  /* border:solid ${theme.BorderColor} 1px; */

`
const Button =styled.button`
  display:flex;
  height:3rem;
  width:6rem;
  border-radius:9999px;
  padding:0rem;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background:${theme.GradientBackround};
  p{
    font-size:1rem;
    font-weight:1000;
    color:white;
  }
  :hover{
    background:${(props)=> props.Logout ? `${theme.RedDark}`
                                        : `${theme.BluePinned}`};
  }
  :active{
    border:solid black 3px;
    p{
      color:black;
      
    }
  }
`

const LogoutButton = () => {
      const navigate =useNavigate();

      const logOut = async() =>{
            try{
                  await signOut(auth);
                  console.log("Logged out")
                  navigate("/LoginPage")
            } catch(error){
                  console.log(error);
            }
            
      }

      return (
            <ButtonContainer>
                  <Button Logout type="button" onClick={logOut}>
                        <p>Logout</p>
                        </Button>
            </ButtonContainer>
       );
};
 
export default LogoutButton;