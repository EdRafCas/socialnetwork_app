import { db } from "./FirebaseConfig";
import { collection, doc,updateDoc, deleteDoc, query, where, onSnapshot} from "firebase/firestore";


const RemoveLikeSameUser = async({update,changeUpdate,currentUidUser,originalLikes, originalMessageId}) => {
      console.log("removedusing removelikesameuser")
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", currentUidUser),
                  where('originalId', "==", originalMessageId),
                  where('type', "==", "like")
                  /* orderBy('date', 'desc') */
                  /* limit(30) */
            );

            const removedLikes = originalLikes.filter(function(item){
                  return item !== currentUidUser
            })
            const document = doc(db, "userTimeline" , originalMessageId);
            await updateDoc(document, {
                  likes: removedLikes 
            });

            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  snapshot.docs.map((likeToDelete) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(likeToDelete.id, " => ", likeToDelete.data(), " => ", likeToDelete.data().originalId);
                        changeUpdate(update-1)
                        console.log(update+" "+"RemoveLikeSameUser")      
                        return deleteDoc(doc(db, "userTimeline", likeToDelete.id))
                      });
            unsuscribe();
            })
}

export default RemoveLikeSameUser;