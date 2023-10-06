export const host = "http://localhost:4000";

// Authentication Routes
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const UserPhoto = `${host}/api/auth/user-photo`;

// Messages Routes
export const sendMessageRoute = `${host}/api/messages/add-msg`;
export const getAllMessageRoute = `${host}/api/messages/get-msg`;
