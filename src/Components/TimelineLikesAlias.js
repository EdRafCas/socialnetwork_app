import React, {useContext} from 'react';
import useObtainMessagesLikesByUserAlias from '../Hooks/useObtainMessagesLikesByUserAlias';
import {Card} from '../Elements/ElementsTimeline'
import MessageTimelineContainer from './MessageTimelineContainer';
import { AuthContext } from '../Context/AuthContext';
import LikeContainer from './LikeContainer';


const TimelineLikesAlias = ({userByAlias, changeAlert, changeStateAlert, user, currentUserInfo}) => {

    const [messagesLikedByUser] = useObtainMessagesLikesByUserAlias(userByAlias[0].uidUser);
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    
    /* var filterLikes= messagesLikedByUser.filter(function(items) {
      return items.likes.includes(userByAlias[0].uidUser)
      }); */
    console.log(messagesLikedByUser)

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
                changeAlert={changeAlert}
                changeStateAlert={changeStateAlert}
                user={user}/>
              </Card>  
              )
            })}          
            </>
       );
}
 
export default TimelineLikesAlias;