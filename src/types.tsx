export type InitialType = {
  tickets: Array<TicketsType>;
  stopSearch: boolean;
  searchId: string;
  reloadSearch: boolean;
};

export type TicketsType = {
  price: number;
  carrier: string;
  segments: Array<SegmentsType>;
};

export type FilterType = {
  isAll: boolean;
  withoutTransfers: boolean;
  oneTransfer: boolean;
  twoTransfer: boolean;
  threeTransfer: boolean;
  sort: boolean;
};

export type SegmentsType = {
  date: string;
  destination: string;
  duration: number;
  origin: string;
  stops: Array<string>;
};

export type GetTicketsType = {
  stop: boolean;
  tickets: Array<TicketsType>;
};
