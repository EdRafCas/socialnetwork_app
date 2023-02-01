import { db } from "./FirebaseConfig";
import { collection, doc, updateDoc, deleteDoc, query, where, onSnapshot} from "firebase/firestore";


const RemoveRetweet = async({update,changeUpdate,newRetweetId, originalId, retweetUidUser, currentUidUser,originalRetweets, currentMessageId}) => {
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
                        changeUpdate(update-1)      
                  } catch{
                        console.log("error deleting")
                  }
      } else {
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", currentUidUser),
                  where('originalId', "==", currentMessageId),
                  where('type', "==", "retweet")
                  /* orderBy('date', 'desc') */
                  /* limit(30) */
            );
            const removedRetweets = originalRetweets.filter(function(item){
                  return item !== currentUidUser
            })
            const document = doc(db, "userTimeline" , currentMessageId);
            await updateDoc(document, {
                  retweets: removedRetweets 
            });

            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  snapshot.docs.map((retweetToDelete) => {
                        // doc.data() is never undefined for query doc snapshots
                        /* console.log(retweetToDelete.id, " => ", retweetToDelete.data(), " => ", retweetToDelete.data().originalId); */
                        changeUpdate(update-1+ " using for remove retweet");
                        return deleteDoc(doc(db, "userTimeline", retweetToDelete.id))
                      });
            unsuscribe();
            })
            
            
      }
}

export default RemoveRetweet;