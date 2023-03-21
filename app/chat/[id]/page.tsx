import ChatInput from '../../../components/ChatInput';
import ChatScreen from '../../../components/ChatScreen';

interface Props {
    params: {
        id: string;
    };
}

function ChatPage({ params: { id } }: Props) {
    return (
        <section className='flex flex-col h-screen overflow-hidden flex-1 py-12'>
            <ChatScreen chatId={id} />
            <ChatInput chatId={id} />
        </section>
    );
}

export default ChatPage;
