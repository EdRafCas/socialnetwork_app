import React,{useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import useObtainMessages from '../Hooks/useObtainMessages';
import MessageBox from './MessageBox';
import '../index.css'
import {Card, FillerDiv} from '.././Elements/ElementsTimeline'
import { AuthContext } from '../Context/AuthContext';
import RetweetContainerMainTimeline from './RetweetContainerMainTimeline';
import MessageTimelineContainer from './MessageTimelineContainer';
import CommentMainTimeline from './CommentMainTimeline';
import LoadMore from '../Elements/LoadMore';

const TimelineContainer = styled.div`
  height:100%;
  width:100%;
  /* max-width:700px; */
  display:flex;
  flex-direction:column;
  padding:0rem;
  border:solid ${theme.BorderColor} 1px;
  gap:0rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y:scroll;
  overflow-x:hidden;
`




const Timeline = ({changeAlert, changeStateAlert, user, currentUserInfo, addToTimeline, message, handleChange}) => {
    const [messagesSent, ObtaineMoreMessages, thereAreMoreMessages] = useObtainMessages();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    
      return ( 
      <TimelineContainer >
        <MessageBox 
                    user={user}
                    currentUserInfo={currentUserInfo}
                    addToTimeline={addToTimeline}
                    message={message}
                    handleChange={handleChange} /> 
        {messagesSent.map((Message, index)=>{
        return(
          <Card key={Message.id}>
            {Message.originalId?
            <>
            {Message.type === "retweet" ?
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
                user={user}
                changeAlert={changeAlert} 
                changeStateAlert={changeStateAlert}/>
            :Message.type === "comment" ?
            <>
            {/* <div>{Message.id + " " +Message.originalId}</div> */}
            <CommentMainTimeline
              update={update}
              changeUpdate={changeUpdate} 
              currentUserInfo={currentUserInfo} 
              originalId={Message.originalId} 
              originalUidUser={Message.originalUidUser}
              commentId={Message.id} 
              commentUidUser={Message.uidUser}
              commentContent={Message.message}
              changeShowPopUp={changeShowPopUp}
              changePopUpAlert={changePopUpAlert}
              user={user}
              changeAlert={changeAlert} 
              changeStateAlert={changeStateAlert}/>
            </>
            :""}
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
              messageComments={Message.comments}
              messageOriginalId={Message.originalId}
              changeShowPopUp={changeShowPopUp}
              changePopUpAlert={changePopUpAlert}
              changeAlert={changeAlert}
              changeStateAlert={changeStateAlert}/>
            </>
            }
          </Card>  
        )})
        }
        {thereAreMoreMessages &&
        <LoadMore ObtaineMoreMessages={ObtaineMoreMessages}/>
        }
        <FillerDiv/>
      </TimelineContainer>
       );
}
 
export default Timeline;