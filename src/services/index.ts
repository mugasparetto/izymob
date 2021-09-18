import brokers from '../data/brokers.json';
import leads from '../data/leads.json';

import {
  formatPhoneNumber,
  formatDate,
  formatPrice,
  stringToHslColor,
} from '../utils';

interface LeadData {
  key: number;
  name: string;
  email: string;
  broker: LeadBroker;
  fullPhoneNumber: string;
  formattedPhone: string;
  formattedCreatedAt: string;
  interests: InterestData[];
}

interface LeadBroker {
  key: number;
  name: string;
  color: string;
}

interface InterestData {
  code: string;
  title: string;
  type: 'APARTAMENTO' | 'CASA' | 'CASA_DE_VILA' | 'PALAFITA' | 'CAVERNA';
  formattedPrice: string;
  formattedType: string;
}

interface BrokerData {
  key: number;
  name: string;
  email: string;
  fullPhoneNumber: string;
  formattedPhone: string;
  totalComissions: string;
  leadCount: number;
  comissions: ComissionData[];
}

interface ComissionData {
  value: string;
  formattedValue: string;
  property_code: string;
  formattedDate: string;
}

export const getBrokerData = (brokerKey: number): LeadBroker => {
  const { key, name } = brokers[brokerKey - 1];

  return {
    key,
    name,
    color: stringToHslColor(name.toLowerCase()),
  };
};

export const getFormattedLeads = (): LeadData[] => {
  return leads.map(
    ({
      key,
      name,
      email,
      int_code,
      phone,
      broker_key,
      created_at,
      interests,
    }) => {
      const formattedInterests = interests.map(
        ({ code, sale_price, title, type }) => {
          return {
            code,
            title,
            type,
            formattedPrice: formatPrice(parseInt(sale_price)),
            formattedType: type.replace(/_/g, ' '),
          } as InterestData;
        }
      );

      return {
        key,
        name,
        email,
        broker: getBrokerData(broker_key),
        fullPhoneNumber: int_code + phone,
        formattedPhone: formatPhoneNumber({
          code: int_code,
          phoneNumber: phone,
        }),
        formattedCreatedAt: formatDate({ date: created_at, withHours: true }),
        interests: formattedInterests,
      } as LeadData;
    }
  );
};

const getLeadsCount = (): { [key: number]: number } => {
  const results = leads.reduce((acc, cur) => {
    acc[cur.broker_key] = (acc[cur.broker_key] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  return results;
};

export const getFormattedBrokers = (): BrokerData[] => {
  const leadsCount = getLeadsCount();

  return brokers.map((broker) => {
    const formattedComissions = broker.commissions.map(
      ({ value, property_code, date }) => {
        return {
          value,
          property_code,
          formattedValue: formatPrice(parseInt(value)),
          formattedDate: formatDate({ date, withHours: false }),
        } as ComissionData;
      }
    );

    return {
      key: broker.key,
      name: broker.name,
      email: broker.email,
      fullPhoneNumber: broker.int_code + broker.phone,
      leadCount: leadsCount[broker.key],
      totalComissions: formatPrice(
        formattedComissions.reduce((acc, curr) => acc + parseInt(curr.value), 0)
      ),
      formattedPhone: formatPhoneNumber({
        code: broker.int_code,
        phoneNumber: broker.phone,
      }),
      comissions: formattedComissions,
    } as BrokerData;
  });
};
