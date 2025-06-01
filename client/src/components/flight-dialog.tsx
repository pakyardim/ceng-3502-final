import { Plane } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FlightModal } from './flight-modal';
import type { Flight } from '@/fetchers/flights';
import { extractDateAndTime, FLIGHT_COLORS } from '@/lib/utils';
import { useState } from 'react';
import { bookFlight } from '@/fetchers/tickets';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '@/contexts/snackbarContext';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
}

export function FlightDialog({ isModalOpen, setIsModalOpen, selectedFlight, setSelectedFlight }: Props) {
  const { showSnackbar } = useSnackbar();

  const [bookingStep, setBookingStep] = useState('details');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: bookFlight,
    retry: 1,
    onSuccess: () => {
      setIsModalOpen(false);
      setSelectedFlight(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });
      setBookingStep('details');
      showSnackbar('Flight booked successfully!', 'success');
    },
    onError: (error: Error) => {
      showSnackbar(error.message || 'Failed to book the flight', 'error');
    },
  });

  const handleBookingSubmit = () => {
    mutate({
      passenger_name: formData.firstName,
      passenger_surname: formData.lastName,
      passenger_email: formData.email,
      flight_id: selectedFlight?.id || 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Flight Details & Booking</DialogTitle>
          </div>
          <DialogDescription>
            {selectedFlight && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{selectedFlight.from_city_name}</span>
                <Plane className="h-3 w-3" />
                <span>{selectedFlight.to_city_name}</span>
                <span>•</span>
                <span>
                  {extractDateAndTime(selectedFlight.departure_time).date}{' '}
                  {extractDateAndTime(selectedFlight.departure_time).time}
                </span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        {selectedFlight && (
          <FlightModal
            flight={selectedFlight}
            bookingStep={bookingStep}
            setBookingStep={setBookingStep}
            handleInputChange={handleInputChange}
            formData={formData}
            handleBookingSubmit={handleBookingSubmit}
            isPending={isPending}
            color={FLIGHT_COLORS[selectedFlight.id % FLIGHT_COLORS.length]}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
