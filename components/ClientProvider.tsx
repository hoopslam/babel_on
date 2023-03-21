'use client';

import { Toaster } from 'react-hot-toast';

import React from 'react';

function ClientProvider() {
    return (
        <>
            <Toaster position='top-right' />
        </>
    );
}

export default ClientProvider;
