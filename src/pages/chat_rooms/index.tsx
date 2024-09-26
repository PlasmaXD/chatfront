// pages/chat_rooms.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRooms, setCurrentChatRoom } from '../../store/chatRoomsSlice';
import { RootState, AppDispatch } from '../../store';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ChatRoomsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { list: chatRooms } = useSelector((state: RootState) => state.chatRooms);
    const { token } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!token) {
            router.push('/login'); // トークンがない場合はログインページにリダイレクト
        } else {
            dispatch(fetchChatRooms());
        }
    }, [dispatch, token, router]);

    const handleChatRoomClick = (chatRoomId: number) => {
        dispatch(setCurrentChatRoom(chatRoomId));
        router.push(`/chat_rooms/${chatRoomId}`);
    };

    return (
        <Box p={4}>
            <Text fontSize="2xl" mb={4}>チャットルーム一覧</Text>
            <VStack spacing={4} align="stretch">
                {chatRooms.map((room) => (
                    <Button key={room.id} onClick={() => handleChatRoomClick(room.id)}>
                        {room.name}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};

export default ChatRoomsPage;
