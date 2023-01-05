import { createContext } from "react";
const UserContext =createContext({
    user : null,
    role : "visitor"
})

export default UserContext;