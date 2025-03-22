import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const feedbackData = [
  {
    id: "FB-001",
    citizen: "John Smith",
    type: "Service",
    sentiment: "positive",
    message: "Quick response to water supply issue",
    date: "2024-03-15",
    rating: 5
  },
  {
    id: "FB-002",
    citizen: "Mary Johnson",
    type: "App",
    sentiment: "neutral",
    message: "The app is good but needs more features",
    date: "2024-03-14",
    rating: 3
  },
  {
    id: "FB-003",
    citizen: "Robert Davis",
    type: "Service",
    sentiment: "negative",
    message: "Delayed response to road repair request",
    date: "2024-03-13",
    rating: 2
  }
];

export function Feedback() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Citizen Feedback</CardTitle>
          <CardDescription>
            Monitor and analyze citizen feedback and satisfaction levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search feedback..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiments</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbackData.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell>{feedback.id}</TableCell>
                    <TableCell>{feedback.citizen}</TableCell>
                    <TableCell>{feedback.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          feedback.sentiment === 'positive'
                            ? 'default'
                            : feedback.sentiment === 'neutral'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {feedback.sentiment}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {feedback.message}
                    </TableCell>
                    <TableCell>{feedback.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`h-4 w-4 text-yellow-400 ${
                              index < feedback.rating ? 'fill-current' : 'stroke-current'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
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