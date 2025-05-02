
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { useBookingStore } from "@/data/BookingStore";
import { Booking, WasteType } from "@/types/booking";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const getWasteTypeLabel = (type: WasteType): string => {
  const labels: Record<WasteType, string> = {
    plastic: "Plastic",
    paper: "Paper",
    glass: "Glass",
    "e-waste": "E-Waste",
    metal: "Metal",
    other: "Other",
  };
  return labels[type];
};

const getTimeFromId = (timeSlotId: string): string => {
  const hour = parseInt(timeSlotId.split("-")[1]);
  const minute = timeSlotId.split("-")[2];
  const hourFormatted = hour > 12 ? hour - 12 : hour;
  const period = hour >= 12 ? "PM" : "AM";
  return `${hourFormatted}:${minute} ${period}`;
};

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookingById } = useBookingStore();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const foundBooking = getBookingById(id);
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        setNotFound(true);
      }
    }
  }, [id, getBookingById]);

  if (notFound) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            We couldn't find the booking you're looking for.
          </p>
          <Button asChild>
            <Link to="/book">Make a New Booking</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-eco"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your recycling drop-off has been scheduled. See you soon!
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              Reference ID: {booking.id.slice(0, 8)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p>{booking.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Waste Type</h3>
                <p>{getWasteTypeLabel(booking.wasteType)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                <p>{booking.date ? format(new Date(booking.date), "MMMM d, yyyy") : "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Time</h3>
                <p>{getTimeFromId(booking.timeSlot)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
              <p className="text-sm">{booking.email}</p>
              <p className="text-sm">{booking.phone}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Drop-off Address</h3>
              <p className="text-sm">123 Green Street, Eco City, EC 12345</p>
              <p className="text-xs text-muted-foreground mt-1">
                Our facility is open Monday through Friday, 9 AM to 5 PM
              </p>
            </div>

            {booking.notes && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
                <p className="text-sm">{booking.notes}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Need to reschedule? Please contact us at (123) 456-7890
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;
