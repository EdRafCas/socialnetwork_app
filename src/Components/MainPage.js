import React,{useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import Alert from '../Elements/Alert';
import AddMessage from '../firebase/AddMessage';
import { useAuth, AuthContext } from '../Context/AuthContext';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, where, limit, query } from 'firebase/firestore';
import getUnixTime from 'date-fns/getUnixTime';
import Account from './Account';
import MainPageRoutes from './MainPageRoutes';
import MessageBox from './MessageBox';
import {TranslucidBack,CenterBox } from '../Elements/ElementsFormulary';
import EditProfileBox from './EditProfileBox';
import PopUp from '.././Elements/PopUp'

const MainPageContainer = styled.div`
  display:flex;
  position:relative;
  flex-direction:row;
  justify-content: center;
  background:#000;
  width:100%;
  height:100%;
  /* border:solid red 1px; */
`
const ColumnContainer=styled.div`
  width:600px;
  max-width:600px;
  /* width:350px; */
  display:flex;
  flex-direction:column;
`
const ColumnContainer2=styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  /* border:solid blue 1px; */
  overflow:scroll;
  overflow-x: hidden;
`

const MainPage = ({alert, changeAlert, stateAlert, changeStateAlert}) => {
  const {user} =useAuth();
  const [message, messageChange] = useState('');
  const [messageFloating, messageChangeFloating] = useState('');
  const [currentUserInfo, changeCurrentUserInfo] =useState([{}])
  const [loadingUserData, changeLoadingUserData] =useState(true);
  const [showMessageBox, changeShowMessageBox] =useState(false);
  const [showEditProfile, changeShowEditProfile] =useState(false);
  const {popUpAlert} =useContext(AuthContext);
  
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
        if(e.target.name==="messageFloating"){
          messageChangeFloating(e.target.value)
        }

  };

  const addToTimeline = (e) =>{
    e.preventDefault();
    if(message !==""){
     AddMessage({
      message:message,
      uidUser: currentUserInfo[0].uidUser,
      name:currentUserInfo[0].name,
      alias:currentUserInfo[0].alias,
      date: getUnixTime(new Date())
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
    }
    
  };

      return ( 
       <MainPageContainer>
          <PopUp  type={popUpAlert.type} 
                  id={popUpAlert.id}
                  userId={popUpAlert.userId}
                  user={popUpAlert.user}
                  currentUserInfo={popUpAlert.currentUserInfo}
                  originalUidUser={popUpAlert.originalUidUser}
                  originalId={popUpAlert.originalId}
                  originalMessageComments={popUpAlert.originalMessageComments}
                  comments={popUpAlert.comments}
                  retweets={popUpAlert.retweets}
                  bookmarks={popUpAlert.bookmarks}
                  profilePicture={popUpAlert.profilePicture}
                  backgroundPicture={popUpAlert.backgroundPicture}
                  messageForTimeline={popUpAlert.messageForTimeline}
                  messageMessage={popUpAlert.messageMessage}
                  changeStateAlert={changeStateAlert}
                  changeAlert={changeAlert}/>
          <ColumnContainer>
            {!loadingUserData &&
            <Account user={user}
                     currentUserInfo={currentUserInfo}
                     showMessageBox={showMessageBox}
                     changeShowMessageBox={changeShowMessageBox}
            />
            }
          </ColumnContainer>
          <ColumnContainer2>
            {!loadingUserData &&
            <MainPageRoutes user={user}
                            currentUserInfo={currentUserInfo}
                            addToTimeline={addToTimeline}
                            message={message}
                            handleChange={handleChange}
                            showEditProfile={showEditProfile}
                            changeShowEditProfile={changeShowEditProfile}
                            changeAlert={changeAlert}
                            messageAlert={alert.message}
                            stateAlert={stateAlert}
                            changeStateAlert={changeStateAlert}/>
            }
          </ColumnContainer2>
          <Alert  type={alert.type}
                  message={alert.message}
                  stateAlert={stateAlert}
                  changeStateAlert={changeStateAlert}/>
          {showMessageBox ?
          <>
            <TranslucidBack onClick={()=>changeShowMessageBox(!showMessageBox)}/>
            <CenterBox>
              <MessageBox floating
                          messageFloating={messageFloating}
                          messageChangeFloating={messageChangeFloating}
                          user={user}
                          currentUserInfo={currentUserInfo}
                          addToTimeline={addToTimeline}
                          message={message}
                          handleChange={handleChange} />
            </CenterBox>
          </>
          :""
          }
          {showEditProfile ?
          <>
            <TranslucidBack onClick={()=>changeShowEditProfile(!showEditProfile)}/>
            <CenterBox>
              <EditProfileBox user={user}
                              currentUserInfo={currentUserInfo} 
                              changeShowEditProfile={changeShowEditProfile}
                              showEditProfile={showEditProfile}/>
            </CenterBox>
          </>
          :""
          }
       </MainPageContainer> 
      );
}
 
export default MainPage;
