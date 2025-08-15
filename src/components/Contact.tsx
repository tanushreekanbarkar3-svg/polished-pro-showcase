import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Download, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-background to-tech/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring reliability and automation to your infrastructure? Let's discuss how I can help your team succeed.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Get In Touch</CardTitle>
                <CardDescription>
                  Available for Site Reliability Engineering opportunities and consulting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">tanushreekanbarkar@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+1 (216) 527-4108</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Harrison, NJ</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">linkedin.com/in/tanushree-kanbarkar/</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t">
                  <h4 className="font-semibold">Currently Open To:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="px-3 py-1">Site Reliability Engineering Roles</Badge>
                    <Badge className="px-3 py-1">DevOps Consulting</Badge>
                    <Badge className="px-3 py-1">Cloud Infrastructure Projects</Badge>
                    <Badge className="px-3 py-1">AI/Automation Initiatives</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Quick Actions</CardTitle>
                <CardDescription>
                  Download my resume or send me a message directly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button 
                    className="w-full justify-start text-left h-auto p-4 shadow-card" 
                    size="lg"
                    onClick={() => {
                      window.location.href = 'mailto:tanushreekanbarkar@gmail.com?subject=Job Opportunity - Site Reliability Engineer&body=Hi Tanushree,%0D%0A%0D%0AI am reaching out regarding a potential opportunity...';
                    }}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="p-2 bg-primary-foreground/10 rounded-lg">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Send Email</p>
                        <p className="text-sm opacity-80">Quick message for opportunities</p>
                      </div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto p-4 shadow-card" 
                    size="lg"
                     onClick={() => {
                        console.log('Download button clicked');
                        const link = document.createElement('a');
                        link.href = window.location.origin + '/resume.pdf';
                        link.download = 'Tanushree_Kanbarkar_Resume.pdf';
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        console.log('Download link created:', link.href);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        console.log('Download initiated');
                     }}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Download Resume</p>
                        <p className="text-sm text-muted-foreground">Latest PDF version</p>
                      </div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto p-4 shadow-card" 
                    size="lg"
                    onClick={() => {
                      window.open('https://linkedin.com/in/tanushree-kanbarkar/', '_blank');
                    }}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Linkedin className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Connect on LinkedIn</p>
                        <p className="text-sm text-muted-foreground">Professional networking</p>
                      </div>
                    </div>
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-tech/10 p-6 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-3 text-primary">Response Time</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    I typically respond to inquiries within 24 hours. For urgent matters, please mention "URGENT" in your subject line.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-success font-medium">Available for new opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Professional Summary Footer */}
          <Card className="mt-8 shadow-elegant bg-gradient-to-r from-primary/5 to-tech/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Ready to Enhance Your Infrastructure Reliability?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  With 4 years of experience in Site Reliability Engineering and proven success in reducing operational overhead by 40% 
                  across 100+ environments, I'm ready to bring stability, automation, and AI-driven insights to your infrastructure.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="shadow-elegant"
                    onClick={() => {
                      window.location.href = 'mailto:tanushreekanbarkar@gmail.com?subject=Let\'s Start a Conversation&body=Hi Tanushree,%0D%0A%0D%0AI would like to discuss...';
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Start a Conversation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                     onClick={() => {
                        console.log('Second download button clicked');
                        const link = document.createElement('a');
                        link.href = window.location.origin + '/resume.pdf';
                        link.download = 'Tanushree_Kanbarkar_Resume.pdf';
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        console.log('Second download link created:', link.href);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        console.log('Second download initiated');
                     }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    View Full Resume
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;