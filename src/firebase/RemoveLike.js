import { db } from "./FirebaseConfig";
import { collection, doc, updateDoc, deleteDoc, query, where, onSnapshot} from "firebase/firestore";


/* const RemoveLike = async({id,uidUser,likes, update, changeUpdate}) => {
      console.log(id,uidUser,likes)
      console.log(update)
      changeUpdate(update-1)
      const removedLike = likes.filter(function(item){
            return item !== uidUser
      })
      const document = doc(db, "userTimeline" , id); 
      return await updateDoc(document, {
            likes: removedLike 
      }); 
} */
const RemoveLike = async({update,changeUpdate,newId, originalId, likeUidUser, currentUidUser,originalLikes, originalMessageId}) => {
      if(likeUidUser === currentUidUser){
            await deleteDoc(doc(db, "userTimeline", newId))
                  try{
                        const removedLikes = originalLikes.filter(function(item){
                              return item !== currentUidUser
                        })
                        const document = doc(db, "userTimeline" , originalId); 
                        await updateDoc(document, {
                              likes: removedLikes 
                        });
                        changeUpdate(update-1)      
                  } catch{
                        console.log("error deleting")
                  }
      } else {
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", currentUidUser),
                  where('originalId', "==", originalMessageId)
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
}

export default RemoveLike;