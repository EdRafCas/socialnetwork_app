import React,{useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import Timeline from './Timeline';
import Account from './Account';



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
        <Account  message={message}
                  messageChange={messageChange}
                  alert={alert}
                  changeAlert={changeAlert}
                  stateAlert={stateAlert}
                  changeStateAlert={changeStateAlert}/>
      </ContainerLogin>
       );
}
 
export default MainPage;