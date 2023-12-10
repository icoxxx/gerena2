import React, { useEffect } from "react";

const AdComponent = ({format, layout, className})=> {
    useEffect(() => {

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {

        }

    },[]);


    return (
        <div className="ad-wrap">
            <ins className={className ? `adsbygoogle ${className}` : 'adsbygoogle'}
                style={{ display: "block", width: '100%', textAlign: "center" }}
                data-ad-client="ca-pub-2309670898258044"
                data-ad-slot='auto'
                data-ad-format={format}
                data-ad-layout={layout}
                data-full-width-responsive="true"
                >
            </ins>
        </div>
    )
};

export default AdComponent;