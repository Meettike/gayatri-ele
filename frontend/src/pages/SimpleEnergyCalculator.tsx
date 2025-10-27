import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Zap, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SimpleEnergyCalculator = () => {
  const [currentEfficiency, setCurrentEfficiency] = useState(90);
  const [newEfficiency, setNewEfficiency] = useState(95);
  const [power, setPower] = useState(100); // kW
  const [hours, setHours] = useState(8760); // hours per year
  const [energyCost, setEnergyCost] = useState(8); // Rs per kWh

  // Input validation functions
  const validateEfficiency = (value: number) => {
    return value > 0 && value <= 100;
  };

  const validatePower = (value: number) => {
    return value > 0 && value <= 10000; // reasonable upper limit
  };

  const validateHours = (value: number) => {
    return value > 0 && value <= 8760;
  };

  const validateEnergyCost = (value: number) => {
    return value > 0 && value <= 100; // reasonable upper limit
  };

  // Safe input handlers with validation
  const handleCurrentEfficiencyChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && validateEfficiency(numValue)) {
      setCurrentEfficiency(numValue);
    }
  };

  const handleNewEfficiencyChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && validateEfficiency(numValue)) {
      setNewEfficiency(numValue);
    }
  };

  const handlePowerChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && validatePower(numValue)) {
      setPower(numValue);
    }
  };

  const handleHoursChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && validateHours(numValue)) {
      setHours(numValue);
    }
  };

  const handleEnergyCostChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && validateEnergyCost(numValue)) {
      setEnergyCost(numValue);
    }
  };

  // Corrected calculations
  const currentLosses = power * (100 - currentEfficiency) / 100;
  const newLosses = power * (100 - newEfficiency) / 100;
  const lossReduction = Math.max(0, currentLosses - newLosses);
  
  const annualEnergySavings = lossReduction * hours; // kWh
  const annualCostSavings = annualEnergySavings * energyCost; // Rs
  const co2Reduction = annualEnergySavings * 0.82; // kg CO2

  // Validation states
  const isValidConfiguration = 
    validateEfficiency(currentEfficiency) &&
    validateEfficiency(newEfficiency) &&
    validatePower(power) &&
    validateHours(hours) &&
    validateEnergyCost(energyCost) &&
    newEfficiency > currentEfficiency;

  const hasImprovementWarning = newEfficiency <= currentEfficiency;

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
                <Zap className="h-8 w-8" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Energy Efficiency Calculator
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Energy Efficiency Calculator</h1>
              <p className="text-xl text-muted-foreground">
                Compare efficiency and calculate energy savings
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Current Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Current Equipment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-efficiency">Efficiency (%)</Label>
                    <Input
                      id="current-efficiency"
                      type="number"
                      min="1"
                      max="100"
                      step="0.1"
                      value={currentEfficiency}
                      onChange={(e) => handleCurrentEfficiencyChange(e.target.value)}
                      className={!validateEfficiency(currentEfficiency) ? "border-red-500" : ""}
                    />
                    {!validateEfficiency(currentEfficiency) && (
                      <p className="text-sm text-red-500 mt-1">Efficiency must be between 1% and 100%</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="power">Load (kW)</Label>
                    <Input
                      id="power"
                      type="number"
                      min="0.1"
                      max="10000"
                      step="0.1"
                      value={power}
                      onChange={(e) => handlePowerChange(e.target.value)}
                      className={!validatePower(power) ? "border-red-500" : ""}
                    />
                    {!validatePower(power) && (
                      <p className="text-sm text-red-500 mt-1">Power must be between 0.1 kW and 10,000 kW</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="hours">Operating Hours/Year</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="1"
                      max="8760"
                      value={hours}
                      onChange={(e) => handleHoursChange(e.target.value)}
                      className={!validateHours(hours) ? "border-red-500" : ""}
                    />
                    {!validateHours(hours) && (
                      <p className="text-sm text-red-500 mt-1">Hours must be between 1 and 8,760 per year</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cost">Energy Cost (₹/kWh)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="100"
                      value={energyCost}
                      onChange={(e) => handleEnergyCostChange(e.target.value)}
                      className={!validateEnergyCost(energyCost) ? "border-red-500" : ""}
                    />
                    {!validateEnergyCost(energyCost) && (
                      <p className="text-sm text-red-500 mt-1">Energy cost must be between ₹0.1 and ₹100 per kWh</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* New Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">New Equipment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="new-efficiency">Efficiency (%)</Label>
                    <Input
                      id="new-efficiency"
                      type="number"
                      min="1"
                      max="100"
                      step="0.1"
                      value={newEfficiency}
                      onChange={(e) => handleNewEfficiencyChange(e.target.value)}
                      className={!validateEfficiency(newEfficiency) ? "border-red-500" : ""}
                    />
                    {!validateEfficiency(newEfficiency) && (
                      <p className="text-sm text-red-500 mt-1">Efficiency must be between 1% and 100%</p>
                    )}
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    {hasImprovementWarning && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <p className="text-sm text-yellow-800">
                            New efficiency should be higher than current efficiency for savings
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        newEfficiency > currentEfficiency ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {newEfficiency > currentEfficiency ? '+' : ''}{(newEfficiency - currentEfficiency).toFixed(1)}%
                      </div>
                      <p className="text-sm text-muted-foreground">Efficiency Change</p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Current Losses:</strong> {currentLosses.toFixed(1)} kW<br />
                        <strong>New Losses:</strong> {newLosses.toFixed(1)} kW<br />
                        <strong>Reduction:</strong> {lossReduction.toFixed(1)} kW
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <span>Savings Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isValidConfiguration && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <p className="text-sm text-red-800">
                          Please check your inputs for valid calculations
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">
                        {isValidConfiguration ? annualEnergySavings.toLocaleString() : '0'}
                      </div>
                      <p className="text-sm text-muted-foreground">kWh Saved/Year</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        ₹{isValidConfiguration ? Math.round(annualCostSavings).toLocaleString() : '0'}
                      </div>
                      <p className="text-sm text-muted-foreground">Annual Cost Savings</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {isValidConfiguration ? (co2Reduction / 1000).toFixed(1) : '0.0'} tonnes
                      </div>
                      <p className="text-sm text-muted-foreground">CO₂ Reduced/Year</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>5-Year Savings:</strong><br />
                      ₹{isValidConfiguration ? Math.round(annualCostSavings * 5).toLocaleString() : '0'}
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Environmental Impact:</strong><br />
                      Equivalent to planting {isValidConfiguration ? Math.round(co2Reduction / 411) : 0} trees
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
              <div className={`text-center p-6 rounded-lg ${
                newEfficiency > currentEfficiency ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <TrendingUp className={`h-8 w-8 mx-auto mb-2 ${
                  newEfficiency > currentEfficiency ? 'text-green-600' : 'text-red-600'
                }`} />
                <div className={`text-2xl font-bold ${
                  newEfficiency > currentEfficiency ? 'text-green-600' : 'text-red-600'
                }`}>
                  {newEfficiency > currentEfficiency ? '+' : ''}{(newEfficiency - currentEfficiency).toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">Efficiency Change</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  ₹{isValidConfiguration ? Math.round(annualCostSavings / 1000) : 0}K
                </div>
                <p className="text-sm text-muted-foreground">Annual Savings</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {isValidConfiguration ? Math.round(annualEnergySavings / 1000) : 0}K
                </div>
                <p className="text-sm text-muted-foreground">kWh Saved</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {isValidConfiguration ? (co2Reduction / 1000).toFixed(1) : '0.0'}
                </div>
                <p className="text-sm text-muted-foreground">Tonnes CO₂ Saved</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SimpleEnergyCalculator;
