import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
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
import {CardInner, UserNameContainer, UserNameContainerLink, MessageContent, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import RemoveLikeSameUser from '../firebase/RemoveLikeSameUser';
import RetweetInfo from '../Elements/RetweetInfo';
import CommentInner from './CommentInner';


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

const MessageLink=styled(Link)`
  display:grid;
  width:100%;
  grid-template-columns: repeat(1, 1fr 12fr);
  /* border:solid ${theme.BorderColor} 1px; */
  gap:0rem;
  padding-top:${(props) => props.originalComment ? "0rem": "0"};
  /* background:black; */
  text-decoration:none;
  z-index:80;
  :hover{
    pointer-events: auto;
    background:rgba(255,255,255, 0.03);
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
  border:solid ${theme.BorderColor} 1px;
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
  border: solid red 1px;
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
`

const CommentStatus = ({ changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert,currentUserInfo,user, originalId,originalUidUser, update, changeUpdate, commentUidUser,commentId}) => {
    const [loadingQuoted, changeLoadingQuoted] =useState(true);
    const [quotedMessage, changeQuotedMessage] = useState('')
    const [userInfoForQuote, changeUserInfoForQuote] =useState([{}])

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
            <MessageLink  to={`/user/${userInfoForQuote[0].alias}/status/${originalId}`}>
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
                <MessageContent>
                  <p>{quotedMessage.data().message}</p>
                </MessageContent>
                <TimeBar>
                  {formatDate(quotedMessage.data().date)}
                </TimeBar>
                <TimeBar>
                  {quotedMessage.data().comments[0].commentId}
                </TimeBar>
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
            {/* <CommentInner
              previousCommentAlias={userInfoForQuote[0].alias}
              currentUserInfo={currentUserInfo}
              commentId={commentId}
              originalId={originalId}
              originalMessageComments={quotedMessage.data().comments}
              commentUidUser={commentUidUser}
              changeShowPopUp={changeShowPopUp}
              changePopUpAlert={changePopUpAlert}
              user={user}
              update={update}
              changeUpdate={changeUpdate}
              changeAlert={changeAlert} 
              changeStateAlert={changeStateAlert}/> */}
          </CardInner>
          :
          <EmptyDiv>
            <p>This Message was deleted</p>
          </EmptyDiv>
          }
        </>
        :
        <LoadingComponent/>
        }
      </>
    )
}
 
export default CommentStatus;