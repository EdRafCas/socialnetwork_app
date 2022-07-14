import React from "react";
import { RetweetButton } from "../Elements/ElementsTimeline";




const receiveNotification = ({notification, changeShowPopUp, changePopUpAlert, id}) => {
  if(notification==="retweet"){
    changeShowPopUp(true)
    changePopUpAlert({type: "retweet"})
  } if(notification==="delete"){
    changeShowPopUp(true)
    changePopUpAlert({type: "delete", id: id})

  }
}
 
export default receiveNotification;