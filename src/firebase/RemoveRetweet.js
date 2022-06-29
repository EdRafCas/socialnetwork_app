import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc, deleteDoc  } from "firebase/firestore";


const RemoveRetweet = async({retweetId, originalId, retweetUidUser, uidUser,retweets}) => {
      if(retweetUidUser === uidUser){
           await deleteDoc(doc(db, "userTimeline", originalId))
      } else {
            const removedRetweets = retweets.filter(function(item){
                  return item !== uidUser
            })
            const document = doc(db, "userTimeline" , retweetId); 
            return await updateDoc(document, {
                  retweets: removedRetweets 
            });    
      }
    
}

export default RemoveRetweet;

 
