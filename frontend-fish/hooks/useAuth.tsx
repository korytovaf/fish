import {AuthContext} from "../contexts/useAuthContext";
import {useContext} from 'react';
import {setCookie, destroyCookie} from 'nookies';
import {loginEndpoint, onLoginApi} from '../api/fetchData';
import {Box, useToast} from '@chakra-ui/react';
import {FormValuesLogin} from '../components/molecules/AuthForm';
import {useRouter} from 'next/router';
import {useSWRConfig} from 'swr';

export const useAuth = () => {
  const {isAuth, setIsAuth, user, setUser} = useContext(AuthContext);
  const router = useRouter();
  const toast = useToast();
  const { mutate } = useSWRConfig();

  const onLogin = async (values: FormValuesLogin) => {
    try {
      const res = await onLoginApi({ ...values });
      setCookie(null, 'fish-auth-user', res.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      await mutate(loginEndpoint, res);
      await router.push(res.isAdmin ? '/admin' : '/');
      setIsAuth(true);
      setUser(res);
    } catch (error) {
      toast({
        position: 'top',
        render: () => <Box color='white' p={3} bg='red.500'>{error.message}</Box>,
      })
    }
  }

  const logout: () => void = async () => {
    destroyCookie(null, 'fish-auth-user', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    setIsAuth(false)
    setUser(null)
    await router.push('/');
  }

  return {
    onLogin, logout, user, isAuth
  }
}
