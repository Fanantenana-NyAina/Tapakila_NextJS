import Image from 'next/image'
import React from 'react'

export default function About() {
    return (
        <div className='flex flex-col lg:flex-row font-mono text-white about-section'>
            <div className='w-full flex justify-center items-center flex-col-reverse gap-10'>
                <div className='text-xl md:text-2xl font-bold mb-3 bg-[#125876cd] h-18 md:w-fit w-80 md:px-3 py-5 rounded-full'>
                    <h1 className='text-center'>What we really <span className='font-bold text-[#009de0]'>Do </span> ?</h1>
                </div>

                <div className='border-[#009de0] border-3 rounded-full w-fit mt-18'>
                    <div className='border-[#0a1128] border-3 rounded-full'>
                        <div className='border-white border-3 rounded-full'>
                            <Image src="/grateful1-removebg-preview.png" alt="logo" width={400} height={300} className='rounded-full w-96' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center items-center'>
                <div className='px-8'>
                    <h1 className="font-bold text-3xl lg:text-4xl mb-5 w-full text-center">
                        About <span className="text-[#009de0]">Tapakila</span> -{" "}
                        <span className="underline">Know us more!</span>
                    </h1>
                    <p className='text-[0.88rem] lg:text-xl text-center lg:w-2xl'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit voluptatem vel ipsam ipsum quam dolore sapiente in sunt ut! Nisi inventore molestiae laborum soluta, aliquam voluptates consequatur quae dicta quos.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod expedita neque odit aliquam maxime nobis hic, nesciunt excepturi earum ea modi reiciendis natus in vitae, est vero? Quisquam, quasi perspiciatis!
                    </p>
                </div>
            </div>

        </div>
    )
}
