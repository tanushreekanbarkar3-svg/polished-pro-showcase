import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

const educationData = [
  {
    degree: "M.S. in Computer and Information Science",
    institution: "Cleveland State University",
    location: "Cleveland, OH",
    year: "2021",
    type: "Masters"
  },
  {
    degree: "B.E. in Computer Science Engineering",
    institution: "KLE Dr. M.S. Sheshgiri College of Engineering & Technology",
    location: "India",
    year: "2018",
    type: "Bachelors"
  }
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    type: "Professional Certification",
    status: "Active"
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    type: "AI/ML Certification",
    status: "Active",
    link: "https://www.credly.com/badges/c91f2c2a-9c28-4793-9a7a-f7ddb8010bc2"
  }
];

const Education = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education & Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Strong academic foundation with industry-recognized certifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-primary" />
              Education
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationData.map((edu, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge className="mb-3" variant={edu.type === "Masters" ? "default" : "secondary"}>
                          {edu.type}
                        </Badge>
                        <CardTitle className="text-xl leading-tight">{edu.degree}</CardTitle>
                        <CardDescription className="text-lg font-medium mt-2">
                          {edu.institution}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {edu.year}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Key Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{cert.name}</CardTitle>
                        <CardDescription className="text-base font-medium mt-2">
                          {cert.issuer}
                        </CardDescription>
                      </div>
                      {cert.link ? (
                        <Badge 
                          className="bg-success text-success-foreground hover:bg-success/80 cursor-pointer transition-colors"
                          onClick={() => window.open(cert.link, '_blank')}
                        >
                          {cert.status}
                        </Badge>
                      ) : (
                        <Badge className="bg-success text-success-foreground">
                          {cert.status}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="text-xs">
                      {cert.type}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills Summary */}
          <div>
            <Card className="shadow-card bg-gradient-to-r from-primary/5 to-tech/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Academic & Professional Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Academic Excellence</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Advanced degree in Computer and Information Science</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Strong foundation in computer science engineering</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Continuous learning and skill development</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Professional Validation</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>AWS Solutions Architect certification</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>AWS AI Practitioner certification</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Industry-recognized expertise in cloud and AI</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;