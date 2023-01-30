import {FC} from 'react';
import {Icon, useColorMode} from '@chakra-ui/react';

type MinusIconType = {
  width?: number | 21,
  height?: number | 21,
}


export const MinusIcon:FC<MinusIconType> = ({ width, height }) => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 21'
      fill={colorMode === 'dark' ? '#ffffff' : '#000000'}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0.642822 10.5C0.642822 4.97715 5.11997 0.5 10.6428 0.5C16.1657 0.5 20.6428 4.97715 20.6428 10.5C20.6428 16.0228 16.1657 20.5 10.6428 20.5C5.11997 20.5 0.642822 16.0228 0.642822 10.5ZM4.48898 10.5C4.48898 10.0752 4.83337 9.73077 5.25821 9.73077H16.0274C16.4523 9.73077 16.7967 10.0752 16.7967 10.5C16.7967 10.9248 16.4523 11.2692 16.0274 11.2692H5.25821C4.83337 11.2692 4.48898 10.9248 4.48898 10.5Z"/>
    </svg>
  )
}
