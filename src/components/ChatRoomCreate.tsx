import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Input, Button } from '@chakra-ui/react';
import { createIndividualChatRoom } from '../services/chatRoomService'; // 個別チャットルーム作成のAPIを呼び出す関数
import { fetchChatRooms } from '../store/chatRoomsSlice'; // チャットルームを再取得するアクション

const ChatRoomCreate: React.FC = () => {
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user1.trim() && user2.trim()) {
            await createIndividualChatRoom(user1, user2);
            dispatch(fetchChatRooms()); // チャットルームのリストを再取得
            setUser1('');
            setUser2('');
        }
    };

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" width="100%" mb={4}>
            <form onSubmit={handleSubmit}>
                <Input
                    value={user1}
                    onChange={(e) => setUser1(e.target.value)}
                    placeholder="ユーザー1のIDを入力"
                    mb={2}
                />
                <Input
                    value={user2}
                    onChange={(e) => setUser2(e.target.value)}
                    placeholder="ユーザー2のIDを入力"
                    mb={2}
                />
                <Button type="submit" colorScheme="blue">
                    個別チャットルームを作成
                </Button>
            </form>
        </Box>
    );
};

export default ChatRoomCreate;
