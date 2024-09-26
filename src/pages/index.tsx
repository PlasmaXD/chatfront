// pages/index.tsx
import React from 'react';
import ChatRoomList from '../components/ChatRoomList';
import dynamic from 'next/dynamic';
import { Flex, Box } from '@chakra-ui/react';

const ChatWindow = dynamic(() => import('../components/ChatWindow'), { ssr: false });

const HomePage: React.FC = () => {
    return (
        <Flex height="100vh">
            <Box width="300px" borderRight="1px solid #ccc">
                <ChatRoomList />
            </Box>
            <Box flex="1">
                <ChatWindow />
            </Box>
        </Flex>
    );
};

export default HomePage;
