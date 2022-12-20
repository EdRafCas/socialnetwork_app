import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import useObtainMessages from '../Hooks/useObtainMessages';
import {Card} from '.././Elements/ElementsTimeline'
import RetweetContainerDisplay from './RetweetContainerDisplay';
import MessageTimelineContainerDisplay from './MessageTimelineContainerDisplay';
import '../index.css'

const TimelineContainer = styled.div`
  height:100%;
  width:50%;
  display:flex;
  flex-direction:column;
  padding:0rem;
  border:solid ${theme.BorderColor} 1px;
  border-bottom:none;
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
            messageComments={Message.comments}
            messageLikes={Message.likes}
            messageRetweets={Message.retweets}
            messageOriginalId={Message.originalId}
          />
          </>
          } 
          </Card>  
        )
      })}             
      </TimelineContainer>
       );
}
 
export default TimelineDisplay;