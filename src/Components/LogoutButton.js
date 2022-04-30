import React from 'react';
import { auth } from '../firebase/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {ButtonContainer, Button} from '../Elements/ElementsFormulary';

const LogoutButton = () => {
      const navigate =useNavigate();

      const logOut = async() =>{
            try{
                  await signOut(auth);
                  navigate("/LoginPage")
            } catch(error){
                  console.log(error);
            }
            
      }

      return (
            <ButtonContainer>
                  <Button as="button" onClick={logOut}>Logout</Button>
            </ButtonContainer>
       );
};
 
export default LogoutButton;