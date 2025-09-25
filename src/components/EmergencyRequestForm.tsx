import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, AlertTriangle, CheckCircle, Clock, Siren } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const requestSchema = z.object({
  callerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phoneNumber: z.string().min(10, 'Valid phone number required').max(15),
  routeNumber: z.string().min(1, 'Route number is required').max(50),
  vehicleType: z.enum(['ambulance', 'fire', 'police', 'emergency']),
  vehicleId: z.string().max(20).optional(),
  consent: z.boolean().refine(val => val === true, 'Consent is required for emergency requests'),
});

type RequestForm = z.infer<typeof requestSchema>;

const EmergencyRequestForm = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'tracking'>('idle');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<RequestForm>({
    resolver: zodResolver(requestSchema),
  });

  const vehicleType = watch('vehicleType');

  const vehicleTypes = [
    { id: 'ambulance', label: 'Ambulance', icon: '🚑', color: 'bg-blue-100 text-blue-800' },
    { id: 'fire', label: 'Fire Truck', icon: '🚒', color: 'bg-red-100 text-red-800' },
    { id: 'police', label: 'Police', icon: '🚓', color: 'bg-purple-100 text-purple-800' },
    { id: 'emergency', label: 'Emergency Vehicle', icon: '🚙', color: 'bg-orange-100 text-orange-800' },
  ];

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location captured",
            description: "GPS coordinates have been added to your request.",
          });
        },
        () => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const onSubmit = async (data: RequestForm) => {
    if (!location) {
      toast({
        title: "Location required",
        description: "Please capture your GPS location before submitting.",
        variant: "destructive",
      });
      return;
    }

    setStatus('submitting');

    const payload = {
      ...data,
      latitude: location.lat,
      longitude: location.lng,
    };

    try {
      // ✅ Replace with your Google Apps Script Web App URL
      const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwVx64Gu58b7Frv1DqCel3teidOF4bJ3g88pDGSYJzGKnbKQTT6i3DVUyXz7GeI62XkwA/exec";

      const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === 'success') {
        const newRequestId = `REQ${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        setRequestId(newRequestId);
        setStatus('success');
        toast({
          title: "Emergency request submitted!",
          description: `Request ID: ${newRequestId}. Traffic corridor is being processed.`,
        });

        setTimeout(() => setStatus('tracking'), 3000);
      } else {
        throw new Error('Failed to save request');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission failed",
        description: "Unable to save request. Please try again later.",
        variant: "destructive",
      });
      setStatus('idle');
    }
  };

  const StatusTimeline = () => {
    if (status !== 'success' && status !== 'tracking') return null;

    const steps = [
      { label: 'Request Received', status: 'completed', icon: CheckCircle },
      { label: 'Processing Route', status: status === 'tracking' ? 'completed' : 'current', icon: Clock },
      { label: 'Traffic Lights Adjusting', status: status === 'tracking' ? 'current' : 'pending', icon: AlertTriangle },
      { label: 'Corridor Active', status: 'pending', icon: Siren },
    ];

    return (
      <div className="mt-6 p-4 bg-accent/50 rounded-lg">
        <h4 className="font-semibold mb-4 text-center">Request Status</h4>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-primary text-primary-foreground' :
                  step.status === 'current' ? 'bg-warning text-warning-foreground animate-pulse-glow' :
                  'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={step.status === 'completed' ? 'text-primary font-medium' : ''}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="request-form" className="py-20 bg-neutral-light/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Emergency Corridor Request
            </h2>
            <p className="text-muted-foreground text-lg">
              Submit your emergency vehicle details for immediate traffic corridor assistance
            </p>
          </div>

          <Card className="card-emergency animate-bounce-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Siren className="w-5 h-5 text-emergency" />
                <span>Emergency Request Form</span>
              </CardTitle>
              <CardDescription>
                All fields are required for emergency processing. Your request will be processed immediately.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {requestId && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Request Submitted Successfully!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Request ID: <span className="font-mono font-bold">{requestId}</span>
                  </p>
                  <StatusTimeline />
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Caller Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="callerName">Caller Name *</Label>
                    <Input id="callerName" {...register('callerName')} className="mt-1" placeholder="Enter your full name" />
                    {errors.callerName && <p className="text-sm text-emergency mt-1">{errors.callerName.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input id="phoneNumber" {...register('phoneNumber')} className="mt-1" placeholder="+1 234 567 8900" />
                    {errors.phoneNumber && <p className="text-sm text-emergency mt-1">{errors.phoneNumber.message}</p>}
                  </div>
                </div>

                {/* Route and Vehicle ID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="routeNumber">Route Number *</Label>
                    <Input id="routeNumber" {...register('routeNumber')} className="mt-1" placeholder="e.g., Route 66, I-95, Main St" />
                    {errors.routeNumber && <p className="text-sm text-emergency mt-1">{errors.routeNumber.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="vehicleId">Vehicle ID (Optional)</Label>
                    <Input id="vehicleId" {...register('vehicleId')} className="mt-1" placeholder="Vehicle identification" />
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <Label>Vehicle Emergency Type *</Label>
                  <RadioGroup value={vehicleType} onValueChange={(value) => setValue('vehicleType', value as 'ambulance' | 'fire' | 'police' | 'emergency')} className="mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      {vehicleTypes.map((type) => (
                        <div key={type.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={type.id} id={type.id} />
                          <Label htmlFor={type.id} className="flex items-center space-x-2 cursor-pointer">
                            <span className="text-xl">{type.icon}</span>
                            <span>{type.label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  {errors.vehicleType && <p className="text-sm text-emergency mt-1">{errors.vehicleType.message}</p>}
                </div>

                {/* Location */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">GPS Location</Label>
                    {location ? (
                      <Badge variant="outline" className="status-active"><MapPin className="w-3 h-3 mr-1" />Captured</Badge>
                    ) : (
                      <Badge variant="outline" className="status-warning">Required</Badge>
                    )}
                  </div>
                  {location ? (
                    <p className="text-sm text-muted-foreground">Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}</p>
                  ) : (
                    <Button type="button" variant="outline" onClick={getLocation} className="w-full">
                      <MapPin className="w-4 h-4 mr-2" /> Use My Location
                    </Button>
                  )}
                </div>

                {/* Consent */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="consent" onCheckedChange={(checked) => setValue('consent', checked as boolean)} />
                  <Label htmlFor="consent" className="text-sm">
                    I confirm this is a real emergency and authorize traffic signal adjustments
                  </Label>
                </div>
                {errors.consent && <p className="text-sm text-emergency">{errors.consent.message}</p>}

                <Button type="submit" className="btn-emergency w-full text-lg py-6" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" /> Processing Request...
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5 mr-2" /> Submit Emergency Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmergencyRequestForm;
