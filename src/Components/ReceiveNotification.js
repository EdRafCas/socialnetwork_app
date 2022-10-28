

const receiveNotification = ({e, messageMessage, messageForTimeline, userId, notification, changeShowPopUp, changePopUpAlert, id, originalUidUser, originalId, originalMessageComments, comments, retweets, user, bookmarks, profilePicture, backgroundPicture, currentUserInfo, changeAlert, changeStateAlert}) => {
  if(notification==="retweet"){
    changeShowPopUp(true)
    changePopUpAlert({type: "retweet",
      id:id,
      originalUidUser:originalUidUser, 
      retweets:retweets,
      user:user, 
      currentUserInfo:currentUserInfo
    })
  } if(notification==="unPin"){
    changeShowPopUp(true)
    changePopUpAlert({type: "unPin", 
    id: id,
    userId:userId})
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
  } if(notification==="removeFromBookmark"){
    changeShowPopUp(true)
    changePopUpAlert({type: "removeFromBookmark",
    id: id,
    userId:userId,
    bookmarks:bookmarks})
  } if(notification==="profilePicture"){
    changeShowPopUp(true)
    changePopUpAlert({type: "profilePicture",
    profilePicture:profilePicture})
  } if(notification==="backgroundPicture"){
    changeShowPopUp(true)
    changePopUpAlert({type: "backgroundPicture",
    backgroundPicture:backgroundPicture})
  } if(notification==="comment"){
    changeShowPopUp(true)
    changePopUpAlert({type: "comment",
      messageForTimeline:messageForTimeline,
      messageMessage:messageMessage,
      id:id,
      originalUidUser:originalUidUser, 
      comments:comments,
      retweets:retweets,
      user:user, 
      currentUserInfo:currentUserInfo
    })
  } if(notification==="alreadyBookmark"){
    changeStateAlert(true);
      changeAlert({
            type:'success',
            message: 'This message is already in your bookmark list'
      })
    } 
    if(notification==="deleteComment"){
      changeShowPopUp(true)
      changePopUpAlert({type: "deleteComment", 
      id: id,
      originalId:originalId,
      originalUidUser:originalUidUser, 
      originalMessageComments:originalMessageComments
      })
    }  

}
 
export default receiveNotification;