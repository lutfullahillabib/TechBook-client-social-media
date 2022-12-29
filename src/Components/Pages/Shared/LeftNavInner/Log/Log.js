import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Log = () => {

    const [isModal, setIsModal] = useState(true);

    return (
        <section>

            <input type="checkbox" id="login" className="modal-toggle" />

            <div className="modal">

                <div className="modal-box relative border-2 m-0 p-0">
                    {/* max-h-[95%] max-w-5xl */}

                    <label
                        htmlFor="login"
                        className="btn btn-sm btn-white hover:bg-blue-600/25 btn-outline btn-circle absolute right-3 top-3"
                        onClick={() => setIsModal(true)}
                    >

                        ✕

                    </label>

                    {/*  */}

                    {isModal && (
                        <>
                            <Login setIsModal={setIsModal} isModal={isModal} />
                        </>
                    )}

                    {/*  */}

                    {!isModal && (
                        <>
                            <Register setIsModal={setIsModal} isModal={isModal} />
                        </>
                    )}

                </div>

            </div>

        </section>
    );
};

export default Log;

