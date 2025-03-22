import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { ResolutionView } from '@/components/resolution-view';

const complaints = [
  {
    id: "COM-001",
    title: "Water Supply Disruption",
    location: "Sector 12, Block B",
    status: "open",
    priority: "high",
    date: "2024-03-10",
    assignedTo: "John Doe"
  },
  {
    id: "COM-002",
    title: "Street Light Malfunction",
    location: "Main Road, Sector 5",
    status: "in-progress",
    priority: "medium",
    date: "2024-03-09",
    assignedTo: "Jane Smith"
  },
  // Add more complaints as needed
];

export function Complaints() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Complaint Management</CardTitle>
          <CardDescription>
            View and manage all citizen complaints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.title}</TableCell>
                    <TableCell>{complaint.location}</TableCell>
                    <TableCell>
                      <Badge variant={complaint.status === 'open' ? 'destructive' : 'secondary'}>
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={complaint.priority === 'high' ? 'destructive' : 'default'}>
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{complaint.date}</TableCell>
                    <TableCell>{complaint.assignedTo}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedComplaint(complaint.id)}
                          >
                            Manage Resolution
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Complaint Resolution</DialogTitle>
                            <DialogDescription>
                              Review and update the resolution status for this complaint
                            </DialogDescription>
                          </DialogHeader>
                          <ResolutionView complaintId={selectedComplaint || undefined} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}