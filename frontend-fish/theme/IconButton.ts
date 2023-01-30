import {defineStyle, defineStyleConfig} from "@chakra-ui/react";


const customIconButton = defineStyle({
  borderRadius: "full",
  background: "transparent",
  cursor: 'pointer',
});


export const buttonIconTheme = defineStyleConfig({
  variants: { customIconButton }
})
