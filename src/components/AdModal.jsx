import React, { useEffect } from "react";

const AdModal = ({isOpen, onClose})=> {

    useEffect(() => {
        if(isOpen){
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
    
            catch (e) {
    
            }
        }

    },[isOpen]);
    const closeModal = ()=> {
        onClose();
    }
    return(
        isOpen && (
            <div className="modal-overlay">
                <div className="modal">
                        <section>
                            <ins className={`adsbygoogle modal-ad`}
                            style={{ display: "block", maxWidth: '100%', maxHeight: '100%', textAlign: "center" }}
                            data-ad-client="ca-pub-2309670898258044"
                            data-ad-slot='auto'
                            data-ad-format='fluid'
                            data-full-width-responsive="true"
                            >
                                <div className="close-ad" onClick={closeModal}>
                                    <span></span>
                                </div>
                            </ins>
                        </section>
                </div>
          </div>
        )
    )
};

export default AdModal;