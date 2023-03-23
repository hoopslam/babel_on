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
            <p className='text-teal-500 mb-1 mt-2'>Your native language</p>
            <Select
                isSearchable
                options={LANGUAGES}
                placeholder={`Native Language`}
                defaultValue={nativeLanguage}
                onChange={(value) => setNativeLanguage(value)}
            />
            <p className='text-teal-500 mt-2 mb-1'>Your learning language</p>
            <Select
                isSearchable
                options={LANGUAGES}
                placeholder={`Learning Language`}
                defaultValue={learningLanguage}
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
