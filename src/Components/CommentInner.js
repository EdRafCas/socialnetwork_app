import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import {AliasContainer,PortraitContainer} from '../Elements/ElementsFormulary';
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
import {CardInner, UserNameContainer,UserNameContainerQuoted, UserNameContainerLink, UserNameContainerLinkQuoted, MessageContent, IconContainer, CounterContainer, IconContainerCont, TimeBar,InteractionBar, LikeButton, BarButton,MessageLink} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import RemoveLikeSameUser from '../firebase/RemoveLikeSameUser';
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
  z-index:100;
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`

const EmptyDiv =styled.div`
visibility:hidden
display:none;
overflow:hidden;
`

const EmptyDivColumn=styled.div`
  height:0.5rem;
  width:100%;
  /* border:solid ${theme.BorderColor} 1px; */
`
const StraightLine2=styled.div`
  height:0.5rem;
  width:2px;
  border:solid ${theme.BorderColor} 1px;
  background-color: rgb(51, 54, 57);
`
const CardColumns = styled.div`
  padding: ${(props) => props.rightColumn ? "0": "0.5rem"};
  padding-top:${(props) => props.originalComment ? "0.5rem":
                           props.rightColumn ? "0.5rem": "0"};
  /* padding-right: ${(props) => props.rightColumn && "0.5rem"}; */
  padding-bottom: ${(props) => props.rightColumn && "0.5rem"};
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid ${theme.BorderColor} 1px; */
  /* border-bottom: ${(props) => props.rightColumn && `solid ${theme.BorderColor} 1px`}; */
  gap:0rem;
`



const CommentInner = ({changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert,currentUserInfo,user,previousCommentAlias, originalId,originalUidUser, update, changeUpdate, commentUidUser, commentId, originalMessageComments, TimelineComment}) => {
    const [loadingComment, changeLoadingComment] =useState(true);
    const [messageForComment, changeMessageForComment] = useState('')
    const [userInfoForComment, changeUserInfoForComment] =useState([{}])
    const navigate = useNavigate();

    useEffect(()=>{
      const obtainMessage = async() =>{
            const document = await getDoc(doc(db, 'userTimeline', commentId));
            changeMessageForComment(document) 
           /*  if(document.exists()){
              console.log(commentId +" existe")
            
            } else{
              console.log(commentId +" no existe")
            } */
            const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", commentUidUser),
              limit(10)
            );

            onSnapshot(consult, (snapshot)=>{
              changeUserInfoForComment(snapshot.docs.map((commentUser)=>{
                return {...commentUser.data()}
              }))
            })
            console.log("Comment Inner load")

          changeLoadingComment(false)
      }
      obtainMessage();

      /* By not calling changeLoadingComment in useEffect it keeps loading each time we update*/
      },[currentUserInfo, update, commentId, commentUidUser])
      
      const formatDate = (date) => {
        return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
      };
    
return ( 
      <>
        {!loadingComment ?
        <>
          {messageForComment.exists() ?
          <>
            <MessageLink  Reply onClick={()=> navigate(`/user/${userInfoForComment[0].alias}/status/${commentId}`)}>
              <CardColumns>
                {!TimelineComment ?
                <StraightLine2/>
                :
                <EmptyDivColumn/>
                }
                <PortraitContainer>
                  {userInfoForComment[0].photoURL ?
                  <img alt="userportrait" src={userInfoForComment[0].photoURL}/>
                  :
                  <img alt="userportrait" src={ProfileImage}/>
                  }
                </PortraitContainer>
              </CardColumns>
              <CardColumns rightColumn>
              {TimelineComment ?
                <EmptyDivColumn/>
                :
                ""
                }
                <UserNameContainer>
                  <UserNameContainerLink 
                    onClick={(e)=>{e.stopPropagation();}}
                    to={`/user/${userInfoForComment[0].alias}`}>
                    {userInfoForComment[0].name}
                  </UserNameContainerLink >
                  <AliasContainer>
                    @{userInfoForComment[0].alias}
                  </AliasContainer>
                    <ShowMoreMenu 
                      commentInnerMenu
                      changeAlert={changeAlert}
                      changeStateAlert={changeStateAlert}
                      messageUidUser={messageForComment.data().uidUser} 
                      currentUserInfo={currentUserInfo}
                      id={commentId}
                      originalId={originalId}
                      originalMessageComments={originalMessageComments}
                      originalUidUser={originalUidUser} />
                </UserNameContainer>
                <UserNameContainerQuoted>
                  <p>Replying to</p>
                  <UserNameContainerLinkQuoted to={`/user/${previousCommentAlias}`}>@{previousCommentAlias}</UserNameContainerLinkQuoted >
                </UserNameContainerQuoted>
                <MessageContent>
                <span onClick={(e)=>{e.preventDefault();e.stopPropagation()}} >{messageForComment.data().message}</span>
                </MessageContent>
                {/* <TimeBar>
                  {formatDate(messageForComment.data().date)}
                </TimeBar>
                <TimeBar>
                  <p>{commentId}</p>
                </TimeBar> */}
                <InteractionBar>
                <IconContainerCont Reply >
                    <BarButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      receiveNotification({
                      notification:"comment",
                      messageMessage:messageForComment.data().message,
                      messageForTimeline:userInfoForComment,
                      id:commentId,
                      comments:messageForComment.data().comments,
                      retweets:messageForComment.data().retweets,
                      originalUidUser:messageForComment.data().uidUser,
                      user,
                      currentUserInfo,
                      changeShowPopUp:changeShowPopUp, 
                      changePopUpAlert:changePopUpAlert,
                      update,
                      changeUpdate})}}>
                      <IconComment/>
                    </BarButton>
                    <CounterContainer Reply>
                      <p>{messageForComment.data().comments.length}</p>
                    </CounterContainer>
                  </IconContainerCont>
                <IconContainerCont Retweet>
                  {!messageForComment.data().retweets.includes(currentUserInfo[0].uidUser)?
                    <RetweetButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      receiveNotification({
                      notification:"retweet",
                      id:commentId,
                      retweets:messageForComment.data().retweets, 
                      originalUidUser:messageForComment.data().uidUser, 
                      user, 
                      currentUserInfo, 
                      changeShowPopUp, 
                      changePopUpAlert})}}>
                      <IconRetweet/>
                    </RetweetButton>
                    :
                    <>
                    {messageForComment.data().uidUser ===currentUserInfo[0].uidUser ?
                    <RetweetButton onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      RemoveRetweetSameUser({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalRetweets:messageForComment.data().retweets,
                      currentMessageId:commentId,
                      update,
                      changeUpdate})}}>
                      <IconRetweetColor/>
                    </RetweetButton>
                      :
                      <RetweetButton onClick={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        RemoveRetweet({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalRetweets:messageForComment.data().retweets,
                        currentMessageId:commentId,
                        commentUidUser:messageForComment.data().uidUser,
                        update,
                        changeUpdate})}}>
                        <IconRetweetColor/>
                      </RetweetButton>
                      }
                    </>
                  }
                  <CounterContainer>
                    {messageForComment.data().retweets.length}
                  </CounterContainer>
                </IconContainerCont>
                <IconContainerCont Like>
                  {!messageForComment.data().likes.includes(currentUserInfo[0].uidUser)?
                    <LikeButton  onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    AddLike({
                    update,
                    changeUpdate,
                    originalUidUser:messageForComment.data().uidUser,
                    id:commentId,
                    uidUser:currentUserInfo[0].uidUser,
                    likes:messageForComment.data().likes})}}> 
                      <IconLike />                               
                    </LikeButton>
                    :
                    <>
                    {
                      messageForComment.data().uidUser ===currentUserInfo[0].uidUser ?
                    <LikeButton  onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      RemoveLikeSameUser({
                      currentUidUser:currentUserInfo[0].uidUser,
                      originalLikes:messageForComment.data().likes,
                      originalMessageId:commentId,
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
                      originalLikes:messageForComment.data().likes,
                      originalMessageId:commentId,
                      likeUidUser:commentUidUser,
                      newId:commentId,
                      update,
                      changeUpdate})}}> 
                      <IconLikeColor />                               
                    </LikeButton>
                  }
                  </>
                  }
                  <CounterContainer>
                    <p>{messageForComment.data().likes.length}</p>
                  </CounterContainer>
                </IconContainerCont>
              </InteractionBar>
              </CardColumns> 
            </MessageLink>
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
 
export default CommentInner;