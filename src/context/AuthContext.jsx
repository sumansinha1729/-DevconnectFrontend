import { createContext, useContext, useState } from "react";

const AuthContext=createContext();

export function AuthProvider({children}){
    const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem("user")) || null);
    const [token,setToken]=useState(()=>localStorage.getItem("token") || "");
    const [loading,setLoading]=useState(false);

    // Login/logout helpers
    const login=(user,token)=>{
        setUser(user);
        setToken(token);
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("token",token);
    };

    const logout=()=>{
        setUser(null);
        setToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return(
        <AuthContext.Provider value={{user,token,login,logout,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )

};

export function useAuth(){
    return useContext(AuthContext);
}