import React,{useState, useEffect} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import {AliasContainer, PortraitContainer} from '../Elements/ElementsFormulary';
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
import {CardInner,MessageLink, UserNameContainer, UserNameContainerLink, MessageContent, InteractionBar, CounterContainer, IconContainerCont,  LikeButton, BarButton} from '../Elements/ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import RemoveLikeSameUser from '../firebase/RemoveLikeSameUser';
import CommentInner from './CommentInner';
import CommentInfoTimeline from '../Elements/CommentInfoTimeline';



const EmptyDiv =styled.div`
visibility:hidden
display:none;
overflow:hidden;
`
const StraightLine=styled.div`
  height:90%;
  width:2px;
  border:solid ${theme.BorderColor} 1px;
  background-color: rgb(51, 54, 57);
`
const EmptyDivColumn=styled.div`
  height:0.5rem;
  width:100%;
  /* border:solid ${theme.BorderColor} 1px; */
`

const CardColumns = styled.div`
  padding: ${(props) => props.rightColumn ? "0": "0.5rem"};
  padding-top:0;
  /* padding-right: ${(props) => props.rightColumn && "0.5rem"}; */
  padding-bottom: 0;
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid ${theme.BorderColor} 1px; */
  /* border-bottom: ${(props) => props.rightColumn && `solid ${theme.BorderColor} 1px`}; */
  gap:0rem;
`

const DeletedMessage = styled.div`
padding: 1rem 0.5rem;
margin: 0.5rem 0.5rem;
border-radius:15px;
background-color: rgb(22, 24, 28);
`
const DeletedCommentLink =styled(Link)`
  padding:0.5rem 1rem;
  width: fit-content;
  /* border-bottom:solid ${theme.BorderColor} 1px; */
  /* border:solid ${theme.BorderColor} 1px; */
  gap:5px;
  color:${theme.BlueReply};
  text-decoration:none;
  font-weight:1000;
  overflow:hidden;
  z-index:81;
  :hover{
    text-decoration:underline;
  }
`


const CommentMainTimeline = ({ changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert,currentUserInfo,user, originalId,originalUidUser, update, changeUpdate, commentUidUser,commentId}) => {
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
            console.log("Original Comment Load")

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
          <CardInner >
            <MessageLink  onClick={()=> navigate(`/user/${userInfoForQuote[0].alias}/status/${originalId}`)}>
              <CardColumns originalComment>
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
                <UserNameContainer>
                  <UserNameContainerLink 
                    onClick={(e)=>{e.stopPropagation();}}
                    to={`/user/${userInfoForQuote[0].alias}`}>
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
                <MessageContent>
                <span onClick={(e)=>{e.preventDefault();e.stopPropagation()}} >{quotedMessage.data().message}</span>
                </MessageContent>
                {/* <TimeBar>
                  {formatDate(quotedMessage.data().date)}
                </TimeBar>
                <TimeBar>
                  first commentId: {quotedMessage.data().comments[0].commentId}
                </TimeBar>
                <TimeBar>
                  originalID {originalId}
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
            <CommentInner
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
              changeStateAlert={changeStateAlert}
            />
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
            <CommentInner
                previousCommentAlias={userInfoForQuote[0].alias}
                currentUserInfo={currentUserInfo}
                commentId={commentId}
                originalId={originalId}
                originalMessageComments={[]}
                commentUidUser={commentUidUser}
                changeShowPopUp={changeShowPopUp}
                changePopUpAlert={changePopUpAlert}
                user={user}
                update={update}
                changeUpdate={changeUpdate}
                changeAlert={changeAlert} 
                changeStateAlert={changeStateAlert}
              />
          </CardInner>
          }
        </>
        :
        <LoadingComponent/>
        }
      </>
    )
}
 
export default CommentMainTimeline;