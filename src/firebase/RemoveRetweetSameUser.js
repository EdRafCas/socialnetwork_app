import { db } from "./FirebaseConfig";
import { collection, doc,updateDoc, deleteDoc, query, where, onSnapshot} from "firebase/firestore";


const RemoveRetweetSameUser = async({update,changeUpdate,currentUidUser,originalRetweets, currentMessageId}) => {
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
                        console.log(retweetToDelete.id, " => ", retweetToDelete.data(), " => ", retweetToDelete.data().originalId);
                        changeUpdate(update-1+ "using this to remove retweet from same user")      
                        return deleteDoc(doc(db, "userTimeline", retweetToDelete.id))
                      });
            unsuscribe();
            })
            
}

export default RemoveRetweetSameUser;