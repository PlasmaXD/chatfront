// pages/chat_rooms/[id].tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../store/messagesSlice';
import { RootState, AppDispatch } from '../../store';
import ChatWindow from '../../components/ChatWindow';
import { Box, Text } from '@chakra-ui/react';

const ChatRoomPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch<AppDispatch>();
    const { currentChatRoom } = useSelector((state: RootState) => state.chatRooms);
    const { token } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else if (id) {
            dispatch(fetchMessages(Number(id)));
        }
    }, [dispatch, id, token, router]);

    if (!currentChatRoom) {
        return <Text>チャットルームを読み込んでいます...</Text>;
    }

    return (
        <Box p={4}>
            <Text fontSize="2xl" mb={4}>{currentChatRoom.name}</Text>
            <ChatWindow />
        </Box>
    );
};

export default ChatRoomPage;
