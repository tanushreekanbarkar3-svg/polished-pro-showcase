import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Brain, Users, Lock, Workflow } from "lucide-react";

const projects = [
  {
    title: "GenAI Workflow Assistant",
    description: "Intelligent workflow automation prototype integrating Slack, Jira, and ServiceNow with large language models for automated ticket triage and workflow optimization.",
    icon: Workflow,
    technologies: ["Python", "LLMs", "Slack API", "Jira API", "ServiceNow", "GenAI", "Automation"],
    highlights: [
      "Integrated multiple enterprise platforms",
      "Implemented intelligent ticket triage",
      "Automated workflow processes",
      "Enhanced team productivity"
    ],
    category: "AI/Automation"
  },
  {
    title: "Web Personalization & Recommendation System",
    description: "Advanced recommendation engine using Python and NLP techniques to deliver personalized user experiences and significantly increase user engagement metrics.",
    icon: Users,
    technologies: ["Python", "NLP", "Machine Learning", "Recommendation Engine", "Data Analytics"],
    highlights: [
      "Successfully increased user engagement",
      "Implemented advanced NLP algorithms",
      "Built scalable recommendation system",
      "Personalized user experiences"
    ],
    category: "AI/ML"
  },
  {
    title: "Secure Message Encode/Decode Application",
    description: "Security-focused application built with Python and Tkinter featuring intuitive user interface for secure message encoding and decoding operations.",
    icon: Lock,
    technologies: ["Python", "Tkinter", "Cryptography", "Security", "GUI Development"],
    highlights: [
      "Implemented secure encoding algorithms",
      "Built intuitive user interface",
      "Focused on security best practices",
      "Cross-platform compatibility"
    ],
    category: "Security"
  },
  {
    title: "Infrastructure Automation Platform",
    description: "AWS infrastructure automation platform reducing manual provisioning by 40% across 100+ environments using Terraform and Ansible.",
    icon: Brain,
    technologies: ["AWS", "Terraform", "Ansible", "Jenkins", "CI/CD", "Infrastructure as Code"],
    highlights: [
      "40% reduction in manual overhead",
      "100+ environments managed",
      "Eliminated configuration drift",
      "Scalable automation framework"
    ],
    category: "Infrastructure"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "AI/Automation":
      return "bg-purple-500/10 text-purple-700 border-purple-200";
    case "AI/ML":
      return "bg-blue-500/10 text-blue-700 border-blue-200";
    case "Security":
      return "bg-red-500/10 text-red-700 border-red-200";
    case "Infrastructure":
      return "bg-green-500/10 text-green-700 border-green-200";
    default:
      return "bg-gray-500/10 text-gray-700 border-gray-200";
  }
};

const Projects = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Notable Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions spanning AI/ML, infrastructure automation, and security applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge className={`mt-2 ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed mt-4">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-foreground/80">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;