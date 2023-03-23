export interface FirebaseMessage {
    message: ChatMessage;
    createdAt: admin.firestore.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}

export enum ROLE {
    USER = 'user',
    ASSISTANT = 'assistant',
}

export interface ChatMessage {
    role: ROLE;
    content: string;
}

export interface FirebaseChat {
    message: FirebaseMessage[];
    createdAt: admin.firestore.Timestamp;
    userId: string;
    language: {
        learningLanguage: string;
        nativeLanguage: string;
    };
}
