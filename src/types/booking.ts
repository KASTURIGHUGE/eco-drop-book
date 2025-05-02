
export type WasteType = 'plastic' | 'paper' | 'glass' | 'e-waste' | 'metal' | 'other';

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  wasteType: WasteType;
  date: Date | undefined;
  timeSlot: string;
  notes: string;
}

export interface Booking extends BookingFormData {
  id: string;
  createdAt: Date;
}
