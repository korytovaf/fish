import {FC} from 'react';
import {useColorMode} from '@chakra-ui/react';

type LoginIconType = {
  width?: number | 21,
  height?: number | 21,
}


export const LoginIcon:FC<LoginIconType> = ({ width, height }) => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 26 26'
      fill={colorMode === 'dark' ? '#ffffff' : '#000000'}
    >
      <rect x="22" y="12" width="4" height="2" rx="1"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 0C3.13403 0 0 3.13403 0 7V19C0 22.866 3.13403 26 7 26H15C18.866 26 22 22.866 22 19V14H15.8046L17.3044 15.226C17.7322 15.5757 17.7953 16.2058 17.4453 16.6332C17.0952 17.0607 16.4647 17.1237 16.0369 16.7739L12.3671 13.7739C12.1347 13.584 12 13.2999 12 13C12 12.7001 12.1347 12.4159 12.3671 12.226L16.0369 9.22595C16.4647 8.87634 17.0952 8.93933 17.4453 9.3667C17.7953 9.79419 17.7322 10.4242 17.3044 10.7739L15.8046 12H22V7C22 3.13403 18.866 0 15 0H7Z"/>
    </svg>
  )
}
