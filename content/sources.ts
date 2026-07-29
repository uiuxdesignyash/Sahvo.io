export interface StatItem {
  id: string;
  value: string;
  label: string;
  source: string | null;
  year: string | null;
  goal?: boolean;
  notes?: string;
}

export interface MarketDataset {
  inbound: StatItem[];
  domestic: StatItem[];
  pilot: StatItem[];
}

export const MARKET_DATA: MarketDataset = {
  inbound: [
    {
      id: 'ita-2024',
      value: '20.6 M',
      label: 'International Tourist Arrivals (incl. NRIs)',
      source: 'Ministry of Tourism / UN Tourism (Lok Sabha Reply)',
      year: '2025',
    },
    {
      id: 'fta-2024',
      value: '9.95 M',
      label: 'Foreign Tourist Arrivals (Foreign Nationals)',
      source: 'Ministry of Tourism, Govt of India',
      year: '2024',
    },
    {
      id: 'fee-2023',
      value: '$28.08 B',
      label: 'Foreign Exchange Earnings from Tourism',
      source: 'India Tourism Data Compendium',
      year: '2024',
    },
  ],
  domestic: [
    {
      id: 'dtv-2024',
      value: '2.95 B',
      label: 'Domestic Tourist Visits across India',
      source: 'Ministry of Tourism (Lok Sabha Reply)',
      year: '2025',
    },
    {
      id: 'wef-rank',
      value: '39th',
      label: 'WEF Travel & Tourism Development Index Rank (out of 119)',
      source: 'World Economic Forum TTDI Report',
      year: '2024',
    },
  ],
  pilot: [
    {
      id: 'jaipur-fta',
      value: '6.23 L',
      label: 'Foreign Tourist Arrivals in Jaipur City',
      source: 'Rajasthan Department of Tourism',
      year: '2025',
    },
    {
      id: 'rajasthan-fta',
      value: '20.7 L',
      label: 'Foreign Tourist Arrivals in Rajasthan State (+21.9% YoY)',
      source: 'Rajasthan Department of Tourism',
      year: '2025',
    },
  ],
};
