'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function LoginInterface() {
    const backendURL = "http://localhost:1818/auth/login";
    const hello = "Hello👋";
    const weclome = "Welcome to ";
    const tapakila = "Tapakila";
    const text = ", your event ticketing management platform. Log in to explore events, book your tickets, and manage your reservations with ease.";

    const [sayHello, setSayHello] = useState('');
    const [weclomed, setWelcomed] = useState('');
    const [tapakiling, setTapakiling] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const displayHello = async () => {
            for (let i = 0; i <= hello.length; i++) {
                setSayHello(hello.substring(0, i));
                await new Promise(res => setTimeout(res, 150));
            }
            displayWelcome();
        };

        const displayWelcome = async () => {
            for (let i = 0; i <= weclome.length; i++) {
                setWelcomed(weclome.substring(0, i));
                await new Promise(res => setTimeout(res, 50));
            }
            displayTapakila();
        };

        const displayTapakila = async () => {
            for (let i = 0; i <= tapakila.length; i++) {
                setTapakiling(tapakila.substring(0, i));
                await new Promise(res => setTimeout(res, 250));
            }
            displayText();
        };

        const displayText = async () => {
            const combinedText = text;
            for (let i = 0; i <= combinedText.length; i++) {
                setDisplayedText(combinedText.substring(0, i));
                await new Promise(res => setTimeout(res, 50));
            }
        };

        displayHello();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(backendURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await res.json();
            localStorage.setItem("username", data.username)
            localStorage.setItem("token", data.token);
            router.push("/userprofile");

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className='flex h-screen'>
            <div className='bg-[#0a1128] w-[58%] flex items-center justify-center p-8'>
                <motion.div
                    className='font-mono text-white flex flex-col items-center justify-center w-2xl'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.p
                        className="font-mono font-bold text-white text-3xl text-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        {sayHello}
                    </motion.p>

                    <motion.p
                        className="font-mono text-white text-xl text-center mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 2 }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            {weclomed}
                        </motion.span>
                        <motion.span
                            className="font-bold text-[#009de0]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            {tapakiling}
                        </motion.span>
                        {displayedText}
                    </motion.p>
                </motion.div>
            </div>

            <div className='w-[42%] flex flex-col justify-center items-center px-8 relative font-mono'>
                <div className='top bg-[#009de0] h-full w-full absolute top-0 rounded-bl-full'>
                </div>
                <div className="z-50 flex flex-col items-center justify-center w-78 font-normal">
                    <h2 className='text-4xl font-extrabold mb-6 text-white'>LOGIN</h2>
                    <form className='w-full max-w-sm' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <input
                                type="email"
                                className='bg-white w-full px-4 py-2 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1128]'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <input
                                type="password"
                                className='bg-white w-full px-4 py-2 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a1128]'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex justify-center items-center'>
                            <button
                                type='submit'
                                className='w-30 bg-[#0a1128] text-white py-2 rounded-full hover:bg-green-800 transition duration-200 cursor-pointer'
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                    <Link
                        href="/signUp">
                        create your account
                    </Link>
                    {error && <p className='text-center bg-red-600 text-white mt-4 p-2'>{error}</p>}
                </div>

            </div>
        </div>
    );
}
