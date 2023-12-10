import React from "react";
import { Link } from "react-router-dom";
import { InlineFollowButtons } from "sharethis-reactjs";
import { logo } from "../assetsExport";

const Footer = ()=> {
    return(
        <footer className="footer">
            <div className="post-follow-btns-footer">
                <p>ПОСЛЕДВАЙ НИ</p>
                <InlineFollowButtons
                        config={{
                            action: false,
                            alignment: 'justified',
                            enabled: true,
                            spacing: 20,
                            networks: [
                              'facebook',
                              'youtube',
                              'instagram',
                            ],
                            radius: 9,
                            profiles: {
                              youtube: '@Gerenabg',
                              facebook: 'gerena.bg',
                              instagram: 'gerena.bg',
                            }                                                   
                          }}
                >
                </InlineFollowButtons>
                <p>Свържете се с нас: office@gerena.bg</p>
            </div>

            <div className="logo-footer">
                <Link to={"/"} className="logo-container">
                    <img src={logo} alt="" />
                </Link>
                <p>
                Gerena.bg е новинарски проект, който поднася новините по различен начин.
                </p>
            </div>

            <div className="frontend">
                <p>Front-end & Design by: Hristiyan Valkov</p>
                <p>E-mail: hristiyanv@gmail.com</p>
            </div>
        </footer>
    )
};

export default Footer;