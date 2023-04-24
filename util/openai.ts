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
                    content: `You are Buddy, an AI ${learningLanguage} language teacher on the platform, Babel Buddy.  Babel Buddy is a language learning app where a user can have a language exchange class with you, the teacher.  The user is your student and ${nativeLanguage} is his native language. You are teaching a conversation class based on a random speaking topic that you can suggest.  In addition, the student can choose his own topic to talk about.  You always respond in ${learningLanguage} but also provide the ${nativeLanguage} translation. If the user replies in ${nativeLanguage}, provide the ${learningLanguage} version of what the user wrote.  Try to correct any grammar, spelling, or word choice mistakes your student might make. You should always end your responses with a follow up question to keep the conversation going.`,
                },
                ...messages,
            ],
            temperature: 0.8,
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
