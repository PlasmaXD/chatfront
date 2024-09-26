import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fetchCurrentUser } from '@/store/usersSlice'; // セッションからユーザーを取得

function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.users.currentUser);

    useEffect(() => {
        if (!currentUser) {
            // ユーザーがログインしていない場合のみ、APIを呼び出す
            dispatch(fetchCurrentUser());
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        if (!currentUser && router.pathname !== '/login') {
            // ユーザーがログインしていない場合はログインページにリダイレクト
            router.push('/login');
        }
    }, [currentUser, router]);

    return <>{children}</>;
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Provider store={store}>
                <AuthGuard>
                    <Component {...pageProps} />
                </AuthGuard>
            </Provider>
        </ChakraProvider>
    );
}

export default MyApp;
