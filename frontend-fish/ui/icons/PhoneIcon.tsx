import {FC} from 'react';
import {Icon, useColorMode} from '@chakra-ui/react';

type PhoneIconType = {
  active?: boolean,
}

export const PhoneIcon:FC<PhoneIconType> = ({ active }) => {
  const { colorMode } = useColorMode();

  return (
    <Icon
      viewBox='0 0 20 20'
      fill={colorMode === 'dark' ? active ? '#38BACC' : '#ffffff' : active ? '#38BACC' : '#000000'}
      transition='fill 0.2s'
    >
      <path d="M6.17705 0.787283C4.89469 -0.188407 3.10607 -0.155627 1.82943 0.8272C1.65082 0.964705 1.47269 1.13992 1.22771 1.38089L1.20226 1.40592L1.18828 1.41967L1.1749 1.434C0.642499 2.00409 0.385876 2.72438 0.272262 3.41084C0.158171 4.10019 0.177143 4.81973 0.249816 5.4666C0.384142 6.66223 0.72291 7.77278 0.921985 8.21778C0.928957 8.23808 0.93723 8.2613 0.946979 8.28742C0.977012 8.3679 1.02102 8.47593 1.08405 8.61147C1.21011 8.88254 1.41223 9.26363 1.73086 9.7547C2.36769 10.7362 3.4721 12.1603 5.37137 14.0279C7.2716 15.8964 8.81315 17.0738 9.89582 17.7903C10.4371 18.1486 10.8632 18.3914 11.1617 18.5477C11.3109 18.6258 11.4282 18.6822 11.5118 18.7207C11.5537 18.7399 11.5871 18.7546 11.6119 18.7652L11.6384 18.7763C12.3672 19.0983 13.5413 19.472 14.7728 19.5728C15.9864 19.6723 17.4541 19.5206 18.5331 18.546L18.5476 18.5329L18.5616 18.5191L18.5981 18.4832C18.8362 18.2492 19.0129 18.0755 19.1511 17.9018C20.1581 16.6367 20.1916 14.8553 19.191 13.5838C19.0542 13.41 18.8787 13.2375 18.6476 13.0103L18.6104 12.9738L18.2119 12.5819L18.18 12.5505C17.7779 12.1551 17.4565 11.8391 17.1672 11.6125C16.7861 11.3142 16.3538 11.1968 16.0304 11.1361C15.5838 11.0522 15.123 11.0942 14.7215 11.1635C14.3137 11.2339 13.8917 11.347 13.5131 11.4504L13.4151 11.4771C13.06 11.5743 12.7429 11.661 12.4461 11.7214C12.1177 11.7882 11.8884 11.806 11.7352 11.7898C11.653 11.7811 11.5703 11.767 11.4872 11.7474C11.3995 11.7268 11.3476 11.7085 11.3138 11.6926C11.0308 11.5595 10.2764 11.1594 9.45957 10.3562C8.50372 9.41633 8.20422 8.65582 8.17815 8.5863C8.11092 8.38025 8.07544 8.16624 8.07089 7.94942C8.06739 7.78237 8.1006 7.545 8.17586 7.21767C8.22809 6.99053 8.28991 6.76212 8.3574 6.51278C8.3876 6.40117 8.41895 6.28536 8.45107 6.1636C8.54927 5.79139 8.65033 5.37833 8.703 4.97531C8.75479 4.57907 8.77062 4.11959 8.64466 3.67637C8.58863 3.47923 8.49502 3.20193 8.30572 2.93907C8.06365 2.60294 7.7059 2.2513 7.25269 1.80583L7.19508 1.74919L6.79637 1.35764L6.75327 1.31523C6.52588 1.09149 6.35193 0.920339 6.17705 0.787283Z"/>
    </Icon>
  )
}
