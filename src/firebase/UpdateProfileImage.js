import { getDownloadURL, ref, uploadBytes  } from "firebase/storage"
import { db, storage } from "./FirebaseConfig";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc} from "firebase/firestore";


const UpdateProfileImage = async({file, user ,changeLoading, id, newName, newBio}) => {
      const fileRef= ref(storage, user.uid)
      
      changeLoading(true);
      const snapshot = await uploadBytes(fileRef, file);

      const newPhotoURL = await getDownloadURL(fileRef); 

      updateProfile(user, {photoURL: newPhotoURL})

      const document = doc(db, "userInfo" , id)
      updateDoc(document, {
            name:newName,
            bio:newBio,
            photoURL:newPhotoURL}); 

            changeLoading(false);
      console.log("upload done")
}
export default UpdateProfileImage;