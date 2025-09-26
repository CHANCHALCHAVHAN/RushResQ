import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    reset();
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'rushresq@gmail.com',
      href: 'mailto:sakuchavhan08@gmail.com',
      color: 'text-blue-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8087871131',
      href: 'tel:+918087871131',
      color: 'text-green-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kopargaon, Maharashtra, India',
      href: 'https://maps.google.com',
      color: 'text-red-500',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/CHANCHALCHAVHAN/RushResQ/blob/main/index.html',
      color: 'text-gray-700',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rushresq-smart-traffic-system-184136387/',
      color: 'text-blue-600',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-neutral-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Have questions about RushResQ or want to implement emergency corridors in your city? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Send us a message</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the form below and we'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
                      <p className="text-gray-300">Thank you for reaching out. We'll be in touch soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-white">Name *</Label>
                        <Input
                          id="name"
                          {...register('name')}
                          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-sm text-emergency mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-emergency mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-white">Message *</Label>
                        <Textarea
                          id="message"
                          {...register('message')}
                          className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                          placeholder="Tell us about your Question..."
                        />
                        {errors.message && (
                          <p className="text-sm text-emergency mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="btn-hero w-full text-lg py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-in space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <div className={`w-12 h-12 ${info.color} bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">{info.label}</div>
                          <div className="text-white font-medium">{info.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 ${link.color} bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all`}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-6">
                <h4 className="text-lg font-bold text-primary mb-3">Emergency Support</h4>
                <p className="text-gray-300 text-sm mb-4">
                  For critical system issues or emergency corridor failures, contact our 24/7 support team:
                </p>
                <a 
                  href="tel:+91 8087871131"
                  className="btn-emergency inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency: +91 8087871131
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 RushResQ by Team Innovions. All rights reserved.</p>
            <p className="mt-2 text-sm">Building smarter cities, saving lives through AI-powered emergency response.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
