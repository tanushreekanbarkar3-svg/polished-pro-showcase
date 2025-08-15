import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Code, 
  Database, 
  Monitor, 
  Container, 
  Shield,
  Brain,
  GitBranch
} from "lucide-react";

const skillCategories = [
  {
    title: "Cloud Platforms",
    icon: Cloud,
    skills: [
      { name: "AWS", level: "Expert" },
      { name: "GCP", level: "Intermediate" },
      { name: "Azure", level: "Basic" }
    ],
    color: "text-blue-600"
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      { name: "Python", level: "Expert" },
      { name: "Bash", level: "Expert" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "Go", level: "Learning" },
      { name: "Java", level: "Intermediate" },
      { name: "Node.js", level: "Intermediate" }
    ],
    color: "text-green-600"
  },
  {
    title: "DevOps & SRE",
    icon: GitBranch,
    skills: [
      { name: "Terraform", level: "Expert" },
      { name: "Ansible", level: "Expert" },
      { name: "Jenkins", level: "Expert" },
      { name: "CI/CD", level: "Expert" },
      { name: "Incident Management", level: "Expert" }
    ],
    color: "text-purple-600"
  },
  {
    title: "Observability",
    icon: Monitor,
    skills: [
      { name: "Datadog", level: "Expert" },
      { name: "Prometheus", level: "Expert" },
      { name: "Grafana", level: "Expert" },
      { name: "SLO/SLI Tracking", level: "Expert" },
      { name: "Alerting", level: "Expert" }
    ],
    color: "text-orange-600"
  },
  {
    title: "Containers & Orchestration",
    icon: Container,
    skills: [
      { name: "Docker", level: "Expert" },
      { name: "Kubernetes (EKS)", level: "Intermediate" }
    ],
    color: "text-blue-500"
  },
  {
    title: "Databases & Messaging",
    icon: Database,
    skills: [
      { name: "MySQL", level: "Intermediate" },
      { name: "Snowflake", level: "Intermediate" },
      { name: "Redis", level: "Intermediate" },
      { name: "Kafka", level: "Intermediate" },
      { name: "Firebase", level: "Basic" }
    ],
    color: "text-red-600"
  },
  {
    title: "AI/ML Technologies",
    icon: Brain,
    skills: [
      { name: "HuggingFace", level: "Intermediate" },
      { name: "TensorFlow", level: "Beginner" },
      { name: "GenAI Integration", level: "Intermediate" },
      { name: "LLMs", level: "Intermediate" },
      { name: "NLP", level: "Intermediate" }
    ],
    color: "text-pink-600"
  },
  {
    title: "Security & Compliance",
    icon: Shield,
    skills: [
      { name: "Security Guardrails", level: "Expert" },
      { name: "Policy Enforcement", level: "Expert" },
      { name: "Secure Coding", level: "Expert" },
      { name: "Compliance Monitoring", level: "Expert" }
    ],
    color: "text-amber-600"
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-success text-success-foreground";
    case "Intermediate":
      return "bg-primary text-primary-foreground";
    case "Beginner":
    case "Learning":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Skills = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive skill set spanning cloud infrastructure, automation, and emerging AI technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <category.icon className={`w-6 h-6 ${category.color} group-hover:scale-110 transition-transform`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <Badge className={`text-xs ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Core Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Build and scale highly available infrastructure across cloud and hybrid environments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Proactive incident response, root cause analysis, and service-level improvements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Automate operations through Terraform, Ansible, and Jenkins CI/CD pipelines</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Design observability frameworks to support performance tuning and rapid recovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Integrate AI/ML capabilities for intelligent system behavior and decision automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Collaborate cross-functionally to align technical solutions with business goals</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;