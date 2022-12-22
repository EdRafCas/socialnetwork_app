import React, {useContext, useState, useEffect} from 'react';
import useObtainMessagesLikesByUserAlias from '../Hooks/useObtainMessagesLikesByUserAlias';
import {Card, LoadMoreButton, LoadMoreContainer} from '../Elements/ElementsTimeline'
import { AuthContext } from '../Context/AuthContext';
import LikeContainer from './LikeContainer';
import LoadingComponent from '../Elements/LoadingComponent'


const TimelineLikesAlias = ({userByAlias, changeAlert, changeStateAlert, user, currentUserInfo}) => {

  const [messagesLikedByUserAlias, ObtainMoreMessagesLikedByUserAlias,thereAreMoreMessagesLikedByUserAlias] = useObtainMessagesLikesByUserAlias(userByAlias[0].uidUser);
  const {changeShowPopUp} =useContext(AuthContext);
  const {changePopUpAlert} =useContext(AuthContext);
  const {update} =useContext(AuthContext);
  const {changeUpdate} =useContext(AuthContext);
  const [messagesLikesByUserAliasLoaded, changeMessagesLikesByUserAliasLoaded] =useState(true)

  useEffect(()=>{
    if(userByAlias[0].uidUser){
      console.log("loading likes by UserAlias")  
      changeMessagesLikesByUserAliasLoaded(false) 
    } else{
          console.log("userByAlias[0].uidUser not found")
    }

  }, [update, userByAlias])
  
  /* var filterLikes= messagesLikedByUser.filter(function(items) {
    return items.likes.includes(userByAlias[0].uidUser)
    }); */
  /* console.log(messagesLikedByUser) */

    return ( 
      <>
      {!messagesLikesByUserAliasLoaded?
          <>
          {messagesLikedByUserAlias.map((Message, index)=>{
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
      :
      <LoadingComponent/>
      }
      {thereAreMoreMessagesLikedByUserAlias &&
      <LoadMoreContainer>
      <LoadMoreButton onClick= {() => ObtainMoreMessagesLikedByUserAlias()}> <p>Load More</p></LoadMoreButton>
      </LoadMoreContainer>
      }
      </>
      );
}
 
export default TimelineLikesAlias;