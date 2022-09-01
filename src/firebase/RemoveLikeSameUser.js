import { db } from "./FirebaseConfig";
import { collection, doc,updateDoc, deleteDoc, query, where, onSnapshot} from "firebase/firestore";


const RemoveLikeSameUser = async({update,changeUpdate,currentUidUser,originalLikes, originalMessageId}) => {
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", currentUidUser),
                  where('originalId', "==", originalMessageId),
                  where('type', "==", "like")
                  /* orderBy('date', 'desc') */
                  /* limit(30) */
            );
            onSnapshot(consult, (snapshot)=>{
                  snapshot.docs.forEach((likeToDelete) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(likeToDelete.id, " => ", likeToDelete.data(), " => ", likeToDelete.data().originalId);
                        deleteDoc(doc(db, "userTimeline", likeToDelete.id))
                      });
            })
            const removedLikes = originalLikes.filter(function(item){
                  return item !== currentUidUser
            })
            const document = doc(db, "userTimeline" , originalMessageId);
            await updateDoc(document, {
                  likes: removedLikes 
            });
            changeUpdate(update-1)      
}

export default RemoveLikeSameUser;