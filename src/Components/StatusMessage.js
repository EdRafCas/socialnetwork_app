import React, {useContext, useState, useEffect} from 'react';
import {useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";
import '../index.css'
import { AuthContext } from '../Context/AuthContext';
import {Card,UserNameContainer, UserNameContainerLink,IconContainer,IconContainerCont, TimeBar, LikeButton} from '../Elements/ElementsTimeline'
import {AliasContainer} from '../Elements/ElementsFormulary';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import {ReactComponent as IconReturnArrow} from '../img/return_arrow_icon.svg';
import AddLike from '../firebase/AddLike';
import RemoveLike from '../firebase/RemoveLike';
import RemoveRetweet from '../firebase/RemoveRetweet';
import RemoveRetweetSameUser from '../firebase/RemoveRetweetSameUser';
import receiveNotification from './ReceiveNotification';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import LoadingComponent from '../Elements/LoadingComponent';
import {useNavigate} from 'react-router-dom';
import RemoveLikeSameUser from '../firebase/RemoveLikeSameUser';
import CommentInner from './CommentInner';
import CommentInfo from '../Elements/CommentInfo';
import CommentStatus from './CommentStatus';



const CardMessage =styled.div`
      display:flex;
      flex-direction:column;
      /* border:solid ${theme.BorderColor} 1px; */
      /* border-radius:15px; */
      gap:0rem;
      padding-top:0rem;
      z-index:100;
      :hover{
      background:rgba(255,255,255, 0.03);
      }
`
const TimelineUserContainer = styled.div`
      height:100%;
      display:flex;
      flex-direction:column;
      padding:0rem;
      border:solid ${theme.BorderColor} 1px;
      gap:0rem;
      overflow:scroll;
      overflow-x:hidden;
      -ms-overflow-style: none;
      scrollbar-width: none;
`
const TimelineCommentContainer = styled.div`
      height:100%;
      display:flex;
      flex-direction:column;
      padding:0rem;
      /* border:solid ${theme.BorderColor} 1px; */
      border:none;
      gap:0rem;
      overflow:scroll;
      overflow-x:hidden;
      -ms-overflow-style: none;
      scrollbar-width: none;
`
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
const PortraitContainerMessage =styled.div`
      border: solid red 1px;
      padding:0;
      border-radius:50%;
      width:4rem;
      height:4rem;
      display:flex;
      justify-content:center;
      align-items:center;
      margin:0;
      overflow:hidden;
      img{
      width:100%;
      }
`
const CardRowsMessage = styled.div`
      display:grid;
      width:100%;
      grid-template-columns: repeat(1, 1fr 12fr);
      justify-content:center;
      /* border:solid red 1px; */
`
const CardColumnMessage = styled.div`
      padding: 1rem 0.5rem 0rem 0.5rem;
      margin:0;
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-items:center;
      /* border:solid ${theme.BorderColor} 1px; */
      gap:0.5rem;
`
const UserNameContainerMessage =styled.div`
      width:100%;
      height:4.5rem;
      padding:0rem;
      position:relative;
      /* border-bottom:solid ${theme.BorderColor} 1px; */
      /* border:solid red 1px; */
      display:flex;
      flex-direction:column;
      justify-content:center;
      gap:5px;
`
const InteractionBarMessage=styled.div`
      display:flex;
      flex-direction:row;
      justify-content:space-around;
      border-top:solid ${theme.BorderColor} 1px;
      border-bottom:solid ${theme.BorderColor} 1px;
      width:100%;
      max-height:6rem;
      padding-top:0.5rem;
      padding-bottom:0.5rem;
`
const MessageContentBig = styled.div`
      width:100%;
      padding:0rem;
      max-height:400px;
      min-height:100px;

      font-weight:400;
      color:white;
      /* border:solid ${theme.BorderColor} 1px; */
      text-align:justify;
      white-space:normal;
      overflow:hidden;
      p{
            font-size:1.5rem;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
            white-space:pre-wrap;}
`

const CounterBar=styled.div`
      display:flex;
      flex-direction:row;
      justify-content:flex-start;
      border-top:solid ${theme.BorderColor} 1px;
      /* border-bottom:solid ${theme.BorderColor} 1px; */
      width:100%;
      max-height:6rem;
      padding-top:0.5rem;
      padding-bottom:0.5rem;
      gap:3rem;
`
const CounterBarContainer=styled.div`
      display:flex;
      flex-direction:row;
      align-items:center;
      /* border:1px solid white; */
      fill:currentcolor;
      width:auto;
      height:auto;
      padding-left:5px;
      background:none;
      color:${theme.Text};
      :hover{
      }
      :active{
      background:white;
      fill:black;
      }
      p{
      font-size:1.2rem
      }
  `
const IconContainerArrow=styled.div`
      border-radius:50%;
      display:flex;
      justify-content:center;
      align-items:center;
      height:3rem;
      width:3rem;
      /* border:1px solid white; */
      fill:currentcolor;
      :hover{
            background:${(props)=> props.Reply ? `${theme.BlueReplyBackground}`
                  : props.Like ? `${theme.PinkLikeBackground}` 
                  : props.Retweet ? `${theme.GreenRetweetBackground}` 
                  : "auto"};
            svg{
            /* max-height:3rem; */
                  stroke: ${(props)=> props.Reply ? `${theme.BlueReply}`
                        : props.Like ? `${theme.PinkLike}` 
                        : props.Retweet ? `${theme.GreenRetweet}` 
                        : "auto"};
            }
      }
      svg{
            max-height:1.5rem;
            stroke: ${theme.BorderColor};
      }
      :active{
            background:white;;
            fill:black;
            stroke:#000;
      }
`
const StraightLine2=styled.div`
  height:0.5rem;
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
  padding-top:${(props) => props.originalComment ? "0.5rem":
                           props.rightColumn ? "0": "0"};
  /* padding-right: ${(props) => props.rightColumn && "0.5rem"}; */
  padding-bottom: 0;
  margin:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  /* border:solid blue 1px; */
  /* border-bottom: ${(props) => props.rightColumn && `solid ${theme.BorderColor} 1px`}; */
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
`

const StatusMessage = ({changeAlert, stateAlert, changeStateAlert, user, currentUserInfo}) => {
      const {alias} =useParams();
      const {id} =useParams();
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);
      const [userByAliasId, changeUserByAliasId] = useState([{}])
      const [infoForMessage, changeInfoForMessage] = useState([{}])
      const [loadingMessage, changeLoadingMessage] =useState(true)
      const {update} =useContext(AuthContext);
      const {changeUpdate} =useContext(AuthContext);
      const navigate = useNavigate();
      const [sortedArray, changeSortedArray] = useState([{}])


      useEffect(()=>{
            const ObtainMessageById = async() =>{
                  const document = await getDoc(doc(db, 'userTimeline', id));
                  changeInfoForMessage(document)
                  
                  changeSortedArray(document.data().comments.sort(function(a, b) {
                        return parseFloat(b.date) - parseFloat(a.date);
                    }))

                  /* changeSortedArray(document.data().comments[0]) */
                  const consult = query(
                        collection(db, 'userInfo'),
                        where('alias', "==", alias),
                        limit(10)
                      );
                      
                  onSnapshot(consult, (snapshot)=>{
                        changeUserByAliasId(snapshot.docs.map((userAlias)=>{
                              return {...userAlias.data(), id:userAlias.id}
                        }))
                  })
                  changeLoadingMessage(false)
            }
            ObtainMessageById();
      },[currentUserInfo, alias, update, id])

      const formatDate = (date) => {
            return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
          };
     


      return ( 
            <>
            {!loadingMessage ?  
            <>
            <TimelineUserContainer className='timeline-user'>
                  <IconContainerArrow onClick={() => navigate(-1)} Reply >
                        <IconReturnArrow/>
                  </IconContainerArrow>  
            <TimelineCommentContainer className='timeline-user'>
                  {infoForMessage.data().type === "comment"?
                  <CommentStatus
                  update={update}
                  changeUpdate={changeUpdate} 
                  currentUserInfo={currentUserInfo} 
                  originalId={infoForMessage.data().originalId} 
                  originalUidUser={infoForMessage.data().originalUidUser}
                  commentId={infoForMessage.data().id} 
                  commentUidUser={userByAliasId[0].uidUser}
                  changeShowPopUp={changeShowPopUp}
                  changePopUpAlert={changePopUpAlert}
                  user={user}
                  changeAlert={changeAlert} 
                  changeStateAlert={changeStateAlert}/>
                  :
                  ""}
                  <CardMessage >
                        <CardRowsMessage>
                              <CardColumns>
                                    {infoForMessage.data().type === "comment"?
                                    <StraightLine2/>
                                    :
                                    <EmptyDivColumn/>
                                    }
                                    <PortraitContainer>
                                    {userByAliasId[0].photoURL ?
                                    <img alt="userportrait" src={userByAliasId[0].photoURL}/>
                                    :
                                    <img alt="userportrait" src={ProfileImage}/>
                                    }
                                    </PortraitContainer>      
                              </CardColumns>
                              <CardColumns rightColumn>
                                    {infoForMessage.data().type === "comment"?
                                    <EmptyDivColumn/>
                                    :
                                    ""
                                    }
                                    <UserNameContainerMessage>
                                          <UserNameContainerLink to={`/user/${userByAliasId[0].alias}`}>
                                          {userByAliasId[0].name}
                                          </UserNameContainerLink >
                                          <AliasContainer>
                                          @{userByAliasId[0].alias}
                                          </AliasContainer> 
                                          <ShowMoreMenu 
                                                changeAlert={changeAlert}
                                                changeStateAlert={changeStateAlert}
                                                messageUidUser={infoForMessage.data().uidUser} 
                                                currentUserInfo={currentUserInfo}
                                                id={id} />  
                                    </UserNameContainerMessage>   
                              </CardColumns>
                        </CardRowsMessage>
                        <CardColumnMessage rightColumn>
                              {infoForMessage.data().type === "comment" ?
                              <CommentInfo
                                    originalUidUser={infoForMessage.data().originalUidUser}
                                    currentUidUser={currentUserInfo[0].uidUser}/>
                              :
                              ""}
                              <MessageContentBig>
                                    <p>{infoForMessage.data().message}</p>
                              </MessageContentBig>
                              <TimeBar>
                              {formatDate(infoForMessage.data().date)}
                              </TimeBar>
                              {infoForMessage.data().retweets.length > 0 || infoForMessage.data().likes.length > 0 ?
                              <CounterBar>
                                    <CounterBarContainer>
                                          <p>{infoForMessage.data().retweets.length}  Retweets </p> 
                                    </CounterBarContainer>
                                    <CounterBarContainer>
                                          <p>{infoForMessage.data().likes.length}  Likes </p> 
                                    </CounterBarContainer>
                              </CounterBar>
                              :
                              ""
                              }
                              <InteractionBarMessage>
                                    <IconContainer Reply >
                                          <IconComment/>
                                    </IconContainer>
                                    <IconContainerCont Retweet>
                                    {!infoForMessage.data().retweets.includes(currentUserInfo[0].uidUser)?
                                    <RetweetButton onClick={()=>receiveNotification({
                                          notification:"retweet",
                                          id:id,
                                          retweets:infoForMessage.data().retweets, 
                                          originalUidUser:infoForMessage.data().uidUser, 
                                          user, 
                                          currentUserInfo, 
                                          changeShowPopUp, 
                                          changePopUpAlert
                                          })}>
                                          <IconRetweet/>
                                    </RetweetButton>
                                    :
                                    <>
                                    {infoForMessage.data().uidUser ===currentUserInfo[0].uidUser ?
                                    <RetweetButton onClick={()=>RemoveRetweetSameUser({
                                          currentUidUser:currentUserInfo[0].uidUser,
                                          originalRetweets:infoForMessage.data().retweets,
                                          currentMessageId:id,
                                          update,
                                          changeUpdate
                                          })}>
                                          <IconRetweetColor/>
                                    </RetweetButton>
                                    :
                                    <RetweetButton onClick={()=>RemoveRetweet({
                                          currentUidUser:currentUserInfo[0].uidUser,
                                          originalRetweets:infoForMessage.data().retweets,
                                          currentMessageId:id,
                                          retweetUidUser:infoForMessage.data().uidUser,
                                          update,
                                          changeUpdate
                                          })}>
                                          <IconRetweetColor/>
                                    </RetweetButton>
                                    }
                                    </>
                                    }
                                    {/* <CounterContainerBig>
                                    <p>{infoForMessage.data().retweets.length}</p>
                                    </CounterContainerBig> */}
                                    </IconContainerCont>
                                    <IconContainerCont Like>
                                          {!infoForMessage.data().likes.includes(currentUserInfo[0].uidUser)?
                                          <LikeButton  onClick={()=>AddLike({
                                                update,
                                                changeUpdate,
                                                id:id,
                                                uidUser:currentUserInfo[0].uidUser,
                                                originalUidUser:infoForMessage.data().uidUser,
                                                likes:infoForMessage.data().likes})}> 
                                                <IconLike />                               
                                          </LikeButton>
                                          :
                                          <>
                                          {infoForMessage.data().uidUser ===(currentUserInfo[0].uidUser)?
                                          <LikeButton  onClick={()=>RemoveLikeSameUser({
                                                currentUidUser:currentUserInfo[0].uidUser, 
                                                originalLikes:infoForMessage.data().likes,
                                                originalMessageId:id, 
                                                update,
                                                changeUpdate})}> 
                                                <IconLikeColor/>                               
                                          </LikeButton>
                                          :
                                          <LikeButton  onClick={()=>RemoveLike({
                                                currentUidUser:currentUserInfo[0].uidUser, 
                                                originalLikes:infoForMessage.data().likes,
                                                originalMessageId:id,
                                                likeUidUser:infoForMessage.data().uidUser,
                                                newId:id,
                                                update,
                                                changeUpdate
                                                })}> 
                                                <IconLikeColor/>                               
                                          </LikeButton>
                                          }
                                          </>
                                          }
                                          {/* <CounterContainerBig>
                                          <p>{infoForMessage.data().likes.length}</p>
                                          </CounterContainerBig> */}
                                    </IconContainerCont>
                              </InteractionBarMessage>
                        </CardColumnMessage> 
                  </CardMessage>      
                 {sortedArray.map((Comments, index) =>{
                  return(
                        <Card TimelineComment
                              key={Comments.date}>
                              <CommentInner
                                    TimelineComment
                                    previousCommentAlias={userByAliasId[0].alias}
                                    currentUserInfo={currentUserInfo}
                                    commentId={Comments.commentId}
                                    originalId={id}
                                    originalMessageComments={infoForMessage.data().comments}
                                    commentUidUser={Comments.uidUser}
                                    changeShowPopUp={changeShowPopUp}
                                    changePopUpAlert={changePopUpAlert}
                                    user={user}
                                    update={update}
                                    changeUpdate={changeUpdate}
                                    changeAlert={changeAlert} 
                                    changeStateAlert={changeStateAlert}/>
                        </Card>
                  )})
                  }
            </TimelineCommentContainer>
            </TimelineUserContainer>
            </>
            :
            <LoadingComponent/>
            }
            </>
            
      );
}
 
export default StatusMessage;
