import React, {useContext} from 'react';
import useObtainMessagesLikesByUser from '../Hooks/useObtainMessagesLikesByUser';
import {Card} from '../Elements/ElementsTimeline'
import { AuthContext } from '../Context/AuthContext';
import LikeContainer from './LikeContainer';


const TimelineLikesUser = ({user, currentUserInfo}) => {

    const [messagesLikedByUser] = useObtainMessagesLikesByUser();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    console.log(messagesLikedByUser)
    
    /* var filterLikes= messagesLikedByUser.filter(function(items) {
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
                uidUser={Message.uidUser}
                changeShowPopUp={changeShowPopUp}
                changePopUpAlert={changePopUpAlert}
                user={user}/>
              </Card>  
              )
            })}          
            </>
       );
}
 
export default TimelineLikesUser;