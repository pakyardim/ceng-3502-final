export interface Flight {
  id?: number;
  price: number;
  seats_total: number;
  arrival_time: Date;
  departure_time: Date;
  from_city: number;
  to_city: number;
}

export class FlightModel implements Flight {
  constructor(
    public price: number,
    public seats_total: number,
    public arrival_time: Date,
    public departure_time: Date,
    public from_city: number,
    public to_city: number,
  ) {}
}
