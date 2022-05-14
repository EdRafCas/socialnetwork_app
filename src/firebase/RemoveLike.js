import { db } from "./FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


const RemoveLike = async({id,uidUser,likes}) => {
      const removedLike = likes.filter(function(item){
            return item !== uidUser
      })
      const document = doc(db, "userTimeline" , id); 
      return await updateDoc(document, {
            likes: removedLike 
      }); 
}
export default RemoveLike;