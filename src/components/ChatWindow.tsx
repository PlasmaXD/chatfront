import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, addMessage, removeMessage as deleteMessage } from '../store/messagesSlice';
import { RootState, AppDispatch } from '../store';
import { sendMessage, deleteMessage as apiDeleteMessage, fetchSuggestedReply } from '@/services/messageService';
import { Box, Input, Button, VStack, Text, IconButton, useToast } from '@chakra-ui/react';
import { Message } from '../types';
import { DeleteIcon } from '@chakra-ui/icons';

const ChatWindow: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const toast = useToast();

    const messages = useSelector((state: RootState) => state.messages.list);
    const currentChatRoom = useSelector((state: RootState) => state.chatRooms.currentChatRoom);
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const [messageContent, setMessageContent] = useState('');
    const [suggestedReply, setSuggestedReply] = useState<string | null>(null);

    useEffect(() => {
        if (currentChatRoom) {
            dispatch(fetchMessages(currentChatRoom.id));
        }
    }, [currentChatRoom, dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (messageContent.trim() !== '' && currentUser && currentChatRoom) {
            try {
                await sendMessage({ content: messageContent, chatRoomId: currentChatRoom.id });
                setMessageContent('');
            } catch (error) {
                console.error('Error sending message:', error);
                toast({
                    title: 'メッセージの送信に失敗しました。',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    const handleDelete = async (messageId: number) => {
        if (currentChatRoom) {
            try {
                await deleteMessage(currentChatRoom.id, messageId);
                toast({
                    title: 'メッセージが削除されました。',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } catch (error) {
                console.error('Error deleting message:', error);
                toast({
                    title: 'メッセージの削除に失敗しました。',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };


    // 新たなメッセージが追加された時の処理
    useEffect(() => {
        const latestMessage = messages[messages.length - 1];

        // 最新メッセージが自分のものではなく、相手から送信された場合のみ推奨返信を生成
        if (latestMessage && latestMessage.user.id !== currentUser?.id) {
            // 推奨返信を取得
            fetchSuggestedReply(currentChatRoom?.id.toString() || '')
                .then(reply => setSuggestedReply(reply))
                .catch(error => {
                    console.error('Error fetching suggested reply:', error);
                    toast({
                        title: '推奨返信の取得に失敗しました。',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                });
        }
    }, [messages, currentUser, currentChatRoom, toast]);

    if (!currentChatRoom) {
        return <div>チャットルームを選択してください</div>;
    }

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text fontSize="xl" mb={4}>
                {currentChatRoom?.name}
            </Text>
            <VStack align="start" spacing={2} mb={4}>
                {messages.map((msg) => (
                    <Box key={msg.id} p={2} bg="gray.100" borderRadius="md" width="100%" position="relative">
                        <Text fontWeight="bold">{msg.user?.name || 'Unknown'}:</Text>
                        <Text>{msg.content}</Text>
                        {msg.user?.id === currentUser?.id && (
                            <IconButton
                                icon={<DeleteIcon />}
                                aria-label="メッセージを削除"
                                size="sm"
                                position="absolute"
                                top="4px"
                                right="4px"
                                onClick={() => handleDelete(msg.id)}
                            />
                        )}
                    </Box>
                ))}
            </VStack>

            {/* 推奨返信を表示 */}
            {suggestedReply && (
                <Box mt={4} p={3} bg="blue.50" borderRadius="md">
                    <Text fontWeight="bold">おすすめの返答:</Text>
                    <Text>{suggestedReply}</Text>
                </Box>
            )}

            <form onSubmit={handleSubmit}>
                <Input
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="メッセージを入力"
                    mb={2}
                />
                <Button type="submit" colorScheme="blue">
                    送信
                </Button>
            </form>
        </Box>
    );
};

export default ChatWindow;
