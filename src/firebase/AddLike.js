import { db } from "./FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


const addLike = async({id,uidUser,likes}) => {
      console.log(id,uidUser,likes)
      const document = doc(db, "userTimeline" , id); 
      return await updateDoc(document, {
            likes: [...likes, uidUser] 
      }); 
}
export default addLike;