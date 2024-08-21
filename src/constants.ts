export interface PPVariables {
  LOGO: string;
  TITLE: string;
  // DATASET_ID: number;
  EXTERNAL_LINKS: { name: string; link: string; icon: string }[];
}

declare global {
  interface Window {
    PP_VARIABLES?: PPVariables;
  }
}

export const PP_VARIABLES: PPVariables =
  typeof window !== 'undefined' && typeof window.PP_VARIABLES === 'object'
    ? (window.PP_VARIABLES as PPVariables)
    : ({} as PPVariables);

export interface PPConstants {
  LOGO: string | undefined;
  TITLE: string | undefined;
  EXTERNAL_LINKS: { name: string; link: string; icon: string }[];
}

export const PP_CONSTANTS: PPConstants = {
  LOGO: PP_VARIABLES.LOGO !== '[Logo]' ? PP_VARIABLES.LOGO : undefined,
  TITLE: PP_VARIABLES.TITLE !== '[Title]' ? PP_VARIABLES.TITLE : 'PP Components Demo',
  EXTERNAL_LINKS: PP_VARIABLES.EXTERNAL_LINKS || [],
};

export const THEME_CONSTANTS = {
  MAIN_THEME: 'blue',
  SECONDARY_THEME: 'purple',
};
