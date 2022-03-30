import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  border:solid black 15px;
  display:grid;
  grid-template-columns: repeat(1, 3fr 2fr);
  justify-content: flex-start;
  
  position: relative;
  z-index: 100;
  min-height:750px;
`
const Timeline = styled.div`
  
  height:100%;
  display:flex;
  flex-direction:column;
  padding:1rem;
  border:solid red 1px;
  gap:1rem;
`
const Card =styled.div`
  padding:1rem;
  display:flex;
  flex-direction:column;
  border:solid blue 1px;
  gap:1rem;

`
const UserNameContainer =styled.div`
  width:100%;
  padding-left:1rem;
  padding-top:5px;
  padding-bottom:5px;
  border:solid red 1px;
  display:flex;
  flex-direction:row;
  gap:1rem;
`

const NameContainer =styled.h1`
  border:solid black 1px;

`

const AliasContainer = styled.p`
  border:solid black 1px;

`

const MessageContent = styled.div`
  padding:1rem;
  height:200px;
  border:solid black 1px;
`

const AccountManagement = styled.div`
  height:300px;
  display:flex;
  flex-direction:column;
  border:solid red 1px;

`

const App = () => {
  return ( 
    <Container>
      <Timeline>
        <Card>
          <UserNameContainer>
            <NameContainer>hi</NameContainer><AliasContainer>hello</AliasContainer>
          </UserNameContainer>
          <MessageContent>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </MessageContent>
        </Card>    
        <Card>
          <UserNameContainer>
            <NameContainer>hi</NameContainer><AliasContainer>hello</AliasContainer>
          </UserNameContainer>
          <MessageContent>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </MessageContent>
        </Card>    
        
      </Timeline>
      <AccountManagement>
        <h1>hi</h1>
      </AccountManagement>
      
      
    </Container>
   );
}
 
export default App;

