
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/data/BookingStore";
import { TimeSlot, WasteType } from '@/types/booking';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const wasteTypes: { label: string; value: WasteType }[] = [
  { label: "Plastic", value: "plastic" },
  { label: "Paper", value: "paper" },
  { label: "Glass", value: "glass" },
  { label: "E-Waste", value: "e-waste" },
  { label: "Metal", value: "metal" },
  { label: "Other", value: "other" },
];

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Please enter your full address.",
  }),
  wasteType: z.enum(["plastic", "paper", "glass", "e-waste", "metal", "other"]),
  date: z.date({
    required_error: "Please select a date.",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot.",
  }),
  notes: z.string().optional(),
});

const BookingForm = () => {
  const { addBooking, getTimeSlots } = useBookingStore();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  
  // Set up form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      wasteType: "plastic",
      notes: "",
    },
  });
  
  // Handle date selection
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const slots = getTimeSlots(date);
      setAvailableTimeSlots(slots);
      
      // Clear any previously selected time slot
      form.setValue('date', date);
      form.setValue('timeSlot', '');
    }
  };
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create booking record
    const booking = {
      ...values,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    // Save booking and navigate to confirmation
    addBooking(booking);
    toast.success("Booking successful!", {
      description: "Your recycling drop-off has been scheduled."
    });
    navigate(`/confirmation/${booking.id}`);
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Book Your Recycling Drop-off</h1>
          <p className="text-muted-foreground">
            Schedule a convenient time to drop off your recyclable materials.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              Fill out the form below to schedule your recycling drop-off.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john.doe@example.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(123) 456-7890" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="123 Green Street, Eco City" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Booking Details */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="wasteType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Waste</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select waste type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {wasteTypes.map((type) => (
                                <SelectItem 
                                  key={type.value} 
                                  value={type.value}
                                >
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  handleDateChange(date);
                                }}
                                disabled={(date) => {
                                  // Disable past dates, today, and weekends
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);
                                  const dayOfWeek = date.getDay(); 
                                  return (
                                    date < today ||
                                    dayOfWeek === 0 || // Sunday
                                    dayOfWeek === 6    // Saturday
                                  );
                                }}
                                initialFocus
                                className="pointer-events-auto p-3"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Select a weekday for your drop-off. We're closed on weekends.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {selectedDate && availableTimeSlots.length > 0 && (
                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Time Slot</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-2 gap-2"
                              >
                                {availableTimeSlots.map((slot) => (
                                  <div key={slot.id}>
                                    <RadioGroupItem
                                      value={slot.id}
                                      id={slot.id}
                                      disabled={!slot.available}
                                      className="hidden"
                                    />
                                    <label
                                      htmlFor={slot.id}
                                      className={cn(
                                        "flex items-center justify-center rounded-md border border-muted p-2 text-sm transition-colors cursor-pointer",
                                        field.value === slot.id && "border-eco bg-eco/10 text-eco font-medium",
                                        !slot.available && "bg-muted opacity-50 cursor-not-allowed"
                                      )}
                                    >
                                      {slot.time}
                                      {!slot.available && " (Booked)"}
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special instructions or details about your recyclables..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Optional - Let us know if you have any special requirements.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">Book Drop-off</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
