import React, {useContext} from 'react';
import useObtainMessagesLikesByUser from '../Hooks/useObtainMessagesLikesByUser';
import {Card} from '../Elements/ElementsTimeline'
import MessageTimelineContainer from './MessageTimelineContainer';
import { AuthContext } from '../Context/AuthContext';
import LikeContainer from './LikeContainer';


const TimelineLikesUser = ({changeAlert, changeStateAlert, user, currentUserInfo}) => {

    const [messagesLikedByUser] = useObtainMessagesLikesByUser();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    /* 
    var filterLikes= messagesLikedByUser.filter(function(items) {
      return items.likes.includes(currentUserInfo[0].uidUser)
      }); */


      return ( 
            <>
            {messagesLikedByUser.map((Message, index)=>{
              return(
              <Card key={Message.id}>
                <LikeContainer
                update={update}
                changeUpdate={changeUpdate} 
                currentUserInfo={currentUserInfo} 
                originalId={Message.originalId} 
                originalUidUser={Message.originalUidUser}
                newId={Message.id} 
                UidUser={Message.uidUser}
                changeShowPopUp={changeShowPopUp}
                changePopUpAlert={changePopUpAlert}
                user={user}/>
              
                {/* <MessageTimelineContainer
                  id={Message.id}
                  user={user}
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
                  update={update}
                  changeUpdate={changeUpdate}
                /> */}
              </Card>  
              )
            })}          
            </>
       );
}
 
export default TimelineLikesUser;