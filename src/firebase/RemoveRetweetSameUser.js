import { db } from "./FirebaseConfig";
import { collection, doc,updateDoc, deleteDoc, query, where, onSnapshot} from "firebase/firestore";


const RemoveRetweetSameUser = async({update,changeUpdate,currentUidUser,originalRetweets, currentMessageId}) => {
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
            changeUpdate(update-1)      
}

export default RemoveRetweetSameUser;