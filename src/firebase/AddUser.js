import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const AddUser = ({name, lastname, alias, email, birthMonth, birthDay, birthYear, uidUser}) => {
      return addDoc(collection(db, "userInfo"), {
            name:name,
            lastname:lastname,
            alias:alias,
            email:email,
            birthMonth: birthMonth,
            birthDay:birthDay,
            birthYear:birthYear,
            uidUser:uidUser
      })
}
 
export default AddUser;