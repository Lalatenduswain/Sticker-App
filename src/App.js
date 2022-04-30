import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/userProfile/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import EditProfile from "./Components/userProfile/EditProfile";


function App() {
    window.scrollTo(0, 0);
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/user/editProfile" element={<EditProfile />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
