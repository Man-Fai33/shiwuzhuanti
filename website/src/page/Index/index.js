import React from 'react'

export default function Index() {
    return (
        <div className='container-lg mx-8 mt-10 mb-5'>
            <div className='flex rounded-md to-blue-300 w-52 h-52'>
                <div className="flex-none w-48 relative ">
                    <img src="../../res/Img/Cat.jpeg" alt="" className=' absolute inset-0 w-full h-full object-cover' />
                </div>


                <div className=" flex-auto p-6">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-xl font-mono ">  Classic Utility Jacket</h1>

                    </div>
                </div>
            </div>

        </div >
    )
}