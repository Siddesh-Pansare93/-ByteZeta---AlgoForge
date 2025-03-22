import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CheckCircle2,
  Clock,
  FileImage,
  FileText,
  History,
  ImagePlus,
  Loader2,
  MapPin,
  MessageSquare,
  Upload,
  User,
  UserCheck,
} from 'lucide-react';

const resolutionSchema = z.object({
  actionTaken: z.string().min(10, 'Action description must be at least 10 characters'),
  departmentNotes: z.string().optional(),
  assignedTo: z.string().min(1, 'Please select the assigned official'),
  status: z.enum(['pending', 'in-review', 'resolved']),
});

type ResolutionFormData = z.infer<typeof resolutionSchema>;

const complaintHistory = [
  {
    id: 1,
    timestamp: '2024-03-15 14:30:00',
    action: 'Complaint Created',
    user: 'John Doe',
    notes: 'Initial complaint submission',
  },
  {
    id: 2,
    timestamp: '2024-03-15 15:00:00',
    action: 'Assigned',
    user: 'Admin',
    notes: 'Assigned to Water Department',
  },
  {
    id: 3,
    timestamp: '2024-03-15 16:30:00',
    action: 'Status Update',
    user: 'Field Officer',
    notes: 'Team dispatched for inspection',
  },
];

export function ResolutionView({ complaintId = 'COM-001' }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { toast } = useToast();
  
  const form = useForm<ResolutionFormData>({
    resolver: zodResolver(resolutionSchema),
    defaultValues: {
      actionTaken: '',
      departmentNotes: '',
      assignedTo: '',
      status: 'pending',
    },
  });

  const onSubmit = async (data: ResolutionFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Resolution Updated',
        description: 'The complaint resolution has been successfully updated.',
      });
      
      // Reset form if needed
      form.reset();
      setSelectedImages([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update resolution. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(prev => [...prev, ...Array.from(files)]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resolution Management</CardTitle>
              <CardDescription>
                Review and manage complaint resolution details
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg py-1">
              {complaintId}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Complaint Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Complaint Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Sector 12, Block B, Near Central Park
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-1" />
                    <div>
                      <p className="font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">
                        Major water supply disruption affecting multiple households.
                        Low pressure in main pipeline.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Reported On</p>
                      <p className="text-sm text-muted-foreground">
                        March 15, 2024 14:30
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Reported By</p>
                      <p className="text-sm text-muted-foreground">
                        John Doe
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="actionTaken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action Taken</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the actions taken to resolve the complaint..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="departmentNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add internal notes or observations..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Official</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select official" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="official1">Jane Smith</SelectItem>
                          <SelectItem value="official2">Mike Johnson</SelectItem>
                          <SelectItem value="official3">Sarah Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resolution Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-review">In Review</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Evidence Upload</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary">
                          <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload images
                          </p>
                        </div>
                      </label>
                    </div>
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Resolution
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* History Timeline */}
          <Separator className="my-6" />
          <div>
            <div className="flex items-center gap-2 mb-4">
              <History className="h-4 w-4" />
              <h3 className="font-semibold">Resolution History</h3>
            </div>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-4">
                {complaintHistory.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {index !== complaintHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{event.action}</p>
                        <time className="text-sm text-muted-foreground">
                          {event.timestamp}
                        </time>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.notes}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <UserCheck className="h-3 w-3" />
                        <span className="text-xs text-muted-foreground">
                          {event.user}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}