import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPass from "../pages/Auth/ForgotPass";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome";
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
            <Route path="/" element={<Signin/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="forgotpassword" element={<ForgotPass/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
