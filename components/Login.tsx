'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

function Login() {
    return (
        <div className='flex-1 max-w-xs flex flex-col items-center justify-center'>
            <p className='text-white p-4'>Sign In to start using Babel On</p>
            <button
                className='sideBarRow px-12'
                onClick={() => signIn('google')}
            >
                Sign In
            </button>
        </div>
    );
}

export default Login;
