import React from 'react';

import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        <section>

            <div className='flex justify-center items-center flex-col my-10 '>

                <RotatingLines
                    strokeColor="blue"
                    strokeWidth="5"
                    animationDuration="0.75"
                    height="300"
                    width="300"
                    visible={true}
                />

            </div>

        </section>
    );
};

export default Loading;


