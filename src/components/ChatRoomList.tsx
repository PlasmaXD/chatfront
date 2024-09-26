import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatRooms, setCurrentChatRoom } from '@/store/chatRoomsSlice';
import { RootState, AppDispatch } from '../store';
import { List, ListItem, ListIcon } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import ChatRoomCreate from './ChatRoomCreate'; // チャットルーム作成フォーム

const ChatRoomList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const chatRooms = useSelector((state: RootState) => state.chatRooms.list);
    const currentChatRoom = useSelector((state: RootState) => state.chatRooms.currentChatRoom);

    useEffect(() => {
        dispatch(fetchChatRooms());
    }, [dispatch]);

    const handleChatRoomClick = (chatRoom: ChatRoom) => {
        dispatch(setCurrentChatRoom(chatRoom));  // 修正：チャットルームオブジェクトを渡す
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
                        bg={currentChatRoom?.id === room.id ? 'blue.100' : 'white'} // 選択されたルームをハイライト
                        p={3}
                        borderRadius="md"
                        _hover={{ bg: 'blue.50' }}
                    >
                        <ListIcon as={ChatIcon} color="blue.500" />
                        {room.name}
                    </ListItem>
                ))}
            </List>

            {/* チャットルーム作成フォーム */}
            <ChatRoomCreate />
        </div>
    );
};

export default ChatRoomList;
