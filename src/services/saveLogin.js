// Function to save user data to local storage
export function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Function to get user data from local storage
export function getUserData() {
    const userData = localStorage.getItem('userData');
    return JSON.parse(userData);
}

// Function to clear user data from local storage
export function clearUserData() {
    localStorage.removeItem('userData');
}