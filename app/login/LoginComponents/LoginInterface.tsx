'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoginInterface() {
    const text: string = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
    const [displayedText, setDisplayedText] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        let index = 0;

        const displayText = async () => {
            for (index = 0; index <= text.length; index++) {
                setDisplayedText(text.substring(0, index));
                await new Promise(res => setTimeout(res, 100));
            }
        };

        displayText();
    }, []);

    return (
        <div className='flex h-screen'>
            <div className='bg-[#0a1128] w-[58%] flex items-center justify-center'>
                <motion.p
                    className='login-text font-mono text-white text-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {displayedText}
                </motion.p>
            </div>

            <div className='w-[42%] flex flex-col justify-center items-center px-8'>
                <h2 className='text-2xl font-bold mb-6'>LOGIN</h2>
                <form className='w-full max-w-sm'>
                    <div className='mb-4'>
                        <input
                            type="email"
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Email'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <input
                            type="password"
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Password'
                            required
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300'>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
