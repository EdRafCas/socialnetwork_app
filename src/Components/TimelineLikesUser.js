import React, {useContext} from 'react';
import useObtainMessagesLikesByUser from '../Hooks/useObtainMessagesLikesByUser';
import {Card, LoadMoreButton,LoadMoreContainer, FillerDiv} from '../Elements/ElementsTimeline'
import { AuthContext } from '../Context/AuthContext';
import LikeContainer from './LikeContainer';



const TimelineLikesUser = ({user, currentUserInfo, changeAlert, changeStateAlert}) => {

    const [messagesLikedByUser, ObtainMoreMessagesLikedByUser, thereAreMoreMessagesLikedByUser] = useObtainMessagesLikesByUser();
    const {changeShowPopUp} =useContext(AuthContext);
    const {changePopUpAlert} =useContext(AuthContext);
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    

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
                changeAlert={changeAlert}
                changeStateAlert={changeStateAlert}
                user={user}/>
              </Card>  
              )
            })}
            {thereAreMoreMessagesLikedByUser &&
            <LoadMoreContainer>
              <LoadMoreButton onClick= {() => ObtainMoreMessagesLikedByUser()}> <p>Load More</p></LoadMoreButton>
            </LoadMoreContainer>
            }
            <FillerDiv/>          
            </>
       );
}
 
export default TimelineLikesUser;