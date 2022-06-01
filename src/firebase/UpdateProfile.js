import { db } from "./FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


const UpdateProfile = async({id,uidUser,likes}) => {
      console.log(id,uidUser,likes)
      const document = doc(db, "userTimeline" , id); 
      return await updateDoc(document, {
            likes: [...likes, uidUser] 
      }); 
}
export default UpdateProfile;