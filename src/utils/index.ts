import { parseISO, format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

interface FormatPhoneDTO {
  code: string;
  phoneNumber: string;
}

interface FormatDateDTO {
  date: string;
  withHours: boolean;
}

export const stringToHslColor = (str: string, s = 60, l = 50) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

export const formatPhoneNumber = ({
  code,
  phoneNumber,
}: FormatPhoneDTO): string => {
  const ddd = phoneNumber.slice(0, 2);
  const firstPart = phoneNumber.slice(2, 7);
  const secondPart = phoneNumber.slice(7, phoneNumber.length);

  return `+${code} (${ddd}) ${firstPart} ${secondPart}`;
};

export const formatDate = ({ date, withHours }: FormatDateDTO): string => {
  const parsedDate = parseISO(date);
  const dateFormat = withHours ? "dd/MM/yyyy 'às' H:mm" : 'dd/MM/yyyy';

  const formattedDate = format(parsedDate, dateFormat, {
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
