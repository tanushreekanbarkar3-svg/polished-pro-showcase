import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Linkedin, Download, Terminal, Code, Zap, Database, Cloud } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "console.log('Building the future with code...');";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const techElements = [
    { icon: Terminal, delay: "0s", position: "top-20 left-20" },
    { icon: Code, delay: "0.5s", position: "top-32 right-32" },
    { icon: Database, delay: "1s", position: "bottom-40 left-32" },
    { icon: Cloud, delay: "1.5s", position: "bottom-20 right-20" },
    { icon: Zap, delay: "2s", position: "top-1/2 left-10" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-tech/5 relative overflow-hidden tech-grid">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)] opacity-5"></div>
      
      {/* Floating tech icons */}
      {techElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <div
            key={index}
            className={`absolute ${element.position} opacity-20 tech-float hover-tech`}
            style={{ animationDelay: element.delay }}
          >
            <IconComponent className="w-8 h-8 text-primary" />
          </div>
        );
      })}
      
      {/* Matrix-like code rain effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary/10 text-xs font-mono matrix-char"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Code terminal effect */}
          <div className="mb-8 p-4 bg-black/80 rounded-lg border border-primary/20 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400 ml-4">terminal</span>
            </div>
            <div className="font-mono text-sm text-green-400">
              <span className="text-blue-400">$</span> {typedText}
              <span className="animate-pulse">|</span>
            </div>
          </div>

          <div className="mb-6">
            <Badge variant="outline" className="text-sm mb-4 px-4 py-2 tech-glow hover-tech border-primary/30">
              <Terminal className="w-4 h-4 mr-2" />
              Site Reliability Engineer
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-tech bg-clip-text text-transparent tech-float">
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
            <Badge className="px-4 py-2 hover-tech tech-glow">
              <Cloud className="w-4 h-4 mr-1" />
              Cloud Infrastructure
            </Badge>
            <Badge className="px-4 py-2 hover-tech tech-glow">
              <Zap className="w-4 h-4 mr-1" />
              AI Automation
            </Badge>
            <Badge className="px-4 py-2 hover-tech tech-glow">
              <Database className="w-4 h-4 mr-1" />
              AWS Solutions Architect
            </Badge>
            <Badge className="px-4 py-2 hover-tech tech-glow">
              <Terminal className="w-4 h-4 mr-1" />
              DevOps & SRE
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="tech-glow hover-tech bg-gradient-to-r from-primary to-tech border-0">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
            <Button variant="outline" size="lg" className="hover-tech border-primary/30 hover:border-primary">
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