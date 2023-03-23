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
    console.log(learningLanguage);
    try {
        const completion = await openai.createChatCompletion({
            model: `gpt-3.5-turbo`,
            messages: [
                {
                    role: 'system',
                    content: `You are a ${learningLanguage} language teacher.  The user is your student and ${nativeLanguage} is his native language. You are teaching a conversation class based on a speaking topic.  You can either suggest a topic or ask the user what he would like to talk about.  You always respond in ${learningLanguage} but also provide the ${nativeLanguage} translation.  You do not have to provide a romanization. If the user replies in ${nativeLanguage}, provide the ${learningLanguage} version of what the user wrote and encourage him to try to use ${learningLanguage} when writing a response.  Try to correct some of the mistakes your student might make. Try to be humorous. You should ask lots of questions in ${learningLanguage} to stimulate conversation.`,
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
