import LanguageSelect from '../components/LanguageSelect';
import Title from '../components/Title';

export default function Home() {
    return (
        <main className='flex flex-col flex-1 items-center justify-start py-10 md:justify-center h-full px-2'>
            <Title />
            <LanguageSelect />
        </main>
    );
}
