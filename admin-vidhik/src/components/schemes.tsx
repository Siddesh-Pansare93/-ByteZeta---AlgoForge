import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const schemes = [
  {
    id: "SCH-001",
    name: "Digital Literacy Program",
    category: "Education",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    beneficiaries: 5000,
    budget: "₹50,00,000",
    description: "Program to enhance digital literacy among citizens"
  },
  {
    id: "SCH-002",
    name: "Clean City Initiative",
    category: "Environment",
    status: "upcoming",
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    beneficiaries: 100000,
    budget: "₹2,00,00,000",
    description: "City-wide cleanliness and waste management program"
  },
  {
    id: "SCH-003",
    name: "Smart Transportation",
    category: "Infrastructure",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    beneficiaries: 25000,
    budget: "₹1,50,00,000",
    description: "Implementation of smart traffic management systems"
  }
];

export function Schemes() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Government Schemes</CardTitle>
              <CardDescription>
                Manage and monitor government schemes and initiatives
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Scheme
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search schemes..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schemes.map((scheme) => (
              <Card key={scheme.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{scheme.name}</CardTitle>
                      <CardDescription>{scheme.category}</CardDescription>
                    </div>
                    <Badge
                      variant={scheme.status === 'active' ? 'default' : 'secondary'}
                    >
                      {scheme.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Duration:</span>{' '}
                      {scheme.startDate} to {scheme.endDate}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Beneficiaries:</span>{' '}
                      {scheme.beneficiaries.toLocaleString()}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Budget:</span> {scheme.budget}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {scheme.description}
                    </p>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}