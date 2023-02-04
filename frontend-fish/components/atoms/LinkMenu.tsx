import {FC, ReactNode} from "react";
import LinkNext from 'next/link';
import {Box, Flex, Link, ListItem, Stack, Text} from '@chakra-ui/react';

type LinkMenuType = {
  href: string,
  title: string,
  subtitle?: string,
  icon: ReactNode,
  target?: "_blank",
  onCloseDrawer?: () => void,
  accent?: boolean,
}


export const LinkMenu:FC<LinkMenuType> = ({ href, title, subtitle, icon, target, onCloseDrawer, accent }) => {

  return (
    <ListItem pb={2}>
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
          <Flex >
            {icon}
            <Stack as='span' pl={3} lineHeight={1}>
              <Text>{title}</Text>
              <Text>{subtitle}</Text>
            </Stack>
          </Flex>
        </Link>
      </LinkNext>
    </ListItem>
  )
}
