// src/components/ChatRoomList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatRooms, setCurrentChatRoom, removeChatRoom } from '@/store/chatRoomsSlice'; // removeChatRoom をインポート
import { RootState, AppDispatch } from '../store';
import { Box, List, ListItem, ListIcon, IconButton, Text } from '@chakra-ui/react';
import { ChatIcon, DeleteIcon } from '@chakra-ui/icons';
import ChatRoomCreate from './ChatRoomCreate';
import { deleteChatRoom } from '@/services/chatRoomService';
import { ChatRoom } from "@/types"; // 削除API呼び出し

const ChatRoomList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const chatRooms = useSelector((state: RootState) => state.chatRooms.list);
    const currentChatRoom = useSelector((state: RootState) => state.chatRooms.currentChatRoom);

    useEffect(() => {
        dispatch(fetchChatRooms());
    }, [dispatch]);

    const handleChatRoomClick = (chatRoom: ChatRoom) => {
        dispatch(setCurrentChatRoom(chatRoom));
    };

    // const handleDelete = async (chatRoomId: number) => {
    //     const confirm = window.confirm('本当にチャットルームを削除しますか？');
    //     if (!confirm) return;
    //
    //     try {
    //         await deleteChatRoom(chatRoomId);
    //         dispatch(removeChatRoom(chatRoomId)); // ストアからチャットルームを削除
    //     } catch (error) {
    //         alert('チャットルームの削除に失敗しました。');
    //     }
    // };
    const handleDelete = async (chatRoomId: number) => {
        const confirmDelete = window.confirm('本当にチャットルームを削除しますか？');
        if (!confirmDelete) return;

        try {
            await dispatch(removeChatRoom(chatRoomId)).unwrap();
            // `removeChatRoom.fulfilled` によりストアが更新される
        } catch (error) {
            alert('チャットルームの削除に失敗しました。');
        }
    };

    return (
        <div>
            <h2>チャットルーム一覧</h2>
            <List spacing={3}>
                {chatRooms.map((room) => (
                    <ListItem
                        key={room.id}
                        onClick={() => handleChatRoomClick(room)}
                        cursor="pointer"
                        bg={currentChatRoom?.id === room.id ? 'blue.100' : 'white'}
                        p={3}
                        borderRadius="md"
                        _hover={{ bg: 'blue.50' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box display="flex" alignItems="center" onClick={() => handleChatRoomClick(room)}>
                            <ListIcon as={ChatIcon} color="blue.500" />
                            <Text>{room.name}</Text>
                        </Box>
                        <IconButton
                            icon={<DeleteIcon />}
                            aria-label="チャットルームを削除"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation(); // クリックイベントのバブリングを防ぐ
                                handleDelete(room.id);
                            }}
                        />
                    </ListItem>
                ))}
            </List>

            <ChatRoomCreate />
        </div>
    );
};

export default ChatRoomList;
