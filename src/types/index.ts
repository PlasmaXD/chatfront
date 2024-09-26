// types/index.ts
export interface ChatRoom {
    id: number;
    name: string;
}

export interface Message {
    id: number;
    content: string;
    user: User;
}

export interface User {
    id: number;
    name: string;
}
