import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapView } from '@/components/map-view';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Users,
  Activity,
  TrendingUp,
  MapPin,
  Download,
  FileText,
  Filter,
  Calendar,
  RefreshCcw,
  Search,
  AlertTriangle,
  Shield,
  UserCog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const monthlyData = [
  { name: 'Jan', complaints: 65, resolved: 45, satisfaction: 85 },
  { name: 'Feb', complaints: 78, resolved: 60, satisfaction: 82 },
  { name: 'Mar', complaints: 90, resolved: 75, satisfaction: 88 },
  { name: 'Apr', complaints: 81, resolved: 70, satisfaction: 87 },
  { name: 'May', complaints: 86, resolved: 80, satisfaction: 90 },
  { name: 'Jun', complaints: 95, resolved: 85, satisfaction: 89 },
];

const categoryData = [
  { name: 'Water Supply', value: 30, color: '#0088FE' },
  { name: 'Roads', value: 25, color: '#00C49F' },
  { name: 'Electricity', value: 20, color: '#FFBB28' },
  { name: 'Sanitation', value: 15, color: '#FF8042' },
  { name: 'Others', value: 10, color: '#8884d8' },
];

const regionData = [
  { id: 1, name: 'North Zone', complaints: 120, resolved: 95 },
  { id: 2, name: 'South Zone', complaints: 85, resolved: 70 },
  { id: 3, name: 'East Zone', complaints: 95, resolved: 80 },
  { id: 4, name: 'West Zone', complaints: 75, resolved: 65 },
];

const systemLogs = [
  {
    id: 'LOG001',
    timestamp: '2024-03-15 14:30:22',
    type: 'Security',
    action: 'User Login',
    user: 'admin@vidhik.gov',
    details: 'Successful login from IP 192.168.1.1',
    severity: 'info'
  },
  {
    id: 'LOG002',
    timestamp: '2024-03-15 14:28:15',
    type: 'System',
    action: 'Backup Completed',
    user: 'system',
    details: 'Daily backup completed successfully',
    severity: 'success'
  },
  {
    id: 'LOG003',
    timestamp: '2024-03-15 14:25:30',
    type: 'Security',
    action: 'Failed Login Attempt',
    user: 'unknown',
    details: 'Multiple failed login attempts from IP 203.0.113.0',
    severity: 'warning'
  },
  {
    id: 'LOG004',
    timestamp: '2024-03-15 14:20:45',
    type: 'Complaint',
    action: 'Status Update',
    user: 'officer@vidhik.gov',
    details: 'Complaint #1234 marked as resolved',
    severity: 'info'
  },
];

const performanceMetrics = [
  { name: 'Week 1', performance: 85, target: 80 },
  { name: 'Week 2', performance: 88, target: 80 },
  { name: 'Week 3', performance: 92, target: 85 },
  { name: 'Week 4', performance: 90, target: 85 },
];

export function Overview() {
  return (
    <Tabs defaultValue="overview" className="h-full space-y-6">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Generate Insights
          </Button>
        </div>
      </div>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +180 from last month
              </div>
              <Progress value={45} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Activity className="mr-1 h-3 w-3 text-blue-500" />
                +5% improvement
              </div>
              <Progress value={85} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5K</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +2.5K new users
              </div>
              <Progress value={65} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24h</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Activity className="mr-1 h-3 w-3 text-green-500" />
                -2h improvement
              </div>
              <Progress value={75} className="mt-3" />
            </CardContent>
          </Card>
        </div>

        <MapView />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Complaint Trends</CardTitle>
              <CardDescription>Monthly complaint resolution statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="complaints" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Complaints by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
            <CardDescription>Complaint resolution by zone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="complaints" fill="#8884d8" name="Total Complaints" />
                  <Bar dataKey="resolved" fill="#82ca9d" name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Advanced Analytics</h2>
            <p className="text-sm text-muted-foreground">
              Detailed analysis and insights of system performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Weekly performance against targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="performance"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Time Analysis</CardTitle>
              <CardDescription>Average response times by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="complaints" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Citizen participation metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="reports" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Reports</h2>
            <p className="text-sm text-muted-foreground">
              Generate and download detailed reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Recently generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Generated On</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Monthly Performance Report</TableCell>
                    <TableCell>2024-03-15</TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell>
                      <Badge variant="default">Ready</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Complaint Resolution Summary</TableCell>
                    <TableCell>2024-03-14</TableCell>
                    <TableCell>Complaints</TableCell>
                    <TableCell>
                      <Badge variant="default">Ready</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User Activity Report</TableCell>
                    <TableCell>2024-03-13</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>
                      <Badge variant="default">Ready</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="logs" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">System Logs</h2>
            <p className="text-sm text-muted-foreground">
              Monitor system activities and events
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-8 w-[300px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Log Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Logs</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User Activity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      {log.type === 'Security' && <Shield className="h-4 w-4 inline mr-1" />}
                      {log.type === 'System' && <Activity className="h-4 w-4 inline mr-1" />}
                      {log.type === 'Complaint' && <FileText className="h-4 w-4 inline mr-1" />}
                      {log.type}
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <UserCog className="h-4 w-4 mr-1" />
                        {log.user}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {log.details}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.severity === 'warning'
                            ? 'destructive'
                            : log.severity === 'success'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {log.severity === 'warning' && (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {log.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}