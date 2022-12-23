import React,{useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import '../index.css'
import { db } from "../firebase/FirebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import BookmarkTimeline from './BookmarkTimeline';
import { AuthContext } from '../Context/AuthContext';
import {EmptyDiv} from '.././Elements/ElementsTimeline'




const BookmarkTimelineContainer = ({ id, user, currentUserInfo, changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert}) => {
    const [loadingMessageData, changeLoadingMessageData] =useState(true);
    const [messageForBookMark, changeMessageForBookMark] = useState('')
    const [userInfoForBookmark, changeUserInfoForBookmark] =useState([{}])
    const {update} =useContext(AuthContext);
    const {changeUpdate} =useContext(AuthContext);
    
    useEffect(()=>{
      const obtainBookmarkTimeline = async() =>{
        const document = await getDoc(doc(db, 'userTimeline', id));
        /*if(document.exists()){
          console.log(id +" existe")   
        } else{
          console.log(id +" no existe")
        } */
        changeMessageForBookMark(document)
       /* console.log("reload bookmark") */
        changeLoadingMessageData(false)
      }
    obtainBookmarkTimeline();

    /* By not calling changeLoadingMessageData in useEffect it keeps loading each time we update*/
    },[currentUserInfo, changeMessageForBookMark, changeUserInfoForBookmark, update, id])

    
return ( 
  <>
    {!loadingMessageData ?
      <>
        {messageForBookMark.exists()?
        <BookmarkTimeline 
          date={messageForBookMark.data().date}
          comments={messageForBookMark.data().comments}
          retweets={messageForBookMark.data().retweets}
          likes={messageForBookMark.data().likes}
          message={messageForBookMark.data().message}
          uidUser={messageForBookMark.data().uidUser}
          id={id}
          user={user}
          currentUserInfo={currentUserInfo}
          changeShowPopUp={changeShowPopUp}
          changePopUpAlert={changePopUpAlert}
          changeAlert={changeAlert}
          changeStateAlert={changeStateAlert}
          userInfoForBookmark={userInfoForBookmark}
          changeUserInfoForBookmark={changeUserInfoForBookmark}
          update={update}
          changeUpdate={changeUpdate}
        />
        :
        <EmptyDiv/>
        }
      </>
    :
    <EmptyDiv/>
    }
  </>
    )
}
 
export default BookmarkTimelineContainer;