import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';
import { Message } from '../types';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (chatRoomId: number) => {
    const response = await api.get<Message[]>(`/chat_rooms/${chatRoomId}/messages`);
    return response.data;
});

type MessagesState = {
    list: Message[];
};

const initialState: MessagesState = {
    list: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action) {
            state.list.push(action.payload);
        },
        removeMessage(state, action) {
            state.list = state.list.filter(message => message.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export const { addMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
