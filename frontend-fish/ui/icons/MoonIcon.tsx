import {FC} from 'react';
import {Icon, useColorMode} from '@chakra-ui/react';

type MoonIconType = {
  width?: number | 20,
  height?: number | 24,
}


export const MoonIcon:FC<MoonIconType> = ({ width, height }) => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 24'
      fill={colorMode === 'dark' ? '#ffffff' : '#000000'}
    >
      <path d="M12.3646 24C5.53582 24 0 18.4108 0 11.5162C0 6.80034 2.58996 2.69519 6.41211 0.571639C7.06304 0.209991 7.3885 0.0291666 7.74319 0.00395976C8.53629 -0.0524031 9.26474 0.499049 9.41235 1.26755C9.47837 1.61124 9.31272 2.23541 8.98142 3.48374C7.21401 10.1434 11.1284 16.9887 17.7245 18.7732C18.6015 19.0104 19.04 19.1291 19.2243 19.2372C20.0862 19.743 20.2614 20.8801 19.5905 21.6144C19.4471 21.7714 19.2634 21.887 18.8959 22.1182C17.0007 23.3109 14.7623 24 12.3646 24Z"/>
    </svg>
  )
}
