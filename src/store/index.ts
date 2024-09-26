// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import chatRoomsReducer from './chatRoomsSlice';
import messagesReducer from './messagesSlice';
import usersReducer from './usersSlice';

const store = configureStore({
    reducer: {
        chatRooms: chatRoomsReducer,
        messages: messagesReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
