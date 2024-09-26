// src/services/cable.ts
import { createConsumer } from '@thrash-industries/react-actioncable-provider';

const cable = createConsumer('ws://localhost:3000/cable'); // RailsサーバーのWebSocketエンドポイント

export default cable;
