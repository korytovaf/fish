import {FC, ReactNode, useRef} from 'react';
import Head from 'next/head';
import {TopPanel} from "./organisms/TopPanel";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Stack,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import {SideMenu} from './molecules/SideMenu';

import { YMInitializer } from 'react-yandex-metrika';


type LayoutType = {
  children: ReactNode,
}


export const Layout:FC<LayoutType> = ({ children }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Head>
        <title>Форель КАРЕЛИИ</title>
        <meta name="description" content="Всегда свежая форель в Санкт-Петербурге до парадной" />
        <meta name="yandex-verification" content="c5f24a1fd48d9921" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>

      {/*/!*Yandex.Metrika counter*!/*/}
      {/*<script*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: `*/}
      {/*        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};*/}
      {/*        m[i].l=1*new Date();*/}
      {/*        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}*/}
      {/*        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})*/}
      {/*        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");*/}

      {/*        ym(92454457, "init", {*/}
      {/*          clickmap:true,*/}
      {/*          trackLinks:true,*/}
      {/*          accurateTrackBounce:true,*/}
      {/*          webvisor:true*/}
      {/*        });*/}
      {/*      `,*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<noscript>*/}
      {/*  <div>*/}
      {/*    <img src="https://mc.yandex.ru/watch/92454457" style={{ position: 'absolute', left: '-9999px' }} alt="" />*/}
      {/*  </div>*/}
      {/*</noscript>*/}
      {/*/!*Yandex.Metrika counter*!/*/}

      <YMInitializer accounts={[92454457]} />
      <HStack spacing={[8, 8, 12, 12]} align='flex-start' mr={[8, 8, 12, 12]}>
        <Box
          as='header'
          display={['none', 'none', 'none', 'block']}
          height='100vh'
          width={320}
          minWidth={320}
          pt={30}
          pl={30}
          pb={30}
          bgGradient={colorMode === 'dark'
            ? 'linear(180deg, #101010 0%, rgba(16, 16, 16, 0) 100%)'
            : 'linear(180deg, #F7F7F7 0%, rgba(225, 225, 225, 0) 100%)'}
        >
          <SideMenu onCloseDrawer={onClose} />
          <Drawer
            colorScheme='orange'
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
            size={['full', 'sm', 'sm', 'sm']}
          >
            <DrawerOverlay />
            <DrawerContent
              pt={30}
              pl={30}
              pb={30}
              bgGradient={colorMode === 'dark'
                ? 'linear(180deg, #101010 0%, rgba(16, 16, 16, 0) 100%)'
                : 'linear(180deg, #F7F7F7 0%, rgba(225, 225, 225, 0) 100%)'}
            >
              <DrawerCloseButton />
              <DrawerBody>
                <SideMenu onCloseDrawer={onClose} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        <Box as='main' flex={1} pb={20}>
          <TopPanel onOpen={onOpen} />
          <Stack
            pt={8}
            spacing={[4, 4, 8, 12]}
            maxW={['container.lg', 'container.lg', 'container.lg', 'container.xl']}
            justifyContent='start'
          >
            {children}
          </Stack>
        </Box>
      </HStack>
    </>

  )
}
