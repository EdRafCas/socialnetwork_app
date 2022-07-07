import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc, deleteDoc, query, where, onSnapshot, orderBy  } from "firebase/firestore";


const RemoveRetweet = async({newRetweetId, originalId, retweetUidUser, currentUidUser,originalRetweets, currentMessageId}) => {
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
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", currentUidUser),
                  where('originalId', "==", currentMessageId)
                  /* orderBy('date', 'desc') */
                  /* limit(30) */
            );
            onSnapshot(consult, (snapshot)=>{
                  snapshot.docs.forEach((retweetToDelete) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(retweetToDelete.id, " => ", retweetToDelete.data(), " => ", retweetToDelete.data().originalId);
                        deleteDoc(doc(db, "userTimeline", retweetToDelete.id))
                      });
            })
            const removedRetweets = originalRetweets.filter(function(item){
                  return item !== currentUidUser
            })
            const document = doc(db, "userTimeline" , currentMessageId);
            await updateDoc(document, {
                  retweets: removedRetweets 
            });  
            
      }
}

export default RemoveRetweet;