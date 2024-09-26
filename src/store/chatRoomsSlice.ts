import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { ChatRoom } from '../../types';

// チャットルームの一覧を取得する非同期アクション
export const fetchChatRooms = createAsyncThunk('chatRooms/fetchChatRooms', async () => {
    const response = await api.get<ChatRoom[]>('/chat_rooms');
    return response.data;
});

// チャットルームの状態管理
type ChatRoomsState = {
    list: ChatRoom[];
    currentChatRoom: ChatRoom | null;
};

const initialState: ChatRoomsState = {
    list: [],
    currentChatRoom: null,
};

const chatRoomsSlice = createSlice({
    name: 'chatRooms',
    initialState,
    reducers: {
        // チャットルームを選択するアクション
        setCurrentChatRoom(state, action: PayloadAction<ChatRoom>) {
            state.currentChatRoom = action.payload;  // 修正：オブジェクト全体を設定
        },
    },
    extraReducers: (builder) => {
        // チャットルームの取得が成功した場合
        builder.addCase(fetchChatRooms.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export const { setCurrentChatRoom } = chatRoomsSlice.actions;
export default chatRoomsSlice.reducer;
