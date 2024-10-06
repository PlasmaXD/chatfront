// import api from './api';
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// export const createIndividualChatRoom = async (user1: string, user2: string) => {
//     try {
//         const response = await api.post('/chat_rooms', {
//             chat_room: {
//                 room_type: 'individual_chat',
//                 users: [user1, user2],
//             },
//         }, {
//             withCredentials: true, // セッション情報を含める
//         });
//         return response.data;
//     } catch (error) {
//         console.error('個別チャットルームの作成に失敗しました:', error);
//         throw error;
//     }
// };
export const createIndividualChatRoom = async (userId1: number, userId2: number) => {
    try {
        const response = await axios.post('http://localhost:3000/chat_rooms', {
            chat_room: {
                name: `Chat between ${userId1} and ${userId2}`, // 名前を設定
                room_type: 'individual_chat',
                users: [userId1, userId2],
            },
        }, {
            withCredentials: true, // セッション情報を含める
        });
        return response.data;
    } catch (error) {
        console.error('Error creating chat room:', error);
        throw error;
    }
};
export const deleteChatRoom = async (chatRoomId: number) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/chat_rooms/${chatRoomId}`, {
            headers: {
                'Accept': 'application/json', // JSONレスポンスを期待
            },
            withCredentials: true, // セッション情報を含める
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting chat room:', error);
        throw error;
    }
};