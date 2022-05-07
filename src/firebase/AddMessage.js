import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const AddMessage = ({message, uidUser, name, lastname, alias, date}) => {
      return addDoc(collection(db, "userTimeline"), {
            message:message,
            uidUser:uidUser,
            name: name,
            lastname: lastname,
            alias: alias,
            date: date
      })
}
 
export default AddMessage;