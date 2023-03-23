'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
import Title from './Title';

function Login() {
    return (
        <main className='flex w-full flex-col items-center justify-center px-2'>
            <Title />
            <div className='flex flex-col items-center justify-center'>
                <p className='p-4'>
                    Sign In to start chatting with your AI Instructor!
                </p>
                <button
                    className='px-12 py-2 rounded bg-teal-500 hover:bg-teal-600 text-white'
                    onClick={() => signIn('google')}
                >
                    Sign In
                </button>
            </div>
        </main>
    );
}

export default Login;
