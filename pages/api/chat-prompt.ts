import { queryOpenAI } from '../../util/openai';
import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { adminDb } from '../../firebaseAdmin';
import { FirebaseMessage } from '../../typings.d';

interface Data {
    answer: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        message,
        chatId,
        learningLanguage = `Korean`,
        nativeLanguage = `English`,
        session,
    } = req.body;

    if (!message) {
        res.status(400).json({
            answer: `Please provide a prompt`,
        });
        return;
    }

    if (!chatId) {
        res.status(400).json({
            answer: `Please provide a valid chat ID`,
        });
        return;
    }

    //Query Messages from DB
    const messagesRef = adminDb
        .collection('users')
        .doc(session?.user?.email)
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'asc');
    const snapshot = await messagesRef.get();
    const messages = snapshot.docs.map((doc) => doc.data().message);

    //query OpenAI with Messages Context
    const AIResponse = await queryOpenAI(
        messages,
        learningLanguage,
        nativeLanguage
    );

    //If successful response, add AI response to database for more chat context
    if (AIResponse) {
        const firebaseMessage: FirebaseMessage = {
            message: {
                role: AIResponse.role,
                content: AIResponse.content,
            },
            createdAt: admin.firestore.Timestamp.now(),
            user: {
                _id: `AI Teacher`,
                name: `AI Teacher`,
                avatar: ``,
            },
        };
        //Add AI Response to DB
        await adminDb
            .collection('users')
            .doc(session?.user?.email)
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .add(firebaseMessage);

        res.status(200).json({ answer: firebaseMessage.message.content });
    }
    res.status(400);
}
