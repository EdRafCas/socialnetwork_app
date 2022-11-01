import { db } from "./FirebaseConfig";
import { collection, doc, updateDoc, deleteDoc, query, where, onSnapshot} from "firebase/firestore";


const RemoveComment = async({update,changeUpdate,newRetweetId, originalId, id, originalUidUser, originalMessageComments,changeStateAlert, changeAlert,currentUidUser, changeShowPopUp, showPopUp}) => {
      await deleteDoc(doc(db, "userTimeline", id)) 
            changeShowPopUp(!showPopUp)
            try{
                  const removedComment = originalMessageComments.filter(object => {
                        return object.commentId !== id
                  }) 
                  const document = doc(db, "userTimeline" , originalId); 
                  await updateDoc(document, {
                        comments: removedComment 
                  });
                  changeStateAlert(true);
                  changeAlert({
                  type:'success',
                  message: 'The comment was deleted'
                  })
                  changeUpdate(update-1)      
            } catch{
                  console.log("error updating comment")
            }
}

export default RemoveComment;