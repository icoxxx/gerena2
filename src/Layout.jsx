import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import EfbetAd from "./components/EfbetAd";
import Donate from "./components/Donate";
import { useCookies } from "react-cookie";
import AdModal from "./components/AdModal";

const Layout = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookies, setCookie] = useCookies(['lastVisit']);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 699);

    useEffect(()=> {
        const lastVisit = cookies.lastVisit;
        const threeHours = 3 * 60 * 60 * 1000;
        if((!lastVisit && isMobile) || (new Date() - new Date(lastVisit) > threeHours && isMobile)){
            setIsModalOpen(true);
            setCookie('lastVisit', new Date().toISOString(), {maxAge: threeHours });
        }
    },[cookies, setCookie]);

    const closeModal = ()=> {
        setIsModalOpen(false);
    };

    return (
            <div className="layout">
                <AdModal isOpen={isModalOpen} onClose={closeModal}></AdModal>
                <Donate></Donate>
                <Navigation/>
                <EfbetAd/>
                <Outlet/> 
                <Footer/>
            </div>
    )
}


export default Layout;