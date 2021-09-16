const sizes = {
  mobileS: '20rem',
  mobileM: '23.25rem',
  mobileL: '26.25rem',
  tablet: '48rem',
  laptop: '64rem',
  laptopL: '90rem',
  desktop: '160rem',
};

export const mediaQueries = {
  mobileS: `only screen and (min-width: ${sizes.mobileS})`,
  mobileM: `only screen and (min-width: ${sizes.mobileM})`,
  mobileL: `only screen and (min-width: ${sizes.mobileL})`,
  tablet: `only screen and (min-width: ${sizes.tablet})`,
  laptop: `only screen and (min-width: ${sizes.laptop})`,
  laptopL: `only screen and (min-width: ${sizes.laptopL})`,
  desktop: `only screen and (min-width: ${sizes.desktop})`,
  desktopL: `only screen and (min-width: ${sizes.desktop})`,
};
