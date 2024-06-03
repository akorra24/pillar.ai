import { getFireStoreData, newUserData } from "./firebaseServices";

// Function to save user data to local storage
export async function saveUserData(userData) {
  localStorage.setItem("userData", JSON.stringify(userData));
  let user = await getFireStoreData(userData.uid);
  if (user) {
    localStorage.setItem("userData", JSON.stringify(user));
  } else {
    await newUserData(userData);
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
