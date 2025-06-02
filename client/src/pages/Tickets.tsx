'use client';

import type React from 'react';

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getTickets, type Ticket } from '@/fetchers/tickets';
import { Spinner } from '@/components/ui/spinner';
import { TicketTable } from '@/components/ticket-table';
import { AddFlightModal } from '@/components/add-flight-modal';
import { fetchCities } from '@/fetchers/cities';

export default function AdminTicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAddFlightOpen, setIsAddFlightOpen] = useState(false);

  const { data, status } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  const { data: citiesData } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const cities = citiesData || [];
  const tickets = data || [];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ticket Management</h1>
          <p className="text-gray-600">View and manage all flight tickets purchased by customers</p>
        </div>
        <AddFlightModal
          isAddFlightOpen={isAddFlightOpen}
          setIsAddFlightOpen={setIsAddFlightOpen}
          cities={cities}
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Showing {tickets?.length} tickets</p>
      </div>

      {tickets?.length === 0 && (
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">No Tickets Found</h2>
            <p className="text-gray-600 mb-4">
              There are currently no tickets available. Please check back later.
            </p>
          </CardContent>
        </Card>
      )}

      {status === 'pending' && <Spinner />}

      {status === 'error' && (
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Tickets</h2>
            <p className="text-gray-600 mb-4">
              There was an error loading the tickets. Please try again later.
            </p>
          </CardContent>
        </Card>
      )}

      {status === 'success' && tickets && tickets.length > 0 && (
        <TicketTable
          tickets={tickets}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
        />
      )}
    </main>
  );
}
