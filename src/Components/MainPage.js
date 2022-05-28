import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Alert from '../Elements/Alert';
import AddMessage from '../firebase/AddMessage';
import theme from '../Theme';
import { useAuth } from '../Context/AuthContext';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, where, limit, query } from 'firebase/firestore';
import getUnixTime from 'date-fns/getUnixTime';
import Account from './Account';
import MainPageRoutes from './MainPageRoutes';
import MessageBox from './MessageBox';
import {TranslucidBack,CenterBox } from '../Elements/ElementsFormulary';
import EditProfileBox from './EditProfileBox';


const MainPageContainer = styled.div`
  display:flex;
  position:relative;
  flex-direction:row;
  justify-content: center;
  background:#000;
  width:100%;
  height:100%;
  border:solid red 1px;
`
const ColumnContainer=styled.div`
  max-width:40%;
  display:flex;
  flex-direction:column;
`
const ColumnContainer2=styled.div`
  width:820px;
  display:flex;
  flex-direction:column;
`




const MainPage = ({alert, changeAlert, stateAlert, changeStateAlert}) => {
  const {user} =useAuth();
  const [message, messageChange] = useState('');
  const [currentUserInfo, changeCurrentUserInfo] =useState([])
  const [loadingUserData, changeLoadingUserData] =useState(true);
  const [showMessageBox, changeShowMessageBox] =useState(false);
  const [showEditProfile, changeShowEditProfile] =useState(false);
  
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
    if(message !==""){
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
    }
    
  };

      return ( 
       <MainPageContainer>
          <ColumnContainer>
            {!loadingUserData &&
            <Account currentUserInfo={currentUserInfo}
                     showMessageBox={showMessageBox}
                     changeShowMessageBox={changeShowMessageBox}
            
            />
            }
          </ColumnContainer>

          <ColumnContainer2>
            {!loadingUserData &&
              <MainPageRoutes currentUserInfo={currentUserInfo}
                              addToTimeline={addToTimeline}
                              message={message}
                              handleChange={handleChange}
                              showEditProfile={showEditProfile}
                              changeShowEditProfile={changeShowEditProfile}/>
            }
          </ColumnContainer2>
          <Alert type={alert.type}
                  message={alert.message}
                  stateAlert={stateAlert}
                  changeStateAlert={changeStateAlert}/>
          {showMessageBox ?
          <>
            <TranslucidBack onClick={()=>changeShowMessageBox(!showMessageBox)}/>
            <CenterBox>
            <MessageBox currentUserInfo={currentUserInfo}
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
              <EditProfileBox currentUserInfo={currentUserInfo} />
            </CenterBox>
                
          </>
          
          :""
          }
          
          
       </MainPageContainer> 
      );
}
 
export default MainPage;
