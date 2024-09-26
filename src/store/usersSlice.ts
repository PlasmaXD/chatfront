import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';
import { User } from '../../types';

// ログイン処理の非同期アクション
export const loginUser = createAsyncThunk('users/loginUser', async (credentials: { name: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await api.post<{ user: User }>('/users/login', { user: credentials });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// 新規登録処理の非同期アクション
export const registerUser = createAsyncThunk('users/registerUser', async (credentials: { name: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await api.post<{ user: User }>('/users/register', { user: credentials });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// 現在のユーザーをセッションから取得
export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get<{ user: User }>('/users/current'); // セッションからユーザー取得
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// ユーザーの状態管理用の型定義
type UsersState = {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
};

// 初期状態
const initialState: UsersState = {
    currentUser: null,
    loading: false,
    error: null,
};

// Sliceの定義
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ログインが成功したとき
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.user;
            state.error = null;
        });

        // ログインが失敗したとき
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // 新規登録が成功したとき
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.user;
            state.error = null;
        });

        // 新規登録が失敗したとき
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // 現在のユーザー取得が成功したとき
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.user;
            state.error = null;
        });

        // 現在のユーザー取得が失敗したとき
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default usersSlice.reducer;
