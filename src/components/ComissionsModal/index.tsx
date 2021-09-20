import React from 'react';
import { FiX } from 'react-icons/fi';
import Modal from 'react-modal';

import { mediaQueries } from '../../constants/mediaQueries';
import { useMediaQuery } from '../../hooks/mediaQuery';

import { Header, ComissionsGrid } from './styles';

interface ComissionsModalProps {
  closeModal: () => void;
  data: ShowComissionsData | null;
}

interface ShowComissionsData {
  name: string;
  comissions: ComissionData[];
}

interface ComissionData {
  value: string;
  formattedValue: string;
  property_code: string;
  formattedDate: string;
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(37, 40, 43, 0.72)',
    zIndex: 9999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '1rem',
    padding: '1.5rem',
    maxWidth: '30rem',
    width: '80vw',
    maxHeight: '80vh',
  },
};

const ComissionsModal: React.FC<ComissionsModalProps> = ({
  closeModal,
  data,
}) => {
  const landscapeAndAbove = !useMediaQuery(`${mediaQueries.mobileLandscape}`);

  return (
    <Modal
      isOpen={!!data}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      style={customStyles}
      onRequestClose={closeModal}
      appElement={document.querySelector('#root') as HTMLElement}
    >
      <Header>
        <h2>{landscapeAndAbove ? data?.name : `Comissões de ${data?.name}`}</h2>
        <button onClick={closeModal} data-testid="close-modal">
          <FiX size={24} />
        </button>
      </Header>
      <ComissionsGrid>
        {data?.comissions.map(
          ({ property_code, formattedDate, formattedValue }) => (
            <li key={property_code}>
              <span>{property_code}</span>
              <span>{formattedDate}</span>
              <p>
                <strong>{formattedValue}</strong>
              </p>
            </li>
          )
        )}
      </ComissionsGrid>
    </Modal>
  );
};

export default ComissionsModal;
