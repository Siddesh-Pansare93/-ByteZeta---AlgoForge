import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, ZoomControl, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Filter,
  Layers,
  MapPin,
  RefreshCcw,
  Search,
  AlertTriangle,
  Bell,
} from 'lucide-react';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample data - replace with real data from your backend
const issueData = [
  { id: 1, lat: 18.5204, lng: 73.8567, weight: 1, type: 'road', title: 'Pothole', severity: 'high', timestamp: Date.now() },
  { id: 2, lat: 18.5304, lng: 73.8467, weight: 0.8, type: 'water', title: 'Water Leakage', severity: 'medium', timestamp: Date.now() - 3600000 },
  { id: 3, lat: 18.5404, lng: 73.8367, weight: 0.5, type: 'waste', title: 'Garbage Collection', severity: 'low', timestamp: Date.now() - 7200000 },
  // Add more sample points as needed
];

const layerGroups = {
  road: 'Road Issues',
  water: 'Water Supply',
  waste: 'Waste Management',
  electricity: 'Electricity',
  infrastructure: 'Infrastructure',
};

// Search component with geocoding
function SearchControl() {
  const map = useMap();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        map.setView([parseFloat(data[0].lat), parseFloat(data[0].lon)], 13);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  }, [searchQuery, map]);

  return (
    <div className="leaflet-top leaflet-left mt-16 ml-2">
      <div className="leaflet-control leaflet-bar bg-background p-2 rounded-lg shadow-lg">
        <div className="flex gap-2">
          <Input
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-64"
          />
          <Button variant="secondary" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Alert component for real-time notifications
function AlertsPanel({ alerts }: { alerts: Array<{ id: string; message: string; severity: string }> }) {
  return (
    <div className="leaflet-bottom leaflet-right mb-16 mr-2">
      <div className="leaflet-control leaflet-bar bg-background p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="h-4 w-4" />
          <h3 className="font-semibold">Real-time Alerts</h3>
        </div>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-2 text-sm">
              <AlertTriangle className={`h-4 w-4 ${
                alert.severity === 'high' ? 'text-red-500' :
                alert.severity === 'medium' ? 'text-yellow-500' :
                'text-green-500'
              }`} />
              <p>{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MapView() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [heatmapLayer, setHeatmapLayer] = useState<any>(null);
  const [timeFrame, setTimeFrame] = useState('24h');
  const [selectedLayers, setSelectedLayers] = useState<string[]>(Object.keys(layerGroups));
  const [intensityLevel, setIntensityLevel] = useState([0.6]);
  const [searchQuery, setSearchQuery] = useState('');
  const [alerts] = useState([
    { id: '1', message: 'High concentration of issues detected in North Zone', severity: 'high' },
    { id: '2', message: 'Water supply complaints increasing in East Zone', severity: 'medium' },
    { id: '3', message: 'New road maintenance scheduled in West Zone', severity: 'low' },
  ]);

  useEffect(() => {
    if (!map) return;

    // Initialize heatmap layer with custom gradient
    const heat = (L as any).heatLayer(
      issueData.map(point => [point.lat, point.lng, point.weight]),
      { 
        radius: 25,
        blur: 15,
        maxZoom: 10,
        max: 1.0,
        gradient: {
          0.2: '#3b82f6', // blue
          0.4: '#22c55e', // green
          0.6: '#eab308', // yellow
          0.8: '#f97316', // orange
          1.0: '#ef4444'  // red
        }
      }
    );

    map.addLayer(heat);
    setHeatmapLayer(heat);

    return () => {
      map.removeLayer(heat);
    };
  }, [map]);

  const updateHeatmap = useCallback(() => {
    if (!heatmapLayer) return;

    const now = Date.now();
    const timeFrameMs = {
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    }[timeFrame] || 24 * 60 * 60 * 1000;

    const filteredData = issueData
      .filter(point => 
        selectedLayers.includes(point.type) &&
        (now - point.timestamp) <= timeFrameMs
      )
      .map(point => [point.lat, point.lng, point.weight * intensityLevel[0]]);

    heatmapLayer.setLatLngs(filteredData);
  }, [heatmapLayer, selectedLayers, intensityLevel, timeFrame]);

  useEffect(() => {
    updateHeatmap();
  }, [selectedLayers, intensityLevel, timeFrame, updateHeatmap]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Issue Heatmap</CardTitle>
            <CardDescription>Real-time visualization of civic issues across regions</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={updateHeatmap}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span className="font-medium">Layer Intensity</span>
              </div>
              <Slider
                value={intensityLevel}
                onValueChange={setIntensityLevel}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="font-medium">Active Layers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(layerGroups).map(([key, label]) => (
                  <Button
                    key={key}
                    size="sm"
                    variant={selectedLayers.includes(key) ? "default" : "outline"}
                    onClick={() => {
                      setSelectedLayers(prev =>
                        prev.includes(key)
                          ? prev.filter(l => l !== key)
                          : [...prev, key]
                      );
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[600px] rounded-lg overflow-hidden border relative">
          <MapContainer
            center={[18.5204, 73.8567]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            whenCreated={setMap}
          >
            <ZoomControl position="bottomright" />
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Street Map">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            <SearchControl />
            <AlertsPanel alerts={alerts} />

            {issueData.map(point => (
              <Marker
                key={point.id}
                position={[point.lat, point.lng]}
                icon={L.divIcon({
                  className: 'custom-div-icon',
                  html: `<div class="marker-pin bg-white p-2 rounded-full shadow-lg">
                          <div class="w-2 h-2 rounded-full ${
                            point.severity === 'high' ? 'bg-red-500' :
                            point.severity === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }"></div>
                        </div>`,
                  iconSize: [30, 30],
                  iconAnchor: [15, 15]
                })}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">Type: {layerGroups[point.type]}</p>
                    <p className="text-sm text-muted-foreground">
                      Severity: <Badge variant={point.severity === 'high' ? 'destructive' : 'default'}>{point.severity}</Badge>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Reported: {new Date(point.timestamp).toLocaleString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}