import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import useObtainMessages from '../Hooks/useObtainMessages';
import {Card} from '.././Elements/ElementsTimeline'
import RetweetContainerDisplay from './RetweetContainerDisplay';
import MessageTimelineContainerDisplay from './MessageTimelineContainerDisplay';
import RetweetInfo from '../Elements/RetweetInfo';
import '../index.css'

const TimelineContainer = styled.div`
  height:100%;
  width:60%;
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


const TimelineDisplay = () => {
    const [messagesSent] = useObtainMessages();

      return ( 
      <TimelineContainer >
      {messagesSent.map((Message, index)=>{
        return(
          <Card key={Message.id}>
          {Message.originalId?
          <>
            {Message.uidUser?
            <>
            <RetweetInfo retweetUidUser={Message.uidUser}/>
            <RetweetContainerDisplay
              originalId={Message.originalId} 
              originalUidUser={Message.originalUidUser}
              newRetweetId={Message.id} 
              retweetUidUser={Message.uidUser}/>
            </>
            :
            <EmptyDiv/>
            }
          </>
          :
          <>
          <MessageTimelineContainerDisplay
            id={Message.id}
            messageUidUser={Message.uidUser}
            messageDate={Message.date}
            messageMessage={Message.message}
            messageRetweets={Message.retweets}
            messageLikes={Message.likes}
            messageOriginalId={Message.originalId}
          />
          </>
          } 

          {/* <CardColumns>
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
          </CardColumns> */}
          </Card>  
        )
      })}             
      </TimelineContainer>
       );
}
 
export default TimelineDisplay;