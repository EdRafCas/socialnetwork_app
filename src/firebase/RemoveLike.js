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
const RemoveLike = async({update,changeUpdate,newLikeId, originalId, likeUidUser, currentUidUser,originalRetweets, currentMessageId}) => {
      if(likeUidUser === currentUidUser){
            await deleteDoc(doc(db, "userTimeline", newLikeId))
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
}
export default RemoveLike;