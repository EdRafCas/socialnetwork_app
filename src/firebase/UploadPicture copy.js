import { getDownloadURL, ref, uploadBytes  } from "firebase/storage"
import { storage } from "./FirebaseConfig";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, collection, onSnapshot, orderBy, query, where, deleteDoc } from "firebase/firestore";



const UploadPicture = async(file, user ,setLoading) => {
      const fileRef= ref(storage, user.uid)
      
      setLoading(true);
      const snapshot = await uploadBytes(fileRef, file);

      const newPhotoURL = await getDownloadURL(fileRef); 

      updateProfile(user, {photoURL: newPhotoURL})


      setLoading(false);
      console.log("upload done")
}
export default UploadPicture;