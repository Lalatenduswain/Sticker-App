import React, { useEffect} from "react";
import getURL from "../../utils/fetchURL";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Navbar from "../Home/Navbar";
import swal from "sweetalert";

function Profile() {
    const navigate = useNavigate();
    useEffect(async () => {
        const url = getURL(window.location.hostname);
        const res = await fetch(`${url}/user/showUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "bearer " + localStorage.getItem("Authorization-Token"),
            },
        });
        const data = await res.json();
        if (res.status !== 200) {
            navigate("/login");
            swal({
                title: "Error!!!",
                text: "You are not logged in please login to access this route",
                icon: "error",
                button: "Continue",
            });
        }
    }, []);

    return (
        <>
            <Navbar />
            <div class="dashboard">
                <div class="content">
                    <h1>
                        Some Text Around User Profile <br /> <span>Motivation</span>{" "}
                        and <span>Impact</span>
                    </h1>
                </div>
            </div>
        </>
    );
}

export default Profile;
