import { BrowserRouter as Router, Routes, Route, Navigate }  from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";

function PrivateRoute({children}){
  const {user}=useAuth();
  return user? children : <Navigate to="/login"/>;
}


export default function App(){
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route
          path="/*"
          element={
            <PrivateRoute>
              {/* Main app components here */}
              <div className="text-xl text-green-700 p-4">
                Welcome, you are loggd in!
              </div>
            </PrivateRoute>
          }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}