import React from 'react';
import { useParams } from 'react-router-dom';

import fullLogo from '../../assets/fullLogo.png';
import logo from '../../assets/logo.png';
import { mediaQueries } from '../../constants/mediaQueries';

import { useMediaQuery } from '../../hooks/mediaQuery';
import LoggedRoutes from '../../routes/LoggedRoutes';

import {
  NavBarContainer,
  LogoImg,
  LinksContainer,
  LinkItem,
  Line,
  MainContainer,
} from './styles';

interface RouteParams {
  id: 'leads' | 'corretores';
}

const LoggedArea: React.FC = () => {
  const { id } = useParams() as RouteParams;
  const tabletAndAbove = useMediaQuery(`${mediaQueries.tablet}`);

  return (
    <>
      <NavBarContainer>
        <LogoImg src={tabletAndAbove ? fullLogo : logo} alt="Izymob" />

        <LinksContainer>
          <LinkItem to="/leads">Leads</LinkItem>
          <LinkItem to="/corretores">Corretores</LinkItem>
          <Line pageId={id} />
        </LinksContainer>
      </NavBarContainer>

      <MainContainer>
        <LoggedRoutes />
      </MainContainer>
    </>
  );
};

export default LoggedArea;
