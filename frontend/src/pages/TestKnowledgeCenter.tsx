import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TestKnowledgeCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-industrial">
      <Header />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-6">Knowledge Center</h1>
              <p className="text-xl text-muted-foreground">
                Technical resources and calculation tools
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">   
                    <Calculator className="h-6 w-6 text-accent" />
                    <span>Load Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Calculate electrical load requirements for your facility
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/tools/load-calculator">
                      Open Load Calculator
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-accent" />
                    <span>Energy Efficiency Calculator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Compare energy efficiency and calculate savings
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/tools/efficiency-calculator">
                      Open Efficiency Calculator
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TestKnowledgeCenter;
