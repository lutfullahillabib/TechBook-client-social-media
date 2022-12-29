import React from 'react';

const Loading1 = () => {
    return (
        <section>
            <div className='flex flex-col gap-3 justify-center items-center h-[80vh]'>

                <progress className="progress w-8/12 h-6 progress-primary" ></progress>
                <progress className="progress w-8/12 h-6 progress-secondary" ></progress>
                <progress className="progress w-8/12 h-6 progress-accent" ></progress>

                <progress className="progress w-8/12 h-6 progress-success" ></progress>
                <progress className="progress w-8/12 h-6 progress-info" ></progress>

                <progress className="progress w-8/12 h-6 progress-warning" ></progress>
                <progress className="progress w-8/12 h-6 progress-error" ></progress>

            </div>
        </section>
    );
};

export default Loading1;


