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
  height: 4rem;

  background-color: white;
  display: flex;
  padding: 0 2rem;
  align-items: center;
  flex-direction: row;

  border-bottom: 1px solid ${colors.neutral.light};

  @media ${mediaQueries.tablet} {
    height: 5rem;
  }
`;

export const LogoImg = styled.img`
  height: 2rem;

  @media ${mediaQueries.tablet} {
    height: 2.5rem;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  margin-left: 1.5rem;
  align-self: stretch;

  @media ${mediaQueries.tablet} {
    margin-left: 2.5rem;
  }
`;

export const LinkItem = styled(Link)<LinkProps>`
  width: 5rem;
  display: flex;
  align-items: center;
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

export const MainContainer = styled.main``;
