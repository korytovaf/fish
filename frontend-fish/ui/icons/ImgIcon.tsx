import {FC} from 'react';

type ImgIconType = {
  width?: number | 21,
  height?: number | 21,
}


export const ImgIcon:FC<ImgIconType> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 26 26'
      fill='#ffffff'
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M13.0375 -7.57878e-06H12.9625C11.1305 -1.12743e-05 9.70443 -1.41338e-05 8.55468 0.0784326C7.38811 0.158027 6.43309 0.321712 5.55585 0.685077C3.3506 1.59852 1.59853 3.35059 0.685085 5.55584C0.321719 6.43308 0.158035 7.38811 0.0784404 8.55468C-6.12438e-06 9.70442 -3.26048e-06 11.1304 4.35008e-07 12.9625L1.9659e-07 13.059C-1.0413e-05 15.1643 -1.82837e-05 16.7377 0.122696 17.9804C0.214467 18.9097 0.378433 19.7038 0.685085 20.4441C1.59853 22.6494 3.3506 24.4015 5.55585 25.3149C6.43309 25.6783 7.38811 25.842 8.55468 25.9216C9.70443 26 11.1304 26 12.9624 26H13.0376C14.8696 26 16.2956 26 17.4453 25.9216C18.6119 25.842 19.5669 25.6783 20.4442 25.3149C22.6494 24.4015 24.4015 22.6494 25.3149 20.4441C25.7929 19.2902 25.9302 17.9837 25.9763 16.2168C26.0047 16.0886 26.0076 15.9559 25.985 15.8268C26 15.0139 26 14.0827 26 13.0092V12.9624C26 11.1304 26 9.70442 25.9216 8.55468C25.842 7.38811 25.6783 6.43308 25.3149 5.55584C24.4015 3.35059 22.6494 1.59852 20.4442 0.685077C19.5669 0.321712 18.6119 0.158027 17.4453 0.0784326C16.2956 -1.41338e-05 14.8695 -1.12743e-05 13.0375 -7.57878e-06ZM10.4142 12.8284L14.2897 16.7039L20.5225 23.0491C20.2525 23.2064 19.9707 23.3462 19.6788 23.4671C19.0859 23.7127 18.3739 23.8535 17.3092 23.9262C16.2355 23.9995 14.8774 24 13 24C11.1226 24 9.76455 23.9995 8.69083 23.9262C7.62609 23.8535 6.91414 23.7127 6.32122 23.4671C4.60602 22.7567 3.2433 21.394 2.53284 19.6788C2.36762 19.2799 2.24949 18.826 2.16786 18.2463L7.58579 12.8284C8.36684 12.0474 9.63317 12.0474 10.4142 12.8284ZM23.4672 19.6788C23.1394 20.47 22.6729 21.1862 22.097 21.798L16.4079 16.0063L18.5858 13.8284C19.3668 13.0474 20.6332 13.0474 21.4142 13.8284L23.9706 16.3848C23.9193 17.9804 23.7822 18.9181 23.4672 19.6788ZM19.5 7.99999C20.3284 7.99999 21 7.32842 21 6.49999C21 5.67157 20.3284 4.99999 19.5 4.99999C18.6716 4.99999 18 5.67157 18 6.49999C18 7.32842 18.6716 7.99999 19.5 7.99999Z"/>
    </svg>
  )
}
