import React, {useContext} from 'react';
import useObtainMessagesLikesUser from '../Hooks/useObtainMessagesLikesUser';
import {format, fromUnixTime} from 'date-fns';
import {Card} from '.././Elements/ElementsTimeline'
import MessageTimelineContainer from './MessageTimelineContainer';
import { AuthContext } from '../Context/AuthContext';


const TimelineLikes = ({changeAlert, changeStateAlert, user, currentUserInfo}) => {

    const [messagesLikedByUser] = useObtainMessagesLikesUser();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);

    const formatDate = (date) => {
      return (format(fromUnixTime(date), " HH:mm - MMMM   dd    yyyy   "));
 };

    var filterLikes= messagesLikedByUser.filter(function(items) {
      return items.likes.includes(currentUserInfo[0].uidUser)
      });


      return ( 
            <>
            {filterLikes.map((Message, index)=>{
              return(
              <Card key={Message.id}>
                <MessageTimelineContainer
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
                />
              </Card>  
              )
            })}          
            </>
       );
}
 
export default TimelineLikes;