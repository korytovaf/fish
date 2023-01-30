import {FC} from 'react';
import {Icon, useColorMode} from '@chakra-ui/react';

type TrashIconType = {
  width?: number | 13,
  height?: number | 15,
}


export const TrashIcon:FC<TrashIconType> = ({ width, height }) => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 13 15'
      fill={colorMode === 'dark' ? '#ffffff' : '#000000'}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M6.64282 0.500056L6.57235 0.500027C6.17832 0.499786 5.88066 0.499603 5.62235 0.571444C4.92568 0.7652 4.38333 1.32939 4.19748 2.04929C4.12856 2.31626 4.12873 2.62402 4.12896 3.03366L4.12899 3.1062V3.34312H1.16456C0.876413 3.34312 0.642822 3.5842 0.642822 3.88158C0.642822 4.17896 0.876413 4.42004 1.16456 4.42004H1.71308L2.35252 11.0572C2.40146 11.5652 2.44116 11.9773 2.49886 12.3108C2.55848 12.6554 2.6435 12.9576 2.80397 13.2349C3.05939 13.6761 3.4353 14.0294 3.88465 14.2498C4.16728 14.3884 4.4664 14.4462 4.80335 14.4736C5.12915 14.5 5.52846 14.5 6.02011 14.5H7.26553C7.75718 14.5 8.15649 14.5 8.48229 14.4736C8.81925 14.4462 9.11836 14.3884 9.40099 14.2498C9.85034 14.0294 10.2263 13.6761 10.4817 13.2349C10.6421 12.9576 10.7272 12.6554 10.7868 12.3108C10.8445 11.9773 10.8842 11.5652 10.9331 11.0571L11.5726 4.42004H12.1211C12.4092 4.42004 12.6428 4.17896 12.6428 3.88158C12.6428 3.5842 12.4092 3.34312 12.1211 3.34312H9.15666V3.1062L9.15668 3.03366C9.15691 2.62402 9.15708 2.31626 9.08816 2.04929C8.90231 1.32939 8.35997 0.7652 7.66329 0.571444C7.40498 0.499603 7.10733 0.499786 6.7133 0.500027L6.64282 0.500056ZM5.17247 3.34312H8.11318V3.1062C8.11318 2.59099 8.10874 2.43844 8.07986 2.32654C7.9894 1.97612 7.7263 1.7043 7.39178 1.61127C7.28528 1.58165 7.13974 1.57697 6.64282 1.57697C6.14591 1.57697 6.00036 1.58165 5.89386 1.61127C5.55935 1.7043 5.29625 1.97612 5.20579 2.32654C5.1769 2.43844 5.17247 2.59099 5.17247 3.1062V3.34312ZM4.84812 5.67191C5.13485 5.64248 5.39041 5.85852 5.41892 6.15445L5.91694 11.3237C5.94545 11.6196 5.73612 11.8833 5.44939 11.9128C5.16265 11.9422 4.90709 11.7261 4.87858 11.4302L4.38056 6.261C4.35205 5.96508 4.56138 5.70133 4.84812 5.67191ZM8.43753 5.67191C8.72426 5.70133 8.93359 5.96508 8.90508 6.261L8.40706 11.4302C8.37855 11.7261 8.12299 11.9422 7.83626 11.9128C7.54952 11.8833 7.34019 11.6196 7.3687 11.3237L7.86673 6.15445C7.89524 5.85852 8.15079 5.64248 8.43753 5.67191Z"/>
    </svg>
  )
}
