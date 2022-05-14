import React,{useState} from 'react';
import styled from 'styled-components';
import Account from './Account';
import LogoutButton from './LogoutButton';



const ContainerLogin=styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content: center;
  background:#000;
  border:solid red 1px;

@media(max-width: 760px){ 
  display:flex;
  flex-direction:column-reverse;
}
`


const MainPage = ({changeRegistration, alert, changeAlert, stateAlert, changeStateAlert}) => {


  const [message, messageChange] = useState('');
  
      
      return ( 
      <ContainerLogin>
        <div><LogoutButton/></div>
        <Account  message={message}
                  messageChange={messageChange}
                  alert={alert}
                  changeAlert={changeAlert}
                  stateAlert={stateAlert}
                  changeStateAlert={changeStateAlert}/>
        <div></div>
      </ContainerLogin>
       );
}
 
export default MainPage;