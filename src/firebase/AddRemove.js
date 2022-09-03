import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc  } from "firebase/firestore";
import getUnixTime from 'date-fns/getUnixTime';
import AddLike from "./AddLike";
import RemoveLike from "./RemoveLike";
import RemoveLikeSameUser from "./RemoveLikeSameUser";

/* const AddRemove = async({id,uidUser,likes,update,changeUpdate}) => {
      console.log(id,uidUser,likes)
      console.log(update)
      changeUpdate(update+1)
      const document = doc(db, "userTimeline" , id);
      console.log(document) 
      
      return await updateDoc(document, {
            likes: [...likes, uidUser] 
      }); 
} */

const AddRemove = async({messageLikes,currentUserInfo, messageUidUser, id, uidUser, originalUidUser, likes, originalLikes, originalMessageId, currentUidUser, likeUidUser, newId, update, changeUpdate}) => {
      if(!messageLikes.includes(currentUserInfo[0].uidUser)){
            console.log("addlikeroute")
            AddLike({id,
                  uidUser,
                  originalUidUser,
                  likes,
                  update,
                  changeUpdate})
      } else {
            if(messageUidUser === currentUserInfo[0].uidUser){
                  console.log("removelikesameuserroute")
                  RemoveLikeSameUser({
                        currentUidUser,
                        originalLikes,
                        originalMessageId,
                        update,
                        changeUpdate})
            } else{
                  console.log("removelikeroute")
                  RemoveLike({
                        currentUidUser,
                        originalLikes,
                        originalMessageId,
                        likeUidUser,
                        newId,
                        update,
                        changeUpdate})
            }
      }

     /*  console.log(id,uidUser,"executing AddRemove")
      const document = doc(db, "userTimeline" , id); 
      try{
            await updateDoc(document, {
                  likes: [...likes, uidUser]})
                  console.log("like added")
                  try{
                        await addDoc(collection(db, "userTimeline"), {
                              type:"like",
                              originalId: id,
                              originalUidUser:originalUidUser,
                              uidUser:uidUser,
                              date: getUnixTime(new Date())})
                  } catch(error){
                        console.log("Error adding new Like Container")
                  }
      } catch(error){
            console.log("Error updating tweet")
      }
      changeUpdate(update+1)
      console.log(update+"executing AddRemove") */
}


export default AddRemove;