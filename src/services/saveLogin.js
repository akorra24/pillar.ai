import { getFireStoreData, newUserData } from "./firebaseServices";

// Function to save user data to local storage
export function saveUserData(userData) {
  let user = getFireStoreData(userData.uid);
  if (user) {
    localStorage.setItem("userData", JSON.stringify(user));
  } else {
    newUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  }
}

// Function to get user data from local storage
export function getUserData() {
  const userData = localStorage.getItem("userData");
  return JSON.parse(userData);
}

// Function to clear user data from local storage
export function clearUserData() {
  localStorage.removeItem("userData");
}
