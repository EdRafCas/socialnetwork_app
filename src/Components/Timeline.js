import React,{useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import useObtainMessages from '../Hooks/useObtainMessages';
import MessageBox from './MessageBox';
import '../index.css'
import {Card} from '.././Elements/ElementsTimeline'
import { AuthContext } from '../Context/AuthContext';
import RetweetContainerMainTimeline from './RetweetContainerMainTimeline';
import MessageTimelineContainer from './MessageTimelineContainer';
import RetweetInfo from '../Elements/RetweetInfo';
 
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
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    
    console.log("reloading timeline")
    console.log(currentUserInfo)
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
              <RetweetInfo retweetUidUser={Message.uidUser}/>
              <RetweetContainerMainTimeline
                update={update}
                changeUpdate={changeUpdate} 
                currentUserInfo={currentUserInfo} 
                originalId={Message.originalId} 
                originalUidUser={Message.originalUidUser}
                newRetweetId={Message.id} 
                retweetUidUser={Message.uidUser}
                changeShowPopUp={changeShowPopUp}
                changePopUpAlert={changePopUpAlert}
                user={user}/>
              </>
              :
              <EmptyDiv/>
              }
            </>
            :
            <>
            <MessageTimelineContainer
              id={Message.id}
              user={user}
              update={update}
              changeUpdate={changeUpdate}
              currentUserInfo={currentUserInfo}
              messageUidUser={Message.uidUser}
              messageDate={Message.date}
              messageMessage={Message.message}
              messageRetweets={Message.retweets}
              messageLikes={Message.likes}
              messageOriginalId={Message.originalId}
              changeShowPopUp={changeShowPopUp}
              changePopUpAlert={changePopUpAlert}
              changeAlert={changeAlert}
              changeStateAlert={changeStateAlert}
            />
            </>
            }
          </Card>  
        )})
        }        
      </TimelineContainer>
       );
}
 
export default Timeline;