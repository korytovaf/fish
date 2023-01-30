import {FC} from 'react';
import {Icon, useColorMode} from '@chakra-ui/react';

type WalletIconType = {
  active?: boolean,
  fill?: string
}

export const WalletIcon:FC<WalletIconType> = ({ active, fill }) => {
  const { colorMode } = useColorMode();

  return (
    <Icon
      viewBox='0 0 16 13'
      fill={colorMode === 'dark'
        ? active
          ? fill ? fill : '#38BACC'
          : fill ? fill : '#ffffff'
        : active
          ? fill ? fill : '#38BACC'
          : fill ? fill : '#000000'
      }
      transition='fill 0.2s'
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M15.5644 8.5106C15.6 7.98809 15.6 7.34209 15.6 6.52211V6.48444C15.6 6.04088 15.6 5.64867 15.5945 5.3H14.3944H1.20565H0.00551269C-1.4009e-06 5.64866 -7.27126e-07 6.04087 5.11209e-08 6.48443V6.52211C-2.8099e-06 7.34209 -5.09843e-06 7.98809 0.035646 8.5106C0.0719845 9.0432 0.147359 9.49119 0.319706 9.90727C0.745981 10.9364 1.56361 11.754 2.59273 12.1803C3.00881 12.3526 3.4568 12.428 3.9894 12.4644C4.51191 12.5 5.15791 12.5 5.97789 12.5H9.62211C10.4421 12.5 11.0881 12.5 11.6106 12.4644C12.1432 12.428 12.5912 12.3526 13.0073 12.1803C14.0364 11.754 14.854 10.9364 15.2803 9.90727C15.4526 9.49119 15.528 9.0432 15.5644 8.5106ZM10.8 7.1C10.8 6.76863 11.0686 6.5 11.4 6.5H12.6C12.9314 6.5 13.2 6.76863 13.2 7.1C13.2 7.43137 12.9314 7.7 12.6 7.7H11.4C11.0686 7.7 10.8 7.43137 10.8 7.1Z"/>
      <path d="M11.6106 0.535646C11.0881 0.499995 10.4421 0.499997 9.62211 0.5H5.97789C5.15792 0.499997 4.51191 0.499995 3.9894 0.535646C3.4568 0.571985 3.00881 0.647359 2.59273 0.819706C1.56361 1.24598 0.745981 2.06361 0.319706 3.09273C0.191296 3.40274 0.116486 3.73127 0.0717104 4.1H1.283H14.317H15.5283C15.4835 3.73127 15.4087 3.40274 15.2803 3.09273C14.854 2.06361 14.0364 1.24598 13.0073 0.819706C12.5912 0.647359 12.1432 0.571985 11.6106 0.535646Z"/>
    </Icon>
  )
}
