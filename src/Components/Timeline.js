import React,{useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessages from '../Hooks/useObtainMessages';
import ProfileImage from '../img/profile_avatar.png'
import getUnixTime from 'date-fns/getUnixTime';
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconRetweetColor} from '../img/retweet_icon_color.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {ReactComponent as IconLikeColor} from '../img/like_icon_color.svg';
import AddLike from '../firebase/AddLike';
import {addRetweetToTimeline} from '../firebase/AddRetweet';
import RemoveLike from '../firebase/RemoveLike';
import RemoveRetweet from '../firebase/RemoveRetweet';
import MessageBox from './MessageBox';
import '../index.css'
import {Card, RetweetInfo, UserColumns, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton, RetweetButton, IconContainerRetweet, NameContainerRetweet} from '.././Elements/ElementsTimeline'
import RetweetContainer from './RetweetContainer';
import ShowMoreMenu from '../Elements/ShowMoreMenu';
import { AuthContext } from '../Context/AuthContext';

 
const TimelineContainer = styled.div`
  height:100%;
  display:flex;
  flex-direction:column;
  padding:0rem;
  border:solid ${theme.BorderColor} 1px;
  gap:0rem;
  overflow:scroll;
  overflow-x:hidden;
`
const EmptyDiv=styled.div`
`


const Timeline = ({changeAlert, changeStateAlert, user, currentUserInfo, addToTimeline, message, handleChange}) => {
    const [messagesSent] = useObtainMessages();
    console.log(currentUserInfo[0].uidUser)
    const {changeShowPopUp} =useContext(AuthContext);
    const {showPopUp} =useContext(AuthContext);
    
    
    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
    };
    

    /* console.log(MessagesSent); */

      return ( 

            <TimelineContainer className='timeline-user'>
              <MessageBox user={user}
                          currentUserInfo={currentUserInfo}
                          addToTimeline={addToTimeline}
                          message={message}
                          handleChange={handleChange} />         
              {messagesSent.map((Message, index)=>{
              return(
                <Card key={Message.id}>
                  {Message.originalId?
                  <>
                    {Message.uidUser!==currentUserInfo[0].uidUser ?
                    <>
                    <RetweetInfo>
                      <IconContainerRetweet Retweet >
                        <IconRetweet/>
                      </IconContainerRetweet>
                      <NameContainerRetweet>
                        {Message.name}<p>Retweeted</p> 
                      </NameContainerRetweet>
                    </RetweetInfo>
                    <RetweetContainer currentUserInfo={currentUserInfo} 
                                      originalId={Message.originalId} 
                                      newRetweetId={Message.id} 
                                      retweetUidUser={Message.uidUser}
                    />
                    </>
                    :
                    <EmptyDiv/>
                    }
                  </>
                  :
                  <>
                  <UserColumns>
                    <CardColumns>
                      <PortraitContainer>
                        {Message.photoURL ?
                        <img alt="userportrait" src={Message.photoURL}/>
                        :
                        <img alt="userportrait" src={ProfileImage}/>
                        }
                        
                      </PortraitContainer>
                    </CardColumns>
                    <CardColumns rightColumn>
                      <UserNameContainer>
                        <NameContainer>{Message.name}</NameContainer>
                        <AliasContainer>@{Message.alias}</AliasContainer>
                        <ShowMoreMenu messageUidUser={Message.uidUser} 
                                      currentUserInfo={currentUserInfo}
                                      id={Message.id} />
                      </UserNameContainer>
                      <MessageContent>
                        {Message.message}
                      </MessageContent>
                      <TimeBar>
                        {formatDate(Message.date)}
                      </TimeBar>
                      <InteractionBar>
                        <IconContainer Reply ><IconComment/></IconContainer>
                        <IconContainer Retweet onClick={()=>changeShowPopUp(!showPopUp)}><IconRetweetColor/></IconContainer>
                        <IconContainerCont Retweet>
                        {
                          !Message.retweets.includes(currentUserInfo[0].uidUser)?
                          <RetweetButton onClick={()=>addRetweetToTimeline({
                          changeAlert,
                          changeStateAlert,
                          id:Message.id,
                          originalUidUser:Message.uidUser, 
                          retweets:Message.retweets, 
                          user, 
                          currentUserInfo, 
                          date: getUnixTime(new Date())})}
                          >
                            <IconRetweet/>
                          </RetweetButton>
                        :
                        <RetweetButton onClick={()=>RemoveRetweet({
                        currentUidUser:currentUserInfo[0].uidUser,
                        originalRetweets:Message.retweets, 
                        originalId:Message.originalId, 
                        currentMessageId:Message.id, 
                        retweetUidUser:Message.uidUser})}
                        >
                            <IconRetweetColor/>
                          </RetweetButton>
                        }
                          <CounterContainer>
                            {Message.retweets.length}
                          </CounterContainer>
                        </IconContainerCont>
                        <IconContainerCont Like>
                          {
                            !Message.likes.includes(currentUserInfo[0].uidUser)?
                            <LikeButton  onClick={()=>AddLike({
                            id:Message.id,
                            uidUser:currentUserInfo[0].uidUser,
                            likes:Message.likes})}
                            > 
                              <IconLike />                               
                            </LikeButton>
                            :
                            <LikeButton  onClick={()=>RemoveLike({
                            id:Message.id,
                            uidUser:currentUserInfo[0].uidUser,
                            likes:Message.likes})}
                            > 
                              <IconLikeColor />                               
                            </LikeButton>
                          }
                          <CounterContainer>
                            <p>{Message.likes.length}</p>
                          </CounterContainer>
                        </IconContainerCont>
                      </InteractionBar>
                    </CardColumns>
                  </UserColumns>
                  </>
                  }
                </Card>  
              )})
              }        
            </TimelineContainer>
       );
}
 
export default Timeline;