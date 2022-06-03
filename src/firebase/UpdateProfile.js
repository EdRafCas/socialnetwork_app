import { db } from "./FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


const UpdateProfile = async({id,newName,newBio}) => {
      console.log(id,newName,newBio)
      const document = doc(db, "userInfo" , id); 
      return await updateDoc(document, {
            name:newName,
            bio:newBio
      }); 
}
export default UpdateProfile;