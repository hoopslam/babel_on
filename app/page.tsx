import LanguageSelect from '../components/LanguageSelect';
import Title from '../components/Title';

export default function Home() {
    return (
        <main className='flex flex-col flex-1 items-center justify-center h-full px-2'>
            <Title />
            <div className='infoText'>
                <h2 className='text-lg mb-2'>Create a new language class</h2>
                <p>1: Choose your native language</p>
                <p>2: Choose your target learning language</p>
                <p className='mb-2'>3: Press the Create New Class button!</p>
                <LanguageSelect />
            </div>
        </main>
    );
}
