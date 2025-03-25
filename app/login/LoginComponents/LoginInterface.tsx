'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LoginInterface() {
    const backendURL = "";
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
            await new Promise(res => setTimeout(res, 300));
            displayWelcome();
        };

        const displayWelcome = async () => {
            for (let i = 0; i <= weclome.length; i++) {
                setWelcomed(weclome.substring(0, i));
                await new Promise(res => setTimeout(res, 150));
            }
            await new Promise(res => setTimeout(res, 250));
            displayTapakila();
        };

        const displayTapakila = async () => {
            for (let i = 0; i <= tapakila.length; i++) {
                setTapakiling(tapakila.substring(0, i));
                await new Promise(res => setTimeout(res, 150));
            }
            await new Promise(res => setTimeout(res, 200));
            displayText();
        };

        const displayText = async () => {
            const combinedText = text;
            for (let i = 0; i <= combinedText.length; i++) {
                setDisplayedText(combinedText.substring(0, i));
                await new Promise(res => setTimeout(res, 90));
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
            localStorage.setItem("token", data.token);
            router.push("/dashboard");

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
                        className="font-mono font-bold text-white text-3xl text-center"
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

            <div className='w-[42%] flex flex-col justify-center items-center px-8'>
                <h2 className='text-2xl font-bold mb-6'>LOGIN</h2>
                <form className='w-full max-w-sm' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <input
                            type="email"
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <input
                            type="password"
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full bg-[#009de0] text-white py-2 rounded-md hover:bg-[#007bb5] transition duration-300 cursor-pointer'
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                {error && <p className='text-center bg-red-600 text-white mt-4 p-2'>{error}</p>}
            </div>
        </div>
    );
}
