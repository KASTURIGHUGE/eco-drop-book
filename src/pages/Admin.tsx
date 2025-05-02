
import { useState } from "react";
import { format } from "date-fns";
import { useBookingStore } from "@/data/BookingStore";
import { Booking, WasteType } from "@/types/booking";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

const Admin = () => {
  const { bookings } = useBookingStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  // Sort bookings by date (most recent first)
  const sortedBookings = [...bookings].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Apply filters
  const filteredBookings = sortedBookings.filter((booking) => {
    // Apply waste type filter
    if (filter !== "all" && booking.wasteType !== filter) {
      return false;
    }

    // Apply search filter
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      return (
        booking.name.toLowerCase().includes(searchLower) ||
        booking.email.toLowerCase().includes(searchLower) ||
        booking.phone.toLowerCase().includes(searchLower) ||
        booking.address.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and view all recycling drop-off bookings.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Booking Management</CardTitle>
            <CardDescription>
              View and manage all scheduled recycling drop-offs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={filter}
                  onValueChange={setFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="plastic">Plastic</SelectItem>
                    <SelectItem value="paper">Paper</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="e-waste">E-Waste</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Waste Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking: Booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {getWasteTypeLabel(booking.wasteType)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {booking.date
                            ? format(new Date(booking.date), "MMM dd, yyyy")
                            : "N/A"}
                        </TableCell>
                        <TableCell>{getTimeFromId(booking.timeSlot)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{booking.email}</div>
                            <div className="text-muted-foreground">{booking.phone}</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        {bookings.length === 0
                          ? "No bookings have been made yet."
                          : "No bookings match your filters."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Total bookings: {filteredBookings.length} 
              {filteredBookings.length !== bookings.length && ` (filtered from ${bookings.length})`}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
