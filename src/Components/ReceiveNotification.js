

const receiveNotification = ({userId, notification, changeShowPopUp, changePopUpAlert, id, originalUidUser, retweets, user, currentUserInfo}) => {
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
    console.log(userId)
  } if(notification==="pinned"){
    changeShowPopUp(true)
    changePopUpAlert({type: "pinned",
    id: id,
    userId:userId})
    console.log(userId)
  }
}
 
export default receiveNotification;