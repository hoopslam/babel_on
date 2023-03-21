import SideBar from '../components/SideBar';
import SessionProvider from '../providers/SessionProvider';
import { getServerSession } from 'next-auth';
import '../styles/globals.css';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from '@/components/Login';

export const metadata = {
    title: 'Babel On',
    description: 'Your Language AI Assistant',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang='en'>
            <body className='dark:bg-[#343541]'>
                <SessionProvider session={session}>
                    {session ? (
                        <>
                            <SideBar />
                            {children}
                        </>
                    ) : (
                        <Login />
                    )}
                </SessionProvider>
            </body>
        </html>
    );
}
