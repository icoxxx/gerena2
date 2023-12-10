import React from "react";
import { efbet } from "../assetsExport";

const EfbetAd = ()=> {
    return(
        <section>
            <div className="efbet">
                <a href="https://cdn1.efbet.com/efbet/promotions/landing/promotions.html?utm_source=gerena&utm_medium=cpm&utm_campaign=sport&utm_content=general" target="_blank">
                    <img src={efbet} alt="" />
                </a>
            </div>
        </section>
    )
};

export default EfbetAd;