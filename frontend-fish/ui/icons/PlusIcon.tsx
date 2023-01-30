import {FC} from 'react';
import {Icon, useColorMode} from '@chakra-ui/react';

type PlusIconType = {
  width?: number | 21,
  height?: number | 21,
}


export const PlusIcon:FC<PlusIconType> = ({ width, height }) => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 21'
      fill={colorMode === 'dark' ? '#ffffff' : '#000000'}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0.642822 10.5C0.642822 4.97715 5.11997 0.5 10.6428 0.5C16.1657 0.5 20.6428 4.97715 20.6428 10.5C20.6428 16.0228 16.1657 20.5 10.6428 20.5C5.11997 20.5 0.642822 16.0228 0.642822 10.5ZM10.6428 5.11538C11.0677 5.11538 11.4121 5.45978 11.4121 5.88462V9.73077H15.2582C15.683 9.73077 16.0274 10.0752 16.0274 10.5C16.0274 10.9248 15.683 11.2692 15.2582 11.2692H11.4121V15.1154C11.4121 15.5402 11.0677 15.8846 10.6428 15.8846C10.218 15.8846 9.87359 15.5402 9.87359 15.1154V11.2692H6.02744C5.6026 11.2692 5.25821 10.9248 5.25821 10.5C5.25821 10.0752 5.6026 9.73077 6.02744 9.73077H9.87359V5.88462C9.87359 5.45978 10.218 5.11538 10.6428 5.11538Z"/>
    </svg>
  )
}
