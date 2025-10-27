import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Video,
  Calculator,
  Wrench,
  CheckSquare,
  Play,
  Download,
  Clock,
  Users,
  Zap,
  FileText,
  Lightbulb
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const KnowledgeCenter = () => {
  const navigate = useNavigate();

  const installationGuides = [
    {
      id: 1,
      title: "Power Transformer Installation Guide",
      description: "Complete step-by-step installation process for power transformers",
      category: "installation",
      type: "guide",
      duration: "45 min read",
      difficulty: "Advanced",
      videoUrl: "https://example.com/video1",
      downloadUrl: "/guides/power-transformer-installation.pdf",
      tags: ["transformers", "installation", "safety"]
    },
    {
      id: 2,
      title: "Servo Stabilizer Setup & Configuration",
      description: "Installation and initial configuration of servo stabilizers",
      category: "installation",
      type: "guide",
      duration: "30 min read",
      difficulty: "Intermediate",
      videoUrl: "https://example.com/video2",
      downloadUrl: "/guides/servo-stabilizer-setup.pdf",
      tags: ["servo-stabilizers", "configuration", "setup"]
    },
    {
      id: 3,
      title: "Distribution Transformer Mounting",
      description: "Proper mounting techniques for distribution transformers",
      category: "installation",
      type: "guide",
      duration: "25 min read",
      difficulty: "Intermediate",
      videoUrl: "https://example.com/video3",
      downloadUrl: "/guides/distribution-transformer-mounting.pdf",
      tags: ["transformers", "mounting", "safety"]
    }
  ];

  const calculatorTools = [
    {
      id: 1,
      title: "Load Calculation Tool",
      description: "Calculate electrical load requirements for your facility",
      category: "calculators",
      type: "calculator",
      icon: Calculator,
      route: "/tools/load-calculator"
    },
    {
      id: 2,
      title: "Energy Efficiency Calculator",
      description: "Compare energy efficiency and cost savings",
      category: "calculators",
      type: "calculator",
      icon: Zap,
      route: "/tools/efficiency-calculator"
    }
  ];

  const maintenanceChecklists = [
    {
      id: 1,
      title: "Servo Stabilizer Preventive Maintenance",
      description: "Quarterly maintenance schedule for servo stabilizers",
      category: "maintenance",
      type: "checklist",
      items: 18,
      downloadUrl: "/checklists/servo-stabilizer-maintenance.pdf"
    },
    {
      id: 2,
      title: "Annual Safety Inspection Checklist",
      description: "Comprehensive yearly safety inspection protocol",
      category: "maintenance",
      type: "checklist",
      items: 25,
      downloadUrl: "/checklists/annual-safety-inspection.pdf"
    },
    {
      id: 3,
      title: "Transformer Oil Testing Protocol",
      description: "Monthly oil testing and analysis procedures",
      category: "maintenance",
      type: "checklist",
      items: 12,
      downloadUrl: "/checklists/transformer-oil-testing.pdf"
    }
  ];

  const technicalSpecs = [
    {
      id: 1,
      title: "Power Transformer Specifications Database",
      description: "Complete technical specifications for all power transformers",
      category: "specifications",
      type: "database",
      entries: 150,
      route: "/specs/power-transformers"
    },
    {
      id: 2,
      title: "Servo Stabilizer Technical Data",
      description: "Detailed specifications and performance data",
      category: "specifications",
      type: "database",
      entries: 85,
      route: "/specs/servo-stabilizers"
    },
    {
      id: 3,
      title: "Cable & Wire Specifications",
      description: "Technical data for all cable and wire products",
      category: "specifications",
      type: "database",
      entries: 200,
      route: "/specs/cables-wires"
    }
  ];

  const videoGuides = [
    {
      id: 1,
      title: "Transformer Oil Testing Procedure",
      description: "Step-by-step oil testing and analysis",
      category: "videos",
      type: "video",
      duration: "12:45",
      views: "2.3K",
      thumbnail: "https://picsum.photos/320/180?random=1"
    },
    {
      id: 2,
      title: "Servo Stabilizer Troubleshooting",
      description: "Common issues and their solutions",
      category: "videos",
      type: "video",
      duration: "18:30",
      views: "1.8K",
      thumbnail: "https://picsum.photos/320/180?random=2"
    },
    {
      id: 3,
      title: "Electrical Safety Best Practices",
      description: "Essential safety protocols for electrical work",
      category: "videos",
      type: "video",
      duration: "25:15",
      views: "4.1K",
      thumbnail: "https://picsum.photos/320/180?random=3"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-industrial">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-industrial via-background to-metallic">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 text-accent mb-4">
                <BookOpen className="h-8 w-8" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Knowledge Center
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                  Technical Resources
                </span>
                <br />
                <span className="text-accent">& Tools</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Comprehensive guides, calculators, and tools to help you install, maintain,
                and optimize your electrical equipment for maximum performance.
              </p>

            </div>

          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="installation" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                <TabsTrigger value="installation" className="flex items-center space-x-2">
                  <Wrench className="h-4 w-4" />
                  <span>Installation</span>
                </TabsTrigger>
                <TabsTrigger value="calculators" className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4" />
                  <span>Calculators</span>
                </TabsTrigger>
                <TabsTrigger value="maintenance" className="flex items-center space-x-2">
                  <CheckSquare className="h-4 w-4" />
                  <span>Maintenance</span>
                </TabsTrigger>
                <TabsTrigger value="specifications" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Specifications</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center space-x-2">
                  <Video className="h-4 w-4" />
                  <span>Videos</span>
                </TabsTrigger>
              </TabsList>

              {/* Installation Guides */}
              <TabsContent value="installation">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {installationGuides.map((guide) => (
                    <Card key={guide.id} className="group hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{guide.title}</CardTitle>
                            <CardDescription>{guide.description}</CardDescription>
                          </div>
                          <Badge className={getDifficultyColor(guide.difficulty)}>
                            {guide.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{guide.duration}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {guide.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <Play className="mr-2 h-4 w-4" />
                            Watch Video
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Calculator Tools */}
              <TabsContent value="calculators">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {calculatorTools.map((tool) => (
                    <Card key={tool.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-fit">
                          <tool.icon className="h-8 w-8 text-accent" />
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full btn-hero"
                          onClick={() => navigate(tool.route)}
                        >
                          Launch Calculator
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Maintenance Checklists */}
              <TabsContent value="maintenance">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {maintenanceChecklists.map((checklist) => (
                    <Card key={checklist.id} className="group hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{checklist.title}</CardTitle>
                        <CardDescription>{checklist.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <CheckSquare className="h-4 w-4" />
                            <span>{checklist.items} items</span>
                          </div>
                        </div>

                        <Button className="w-full" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download Checklist
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Technical Specifications */}
              <TabsContent value="specifications">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technicalSpecs.map((spec) => (
                    <Card key={spec.id} className="group hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{spec.title}</CardTitle>
                        <CardDescription>{spec.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <FileText className="h-4 w-4" />
                            <span>{spec.entries} entries</span>
                          </div>
                        </div>

                        <Button className="w-full btn-metallic">
                          Browse Database
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Video Guides */}
              <TabsContent value="videos">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoGuides.map((video) => (
                    <Card key={video.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <Button size="lg" className="rounded-full p-4">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{video.views} views</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-accent/10 to-electric/10">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <Lightbulb className="h-12 w-12 text-accent mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Need Custom Solutions?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Can't find what you're looking for? Our technical team can create
                custom guides and calculations for your specific requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-hero">
                  Request Custom Guide
                </Button>
                <Button size="lg" variant="outline">
                  Contact Technical Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default KnowledgeCenter;
