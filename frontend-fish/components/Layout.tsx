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
