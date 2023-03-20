export default function Home() {
    return (
        <main className='flex flex-col flex-1 items-center justify-center h-screen px-2'>
            <div className='mb-20'>
                <h1 className='text-5xl font-bold text-sky-500'>Babel On</h1>
                <h2 className='text-teal-500'>Your AI Language Assistant</h2>
            </div>
            <div className='infoText'>
                <p>What is your native language?</p>
                <p>Choose the language you wish to learn</p>
            </div>
        </main>
    );
}
