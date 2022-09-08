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
            console.log("deleting using remove like my like")
                  try{
                        const removedLikes = originalLikes.filter(function(item){
                              return item !== currentUidUser
                        })
                        const document = doc(db, "userTimeline" , originalId); 
                        await updateDoc(document, {
                              likes: removedLikes 
                        });
                        changeUpdate(update-1)    
                        console.log(update+" "+"RemoveLike") 
                  } catch{
                        console.log("error deleting")
                  }
      } else {
            console.log("deleting using remove like not my like ")

            const consult = query(
                  collection(db, 'userTimeline'),
                  where('type', "==", "like"),
                  where('uidUser', "==", currentUidUser),
                  where('originalId', "==", originalMessageId)
                  
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
                        console.log(likeToDelete.id, " => ", likeToDelete.data(), " => ", likeToDelete.data().originalId, "This function is supposed to be for deleating likes");
                        changeUpdate(update-1)
                        console.log(update+" "+" update change after removing like")  
                        return deleteDoc(doc(db, "userTimeline", likeToDelete.id))
                      });
            unsuscribe();
            })
            
            
      }
}

export default RemoveLike;