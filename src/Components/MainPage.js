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
const TranslucidBack=styled.div`
position:absolute;
width:100%;
height:100%;
background:${theme.LightGrey};
opacity:50%;
`
const MessageCenterBox=styled.div`
  position:absolute;
  top:20%;
  left:40%;
  /* margin-top:-30rem;
  margin-left:-30rem;
  height:60rem;
  width:60rem;*/
  background:black; 
  border-radius:5%;
`


const MainPage = ({alert, changeAlert, stateAlert, changeStateAlert}) => {
  const {user} =useAuth();
  const [message, messageChange] = useState('');
  const [currentUserInfo, changeCurrentUserInfo] =useState([])
  const [loadingUserData, changeLoadingUserData] =useState(true);
  const [showMessageBox, changeShowMessageBox] =useState(false);
  
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
                              handleChange={handleChange}/>
            }
          </ColumnContainer2>
          <Alert type={alert.type}
                  message={alert.message}
                  stateAlert={stateAlert}
                  changeStateAlert={changeStateAlert}/>
          {showMessageBox ?
          <>
            <TranslucidBack onClick={()=>changeShowMessageBox(!showMessageBox)}/>
            <MessageCenterBox>
            <MessageBox currentUserInfo={currentUserInfo}
                          addToTimeline={addToTimeline}
                          message={message}
                          handleChange={handleChange} />
            </MessageCenterBox>
          </>
          
          :""
          }
          
       </MainPageContainer> 
      );
}
 
export default MainPage;
