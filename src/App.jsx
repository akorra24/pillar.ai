import BodyBackground from "./assets/body_background.jpg";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Question from "./screens/Question";
import Calendar from "./screens/Calendar";
import FormOverview from "./screens/FormOverview";
import NotFound from "./screens/NotFound";
import Header from "./components/Header";
import SignUp from "./screens/SignUp";
import { getUserData } from "./services/saveLogin";

function App() {
  const userData = getUserData();
  return (
    <div
      style={{
        backgroundImage: `url(${BodyBackground})`,
      }}
      className="bg-center bg-cover bg-no-repeat flex flex-col px-3 pt-2"
    >
      <Header />
      <Routes>
        <Route path="/" element={userData ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar/:id" element={<Calendar />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="/form-overview" element={<FormOverview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
