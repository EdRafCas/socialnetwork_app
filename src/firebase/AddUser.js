import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const AddUser = ({nameHolder, lastnameHolder, aliasHolder, emailHolder, birthMonth, birthDay, birthYear, uidUser}) => {
      return addDoc(collection(db, "userInfo"), {
            name:nameHolder,
            lastnameHolder:lastnameHolder,
            aliasHolder:aliasHolder,
            emailHolder:emailHolder,
            birthMonth: birthMonth,
            birthDay:birthDay,
            birthYear:birthYear,
            uidUser:uidUser
      })
}
 
export default AddUser;