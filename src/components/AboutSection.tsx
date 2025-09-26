import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.jpg';

const AboutSection = () => {
  const teamMembers = [
    {
      name: 'Chanchal Karna Chavhan',
      role: 'Frontend & AI Research Lead',
      avatar: '👩‍💻',
      bio: 'Electronics & Computer Engineer specializing in AI for emergency response systems.',
    },
    {
      name: 'Shraddha Sunil Chavhan',
      role: 'AI & Backend Developer',
      avatar: '👨‍🔧',
      bio: 'Electronics & Computer Engineer specializing in AI and backend solutions for smart cities.',
    },
    {
      name: 'Sanika More',
      role: 'vapi Chatbot Developer',
      avatar: '👩‍💼',
      bio: 'Electronics & Computer Engineer specializing in AI-driven chatbot solutions.',
    },
    {
      name: 'Kunal Sharad Gawand',
      role: 'Vapi Chatbot co-Developer',
      avatar: '👨‍🎓',
      bio: 'Computer Science Engineer focusing on AI and chatbot technologies.',
    },
    {
      name: 'Swarup Sachin Sandhan',
      role: 'IoT Systems Developer',
      avatar: '👩‍🎨',
      bio: 'Electronics & Computer Engineer with a passion for IoT and smart city innovations.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-neutral-light/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Company Introduction */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Team Innovions
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We are a passionate team of engineers, data scientists, and designers dedicated to building 
                AI-powered solutions for safer, smarter cities. Our mission is to revolutionize emergency 
                response systems through cutting-edge technology and real-time traffic optimization.
              </p>
              
              {/* Team Photo */}
              <div className="mb-12">
                <img 
                  src={teamPhoto} 
                  alt="Team INNOVIONS - AI Emergency Response Specialists"
                  className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">5+ Years</div>
                  <div className="text-muted-foreground">Emergency Tech Experience</div>
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Cities Served</div>
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-muted-foreground">Lives Impacted</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-foreground mb-12">Meet Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="card-emergency animate-bounce-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{member.avatar}</div>
                    <h4 className="text-lg font-bold text-foreground mb-1">{member.name}</h4>
                    <div className="text-primary font-medium mb-3">{member.role}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                    
                    <div className="flex justify-center space-x-3">
                      <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Linkedin className="w-4 h-4 text-primary" />
                      </button>
                      <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Github className="w-4 h-4 text-primary" />
                      </button>
                      <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="text-center bg-primary/5 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Mission</h3>
            <blockquote className="text-lg text-muted-foreground italic leading-relaxed max-w-3xl mx-auto">
              "To create intelligent emergency response systems that save lives by optimizing traffic flow, 
              reducing response times, and building smarter, more resilient cities for everyone."
            </blockquote>
            <div className="mt-6 text-primary font-semibold">— Team Innovions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
