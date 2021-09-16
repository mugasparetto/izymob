import React from 'react';
import { useParams } from 'react-router-dom';

import LoggedRoutes from '../../routes/LoggedRoutes';

import logoImg from '../../assets/logo.png';
import {
  NavBarContainer,
  LogoImg,
  LinksContainer,
  LinkItem,
  Line,
} from './styles';

interface RouteParams {
  id: 'leads' | 'corretores';
}

const LoggedArea: React.FC = () => {
  const { id } = useParams() as RouteParams;

  return (
    <>
      <NavBarContainer>
        <LogoImg src={logoImg} alt="Izymob" />

        <LinksContainer>
          <LinkItem selected={id === 'leads'} to="/leads">
            Leads
          </LinkItem>
          <LinkItem selected={id === 'corretores'} to="/corretores">
            Corretores
          </LinkItem>
          <Line pageId={id} />
        </LinksContainer>
      </NavBarContainer>

      <LoggedRoutes />
    </>
  );
};

export default LoggedArea;
