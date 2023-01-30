import {FC} from 'react';
import {Box, Heading, Grid, List, useColorMode, IconButton} from '@chakra-ui/react';
import {LogoFish} from '../ui/icons/Logo';
import {useRouter} from 'next/router';
import {HomeIcon} from '../ui/icons/HomeIcon';
import {LinkMenu} from '../ui/LinkMenu';
import {BasketIcon} from '../ui/icons/BasketIcon';
import {WalletIcon} from '../ui/icons/WalletIcon';
import {DeliveryIcon} from '../ui/icons/DeliveryIcon';
import {PhoneIcon} from '../ui/icons/PhoneIcon';
import {TelegramIcon} from '../ui/icons/TelegramIcon';
import {WhatsAppIcon} from '../ui/icons/WhatsAppIcon';
import {QrCodeTelegram} from '../ui/icons/QrCodeTelegram';
import {MapPointIcon} from '../ui/icons/MapPointIcon';
import {SunIcon} from '../ui/icons/SunIcon';
import {MoonIcon} from '../ui/icons/MoonIcon';


type SideMenuType = {
  onCloseDrawer?: () => void,
}


export const SideMenu:FC<SideMenuType> = ({ onCloseDrawer }) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Grid templateColumns='1fr' gap={[16, 16, 16, 24]} pb={20}>
      <Box height={114}>
        <LogoFish height={114} />
      </Box>

      <Box as='nav' pl={2}>
        <Heading as='h2' size='sm' pb={6}>МЕНЮ</Heading>
        <List spacing={2}>
          <LinkMenu
            href='/'
            title='Главная'
            icon={<HomeIcon active={router.asPath === '/'} />}
            onCloseDrawer={onCloseDrawer}
            accent={router.asPath === '/'}
          />
          <LinkMenu
            href='/basket'
            title='Корзина'
            icon={<BasketIcon height={15} active={router.asPath === '/basket'} />}
            onCloseDrawer={onCloseDrawer}
            accent={router.asPath === '/basket'}
          />
          <LinkMenu
            href='/payment'
            title='Оплата'
            icon={<WalletIcon active={router.asPath === '/payment'} />}
            onCloseDrawer={onCloseDrawer}
            accent={router.asPath === '/payment'}
          />
          <LinkMenu
            href='/delivery'
            title='Доставка'
            icon={<DeliveryIcon active={router.asPath === '/delivery'} />}
            onCloseDrawer={onCloseDrawer}
            accent={router.asPath === '/delivery'}
          />
        </List>
      </Box>

      <Box pl={2}>
        <Heading as='h2' size='sm' pb={6}>КОНТАКТЫ</Heading>
        <List spacing={2}>
          <LinkMenu
            href='tel:+79533713839'
            title='+7 953 371 3839'
            icon={<PhoneIcon />}
            onCloseDrawer={onCloseDrawer}
          />
          <LinkMenu
            href='https://telegram.im/@forelvpiter'
            target='_blank'
            title='Telegram'
            icon={<TelegramIcon />}
            onCloseDrawer={onCloseDrawer}
          />
          <LinkMenu
            href='https://api.whatsapp.com/send/?phone=79533713839&text=Добрый+день, '
            target='_blank'
            title='WhatsApp'
            icon={<WhatsAppIcon />}
            onCloseDrawer={onCloseDrawer}
          />
        </List>
        <Box width={24} height={24} mt={6}>
          <QrCodeTelegram />
        </Box>
      </Box>

      <Box pl={2}>
        <Heading as='h2' size='sm' pb={6}>АДРЕС</Heading>
        <List spacing={2}>
          <LinkMenu
            href='/about?address=baykonur'
            title='Байконурская, 15'
            icon={<MapPointIcon active={router.query.address === 'baykonur'} />}
            onCloseDrawer={() => [onCloseDrawer]}
            accent={router.query.address === 'baykonur'}
          />
          <LinkMenu
            href='/about?address=priosersk'
            title='Приозерское шоссе, 130'
            icon={<MapPointIcon active={router.query.address === 'priosersk'} />}
            onCloseDrawer={() => [onCloseDrawer]}
            accent={router.query.address === 'priosersk'}
          />
        </List>
      </Box>

      <Box>
        <IconButton
          onClick={toggleColorMode}
          aria-label='Переключение темы'
          variant='customIconButton'
          icon={colorMode === 'dark' ? <SunIcon height={20} /> : <MoonIcon height={20} />}
        />
      </Box>

    </Grid>
  )
}
