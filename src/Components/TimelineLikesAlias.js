import React, {useContext} from 'react';
import useObtainMessagesLikesUser from '../Hooks/useObtainMessagesLikesUser';
import {Card} from '../Elements/ElementsTimeline'
import MessageTimelineContainer from './MessageTimelineContainer';
import { AuthContext } from '../Context/AuthContext';


const TimelineLikesAlias = ({userByAlias, changeAlert, changeStateAlert, user, currentUserInfo}) => {

    const [messagesLikedByUser] = useObtainMessagesLikesUser();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    
    var filterLikes= messagesLikedByUser.filter(function(items) {
      return items.likes.includes(userByAlias[0].uidUser)
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
                  update={update}
                  changeUpdate={changeUpdate}
                />
              </Card>  
              )
            })}          
            </>
       );
}
 
export default TimelineLikesAlias;