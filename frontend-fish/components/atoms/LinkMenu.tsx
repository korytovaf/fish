import {FC, ReactNode} from "react";
import LinkNext from 'next/link';
import {Box, Flex, Link, ListItem} from '@chakra-ui/react';

type LinkMenuType = {
  href: string,
  title: string,
  icon: ReactNode,
  target?: "_blank",
  onCloseDrawer?: () => void,
  accent?: boolean,
}


export const LinkMenu:FC<LinkMenuType> = ({ href, title, icon, target, onCloseDrawer, accent }) => {

  return (
    <ListItem>
      <LinkNext href={href} passHref>
        <Link
          onClick={onCloseDrawer}
          target={target}
          _hover={{
            textDecoration: 'none',
            "svg": { fill: "#38BACC" }
          }}
          color={accent && '#38BACC'}
        >
          <Flex alignItems='center'>
            {icon}
            <Box as='span' pl={3}>
              {title}
            </Box>
          </Flex>
        </Link>
      </LinkNext>
    </ListItem>
  )
}
