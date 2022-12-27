import React,{useState} from 'react';
import styled from 'styled-components';
import TimelineDisplay from './TimelineDisplay';
import Login from './Login';


const ContainerLogin=styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content: space-evenly;
  background:#000;
  overflow:scroll;
  overflow-x:hidden;

@media(max-width: 760px){ 
  display:flex;
  flex-direction:column;
  gap:0px;
}
`


const LoginPage = ({alert, changeAlert, stateAlert, changeStateAlert}) => {
  const [email, emailChange] = useState('');
  const [password, passwordChange] = useState('');
  
      
      return ( 
      <ContainerLogin>
      <Login  email={email}
              emailChange={emailChange}
              password={password}
              passwordChange={passwordChange}
              alert={alert}
              changeAlert={changeAlert}
              stateAlert={stateAlert}
              changeStateAlert={changeStateAlert}/>
      <TimelineDisplay />  
          
      </ContainerLogin>
       );
}
 
export default LoginPage;