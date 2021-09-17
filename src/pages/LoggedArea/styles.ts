import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { mediaQueries } from '../../constants/mediaQueries';
import { colors } from '../../constants/colors';

interface LinkProps {
  selected?: boolean;
}

interface LineProps {
  pageId: 'leads' | 'corretores';
}

export const NavBarContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 999;

  height: 7.5rem;
  background-color: white;
  padding: 0 1rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media ${mediaQueries.tablet} {
    height: 5.5rem;
    padding: 0 2rem;
    align-items: center;
    flex-direction: row;
  }
`;

export const LogoImg = styled.img`
  height: 2.5rem;
  margin: 1rem auto 0;

  @media ${mediaQueries.tablet} {
    margin: 0;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  margin: 1.5rem auto 0;
  height: 100%;
  position: relative;

  @media ${mediaQueries.tablet} {
    margin: 0rem;
    margin-left: 4rem;
    align-self: stretch;
  }
`;

export const LinkItem = styled(Link)<LinkProps>`
  width: 5rem;
  display: flex;
  color: ${(props) => (props.selected ? colors.primary : colors.neutral.dark)};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;

  & + a {
    margin-left: 1rem;
  }

  &:visited {
    color: ${(props) =>
      props.selected ? colors.primary : colors.neutral.dark};
  }
  justify-content: center;

  @media ${mediaQueries.tablet} {
    align-items: center;
  }
`;

export const Line = styled.div<LineProps>`
  height: 2px;
  width: 5rem;
  background: ${colors.primary};

  position: absolute;
  bottom: 0;
  left: ${(props) => {
    switch (props.pageId) {
      case 'leads':
        return 0;
      default:
        return '6rem';
    }
  }};

  transition: 0.25s ease;
`;

export const MainContainer = styled.main`
  height: 100%;
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  padding: 0 2rem;

  @media ${mediaQueries.tablet} {
    max-width: none;
    margin: 0;
  }

  @media ${mediaQueries.laptop} {
    max-width: 64rem;
    margin: 0 auto;
  }
`;
