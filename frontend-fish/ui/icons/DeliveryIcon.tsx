import {FC} from 'react';
import {useColorMode} from '@chakra-ui/react';

type DeliveryIconType = {
  active: boolean,
  width?: number | 16,
  height?: number | 16,
}

export const DeliveryIcon:FC<DeliveryIconType> = ({ active, height, width }) => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 27 17'
      fill={colorMode === 'dark' ? active ? '#38BACC' : '#ffffff' : active ? '#38BACC' : '#000000'}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M6.56162 0.500003C5.34752 0.500006 4.36364 1.47695 4.36364 2.68185C4.36364 3.08349 4.68924 3.40909 5.09088 3.40909H7.2987C8.11238 3.40909 8.72727 4.08547 8.72727 4.86364C8.72727 5.6418 8.11238 6.31818 7.2987 6.31818H5.09091C4.68925 6.31818 4.36364 6.64379 4.36364 7.04545C4.36364 7.44712 4.68925 7.77273 5.09091 7.77273H8.00446C8.80954 7.77273 9.45455 8.42818 9.45455 9.22727C9.45455 10.0264 8.80954 10.6818 8.00446 10.6818H5.09091C4.68925 10.6818 4.36364 11.0074 4.36364 11.4091V12.6265C4.36364 13.6249 5.0319 14.4523 5.92686 14.7489C6.19028 15.7613 7.12679 16.5 8.226 16.5C9.27132 16.5 10.1695 15.8319 10.4816 14.8957H19.5028C19.8149 15.8319 20.7131 16.5 21.7584 16.5C22.8038 16.5 23.702 15.8319 24.014 14.8957L24.1609 14.8957C24.3698 14.8957 24.5677 14.8958 24.7343 14.8824C24.9156 14.868 25.1228 14.8343 25.3301 14.731C25.6213 14.5858 25.8602 14.3532 26.0106 14.0645C26.1181 13.8582 26.1531 13.6516 26.1681 13.472C26.1819 13.3077 26.1818 13.1129 26.1818 12.9093V11.7833C26.1818 10.7998 26.1818 10.0167 26.129 9.38462C26.0749 8.73687 25.9616 8.18357 25.6977 7.67694C25.2721 6.86006 24.5941 6.1979 23.7627 5.78358C23.2484 5.52729 22.6868 5.41709 22.0269 5.36436C21.382 5.31283 20.5824 5.31283 19.5757 5.31284H18.7969C18.792 4.89023 18.7805 4.51959 18.7533 4.19349C18.7048 3.61263 18.6026 3.10885 18.3611 2.64512C17.9748 1.9037 17.3596 1.3029 16.6053 0.927029C16.1349 0.692599 15.6238 0.593327 15.0323 0.54606C14.4558 0.499989 13.7422 0.499994 12.8501 0.5L6.56162 0.500003ZM8.226 13.2914C7.72062 13.2914 7.32754 13.685 7.31857 14.1516L7.31841 14.1684C7.31841 14.6427 7.71451 15.0455 8.226 15.0455C8.73748 15.0455 9.13359 14.6427 9.13359 14.1684C9.13359 13.6942 8.73748 13.2914 8.226 13.2914ZM21.7584 13.2914C21.247 13.2914 20.8509 13.6942 20.8509 14.1684C20.8509 14.6427 21.247 15.0455 21.7584 15.0455C22.2699 15.0455 22.666 14.6427 22.666 14.1684C22.666 13.6942 22.2699 13.2914 21.7584 13.2914Z"/>
      <path d="M2.18182 4.86364C2.18182 4.46197 2.50743 4.13636 2.90909 4.13636H7.48822C7.88988 4.13636 8.21549 4.46197 8.21549 4.86364C8.21549 5.2653 7.88988 5.59091 7.48822 5.59091H2.90909C2.50743 5.59091 2.18182 5.2653 2.18182 4.86364Z"/>
      <path d="M0 9.22727C0 8.82561 0.325611 8.5 0.727273 8.5H8.05388C8.45554 8.5 8.78115 8.82561 8.78115 9.22727C8.78115 9.62893 8.45554 9.95455 8.05388 9.95455H0.727273C0.325611 9.95455 0 9.62893 0 9.22727Z"/>
    </svg>
  )
}
