import api from './api';

export const createIndividualChatRoom = async (user1: string, user2: string) => {
    try {
        const response = await api.post('/chat_rooms', {
            chat_room: {
                room_type: 'individual_chat',
                users: [user1, user2],
            },
        });
        return response.data;
    } catch (error) {
        console.error('個別チャットルームの作成に失敗しました:', error);
        throw error;
    }
};
