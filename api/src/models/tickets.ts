export interface Ticket {
  id?: number;
  passenger_name: string;
  passenger_surname: string;
  passenger_email: string;
  flight_id: number;
  seat_number: number;
}

export class TicketModel implements Ticket {
  constructor(
    public passenger_name: string,
    public passenger_surname: string,
    public passenger_email: string,
    public flight_id: number,
    public seat_number: number,
  ) {}
}
