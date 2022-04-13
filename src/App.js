import React, {useState} from 'react';
import styled from 'styled-components';
import theme from './Theme.js'
import ProfileImage from './img/profile_img.png'
import theme from './Theme.js';


const MessagesTimeline =[
  {
    id:1,
    profilePicture:ProfileImage,
    username:"Eduardo",
    alias:"Ed",
    message:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing"
  },
  {
    id:2,
    profilePicture:ProfileImage,
    username:"Sara",
    alias:"Mer",
    message:"Lorem Ipsum is simply dummy text "
  }
  
]

const Container = styled.div`
  height: 100vh;
  border:solid black 15px;
  display:grid;
  grid-template-columns: repeat(1, 3fr 2fr);
  justify-content: flex-start;
  position: relative;
  z-index: 100;
  min-height:750px;
  color: #B2B1B9;
`
const Timeline = styled.div`
  
  height:100%;
  display:flex;
  flex-direction:column;
  padding:0rem;
  border:solid ${theme.BorderColor} 1px;
  gap:0rem;
  overflow:scroll;
  overflow-x:hidden;
`
const Card =styled.div`
  
  
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  border-bottom:solid ${theme.BorderColor} 1px;
  /* border-radius:15px; */
  gap:0rem;
  background:black;

`
const CardColumns = styled.div`
  padding: ${(props) => props.rightColumn ? "0": "0.5rem"};
  padding-top: ${(props) => props.rightColumn && "0.5rem"};
  padding-right: ${(props) => props.rightColumn && "0.5rem"};
  padding-bottom: ${(props) => props.rightColumn && "0.5rem"};
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid ${theme.BorderColor} 1px; */
  gap:0.5rem;
`
const PortraitContainer =styled.div`
  border: solid red 1px;
  padding:0;
  width:100%;
  border-radius:50%;
  height:auto;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  width:3rem;
  flex-direction:column;
  overflow:hidden;
  img{
    width:100%;
    
  }
`
const UserNameContainer =styled.div`
  width:100%;
  padding:0rem;
  border-bottom:solid ${theme.BorderColor} 1px;
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
  
`
const NameContainer =styled.h1`
  /* border:solid ${theme.BorderColor} 1px; */
  font-size:1.1rem;
  font-weight:1000;
  color:white;

`
const AliasContainer = styled.p`
  /* border:solid ${theme.BorderColor} 1px; */
  

`
const MessageContent = styled.div`
  width:100%;
  padding:0rem;
  max-height:200px;
  min-height:50px;
  font-size:1rem;
  font-weight:400;
  color:white;
  /* border:solid ${theme.BorderColor} 1px; */
  text-align:justify;
  white-space:normal;
  overflow:hidden;
`
const InteractionBar=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  border:solid ${theme.BorderColor} 1px;
  width:100%;
  

`
const AccountManagement = styled.div`
  height:500px;
  padding:1rem;
  display:flex;
  flex-direction:column;
  align-content:center;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
`
const InputContainer =styled.div`
  display:flex;
  height:3rem;
  justify-content:center;
  flex-direction:row;
  gap:1rem;

`
const LoginForm =styled.form`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
  padding:1rem;

`
const UsernameInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
`
const PasswordInput =styled.input`
  padding-left:5px;
  border-radius:5px;
  width:15rem;
  /* border:solid ${theme.BorderColor} 1px; */
`


const ButtonContainer=styled.div`
  display:flex;
  flex-direction:row;
  
  justify-content:space-evenly;
  width:15rem;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;

`
const Button =styled.button`
  height:2.5rem;
  width:5rem;;

`

const CreateMessageForm =styled.form`
  display:flex;
  flex-direction:column;
  gap:1rem;
`
const HeaderUser =styled.div`
  display:flex;
  flex-direction:row;
  gap:1rem;
`
const MessageUser =styled.textarea`
  padding:1rem;
  font-size:1rem;
  text-align:justify;
  white-space:normal;
  overflow:scroll;
  width:100%;
`
const UserNames =styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:5px;
`


const App = () => {
  const [username, usernameChange] = useState('');
  const [password, passwordChange] = useState('');
  const [message, messageChange] = useState('');
  const [autorizacion, changeAutorizacion] =useState(false);
  const [timeline, changeTimeline] = useState(MessagesTimeline)

  const handleChange = (e) =>{
    if(e.target.name ==="username"){
      usernameChange(e.target.value)
      console.log(username)
    }
    if(e.target.name==="password"){
      passwordChange(e.target.value)
      console.log(password)
    }
    if(e.target.name==="message"){
      messageChange(e.target.value)
      
    }

  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (password ==="123456"){
      changeAutorizacion(!autorizacion);
      console.log(autorizacion)
    }
    if (e.target.name === "sendMesssage"){
      changeAutorizacion(false)
      console.log(autorizacion)
    }
  } 

  const addToTimeline = (e) =>{
    e.preventDefault();
    if(timeline.length>0){
      const newTimeline = [...timeline];
      newTimeline.unshift(
        {
          id:3,
          profilePicture:ProfileImage,
          username:"username",
          alias:"alias",
          message:message
        }
      );
      changeTimeline(newTimeline);
      console.log(timeline)
    }
   
    
    
  }


  return ( 
    <Container>
      <Timeline>
        {timeline.map((Messages, index)=>{
          return(
            <Card key={index}>
            <CardColumns>
              <PortraitContainer>
                <img alt="userportrait" src={Messages.profilePicture}/>
              </PortraitContainer>
              
            </CardColumns>
            <CardColumns rightColumn>
              <UserNameContainer>
                <NameContainer>{Messages.username}</NameContainer><AliasContainer>@{Messages.alias}</AliasContainer>
              </UserNameContainer>
              <MessageContent>
                {Messages.message}
                
              </MessageContent>
              <InteractionBar>
              <div>A</div>
              <div>B</div>
              <div>C</div>
              <div>D</div>
              </InteractionBar>
            </CardColumns>

          
        </Card>  
          )
        })}
              
        
      </Timeline>
      
      <AccountManagement>

        {autorizacion === false ?
          <LoginForm onSubmit={handleSubmit}>
            <InputContainer>
              <UsernameInput
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={username}
                onChange={handleChange}
              />
            </InputContainer>
            <InputContainer>
              <PasswordInput
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={handleChange}/>
            </InputContainer>
            <ButtonContainer>
              <Button type="submit" >Login</Button>
              <Button type="submit" >Login</Button>
            </ButtonContainer>
          
          </LoginForm>
        :
        <CreateMessageForm onSubmit={addToTimeline}>
          <HeaderUser>
            <PortraitContainer>
              <img alt="userportrait" src={ProfileImage}/>
            </PortraitContainer>
            <UserNames><NameContainer>hi</NameContainer><AliasContainer>hello</AliasContainer></UserNames>
          </HeaderUser>
          <MessageUser 
            name="message"
            id="message"
            cols="50"
            rows="10"
            type="text"
            placeholder="Leave us your message here"
            value={message}
            onChange={handleChange}/>
        <Button type="submit" name="sendMesssage">Submit</Button>
        </CreateMessageForm>}

      </AccountManagement>
      
      
    </Container>
   );
}
 
export default App;

