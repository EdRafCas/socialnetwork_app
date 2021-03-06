import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import TimelineDisplay from './TimelineDisplay';
import Login from './Login';


const ContainerLogin=styled.div`
  width:100%;
  height:100%;
  display:grid;
  grid-template-columns: repeat(1, 3fr 2fr);
  justify-content: flex-start;
  background:${theme.GradientBackround};

@media(max-width: 760px){ 
  display:flex;
  flex-direction:column-reverse;
}
`


const LoginPage = ({alert, changeAlert, stateAlert, changeStateAlert}) => {
  const [email, emailChange] = useState('');
  const [password, passwordChange] = useState('');
  
      
      return ( 
      <ContainerLogin>
      <TimelineDisplay />
      <Login  
                email={email}
                emailChange={emailChange}
                password={password}
                passwordChange={passwordChange}
                alert={alert}
                changeAlert={changeAlert}
                stateAlert={stateAlert}
                changeStateAlert={changeStateAlert}/>
        
      </ContainerLogin>
       );
}
 
export default LoginPage;