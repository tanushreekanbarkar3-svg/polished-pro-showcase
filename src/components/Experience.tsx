import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

const experiences = [
  {
    title: "Site Reliability Engineer",
    company: "Tata Consultancy Services (NBC Universal)",
    location: "New Jersey, USA",
    period: "Jan 2022 – Present",
    description: "Leading infrastructure automation and reliability engineering for global media operations",
    achievements: [
      "Automated AWS infrastructure deployment using Terraform and Ansible, reducing configuration drift and manual provisioning by 40%",
      "Built observability stacks (Datadog, Prometheus, Grafana) to track SLIs/SLOs and reduce MTTR by 30%",
      "Participated in global on-call rotations, providing end-to-end service reliability and leading postmortems",
      "Partnered with DevSecOps to integrate policy guardrails, secure cloud rollouts, and enforce compliance across environments",
      "Managed high-availability content delivery workflows across Akamai, CloudFront, HLS, and RTMP",
      "Led GenAI infrastructure readiness initiative, integrating telemetry for LLM-based system enhancements",
      "Created internal observability dashboards using Python, Flask, and Django to visualize service health and infrastructure KPIs"
    ],
    technologies: ["AWS", "Terraform", "Ansible", "Datadog", "Prometheus", "Grafana", "Python", "Jenkins", "Kubernetes"]
  },
  {
    title: "Software Developer",
    company: "Tata Consultancy Services",
    location: "USA",
    period: "Oct 2021 – Dec 2021",
    description: "Developed robust data workflows and integration pipelines",
    achievements: [
      "Developed end-to-end data workflows by architecting and managing robust pipelines",
      "Ensured smooth data integration from external sources through API connections",
      "Monitored and troubleshoot production data flows, proactively identifying issues and deploying fixes"
    ],
    technologies: ["Python", "API Integration", "Data Pipelines", "Monitoring"]
  },
  {
    title: "Web Development Intern",
    company: "Alphard Engineering Solutions LLP",
    location: "India",
    period: "Jan 2019 – Jun 2019",
    description: "Optimized system performance and developed key Python modules",
    achievements: [
      "Elevated system performance by optimizing legacy code and deploying seamless updates",
      "Engineered key Python modules in collaboration with cross-functional teams for project success"
    ],
    technologies: ["Python", "Web Development", "System Optimization"]
  },
  {
    title: "Software Engineering Intern",
    company: "ATSSL",
    location: "India",
    period: "Jun 2018 – Dec 2018",
    description: "Coordinated full project lifecycle from development to documentation",
    achievements: [
      "Coordinated end-to-end project lifecycle, from configuring and coding to comprehensive documentation",
      "Led to precise execution and alignment with strategic objectives"
    ],
    technologies: ["Project Management", "Documentation", "Software Development"]
  }
];

const Experience = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            4+ years of experience in Site Reliability Engineering, Cloud Infrastructure, and DevOps
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl text-primary">{exp.title}</CardTitle>
                    <CardDescription className="text-lg flex items-center gap-2 mt-2">
                      <Building className="w-4 h-4" />
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">{exp.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-foreground/80">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
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

export default Experience;