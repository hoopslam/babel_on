import SideBar from '../components/SideBar';
import SessionProvider from '../providers/SessionProvider';
import { getServerSession } from 'next-auth';
import '../styles/globals.css';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import ClientProvider from '../components/ClientProvider';

export const metadata = {
    title: 'Babel Buddy',
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
            <body>
                <SessionProvider session={session}>
                    {session ? (
                        <>
                            <ClientProvider />
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
