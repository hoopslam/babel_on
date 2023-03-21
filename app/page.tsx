import Title from '../components/Title';

export default function Home() {
    return (
        <main className='flex flex-col flex-1 items-center justify-center h-full px-2'>
            <Title />

            <div className='infoText'>
                <p>What is your native language?</p>
                <p>Choose the language you wish to learn</p>
            </div>
        </main>
    );
}
