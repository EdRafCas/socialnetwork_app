import React,{useState, useEffect} from 'react';
import {format, fromUnixTime} from 'date-fns';
import '../index.css'
import { db } from "../firebase/FirebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import BookmarkTimeline from './BookmarkTimeline';
import AddLike from '../firebase/AddLike';



const BookmarkTimelineContainer = ({ id, user, currentUserInfo, changeShowPopUp, changePopUpAlert, changeAlert,changeStateAlert}) => {
    const [loadingMessageData, changeLoadingMessageData] =useState(true);
    const [messageForBookMark, changeMessageForBookMark] = useState('')
    const [userInfoForBookmark, changeUserInfoForBookmark] =useState(currentUserInfo)
    const [likesState, changeLikesState] = useState('')

    useEffect(()=>{
      const obtainBookmarkTimeline = async() =>{
        const document = await getDoc(doc(db, 'userTimeline', id));
        changeMessageForBookMark(document)
       console.log(messageForBookMark)

        changeLoadingMessageData(false)
      }
      obtainBookmarkTimeline()

    /* By not calling changeLoadingMessageData in useEffect it keeps loading each time we update*/
    },[currentUserInfo, changeMessageForBookMark, changeUserInfoForBookmark, likesState])

    
return ( 
  <>
  {!loadingMessageData ?
    <>
    <BookmarkTimeline 
      date={messageForBookMark.data().date}
      likes={messageForBookMark.data().likes}
      retweets={messageForBookMark.data().retweets}
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
      likesState={likesState}
      changeLikesState={changeLikesState}
    />
    </>
  :
  <div>empty</div>}
  </>
    )
}
 
export default BookmarkTimelineContainer;