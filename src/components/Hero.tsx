import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Linkedin, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-tech/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)] opacity-5"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Badge variant="outline" className="text-sm mb-4 px-4 py-2">
              Site Reliability Engineer
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-tech bg-clip-text text-transparent">
              Tanushree Kanbarkar
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              M.S. Computer Information Science
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Harrison, NJ
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +1 (216) 527-4108
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              tanushreekanbarkar@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn Profile
            </div>
          </div>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Site Reliability Engineer with <strong>4 years of experience</strong> designing fault-tolerant cloud infrastructure. 
            Spearheaded AWS automation across <strong>100+ environments</strong>, cutting manual overhead by <strong>40%</strong> 
            and driving reliability practices across AWS, GCP, and Azure ecosystems.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="px-4 py-2">Cloud Infrastructure</Badge>
            <Badge className="px-4 py-2">AI Automation</Badge>
            <Badge className="px-4 py-2">AWS Solutions Architect</Badge>
            <Badge className="px-4 py-2">DevOps & SRE</Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="shadow-elegant">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;