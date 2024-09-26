// services/chatService.ts
import api from './api';

export interface SuggestedReplyResponse {
    success: boolean;
    suggested_reply?: string;
    error?: string;
}

/**
 * 推奨返答を取得する関数
 * @param conversationId - 会話のID
 * @returns 推奨される返答の文字列
 */
export const fetchSuggestedReply = async (conversationId: string): Promise<string> => {
    try {
        const response = await api.get<SuggestedReplyResponse>('/api/v1/messages/suggest_reply', {
            params: { conversation_id: conversationId },
        });

        if (response.data.success && response.data.suggested_reply) {
            return response.data.suggested_reply;
        } else {
            throw new Error(response.data.error || '推奨返答の取得に失敗しました。');
        }
    } catch (error) {
        console.error('Error fetching suggested reply:', error);
        throw error;
    }
};
