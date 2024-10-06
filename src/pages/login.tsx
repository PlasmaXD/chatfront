import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/usersSlice'; // 新規登録アクションを追加
import { useRouter } from 'next/router';
import { Input, Button, Box, Text, Spinner, Alert, AlertIcon, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { AppDispatch, RootState } from '../store';

const LoginPage: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // Reduxの状態を取得
    const { loading, error } = useSelector((state: RootState) => state.users);

    // ログイン処理
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser({ name, password }));

        // ログイン成功時にホームにリダイレクト
        if (loginUser.fulfilled.match(resultAction)) {
            console.log('Login successful, redirecting...');
            router.push('/');
        } else {
            console.log('Login failed:', resultAction);
        }

    };


    // 新規登録処理
    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(registerUser({ name, password }));

        // 新規登録成功時にログインしてホームにリダイレクト
        if (registerUser.fulfilled.match(resultAction)) {
            router.push('/');
        }
    };

    return (
        <Box p={4} maxW="md" mx="auto">
            <Text fontSize="2xl" mb={4}>
                ログイン / 新規登録
            </Text>
            <Tabs isFitted>
                <TabList>
                    <Tab>ログイン</Tab>
                    <Tab>新規登録</Tab>
                </TabList>

                <TabPanels>
                    {/* ログインフォーム */}
                    <TabPanel>
                        <form onSubmit={handleLoginSubmit}>
                            <Input
                                type="text"
                                placeholder="ユーザーNAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                mb={4}
                                isDisabled={loading}
                            />
                            <Input
                                type="password"
                                placeholder="パスワード"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                mb={4}
                                isDisabled={loading}
                            />
                            {loading ? (
                                <Button type="submit" colorScheme="blue" isLoading>
                                    ローディング中...
                                </Button>
                            ) : (
                                <Button type="submit" colorScheme="blue">
                                    ログイン
                                </Button>
                            )}
                        </form>
                    </TabPanel>

                    {/* 新規登録フォーム */}
                    <TabPanel>
                        <form onSubmit={handleRegisterSubmit}>
                            <Input
                                type="text"
                                placeholder="ユーザーNAME"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                mb={4}
                                isDisabled={loading}
                            />
                            <Input
                                type="password"
                                placeholder="パスワード"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                mb={4}
                                isDisabled={loading}
                            />
                            {loading ? (
                                <Button type="submit" colorScheme="blue" isLoading>
                                    ローディング中...
                                </Button>
                            ) : (
                                <Button type="submit" colorScheme="blue">
                                    新規登録
                                </Button>
                            )}
                        </form>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* エラーメッセージの表示 */}
            {error && (
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    {typeof error === 'string' ? error : Object.values(error).join(', ')}
                </Alert>
            )}

            {/* ローディングスピナーを別途表示する場合 */}
            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Spinner size="lg" />
                </Box>
            )}
        </Box>
    );
};

export default LoginPage;
