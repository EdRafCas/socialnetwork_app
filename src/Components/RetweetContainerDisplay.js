import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer,AliasContainer} from '../Elements/ElementsFormulary';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import '../index.css'
import {CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import LoadingComponent from '../Elements/LoadingComponent';
import RetweetInfo from '../Elements/RetweetInfo';


const RetweetButton=styled.button`
  background:none;
  border-radius:50%;
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  height:2.5rem;
  width:2.5rem;
  gap:5px;
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`
const MessageContainer=styled.div`
  display:grid;
  width:100%;
  grid-template-columns: repeat(1, 1fr 12fr);
 /*  border-bottom:solid ${theme.BorderColor} 1px; */
  /* border-radius:15px; */
  gap:0rem;
  padding-top:0.5rem;
  /* background:black; */
  text-decoration:none;
  z-index:99;
`
const UserNameContainerDisplay =styled.div`
  width:auto;
  padding:0rem;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
 /*  border:solid ${theme.BorderColor} 1px; */
  display:flex;
  flex-direction:row;
  gap:5px;
  position:relative;
  text-decoration:none;
  font-size:1.1rem;
  font-weight:1000;
  color:white;
  overflow:hidden;
  :hover{
    text-decoration:underline;
  }
`
const EmptyDiv =styled.div`
visibility:hidden
display:none;
overflow:hidden;
`

const RetweetContainerDisplay = ({ changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert,currentUserInfo,user, originalId,originalUidUser, update, changeUpdate, retweetUidUser}) => {
    const [loadingRetweets, changeLoadingRetweets] =useState(true);
    const [messageForRetweet, changeMessageForRetweet] = useState('')
    const [userInfoForRetweet, changeUserInfoForRetweet] =useState([{}])

    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', originalId));
            changeMessageForRetweet(document) 
            /*  if(document.exists()){
              console.log(originalId +" existe")
            
            } else{
              console.log(originalId +" no existe")
            } */
            const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", originalUidUser),
              limit(10)
            );

            onSnapshot(consult, (snapshot)=>{
              changeUserInfoForRetweet(snapshot.docs.map((originalUser)=>{
                return {...originalUser.data()}
              }))
            })
            console.log("retweet reload")

          changeLoadingRetweets(false)
      }
      obtainMessage();

      /* By not calling changeLoadingRetweets in useEffect it keeps loading each time we update*/
      },[currentUserInfo, update, originalId, originalUidUser])
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
      <>
        {!loadingRetweets ?
        <>
          {messageForRetweet.exists() ?
          <>
            <RetweetInfo retweetUidUser={retweetUidUser}/>
            <MessageContainer >
              <CardColumns>
                <PortraitContainer>
                  {userInfoForRetweet[0].photoURL ?
                  <img alt="userportrait" src={userInfoForRetweet[0].photoURL}/>
                  :
                  <img alt="userportrait" src={ProfileImage}/>
                  }
                </PortraitContainer>
              </CardColumns>
              <CardColumns rightColumn>
                <UserNameContainer>
                  <UserNameContainerDisplay >
                    {userInfoForRetweet[0].alias}
                  </UserNameContainerDisplay >
                  <AliasContainer>
                    @{userInfoForRetweet[0].alias}
                  </AliasContainer>
                </UserNameContainer>
                <MessageContent>
                  {messageForRetweet.data().message}
                </MessageContent>
                <TimeBar>
                  {formatDate(messageForRetweet.data().date)}
                </TimeBar>
              </CardColumns> 
            </MessageContainer>
            <InteractionBar>
              <IconContainer Reply ><IconComment/></IconContainer>
              <IconContainerCont Retweet>
                <RetweetButton >
                  <IconRetweet/>
                </RetweetButton>
                <CounterContainer>
                  {messageForRetweet.data().retweets.length}
                </CounterContainer>
              </IconContainerCont>
              <IconContainerCont Like>
                  <LikeButton> 
                    <IconLike />                               
                  </LikeButton>
                <CounterContainer>
                  <p>{messageForRetweet.data().likes.length}</p>
                </CounterContainer>
              </IconContainerCont>
            </InteractionBar>
          </>
          :
          <EmptyDiv/>
          }
        </>
        :
        <LoadingComponent/>
        }
      </>
    )
}
 
export default RetweetContainerDisplay;