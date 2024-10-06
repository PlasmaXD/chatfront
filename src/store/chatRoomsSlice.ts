import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { ChatRoom } from '../../types';

// チャットルームの一覧を取得する非同期アクション
export const fetchChatRooms = createAsyncThunk('chatRooms/fetchChatRooms', async () => {
    const response = await api.get<ChatRoom[]>('/chat_rooms');
    return response.data;
});
// チャットルームを削除する非同期アクション
export const removeChatRoom = createAsyncThunk('chatRooms/removeChatRoom', async (chatRoomId: number) => {
    await api.delete(`/chat_rooms/${chatRoomId}`);
    return chatRoomId;
});

// チャットルームの状態管理
type ChatRoomsState = {
    list: ChatRoom[];
    currentChatRoom: ChatRoom | null;
    loading: boolean;          // 追加: ローディング状態
    error: string | null;      // 追加: エラーメッセージ
};

const initialState: ChatRoomsState = {
    list: [],
    currentChatRoom: null,
    loading: false,
    error: null,
};

const chatRoomsSlice = createSlice({
    name: 'chatRooms',
    initialState,
    reducers: {
        // チャットルームを選択するアクション
        setCurrentChatRoom(state, action: PayloadAction<ChatRoom>) {
            state.currentChatRoom = action.payload;
        },
    },
    extraReducers: (builder) => {
        // チャットルームの取得が成功した場合
        builder
            .addCase(fetchChatRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChatRooms.fulfilled, (state, action: PayloadAction<ChatRoom[]>) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchChatRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'チャットルームの取得に失敗しました。';
            })

            // チャットルームの削除が成功した場合
            .addCase(removeChatRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeChatRoom.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.list = state.list.filter(room => room.id !== action.payload);
                // もし削除されたチャットルームが現在選択されている場合はクリア
                if (state.currentChatRoom?.id === action.payload) {
                    state.currentChatRoom = null;
                }
            })
            .addCase(removeChatRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'チャットルームの削除に失敗しました。';
            });
    },
});

export const { setCurrentChatRoom } = chatRoomsSlice.actions;
export default chatRoomsSlice.reducer;
