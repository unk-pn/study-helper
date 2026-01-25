import { toaster } from "@gravity-ui/uikit/toaster-singleton";

export const toast = {
  normal: (title?: string, content?: string) => {
    toaster.add({
      name: `normal-${Date.now()}`,
      title,
      content,
      theme: "normal",
      autoHiding: 5000,
      isClosable: true,
    });
  },

  info: (title?: string, content?: string) => {
    toaster.add({
      name: `info-${Date.now()}`,
      title,
      content,
      theme: "info",
      autoHiding: 5000,
      isClosable: true,
    });
  },

  success: (title?: string, content?: string) => {
    toaster.add({
      name: `success-${Date.now()}`,
      title,
      content,
      theme: "success",
      autoHiding: 5000,
      isClosable: true,
    });
  },

  warning: (title?: string, content?: string) => {
    toaster.add({
      name: `warning-${Date.now()}`,
      title,
      content,
      theme: "warning",
      autoHiding: 5000,
      isClosable: true,
    });
  },

  danger: (title?: string, content?: string) => {
    toaster.add({
      name: `danger-${Date.now()}`,
      title,
      content,
      theme: "danger",
      autoHiding: 7000,
      isClosable: true,
    });
  },

  utility: (title?: string, content?: string) => {
    toaster.add({
      name: `utility-${Date.now()}`,
      title,
      content,
      theme: "utility",
      autoHiding: 5000,
      isClosable: true,
    });
  },
};
