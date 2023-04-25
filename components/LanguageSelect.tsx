'use client';

import React, { useState } from 'react';
import Select from 'react-select';
import NewChat from './NewChat';
import { LANGUAGES } from '@/util/constants';

function LanguageSelect() {
    const [nativeLanguage, setNativeLanguage] = useState(LANGUAGES[0]);
    const [learningLanguage, setLearningLanguage] = useState(
        LANGUAGES[LANGUAGES.length - 1]
    );

    return (
        <div>
            <p className='mb-1 mt-2'>1. Select your Native Language</p>
            <Select
                isSearchable
                options={LANGUAGES}
                placeholder={`Native Language`}
                defaultValue={nativeLanguage}
                //@ts-ignore
                onChange={(value) => setNativeLanguage(value)}
            />
            <p className='mt-4 mb-1'>2. Select your Learning Language</p>
            <Select
                isSearchable
                options={LANGUAGES}
                placeholder={`Learning Language`}
                defaultValue={learningLanguage}
                //@ts-ignore
                onChange={(value) => setLearningLanguage(value)}
            />
            <NewChat
                learningLanguage={learningLanguage.value}
                nativeLanguage={nativeLanguage.value}
            />
        </div>
    );
}

export default LanguageSelect;
