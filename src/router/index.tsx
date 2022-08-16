import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgotPass from "../pages/Auth/ForgotPass";
import ResetPass from "../pages/Auth/ResetPass";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";
import Verification from "../pages/Auth/Verification";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Welcome from "../pages/Welcome";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
//

const App = () => {

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Welcome />
              </PublicRoute>
            }
          >
            <Route path="signin" element={<Signin/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="verification" element={<Verification/>}/>
            <Route path="reset-password" element={<ResetPass/>} />
            <Route path="forgot-password" element={<ForgotPass/>} />
            <Route index element={<Navigate to="signin" />}/>
          </Route>
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
