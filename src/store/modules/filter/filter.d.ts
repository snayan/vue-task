export interface Channel {
  id: number;
  name: string;
}

export interface Date {
  start: string;
  end: string;
  value: string;
  name: string;
}

export interface Filter {
  dates: Array<Date>;
  channels: Array<Channel>;
}
