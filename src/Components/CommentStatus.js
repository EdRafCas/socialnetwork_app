import React,{useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import {AliasContainer} from '../Elements/ElementsFormulary';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import AddLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import '../index.css'
import {UserNameContainer, UserNameContainerLink, CounterContainer, IconContainerCont, TimeBar, LikeButton, DeletedMessage, DeletedCommentLink} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import RemoveLikeSameUser from '../firebase/RemoveLikeSameUser';
import CommentInfoTimeline from '../Elements/CommentInfoTimeline';

const BarButton=styled.button`
  background:none;
  border-radius:50%;
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  height:2.5rem;
  width:2.5rem;
  gap:5px;
  z-index:100;
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`


const MessageLink=styled.div`
  width:100%;
  display:grid;
  grid-template-columns: repeat(1, 1fr 12fr);
  gap:0rem;
  padding-top:${(props) => props.originalComment ? "0rem": "0"};
  z-index:2;
  /* text-decoration:none;
  -webkit-user-select: text;
  -moz-select: text;
  -ms-select: text;
  user-select: text; */
  :hover{
    /* cursor:pointer;
    background:rgba(255,255,255, 0.03); */
  }
`

const EmptyDiv =styled.div`
visibility:hidden
display:none;
overflow:hidden;
`
const StraightLine=styled.div`
  height:90%;
  width:2px;
  border-top:none;
  border-bottom:none;
  border:solid ${theme.BorderColor} 1px;
  background-color: rgb(51, 54, 57);
`
const EmptyDivColumn=styled.div`
  height:0.5rem;
  width:100%;
  /* border:solid ${theme.BorderColor} 1px; */
`
const InteractionBar=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  /* border:solid ${theme.BorderColor} 1px; */
  width:100%;
  max-height:6rem;
  padding-top:0.5rem;
  padding-bottom:0.5rem;
  z-index:98;
`
const CardColumns = styled.div`
  padding: ${(props) => props.rightColumn ? "0": "0.5rem"};
  padding-top:${(props) => props.originalComment ? "0.5rem":
                           props.rightColumn ? "0.5rem": "0"};
  /* padding-right: ${(props) => props.rightColumn && "0.5rem"}; */
  padding-bottom: 0;
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid ${theme.BorderColor} 1px; */
  /* border-bottom: ${(props) => props.rightColumn && `solid ${theme.BorderColor} 1px`}; */
  gap:0.5rem;
`
const PortraitContainer =styled.div`
  /* border: solid red 1px; */
  padding:0;
  width:100%;
  border-radius:50%;
  height:auto;
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:3rem;
  min-height:3rem;
  height:3rem;
  flex-direction:column;
  overflow:hidden;
  img{
    width:100%;
  }
  @media(max-width: 760px){ 
    width:2rem;
    min-height:2rem;
    height:2rem;
  }
`
const CardInner =styled.div`
  max-width:700px;
  position:relative;
  display:flex;
  flex-direction:column;
  border:none;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
  /* border-top:solid ${theme.BorderColor} 1px; */
  border-right:solid ${theme.BorderColor} 1px;
  gap:0rem;
  padding-top:0rem;
  z-index:1;
  :hover{
    pointer-events: auto;
    cursor:pointer;
    background:rgba(255,255,255, 0.03);
  }
`

const MessageContent = styled.div`
  width:100%;
  padding:0rem;
  max-height:150px;
  min-height:80px;
  font-size:1rem;
  font-weight:400;
  color:white;
  /* border:solid ${theme.BorderColor} 1px; */
  text-align:justify;
  white-space:normal;
  overflow:hidden;
  z-index:101;
  span{
    display: inline-block;
    /* border:solid ${theme.BorderColor} 1px; */
    user-select: text;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    white-space:pre-wrap;}
`

const CommentStatus = ({ changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert,currentUserInfo,user, originalId,originalUidUser, update, changeUpdate, commentUidUser,commentId}) => {
    const [loadingQuoted, changeLoadingQuoted] =useState(true);
    const [quotedMessage, changeQuotedMessage] = useState('')
    const [userInfoForQuote, changeUserInfoForQuote] =useState([{}])
    const navigate = useNavigate();

    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', originalId));
            changeQuotedMessage(document) 
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
              changeUserInfoForQuote(snapshot.docs.map((originalUser)=>{
                return {...originalUser.data()}
              }))
            })
            console.log("retweet reload")

          changeLoadingQuoted(false)
      }
      obtainMessage();

      /* By not calling changeLoadingQuoted in useEffect it keeps loading each time we update*/
      },[currentUserInfo, update, originalId, originalUidUser])
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
      <>
        {!loadingQuoted ?
        <>
          {quotedMessage.exists() ?
          <CardInner>
            <MessageLink onClick={()=> navigate(`/user/${userInfoForQuote[0].alias}/status/${originalId}`)}>
              <CardColumns originalComment>
                <EmptyDivColumn/>
                  <PortraitContainer>
                    {userInfoForQuote[0].photoURL ?
                    <img alt="userportrait" src={userInfoForQuote[0].photoURL}/>
                    :
                    <img alt="userportrait" src={ProfileImage}/>
                    }
                  </PortraitContainer>
                <StraightLine/>
              </CardColumns>
              <CardColumns rightColumn>
                <EmptyDivColumn/>
                <UserNameContainer>
                  <UserNameContainerLink to={`/user/${userInfoForQuote[0].alias}`}>
                    {userInfoForQuote[0].name}
                  </UserNameContainerLink >
                  <AliasContainer>
                    @{userInfoForQuote[0].alias}
                  </AliasContainer>
                    <ShowMoreMenu 
                      changeAlert={changeAlert}
                      changeStateAlert={changeStateAlert}
                      messageUidUser={quotedMessage.data().uidUser} 
                      currentUserInfo={currentUserInfo}
                      id={originalId}
                      originalMessageComments={quotedMessage.data().comments} />
                </UserNameContainer>
                <CommentInfoTimeline
                originalUidUser={quotedMessage.data().originalUidUser}
                currentUserInfo={currentUserInfo}
                originalId={originalId}/>
                <MessageContent >
                  <span onClick={(e)=>{e.preventDefault();e.stopPropagation()}} >{quotedMessage.data().message}</span>
                </MessageContent>
                <TimeBar>
                  {formatDate(quotedMessage.data().date)}
                </TimeBar>
                 {/*<TimeBar>
                  {originalId}
                </TimeBar> */}
                <InteractionBar>
                  <IconContainerCont Reply >
                    <BarButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      receiveNotification({
                      notification:"comment",
                      messageMessage:quotedMessage.data().message,
                      messageForTimeline:userInfoForQuote,
                      id:originalId,
                      comments:quotedMessage.data().comments,
                      retweets:quotedMessage.data().retweets,
                      originalUidUser:quotedMessage.data().uidUser,
                      user,
                      currentUserInfo,
                      changeShowPopUp:changeShowPopUp, 
                      changePopUpAlert:changePopUpAlert,
                      update,
                      changeUpdate})}}>
                      <IconComment/>
                    </BarButton>
                    <CounterContainer Reply>
                      <p>{quotedMessage.data().comments.length}</p>
                    </CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont Retweet>
                    {!quotedMessage.data().retweets.includes(currentUserInfo[0].uidUser)?
                    <BarButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      receiveNotification({
                      notification:"retweet",
                      id:originalId,
                      retweets:quotedMessage.data().retweets, 
                      originalUidUser:quotedMessage.data().uidUser, 
                      user, 
                      currentUserInfo, 
                      changeShowPopUp, 
                      changePopUpAlert
                    })}}>
                      <IconRetweet/>
                    </BarButton>
                    :
                    <>
                    {quotedMessage.data().uidUser ===currentUserInfo[0].uidUser ?
                    <BarButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      RemoveRetweetSameUser({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:quotedMessage.data().retweets,
                      currentMessageId:originalId,
                      update,
                      changeUpdate})}}>
                      <IconRetweetColor/>
                    </BarButton>
                      :
                    <BarButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      RemoveRetweet({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:quotedMessage.data().retweets,
                      currentMessageId:originalId,
                      commentUidUser:quotedMessage.data().uidUser,
                      update,
                      changeUpdate})}}>
                      <IconRetweetColor/>
                    </BarButton>
                        }
                    </>
                    }
                    <CounterContainer>
                      <p>{quotedMessage.data().retweets.length}</p>
                    </CounterContainer>
                  </IconContainerCont>
                  <IconContainerCont Like>
                    {!quotedMessage.data().likes.includes(currentUserInfo[0].uidUser)?
                      <LikeButton  onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      AddLike({
                      update,
                      changeUpdate,
                      originalUidUser:quotedMessage.data().uidUser,
                      id:originalId,
                      uidUser:currentUserInfo[0].uidUser,
                      likes:quotedMessage.data().likes})}}> 
                        <IconLike />                               
                      </LikeButton>
                      :
                      <>
                      {
                        quotedMessage.data().uidUser ===currentUserInfo[0].uidUser ?
                      <LikeButton  onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveLikeSameUser({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalLikes:quotedMessage.data().likes,
                        originalMessageId:originalId,
                        update,
                        changeUpdate})}}> 
                        <IconLikeColor />                               
                      </LikeButton>
                        :
                      <LikeButton  onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveLike({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalLikes:quotedMessage.data().likes,
                        originalMessageId:originalId,
                        likeUidUser:originalUidUser,
                        newId:commentId,
                        update,
                        changeUpdate})}}> 
                        <IconLikeColor />                               
                      </LikeButton>
                    }
                    </>
                    }
                    <CounterContainer>
                      <p>{quotedMessage.data().likes.length}</p>
                    </CounterContainer>
                  </IconContainerCont>
                </InteractionBar>
              </CardColumns> 
            </MessageLink>
          </CardInner>
          :
          <CardInner>
          <DeletedCommentLink 
                  onClick={(e)=>{e.stopPropagation();}}
                  to={`/user/${userInfoForQuote[0].alias}/status/${originalId}`}>
                  socialnetwork-app-aca27.web.app/user/{userInfoForQuote[0].alias}...
          </DeletedCommentLink>
          <DeletedMessage>
               This message was deleted by his author
          </DeletedMessage>
          </CardInner>
          }
        </>
        :
        <LoadingComponent/>
        }
      </>
    )
}
 
export default CommentStatus;