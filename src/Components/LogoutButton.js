import React from 'react';
import theme from '../Theme';
import styled from 'styled-components';
import { auth } from '../firebase/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as IconExit} from '../img/exit_icon.svg'

const ButtonContainer=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  width:3rem;
  gap:1rem;
  /* border:solid ${theme.BorderColor} 1px; */
  @media(max-width: 760px){ 
    p{display}
    border:none;
}

`
const Button =styled.button`
  display:flex;
  height:3rem;
  width:3rem;
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
  @media(max-width: 760px){ 
    border:none;
}
`
const IconContainer=styled.div`
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  height:3rem;
  width:3rem;
 /*  border:1px solid white; */
  fill:currentcolor;
    svg{
      max-height:2rem;
      fill:white;
    }
  :active{
    /* background:white;;
    fill:black; */
  }
  /* @media(max-width: 760px){ 
  :hover{
    background:rgba(255,255,255, 0.2);
  }
} */
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
                    <IconContainer>
                        <IconExit/>
                    </IconContainer>
                  </Button>
            </ButtonContainer>
       );
};
 
export default LogoutButton;