import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SimpleLoadCalculator = () => {
  const [power, setPower] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [hours, setHours] = useState(8);

  const totalLoad = power * quantity;
  const dailyConsumption = (totalLoad * hours) / 1000; // kWh
  const monthlyConsumption = dailyConsumption * 30;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-industrial">
      <Header />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <Button variant="outline" asChild>
                <Link to="/knowledge-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Knowledge Center
                </Link>
              </Button>
            </div>

            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 text-accent mb-4">
                <Calculator className="h-8 w-8" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Load Calculator
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Simple Load Calculator</h1>
              <p className="text-xl text-muted-foreground">
                Calculate basic electrical load and energy consumption
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Load Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="power">Power per Unit (Watts)</Label>
                    <Input
                      id="power"
                      type="number"
                      placeholder="1000"
                      value={power || ""}
                      onChange={(e) => setPower(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="hours">Operating Hours per Day</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="24"
                      value={hours}
                      onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-accent" />
                    <span>Calculation Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Load:</span>
                      <span className="font-medium">{totalLoad} W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Load (kW):</span>
                      <span className="font-medium">{(totalLoad / 1000).toFixed(2)} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Daily Consumption:</span>
                      <span className="font-medium">{dailyConsumption.toFixed(2)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Consumption:</span>
                      <span className="font-medium">{monthlyConsumption.toFixed(2)} kWh</span>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg">
                    <h3 className="font-medium text-accent mb-2">Recommended Transformer Size:</h3>
                    <p className="text-2xl font-bold text-accent">
                      {Math.ceil((totalLoad * 1.25) / 1000)} kVA
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      (Including 25% safety factor)
                    </p>
                  </div>
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

export default SimpleLoadCalculator;
