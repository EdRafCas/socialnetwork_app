import React from "react";




const receiveNotification = ({changeAlert, changeStateAlert, userId, notification, changeShowPopUp, changePopUpAlert, id}) => {
  if(notification==="retweet"){
    changeShowPopUp(true)
    changePopUpAlert({type: "retweet"})
  } if(notification==="delete"){
    changeShowPopUp(true)
    changePopUpAlert({type: "delete", id: id})
  } if(notification==="pinned"){
    changeShowPopUp(true)
    changePopUpAlert({type: "pinned", id: id, userId:userId})
    console.log(userId)
  }
}
 
export default receiveNotification;