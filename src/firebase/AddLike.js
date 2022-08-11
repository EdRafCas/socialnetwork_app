import { db } from "./FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


const AddLike = async({id,uidUser,likes,update,changeUpdate}) => {
      console.log(id,uidUser,likes)
      console.log(update)
      changeUpdate(update+1)
      const document = doc(db, "userTimeline" , id);
      console.log(document) 
      
      return await updateDoc(document, {
            likes: [...likes, uidUser] 
      }); 
}
export default AddLike;