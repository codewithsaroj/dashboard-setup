import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidenav from "./components/Sidenav";
import CustomersList from "./components/Customer/CustomersList";
import CustomerRegistration from "./components/Customer/CustomerRegistrationForm";
import { checkAuthStatus } from "./utils/authUtils";

const App = () => {
  const isLoggedIn = checkAuthStatus();
  const userRole = window.localStorage.getItem("userRole");

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<CustomerRegistration />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Navigate to="/" />} />
          {isLoggedIn && userRole === "SuperAdmin" ? (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route element={<Sidenav />}>
                <Route path="/home" element={<Home />} />
                <Route path="/customer-list" element={<CustomersList />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route element={<Sidenav />}>
                <Route path="/home" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
