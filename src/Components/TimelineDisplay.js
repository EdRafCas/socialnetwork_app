import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary';
import useObtainMessages from '../Hooks/useObtainMessages';
import ProfileImage from '../img/profile_avatar.png'
import {format, fromUnixTime} from 'date-fns';
import {ReactComponent as IconComment} from '../img/comment_icon.svg';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import {ReactComponent as IconLike} from '../img/like_icon.svg';
import {Card, CardColumns, UserNameContainer, MessageContent, InteractionBar, IconContainer, CounterContainer, IconContainerCont, TimeBar, LikeButton} from '.././Elements/ElementsTimeline'


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



const TimelineDisplay = ({currentUserInfo}) => {
    const [messagesSent] = useObtainMessages();

    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };
    

    /* console.log(MessagesSent); */

      return ( 
            <TimelineContainer>
            {messagesSent.map((Message, index)=>{
             
              return(
              
                <Card key={Message.id}>
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
                    <NameContainer>{Message.name+" "+Message.lastname}</NameContainer><AliasContainer>@{Message.alias}</AliasContainer>
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
                    <IconContainer Retweet ><IconRetweet/></IconContainer>
                    <IconContainerCont>
                      <IconContainer Retweet><IconRetweet/></IconContainer>
                      <CounterContainer>{Message.retweets > 0 ?  Message.retweets.length : "" }</CounterContainer>
                    </IconContainerCont>
                    <IconContainerCont>
                      <LikeButton Like> 
                        <IconLike />                               
                      </LikeButton>
                      <CounterContainer><p>{Message.likes.length}</p></CounterContainer>
                    </IconContainerCont>
                  </InteractionBar>
                </CardColumns>

              
            </Card>  
              )
            })}
                      
      </TimelineContainer>
       );
}
 
export default TimelineDisplay;