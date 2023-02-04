import {FC} from 'react';
import {useRouter} from "next/router";
import {useBasket} from "../../hooks/useBasket";
import {ButtonGroup, Flex, IconButton, LinkBox, LinkOverlay, Spacer} from '@chakra-ui/react';
import {BasketFullIcon} from '../../ui/icons/BasketFullIcon';
import {BasketIcon} from '../../ui/icons/BasketIcon';
import {BurgerIcon} from '../../ui/icons/BurgerIcon';
import {LogoFish} from '../../ui/icons/Logo';
import Link from 'next/link';

type TopPanelType = {
  onOpen: () => void,
}

export const TopPanel:FC<TopPanelType> = ({ onOpen }) => {
  const router = useRouter();
  const { basketProducts } = useBasket();

  return (
    <Flex py={[4, 8, 8, 8]} alignItems='center'>
      <LinkBox display={['block', 'block', 'block', 'none']}>
        <Link href='/frontend-fish/pages' passHref>
          <LinkOverlay>
            <LogoFish height={56} />
          </LinkOverlay>
        </Link>
      </LinkBox>

      <Spacer />

      <ButtonGroup gap={['0', '0', '2', '2']} spacing={['0', '0', '2', '2']} >
        <IconButton
          onClick={() => router.push('/basket')}
          aria-label='Корзина'
          variant='customIconButton'
          icon={basketProducts.length > 0 ? <BasketFullIcon height={21} /> : <BasketIcon height={20} />}
        />

        <IconButton
          onClick={onOpen}
          display={['inline-flex', 'inline-flex', 'inline-flex', 'none']}
          aria-label='Меню'
          variant='customIconButton'
          icon={<BurgerIcon height={20} />}
          pb={0.75}
        />
      </ButtonGroup>
    </Flex>
  )
}
