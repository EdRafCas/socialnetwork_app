

const receiveNotification = ({userId, notification, changeShowPopUp, changePopUpAlert, id, originalUidUser, retweets, user, bookmarks, currentUserInfo, changeAlert, changeStateAlert}) => {
  if(notification==="retweet"){
    changeShowPopUp(true)
    changePopUpAlert({type: "retweet",
      id:id,
      originalUidUser:originalUidUser, 
      retweets:retweets,
      user:user, 
      currentUserInfo:currentUserInfo
    })
  } if(notification==="delete"){
    changeShowPopUp(true)
    changePopUpAlert({type: "delete", 
    id: id})
  } if(notification==="deleteAndRemove"){
    changeShowPopUp(true)
    changePopUpAlert({type: "deleteAndRemove", 
    id: id,
    userId:userId})
  } if(notification==="pinned"){
    changeShowPopUp(true)
    changePopUpAlert({type: "pinned",
    id: id,
    userId:userId})
  } if(notification==="bookmark"){
    changeShowPopUp(true)
    changePopUpAlert({type: "bookmark",
    id: id,
    userId:userId,
    bookmarks:bookmarks})
  } if(notification==="alreadyBookmark"){
    changeStateAlert(true);
      changeAlert({
            type:'success',
            message: 'This message is already in your bookmark list'
      })
    }   

}
 
export default receiveNotification;