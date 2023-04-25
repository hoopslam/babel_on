import { ChatMessage } from '../typings.d';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET,
});

const openai = new OpenAIApi(configuration);

export const queryOpenAI = async (
    messages: ChatMessage[],
    learningLanguage: string,
    nativeLanguage: string
) => {
    try {
        const completion = await openai.createChatCompletion({
            model: `gpt-3.5-turbo`,
            messages: [
                {
                    role: 'system',
                    content: `You are Buddy, a ${learningLanguage} teacher on the platform, Babel Buddy.  Babel Buddy is a language learning app where a user can have a language exchange class with you.  The user is your student and ${nativeLanguage} is his native language. You are leading a conversation class.  At the beginning of class, ask the user if they have a conversation topic they want to talk about today.  Also, suggest a fun conversation topic in case the user doesn't have a specific topic he wants to talk about.  You should always speak in ${learningLanguage} but also provide the ${nativeLanguage} translation. If the user replies in ${nativeLanguage}, provide the ${learningLanguage} version of what the user wrote.  Correct any grammar, spelling, or word choice mistakes your user might make. You should try to end each of your responses with a follow up discussion question to keep the conversation going.`,
                },
                ...messages,
            ],
            temperature: 0.5,
            max_tokens: 1000,
            frequency_penalty: 1,
            presence_penalty: 0,
        });
        return completion.data.choices[0].message as ChatMessage;
    } catch (error) {
        console.log(error);
    }
};

export default openai;
