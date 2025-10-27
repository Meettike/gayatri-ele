import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Newspaper, TrendingUp, Award, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Gayatri Electricals Launches New Range of Energy-Efficient Transformers",
      excerpt: "Our latest transformer series achieves 99.5% efficiency rating, setting new industry standards for energy conservation and performance.",
      content: "We are proud to announce the launch of our new EcoMax transformer series, featuring advanced core materials and innovative design that delivers unprecedented efficiency levels...",
      category: "Product Launch",
      date: "2024-09-15",
      readTime: "3 min read",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 2,
      title: "ISO 45001:2018 Certification Achieved for Workplace Safety",
      excerpt: "Gayatri Electricals receives ISO 45001:2018 certification, reinforcing our commitment to employee safety and health management.",
      content: "This certification validates our comprehensive approach to occupational health and safety management, ensuring the highest standards of workplace safety...",
      category: "Certification",
      date: "2024-09-10",
      readTime: "2 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 3,
      title: "Major Contract Win: 500 MVA Transformer Project",
      excerpt: "Secured a landmark contract to supply custom transformers for a major power infrastructure project worth ₹50 crores.",
      content: "This significant contract win demonstrates our capability to handle large-scale projects and deliver custom solutions for critical infrastructure...",
      category: "Business",
      date: "2024-09-05",
      readTime: "4 min read",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 4,
      title: "Expansion of Manufacturing Facility Completed",
      excerpt: "Our new 50,000 sq ft manufacturing facility is now operational, doubling our production capacity for servo stabilizers.",
      content: "The expansion includes state-of-the-art equipment and automated production lines, enabling us to meet growing market demand...",
      category: "Company News",
      date: "2024-08-28",
      readTime: "3 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 5,
      title: "Partnership with Leading Cable Manufacturer Announced",
      excerpt: "Strategic partnership will enhance our wire and cable offerings with premium quality products and expanded distribution network.",
      content: "This partnership brings together complementary strengths to offer customers a comprehensive range of electrical solutions...",
      category: "Partnership",
      date: "2024-08-20",
      readTime: "2 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 6,
      title: "Excellence Award for Quality Management",
      excerpt: "Recognized with the National Quality Excellence Award for outstanding quality management practices in electrical manufacturing.",
      content: "This prestigious award acknowledges our continuous efforts in maintaining the highest quality standards across all our products and processes...",
      category: "Awards",
      date: "2024-08-15",
      readTime: "3 min read",
      image: "/api/placeholder/400/250",
      featured: false
    }
  ];

  const categories = [
    { name: "All", count: newsArticles.length },
    { name: "Product Launch", count: newsArticles.filter(article => article.category === "Product Launch").length },
    { name: "Business", count: newsArticles.filter(article => article.category === "Business").length },
    { name: "Certification", count: newsArticles.filter(article => article.category === "Certification").length },
    { name: "Awards", count: newsArticles.filter(article => article.category === "Awards").length }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Product Launch":
        return <Zap className="h-4 w-4" />;
      case "Business":
        return <TrendingUp className="h-4 w-4" />;
      case "Awards":
        return <Award className="h-4 w-4" />;
      default:
        return <Newspaper className="h-4 w-4" />;
    }
  };

  const featuredArticles = newsArticles.filter(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">News & Updates</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-accent mb-4">
              <Newspaper className="h-5 w-5 electric-glow" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                News & Updates
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Latest News
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Stay updated with the latest developments, product launches, achievements, 
              and industry insights from Gayatri Electricals & Electronics.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category, index) => (
              <Badge
                key={index}
                variant={index === 0 ? "default" : "secondary"}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">Featured Stories</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-[var(--shadow-glow)] transition-all duration-300 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-industrial to-muted flex items-center justify-center">
                      <Newspaper className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          {getCategoryIcon(article.category)}
                          <span>{article.category}</span>
                        </Badge>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-card-foreground hover:text-accent transition-colors cursor-pointer">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent-foreground">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Regular Articles */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8">All News</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="flex items-center space-x-1">
                        {getCategoryIcon(article.category)}
                        <span className="text-xs">{article.category}</span>
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-card-foreground hover:text-accent transition-colors cursor-pointer line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent-foreground">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="mt-20">
            <Card className="bg-gradient-to-br from-card to-industrial text-center">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  Stay Updated
                </CardTitle>
                <CardDescription>
                  Subscribe to our newsletter for the latest news and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex max-w-md mx-auto space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 p-3 bg-input border border-border rounded-md focus:border-accent focus:ring-accent focus:ring-1 text-foreground"
                  />
                  <Button className="btn-electric">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
