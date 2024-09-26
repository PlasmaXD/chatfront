// services/messageService.ts
import api from './api';

export interface SuggestedReplyResponse {
    success?: boolean;
    suggested_reply?: string;
    error?: string;
}

/**
 * メッセージを送信する関数
 * @param messageData - 送信するメッセージのデータ
 * @returns 送信されたメッセージのデータ
 */
export const sendMessage = async (messageData: { content: string; chatRoomId: number }) => {
    try {
        const response = await api.post(`/chat_rooms/${messageData.chatRoomId}/messages`, {
            message: { content: messageData.content }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

/**
 * 推奨返答を取得する関数
 * @param chatRoomId - チャットルームのID
 * @returns 推奨される返答の文字列
 */
// export const fetchSuggestedReply = async (chatRoomId: string): Promise<string> => {
//     try {
//         const response = await api.get<SuggestedReplyResponse>(`/chat_rooms/${chatRoomId}/messages/suggest_reply`);
//         if (response.data.suggested_reply) {
//             return response.data.suggested_reply;
//         } else {
//             throw new Error(response.data.error || '推奨返答の取得に失敗しました。');
//         }
//     } catch (error) {
//         console.error('Error fetching suggested reply:', error);
//         throw error;
//     }
// };

// messageService.ts
export const fetchSuggestedReply = async (chatRoomId: number, limit: number) => {
    try {
        const response = await api.get(`/chat_rooms/${chatRoomId}/messages/suggest_reply`, {
            params: { limit: limit } // 指定されたメッセージ数をパラメータとして送信
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching suggested reply:', error);
        throw error;
    }
};

/**
 * メッセージを削除する関数
 * @param chatRoomId - チャットルームのID
 * @param messageId - 削除するメッセージのID
 */
export const deleteMessage = async (chatRoomId: number, messageId: number): Promise<void> => {
    try {
        const response = await api.delete(`/chat_rooms/${chatRoomId}/messages/${messageId}`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};
