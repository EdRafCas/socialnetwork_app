import React from 'react';
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
import MessageBox from './MessageBox';
import '../index.css'
import {Card, RetweetInfo, UserColumns, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '.././Elements/ElementsTimeline'
import RetweetTimeline from './RetweetTimeline';

 
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
const IconContainerRetweet=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  align-items:center;
  height:1.5rem;
  width:100%;
  min-width:64px;
  /* border:1px solid white; */
  fill:currentcolor;

  svg{
    max-height:1.2rem;
    stroke: ${theme.BorderColor};
  }
`
const NameContainerRetweet = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  color: ${theme.Text};
  font-size:1rem;
  font-weight:800;
  /* border:solid ${theme.BorderColor} 1px; */
  overflow:hidden;
  padding-left:5px;
  gap:5px;
`
const RetweetButton=styled.button`
  background:black;
  border-radius:50%;
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

const Timeline = ({ changeAlert, changeStateAlert, user, currentUserInfo, addToTimeline, message, handleChange}) => {
    const [messagesSent] = useObtainMessages();


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
                {Message.Retweet === "maybe" ?
                <>
                <RetweetInfo>
                  <IconContainerRetweet Retweet ><IconRetweet/></IconContainerRetweet>
                  <NameContainerRetweet>{Message.name} <p>Retweeted</p> </NameContainerRetweet>
                </RetweetInfo>
                <RetweetTimeline id={Message.RetweetId} currentUserInfo={currentUserInfo} />
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
                    </UserNameContainer>
                    <MessageContent>
                      {Message.message}
                      
                    </MessageContent>
                    <TimeBar>
                      {formatDate(Message.date)}
                    </TimeBar>
                    {/* <TimeBar>
                      {Message.id}
                    </TimeBar>
                    <TimeBar>
                      {Message.uidUser}
                    </TimeBar>
                    <TimeBar>
                      {Message.likes}
                    </TimeBar> */}
                    
                    <InteractionBar>
                      <IconContainer Reply ><IconComment/></IconContainer>
                      <IconContainer Retweet ><IconRetweetColor/></IconContainer>
                      <IconContainerCont Retweet>
                      {
                          !Message.retweets.includes(currentUserInfo[0].uidUser)?
                        <RetweetButton onClick={()=>addRetweetToTimeline({changeAlert, changeStateAlert, id:Message.id, user, currentUserInfo, date: getUnixTime(new Date())})}>
                          <IconRetweet/>
                        </RetweetButton>
                      :
                      <RetweetButton onClick={()=>addRetweetToTimeline({changeAlert, changeStateAlert, id:Message.id, user, currentUserInfo, date: getUnixTime(new Date())})}>
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
                          <LikeButton  onClick={()=>AddLike({id:Message.id,uidUser:currentUserInfo[0].uidUser,likes:Message.likes})}> 
                            <IconLike />                               
                          </LikeButton>
                          :
                          <LikeButton  onClick={()=>RemoveLike({id:Message.id,uidUser:currentUserInfo[0].uidUser,likes:Message.likes})}> 
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
              )
              })}          
            </TimelineContainer>
       );
}
 
export default Timeline;