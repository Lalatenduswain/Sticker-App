import React from "react";
import Banner from "./Home/Banner";
import Navbar from "./Home/Navbar";
import "./Home.css";

function Home() {
    window.scroll(0, 0);
    return (
        <>
            <Navbar />
            <Banner />
        </>
    );
}

export default Home;
