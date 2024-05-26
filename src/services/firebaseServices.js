import { doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { getUserData } from "./saveLogin";

export function getFireStoreData(uid) {
  try {
    const userDoc = doc(firestore, "users", uid);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error);
    return null;
  }
}

export function updateCurrentForm(currentForm) {
  try {
    const userData = getUserData();
    const userDoc = doc(firestore, "users", userData.uid);
    // check is there user forms exists a form with currentForm id if then update it els push to forms array
    const userForms = userDoc.data().forms;
    const currentFormIndex = userForms.findIndex(
      (form) => form.id === currentForm.id
    );
    if (currentFormIndex !== -1) {
      userForms[currentFormIndex] = currentForm;
    } else {
      userForms.push(currentForm);
    }
  } catch (error) {
    console.error("Error updating current form in Firestore:", error);
  }
}
