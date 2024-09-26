// src/hooks/useSuggestedReply.ts

import { useRef, useEffect } from 'react';
import ActionCable from 'actioncable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSuggestedReply } from '../store/messagesSlice';

const useSuggestedReply = (conversationId: string, authToken: string) => {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.messages.list);
    const messagesCountRef = useRef<number>(messages.length);

    useEffect(() => {
        if (!conversationId || !authToken) return;

        const cable = ActionCable.createConsumer(`ws://localhost:3000/cable?token=${authToken}`);

        const subscription = cable.subscriptions.create(
            { channel: 'SuggestedReplyChannel', conversation_id: conversationId },
            {
                received(data) {
                    dispatch(setSuggestedReply({ conversationId, reply: data.suggested_reply }));
                },
                connected() {
                    console.log('Connected to SuggestedReplyChannel');
                },
                disconnected() {
                    console.log('Disconnected from SuggestedReplyChannel');
                }
            }
        );

        return () => {
            subscription.unsubscribe();
            cable.disconnect();
        };
    }, [conversationId, authToken, dispatch]);

    return messagesCountRef;
};

export default useSuggestedReply;
