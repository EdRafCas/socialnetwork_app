import React from 'react';
import styled from 'styled-components';
import theme from './Theme.js'
import ProfileImage from './img/profile_img.png'

const Container = styled.div`
  height: 100vh;
  border:solid black 15px;
  display:grid;
  grid-template-columns: repeat(1, 3fr 2fr);
  justify-content: flex-start;
  position: relative;
  z-index: 100;
  min-height:750px;
  color: white;
`
const Timeline = styled.div`
  
  height:100%;
  display:flex;
  flex-direction:column;
  padding:1rem;
  border:solid ${theme.BorderColor} 1px;
  gap:1rem;
`
const Card =styled.div`
  padding:1rem;
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  border:solid red 1px;
  gap:1rem;

`
const CardColumns = styled.div`
  padding:0.5rem;
  display:flex;
  flex-direction:column;
  border:solid ${theme.BorderColor} 1px;
  gap:1rem;
`
const PortraitContainer =styled.div`
  border: solid black 1px;
  padding:0;
  margin:0;
  width:100%;
  height:auto;
  display:flex;
  flex-direction:column;
  img{
    width:100%;
  }
`
const UserNameContainer =styled.div`
  width:100%;
  padding-left:1rem;
  padding-top:5px;
  padding-bottom:5px;
  border:solid ${theme.BorderColor} 1px;
  display:flex;
  flex-direction:row;
  gap:1rem;
`

const NameContainer =styled.h1`
  border:solid ${theme.BorderColor} 1px;

`

const AliasContainer = styled.p`
  border:solid ${theme.BorderColor} 1px;

`

const MessageContent = styled.div`
  padding:1rem;
  height:200px;
  border:solid ${theme.BorderColor} 1px;
`

const AccountManagement = styled.div`
  height:300px;
  padding:1rem;
  display:flex;
  flex-direction:column;
  border:solid ${theme.BorderColor} 1px;

`
const InputContainer =styled.div`
  display:flex;
  flex-direction:row;
  gap:1rem;

`
const Labels =styled.label`
  width:5rem;

`
const UsernameInput =styled.input`

`
const PasswordInput =styled.input`
`

const App = () => {
  return ( 
    <Container>
      <Timeline>
        <Card>
          <CardColumns>
            <PortraitContainer>
              <img alt="userportrait" src={ProfileImage}/>
            </PortraitContainer>
            
          </CardColumns>
          <CardColumns>
            <UserNameContainer>
              <NameContainer>hi</NameContainer><AliasContainer>hello</AliasContainer>
            </UserNameContainer>
            <MessageContent>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              
            </MessageContent>
          </CardColumns>
          
        </Card>      
        
      </Timeline>
      <AccountManagement>
        <InputContainer>
          <Labels>Username</Labels>
          <UsernameInput/>
        </InputContainer>
          
        <InputContainer>
          <Labels>Password</Labels>
          <PasswordInput/>
        </InputContainer>
        
      </AccountManagement>
      
      
    </Container>
   );
}
 
export default App;

