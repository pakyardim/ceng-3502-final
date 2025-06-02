import type { Ticket } from '@/fetchers/tickets';
import { Plane, Eye, Calendar, Clock, User, Mail } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from './ui/card';
import { extractDateAndTime, findTimeDifference, FLIGHT_COLORS } from '@/lib/utils';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

interface Props {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
}

export function TicketTable({ tickets, selectedTicket, setSelectedTicket }: Props) {
  const getStatusBadge = (status: 'confirmed' | 'cancelled' | 'pending') => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const color = FLIGHT_COLORS[(selectedTicket?.id || 1) % FLIGHT_COLORS.length];
  const selectedTicketDuration = selectedTicket
    ? findTimeDifference(selectedTicket.departure_time, selectedTicket.arrival_time)
    : '';

  const selectedTicketDeparture = selectedTicket
    ? extractDateAndTime(selectedTicket.departure_time)
    : { time: '', date: '' };

  const selectedTicketArrival = selectedTicket
    ? extractDateAndTime(selectedTicket.arrival_time)
    : { time: '', date: '' };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Flight</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Passenger</TableHead>
              <TableHead>Seat</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket: Ticket) => {
              const { time: departureTime, date: departureDate } = extractDateAndTime(ticket.departure_time);

              return (
                <TableRow key={ticket.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.flight_id}</div>
                      <div className="text-sm text-gray-500">Some Airline</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{ticket.from_city_name}</span>
                      <Plane className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{ticket.to_city_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{departureDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{departureTime}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-gray-400" />
                        <span className="text-sm font-medium">
                          {ticket.passenger_name} {ticket.passenger_surname}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{ticket.passenger_email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">6B</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">{ticket.price}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge('confirmed')}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(ticket)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Ticket Details - {ticket.id}</DialogTitle>
                          <DialogDescription>Complete information for this flight ticket</DialogDescription>
                        </DialogHeader>
                        {selectedTicket && (
                          <div className="space-y-6">
                            <div className={`h-1 bg-gradient-to-r ${color}`} />
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Flight Information</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Flight ID:</span>
                                  <span className="ml-2 font-medium">{selectedTicket.flight_id}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Airline:</span>
                                  <span className="ml-2 font-medium">FlyTicket Airlines</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Aircraft:</span>
                                  <span className="ml-2 font-medium">BOEING 767</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Duration:</span>
                                  <span className="ml-2 font-medium">{selectedTicketDuration}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Route:</span>
                                  <span className="ml-2 font-medium">
                                    {selectedTicket.from_city_name} → {selectedTicket.to_city_name}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Date:</span>
                                  <span className="ml-2 font-medium">{selectedTicketDeparture.date}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Departure:</span>
                                  <span className="ml-2 font-medium">{selectedTicketDeparture.time}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Arrival:</span>
                                  <span className="ml-2 font-medium">{selectedTicketArrival.time}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold mb-3">Passenger Information</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">First Name:</span>
                                  <span className="ml-2 font-medium">{selectedTicket.passenger_name}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Last Name:</span>
                                  <span className="ml-2 font-medium">{selectedTicket.passenger_surname}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-gray-500">Email:</span>
                                  <span className="ml-2 font-medium">{selectedTicket.passenger_email}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold mb-3">Booking Information</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Seat:</span>
                                  <span className="ml-2 font-medium">24C</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Price:</span>
                                  <span className="ml-2 font-medium text-green-600">
                                    {selectedTicket.price}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Status:</span>
                                  <span className="ml-2">{getStatusBadge('confirmed')}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Booking Date:</span>
                                  <span className="ml-2 font-medium">2025-06-02</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
