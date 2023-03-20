import { PlusIcon } from '@heroicons/react/24/solid';

function NewChat() {
    return (
        <div className='border-teal-500 border sideBarRow'>
            <PlusIcon className='h-5 w-5' />
            <p>New Conversation</p>
        </div>
    );
}

export default NewChat;
