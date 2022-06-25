import { db } from "./FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const AddLike = async({id,uidUser,likes}) => {
      console.log(id,uidUser,likes)
      const document = doc(db, "userTimeline" , id);
      console.log(document) 
      return await updateDoc(document, {
            likes: [...likes, uidUser] 
      }); 
}
export default AddLike;