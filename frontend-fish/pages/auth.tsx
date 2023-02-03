import {Card, Heading} from '@chakra-ui/react';
import {AuthForm} from '../components/molecules/AuthForm';

export default function AuthPage() {

  // const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Heading as='h1'>
        Авторизация
      </Heading>

      <Card variant='customCard' maxW='xl'>
        <AuthForm />
      </Card>
    </>
  )
}
