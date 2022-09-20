import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer, AliasContainer} from '../Elements/ElementsFormulary';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import '../index.css'
import {CardColumns, UserNameContainer, UserNameContainerLink,  MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { collection, limit, query, where, onSnapshot} from "firebase/firestore";
import LoadingComponent from '../Elements/LoadingComponent';
import '../index.css'

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
const MessageLink=styled(Link)`
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

const MessageTimelineContainer = ({ id,currentUserInfo, messageUidUser,messageDate, messageMessage, messageRetweets,messageLikes,changeAlert,changeStateAlert, update}) => {
    const [loadingMessageData, changeLoadingMessageData] =useState(true);
    const [messageForTimeline, changeMessageForTimeline] = useState([{}])

    useEffect(()=>{
      const obtainMessageTimeline = async() =>{

        const consult = query(
          collection(db, 'userInfo'),
          where('uidUser', "==", messageUidUser),
          limit(10)
        );
        
        onSnapshot(consult, (snapshot)=>{
          changeMessageForTimeline(snapshot.docs.map((originalUser)=>{
            return {...originalUser.data(), id:originalUser.id}
          }))
        })
        console.log("message loaded")
        changeLoadingMessageData(false)
      }
      
    obtainMessageTimeline();

    /* By not calling changeLoadingMessageData in useEffect it keeps loading each time we update*/
    },[update, currentUserInfo, messageUidUser])
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
  <>
  {!loadingMessageData ?
  <>
    <MessageLink to={`/user/${messageForTimeline[0].alias}/status/${id}`}>
      <CardColumns>
        <PortraitContainer>
          {messageForTimeline[0].photoURL ?
            <img alt="userportrait" src={messageForTimeline[0].photoURL}/>
            :
            <img alt="userportrait" src={ProfileImage}/>
          }
        </PortraitContainer>
      </CardColumns>
      <CardColumns rightColumn>
        <UserNameContainer>
          <UserNameContainerLink to={`/user/${messageForTimeline[0].alias}`}>
            {messageForTimeline[0].name}
          </UserNameContainerLink >
          <AliasContainer>
            @{messageForTimeline[0].alias}
          </AliasContainer>
        </UserNameContainer>
        <MessageContent>
          {messageMessage}
        </MessageContent>
        <TimeBar>
          {formatDate(messageDate)}
        </TimeBar>
      </CardColumns>
    </MessageLink>
    <InteractionBar>
      <IconContainer Reply >
        <IconComment/>
      </IconContainer>
      <IconContainerCont Retweet>
        <RetweetButton >
          <IconRetweet/>
        </RetweetButton>
        <CounterContainer>
          <p>{messageRetweets.length}</p>
        </CounterContainer>
      </IconContainerCont>
      <IconContainerCont Like>
          <LikeButton > 
            <IconLike />                               
          </LikeButton>
        <CounterContainer>
          <p>{messageLikes.length}</p>
        </CounterContainer>
      </IconContainerCont>
    </InteractionBar>
  </>
  :
  <LoadingComponent/>
  }
  </>
    )
}
 
export default MessageTimelineContainer;