import "./App.css";
import AnimalPage from "./components/pages/AnimalPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ZookeeperPage from "./components/pages/ZookeeperPage";
import Homepage from "./components/pages/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./components/AuthContext";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import NavbarMenu from "./components/NavbarMenu";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavbarMenu />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/animals" element={<AnimalPage />} />
          <Route path="/zookeepers" element={<ZookeeperPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
