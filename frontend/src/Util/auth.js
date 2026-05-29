import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => {
    if (!token || token === "undefined") {
        window.alert("invalid token, not saving in ls")
        return;
    }
    localStorage.setItem("token", token);
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const logout = () => {
    localStorage.removeItem("token");
}

export const getRoles = () => {
    const token = getToken();
    if (!token)
        return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.roles;
    } catch (e) {
        console.log("invalid token");
        return

    }
}

export const isAdmin = () => {
    return getRoles()?.includes("ROLE_ADMIN");
}

export const isLoggedIn = () => {
  const token = getToken();
  if(!token)
    return false;

  try{
    jwtDecode(token)
    return true
  }catch(err){
    console.log(err)
    return false;
  }
}