import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Button, PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_img.png'
import Alert from '../Elements/Alert';
import AddMessage from '../firebase/AddMessage';
import { useAuth } from '../Context/AuthContext';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, where, limit, query } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import getUnixTime from 'date-fns/getUnixTime';
import Timeline from './Timeline';
import Account from './Account';


const MainPageContainer = styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content: center;
  background:#000;
  border:solid red 1px;
`
const ColumnContainer=styled.div`
  max-width:40%;
  display:flex;
  flex-direction:column;
`
const MessageBox = styled.div`
  width:100%;
  /* height:500px; */
  padding:1rem 1rem;
  display:flex;
  flex-direction:column;
  align-content:center;
  gap:1rem;
  border:solid ${theme.BorderColor} 1px;
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


const UserProfile = ({alert, changeAlert, stateAlert, changeStateAlert}) => {
  const {route} =useParams();
  const {user} =useAuth();
  const [message, messageChange] = useState('');
  const [currentUserInfo, changeCurrentUserInfo] =useState([])
  const [loadingUserData, changeLoadingUserData] =useState(true);
  
  useEffect(()=>{
        const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", user.uid),
              limit(10)
        );
        const unsuscribe = onSnapshot(consult, (snapshot)=>{
              changeCurrentUserInfo(snapshot.docs.map((userData)=>{
                    /* console.log(userData.data()) */
                    return{...userData.data(), id:userData.id}
              }))
              changeLoadingUserData(false);
        })
        console.log(user)

        return unsuscribe;
  }, [])


  
  const handleChange = (e) =>{
        if(e.target.name==="message"){
          messageChange(e.target.value)
        }
  };

  const addToTimeline = (e) =>{
    e.preventDefault();
    AddMessage({
      message:message,
      uidUser: currentUserInfo[0].uidUser,
      name:currentUserInfo[0].name,
      lastname: currentUserInfo[0].lastname,
      alias:currentUserInfo[0].alias,
      date: getUnixTime(new Date()),
      likes: [],
      retweets: []
      
    })
    .then(()=>{
      messageChange("");
      changeStateAlert(true);
      changeAlert({
            type:'success',
            message: 'Your message was sent successfully'
      })
    })
    .catch((error)=>{
      changeStateAlert(true);
      changeAlert({
            type:'error',
            message: 'An error ocurred while sending your message'
      })
    })
  };

      return ( 
       <MainPageContainer>
          <ColumnContainer>
            {!loadingUserData &&
            <Account currentUserInfo={currentUserInfo} />
            }
          </ColumnContainer>

          <ColumnContainer>
            {!loadingUserData &&
            <>
              <MessageBox>
                <CreateMessageForm onSubmit={addToTimeline}>
                  <HeaderUser>
                    <PortraitContainer>
                      <img alt="userportrait" src={ProfileImage}/>
                    </PortraitContainer>
                    <UserNames>
                      <NameContainer>{currentUserInfo[0].name}</NameContainer>
                      <AliasContainer>@{currentUserInfo[0].alias}</AliasContainer>
                    </UserNames>
                  </HeaderUser>
                  <MessageUser 
                    name="message"
                    id="message"
                    cols="50"
                    rows="3"
                    maxlength="5"
                    type="text"
                    placeholder="Leave us your message here"
                    value={message}
                    onChange={handleChange}/>
                  <Button type="submit" name="sendMesssage">Submit</Button>
                </CreateMessageForm>
              </MessageBox>
              <Timeline currentUserInfo={currentUserInfo}/>
            </>
            }
          </ColumnContainer>
          <Alert type={alert.type}
                  message={alert.message}
                  stateAlert={stateAlert}
                  changeStateAlert={changeStateAlert}/>
       </MainPageContainer> 
      );
}
 
export default UserProfile;
