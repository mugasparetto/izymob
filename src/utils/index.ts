import { parseISO, format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { cursorTo } from 'readline';

import brokers from '../data/brokers.json';
import leads from '../data/leads.json';

interface PhoneNumberDTO {
  code: string;
  phoneNumber: string;
}

interface LeadBroker {
  key: number;
  name: string;
  color: string;
}

const stringToHslColor = (str: string, s = 60, l = 50) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

export const getBrokerData = (brokerKey: number): LeadBroker => {
  const brokerName = brokers.find((broker) => broker.key === brokerKey)?.name;

  return {
    key: brokerKey,
    name: brokerName!,
    color: stringToHslColor(brokerName!.toLowerCase()),
  };
};

export const getLeadsCount = (): { [key: number]: number } => {
  const results = leads.reduce((acc, cur) => {
    acc[cur.broker_key] = (acc[cur.broker_key] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  return results;
};

export const formatPhoneNumber = ({
  code,
  phoneNumber,
}: PhoneNumberDTO): string => {
  const ddd = phoneNumber.slice(0, 2);
  const firstPart = phoneNumber.slice(2, 7);
  const secondPart = phoneNumber.slice(7, phoneNumber.length);

  return `+${code} (${ddd}) ${firstPart} ${secondPart}`;
};

export const formatCreatedAt = (date: string): string => {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd/MM/yyyy 'às' H:mm", {
    locale: ptBr,
  });

  return formattedDate;
};

export const formatPrice = (price: number): string => {
  const brazilianReais = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return brazilianReais.format(price / 100);
};
