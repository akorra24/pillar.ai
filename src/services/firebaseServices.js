import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { getUserData } from "./saveLogin";
import { json } from "react-router-dom";

export async function getFireStoreData(uid) {
  try {
    const userDoc = doc(firestore, "users", uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error);
    return null;
  }
}

export async function newUserData(userData) {
  try {
    const userDoc = doc(firestore, "users", userData.uid);
    await setDoc(userDoc, userData);
  } catch (error) {
    console.error("Error creating new user data in Firestore:", error);
  }
}

export async function updateCurrentForm(currentForm) {
  try {
    const userData = getUserData();
    const userDoc = doc(firestore, "users", userData.uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      let userForms = docSnap.data().forms;
      if (userForms) {
        userForms = userForms.map((form) => JSON.parse(form));
        const currentFormIndex = userForms.findIndex(
          (form) => form.id === currentForm.id
        );
        if (currentFormIndex !== -1) {
          userForms[currentFormIndex] = currentForm;
        } else {
          userForms.push(currentForm);
        }
      } else {
        userForms = [currentForm];
      }
      //stringify the form data
      userForms = userForms.map((form) => JSON.stringify(form));
      await setDoc(userDoc, { forms: userForms }, { merge: true });
    } else {
      console.error("No user document found");
    }
  } catch (error) {
    console.error("Error updating current form in Firestore:", error);
  }
}
