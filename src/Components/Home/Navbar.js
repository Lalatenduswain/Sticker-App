import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getURL from "../../utils/fetchURL";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import {FaBars,FaTimes} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    let name, value;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [navOpen, setNavOpen] = useState(false);
    const [image, setImage] = useState();
    const [username, setUsername] = useState({
        name: "",
    });
    const [user, setUser] = useState([]);
    const OpenNav = () => {
        setNavOpen(!navOpen);
    };

    useEffect(() => {
    setNavOpen(!navOpen);
    },[]);

    useEffect(async () => {
        const url = getURL(window.location.hostname);
        await fetch(`${url}/user/showUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "bearer " + localStorage.getItem("Authorization-Token"),
            },
        })
            .then(async (res) => {
                if (res) {
                    const data = await res.json();
                    if (
                        data.msg !== "Token Unavailable" &&
                        data.message !== "jwt malformed"
                    ) {
                        setUser(data.user);
                        value = data.user.username;
                        name = "name";
                        setUsername({ ...username, [name]: value });
                    }
                }
            })
    }, []);
    return (
        <>
            <div className="Navbar">
                <div className="title">
                    <Link to="/">
                        <img
                            src={require("../../Images/IndiaCares.png").default}
                            alt=""
                            style={{ width: "160px" }}
                        />
                    </Link>
                    <div className="search">
                        <div className="nav__search">
                            <div className="main-logo">
                                <img
                                    src={
                                        require("../../Images/none.png")
                                            .default
                                    }
                                    alt="Logo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-links-div">
                    <p className="nav-links" id = "Home">
                        <Link to="/" style={{ color: "#000" }}>
                            Home
                        </Link>
                    </p>
                </div>

                <div className="login__part">
                    {username.name ? (
                        <div className="user">
                            <Button
                                id="fade-button"
                                aria-controls={open ? "fade-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            >
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    "aria-labelledby": "fade-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={() => navigate("/profile")}>
                                    View Profile
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        localStorage.removeItem(
                                            "Authorization-Token"
                                        );
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link to="/login" className="login__page">
                            <button>Sign Up</button>
                        </Link>
                    )}
                    <i
                    className="fas"
                    onClick={() => {setNavOpen(!navOpen)}}>
                    {navOpen ? <FaBars /> :<FaTimes />}
                    </i>
                        </div>
            </div>
            <div className={navOpen ? "none" : "mobile__nav"}>
            <div className="mobile-links">
                <p id="Home" className="m-links">
                    <Link to="/" style={{ color: "#000" }}
                    onClick = {(e) => {
                        setNavOpen(!navOpen)
                    }}>
                        Home
                    </Link>
                </p>
                </div>
            </div>
        </>
    );
}

export default Navbar;
