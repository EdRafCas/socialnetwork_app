import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc, deleteDoc  } from "firebase/firestore";


const RemoveRetweet = async({newRetweetId, originalId, retweetUidUser, currentUidUser,originalRetweets}) => {
      if(retweetUidUser === currentUidUser){
            await deleteDoc(doc(db, "userTimeline", newRetweetId))
                  try{
                        const removedRetweets = originalRetweets.filter(function(item){
                              return item !== currentUidUser
                        })
                        const document = doc(db, "userTimeline" , originalId); 
                        await updateDoc(document, {
                              retweets: removedRetweets 
                        });    
                  } catch{
                        console.log("error deleting")
                  }
      } else {
                  console.log("not your retweet")
                  console.log(newRetweetId)
                  const removedRetweets = originalRetweets.filter(function(item){
                        return item !== currentUidUser
                  })
                  const document = doc(db, "userTimeline" , newRetweetId); 
                  console.log(document)
                        await updateDoc(document, {
                              retweets: removedRetweets 
                        });
            
      }
}

export default RemoveRetweet;