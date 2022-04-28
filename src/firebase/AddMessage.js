import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const AddMessage = ({message, uidUser}) => {
      return addDoc(collection(db, "userTimeline"), {
            message:message,
            uidUser:uidUser
      })
}
 
export default AddMessage;