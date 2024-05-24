import BodyBackground from "./assets/body_background.jpg";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Question from "./screens/Question";
import Calendar from "./screens/Calendar";
import FormOverview from "./screens/FormOverview";
import NotFound from "./screens/NotFound";
import Header from "./components/Header";
import SignUp from "./screens/SignUp";
import { getUserData } from "./services/saveLogin";
import Archived from "./screens/Archived";

function App() {
  const userData = getUserData();
  return (
    <div
      style={{
        backgroundImage: `url(${BodyBackground})`,
      }}
      className="bg-center bg-cover bg-no-repeat flex flex-col px-3"
    >
      <Header />
      <Routes>
        <Route path="/" element={userData ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/archived"
          element={userData ? <Archived /> : <Navigate to="/login" />}
        />
        <Route
          path="/calendar/:id"
          element={userData ? <Calendar /> : <Navigate to="/login" />}
        />
        <Route
          path="/question/:id"
          element={userData ? <Question /> : <Navigate to="/login" />}
        />
        <Route
          path="/form-overview"
          element={userData ? <FormOverview /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
