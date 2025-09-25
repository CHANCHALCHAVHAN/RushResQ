import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Activity, Clock, Leaf, AlertCircle, TrendingUp, Users, Zap } from 'lucide-react';

const LiveDashboard = () => {
  const [stats, setStats] = useState({
    activeEmergencies: 3,
    avgWaitTime: 28,
    co2Saved: 12,
    totalRequests: 247,
    successRate: 95,
    activeCities: 8
  });

  const [recentActivity] = useState([
    { id: 'REQ001', type: 'ambulance', route: 'Highway 101', status: 'active', time: '2 min ago' },
    { id: 'REQ002', type: 'fire', route: 'Main Street', status: 'completed', time: '5 min ago' },
    { id: 'REQ003', type: 'police', route: 'Broadway Ave', status: 'processing', time: '8 min ago' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        avgWaitTime: Math.max(15, Math.min(45, prev.avgWaitTime + (Math.random() - 0.5) * 5)),
        co2Saved: prev.co2Saved + Math.random() * 0.1,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'ambulance': return '🚑';
      case 'fire': return '🚒';
      case 'police': return '🚓';
      default: return '🚙';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'status-active';
      case 'processing': return 'status-warning';
      case 'completed': return 'bg-primary/10 text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-neutral-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Live Emergency Dashboard
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real-time monitoring of emergency corridors and traffic optimization across the city
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Statistics Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-emergency/10 border-emergency/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <AlertCircle className="w-8 h-8 text-emergency" />
                  </div>
                  <div className="text-3xl font-bold text-emergency">{stats.activeEmergencies}</div>
                  <div className="text-sm text-gray-300">Active Emergencies</div>
                </CardContent>
              </Card>

              <Card className="bg-warning/10 border-warning/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-8 h-8 text-warning" />
                  </div>
                  <div className="text-3xl font-bold text-warning">{Math.round(stats.avgWaitTime)}s</div>
                  <div className="text-sm text-gray-300">Avg Wait Time</div>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary">{stats.co2Saved.toFixed(1)}%</div>
                  <div className="text-sm text-gray-300">CO₂ Saved</div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>System Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.totalRequests}</div>
                    <div className="text-sm text-gray-300">Total Requests Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.successRate}%</div>
                    <div className="text-sm text-gray-300">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.activeCities}</div>
                    <div className="text-sm text-gray-300">Active Cities</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map Placeholder */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Live Traffic Map</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Real-time view of emergency corridors and traffic signals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-primary/20 to-emergency/20 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}></div>
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse-glow" />
                    <p className="text-white text-lg font-medium">Interactive Map</p>
                    <p className="text-gray-300 text-sm">Showing {stats.activeEmergencies} active corridors</p>
                  </div>
                  
                  {/* Animated dots representing traffic */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <div className="absolute top-12 right-8 w-2 h-2 bg-emergency rounded-full animate-pulse delay-500"></div>
                  <div className="absolute bottom-8 left-12 w-2 h-2 bg-warning rounded-full animate-pulse delay-1000"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getTypeIcon(activity.type)}</span>
                      <div>
                        <div className="font-medium text-white text-sm">{activity.id}</div>
                        <div className="text-xs text-gray-300">{activity.route}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getStatusColor(activity.status)} text-xs`}>
                        {activity.status}
                      </Badge>
                      <div className="text-xs text-gray-300 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">IoT Sensors</span>
                  <Badge className="status-active">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">AI Processing</span>
                  <Badge className="status-active">Optimal</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Traffic Signals</span>
                  <Badge className="status-active">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Emergency Services</span>
                  <Badge className="status-active">Ready</Badge>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="btn-hero w-full"
              onClick={() => window.open('#', '_blank')}
            >
              <Users className="w-4 h-4 mr-2" />
              Open Full Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDashboard;