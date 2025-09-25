import { Eye, Send, Cpu, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Eye,
      title: 'Detect',
      description: 'Smart cameras & IoT sensors continuously monitor traffic and emergency vehicles',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Send,
      title: 'Send',
      description: 'Real-time data is transmitted securely via IoT networks to our cloud infrastructure',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Cpu,
      title: 'Optimize',
      description: 'AI algorithms calculate the most efficient emergency corridor routes in milliseconds',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Zap,
      title: 'Actuate',
      description: 'Traffic lights automatically adjust to create clear pathways for emergency vehicles',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How RushResQ Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI-powered system creates emergency corridors in four intelligent steps
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-primary/20 to-warning/20 rounded-full"></div>
              
              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="relative animate-bounce-in" style={{ animationDelay: `${index * 200}ms` }}>
                      {/* Step Circle */}
                      <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      
                      {/* Step Content */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start space-x-4 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center shadow-lg`}>
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">&lt;2s</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Cities Deployed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;