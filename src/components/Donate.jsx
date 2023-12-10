import React from "react";

const Donate = ()=> {
    const handleRedirect = () => {
        const url = "https://www.paypal.com/donate?token=QmdONH5ka3VLmEM2r8ByXtdfmnrQpSUB66tu5kyqzKHDq5CNGzhH9t5a9bEmGSCkdXUrSzYeWSzva0vU";
        window.open(url, "_blank");
    };
    return (
        <div onClick={handleRedirect} className="donate">
            <div>
                ПОДКРЕПЕТЕ
                GERENA.BG
            </div>
        </div>
    )
};

export default Donate;