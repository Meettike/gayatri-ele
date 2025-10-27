import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  ArrowLeft,
  BarChart3,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const EnergyEfficiencyCalculator = () => {
  const [currentEquipment, setCurrentEquipment] = useState({
    type: "transformer",
    capacity: 100,
    efficiency: 95,
    loadFactor: 75,
    operatingHours: 8760, // hours per year
    energyCost: 8 // Rs per kWh
  });

  const [newEquipment, setNewEquipment] = useState({
    type: "transformer",
    capacity: 100,
    efficiency: 98,
    loadFactor: 75,
    operatingHours: 8760,
    energyCost: 8
  });

  const [equipmentCost, setEquipmentCost] = useState({
    currentValue: 500000,
    newCost: 750000,
    installationCost: 50000,
    maintenanceSavings: 25000 // annual
  });


  const equipmentTypes = [
    { value: "transformer", label: "Transformer", baseEfficiency: 95 },
    { value: "motor", label: "Electric Motor", baseEfficiency: 85 },
    { value: "ups", label: "UPS System", baseEfficiency: 90 },
    { value: "inverter", label: "Inverter", baseEfficiency: 92 },
    { value: "lighting", label: "Lighting System", baseEfficiency: 70 }
  ];

  const calculateEnergyConsumption = (equipment: typeof currentEquipment) => {
    const loadKW = (equipment.capacity * equipment.loadFactor) / 100;
    const lossesKW = loadKW * ((100 - equipment.efficiency) / equipment.efficiency);
    const totalConsumptionKWh = (loadKW + lossesKW) * equipment.operatingHours;
    const energyCostAnnual = totalConsumptionKWh * equipment.energyCost;
    
    return {
      loadKW,
      lossesKW,
      totalConsumptionKWh,
      energyCostAnnual,
      efficiencyKWh: loadKW * equipment.operatingHours,
      lossesKWh: lossesKW * equipment.operatingHours
    };
  };

  const currentResults = calculateEnergyConsumption(currentEquipment);
  const newResults = calculateEnergyConsumption(newEquipment);

  const savings = {
    energySavingsKWh: currentResults.totalConsumptionKWh - newResults.totalConsumptionKWh,
    costSavingsAnnual: currentResults.energyCostAnnual - newResults.energyCostAnnual,
    lossesSavingsKWh: currentResults.lossesKWh - newResults.lossesKWh,
    co2ReductionKg: (currentResults.totalConsumptionKWh - newResults.totalConsumptionKWh) * 0.82 // kg CO2 per kWh in India
  };

  const financialAnalysis = {
    totalInvestment: equipmentCost.newCost + equipmentCost.installationCost - equipmentCost.currentValue,
    annualSavings: savings.costSavingsAnnual + equipmentCost.maintenanceSavings,
    paybackPeriod: (equipmentCost.newCost + equipmentCost.installationCost - equipmentCost.currentValue) / 
                   (savings.costSavingsAnnual + equipmentCost.maintenanceSavings),
    roi5Year: ((savings.costSavingsAnnual + equipmentCost.maintenanceSavings) * 5 - 
               (equipmentCost.newCost + equipmentCost.installationCost - equipmentCost.currentValue)) /
               (equipmentCost.newCost + equipmentCost.installationCost - equipmentCost.currentValue) * 100
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return "text-green-600";
    if (efficiency >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getROIColor = (roi: number) => {
    if (roi >= 100) return "text-green-600";
    if (roi >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-industrial">
      <Header />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-industrial via-background to-metallic">
          <div className="container mx-auto px-6">
            <div className="flex items-center space-x-4 mb-6">
              <Button variant="outline" asChild>
                <Link to="/knowledge-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Knowledge Center
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-accent mb-4">
                <Zap className="h-8 w-8" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Energy Efficiency Calculator
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                  Energy Efficiency
                </span>
                <br />
                <span className="text-accent">& Savings Calculator</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Compare energy efficiency, calculate cost savings, and analyze ROI 
                for upgrading your electrical equipment.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Current Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Current Equipment</CardTitle>
                  <CardDescription>Enter specifications of your existing equipment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-type">Equipment Type</Label>
                    <Select 
                      value={currentEquipment.type} 
                      onValueChange={(value) => setCurrentEquipment({...currentEquipment, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {equipmentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="current-capacity">Capacity (kVA/kW)</Label>
                      <Input
                        id="current-capacity"
                        type="number"
                        value={currentEquipment.capacity}
                        onChange={(e) => setCurrentEquipment({
                          ...currentEquipment, 
                          capacity: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-efficiency">Efficiency (%)</Label>
                      <Input
                        id="current-efficiency"
                        type="number"
                        step="0.1"
                        min="50"
                        max="99.9"
                        value={currentEquipment.efficiency}
                        onChange={(e) => setCurrentEquipment({
                          ...currentEquipment, 
                          efficiency: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="current-load">Load Factor (%)</Label>
                      <Input
                        id="current-load"
                        type="number"
                        min="10"
                        max="100"
                        value={currentEquipment.loadFactor}
                        onChange={(e) => setCurrentEquipment({
                          ...currentEquipment, 
                          loadFactor: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-hours">Operating Hours/Year</Label>
                      <Input
                        id="current-hours"
                        type="number"
                        min="1"
                        max="8760"
                        value={currentEquipment.operatingHours}
                        onChange={(e) => setCurrentEquipment({
                          ...currentEquipment, 
                          operatingHours: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="energy-cost">Energy Cost (₹/kWh)</Label>
                    <Input
                      id="energy-cost"
                      type="number"
                      step="0.1"
                      value={currentEquipment.energyCost}
                      onChange={(e) => setCurrentEquipment({
                        ...currentEquipment, 
                        energyCost: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* New Equipment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">New Equipment</CardTitle>
                  <CardDescription>Enter specifications of the proposed equipment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="new-type">Equipment Type</Label>
                    <Select 
                      value={newEquipment.type} 
                      onValueChange={(value) => setNewEquipment({...newEquipment, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {equipmentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-capacity">Capacity (kVA/kW)</Label>
                      <Input
                        id="new-capacity"
                        type="number"
                        value={newEquipment.capacity}
                        onChange={(e) => setNewEquipment({
                          ...newEquipment, 
                          capacity: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-efficiency">Efficiency (%)</Label>
                      <Input
                        id="new-efficiency"
                        type="number"
                        step="0.1"
                        min="50"
                        max="99.9"
                        value={newEquipment.efficiency}
                        onChange={(e) => setNewEquipment({
                          ...newEquipment, 
                          efficiency: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-load">Load Factor (%)</Label>
                      <Input
                        id="new-load"
                        type="number"
                        min="10"
                        max="100"
                        value={newEquipment.loadFactor}
                        onChange={(e) => setNewEquipment({
                          ...newEquipment, 
                          loadFactor: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-hours">Operating Hours/Year</Label>
                      <Input
                        id="new-hours"
                        type="number"
                        min="1"
                        max="8760"
                        value={newEquipment.operatingHours}
                        onChange={(e) => setNewEquipment({
                          ...newEquipment, 
                          operatingHours: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-energy-cost">Energy Cost (₹/kWh)</Label>
                    <Input
                      id="new-energy-cost"
                      type="number"
                      step="0.1"
                      value={newEquipment.energyCost}
                      onChange={(e) => setNewEquipment({
                        ...newEquipment, 
                        energyCost: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Parameters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Financial Parameters</CardTitle>
                <CardDescription>Enter cost information for ROI analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="current-value">Current Equipment Value (₹)</Label>
                    <Input
                      id="current-value"
                      type="number"
                      value={equipmentCost.currentValue}
                      onChange={(e) => setEquipmentCost({
                        ...equipmentCost, 
                        currentValue: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-cost">New Equipment Cost (₹)</Label>
                    <Input
                      id="new-cost"
                      type="number"
                      value={equipmentCost.newCost}
                      onChange={(e) => setEquipmentCost({
                        ...equipmentCost, 
                        newCost: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="installation-cost">Installation Cost (₹)</Label>
                    <Input
                      id="installation-cost"
                      type="number"
                      value={equipmentCost.installationCost}
                      onChange={(e) => setEquipmentCost({
                        ...equipmentCost, 
                        installationCost: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenance-savings">Annual Maintenance Savings (₹)</Label>
                    <Input
                      id="maintenance-savings"
                      type="number"
                      value={equipmentCost.maintenanceSavings}
                      onChange={(e) => setEquipmentCost({
                        ...equipmentCost, 
                        maintenanceSavings: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Energy Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    <span>Energy Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Efficiency</span>
                      <span className={getEfficiencyColor(currentEquipment.efficiency)}>
                        {currentEquipment.efficiency}%
                      </span>
                    </div>
                    <Progress value={currentEquipment.efficiency} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>New Efficiency</span>
                      <span className={getEfficiencyColor(newEquipment.efficiency)}>
                        {newEquipment.efficiency}%
                      </span>
                    </div>
                    <Progress value={newEquipment.efficiency} className="h-2" />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Consumption:</span>
                      <span className="font-medium">{currentResults.totalConsumptionKWh.toLocaleString()} kWh/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">New Consumption:</span>
                      <span className="font-medium">{newResults.totalConsumptionKWh.toLocaleString()} kWh/year</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span className="font-medium">Energy Savings:</span>
                      <span className="font-bold">{savings.energySavingsKWh.toLocaleString()} kWh/year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-accent" />
                    <span>Financial Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Investment:</span>
                      <span className="font-medium">₹{financialAnalysis.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Annual Savings:</span>
                      <span className="font-medium text-green-600">₹{financialAnalysis.annualSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Energy Cost Savings:</span>
                      <span className="font-medium">₹{savings.costSavingsAnnual.toLocaleString()}/year</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Payback Period:</span>
                      <span className="font-bold text-accent">
                        {financialAnalysis.paybackPeriod.toFixed(1)} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">5-Year ROI:</span>
                      <span className={`font-bold ${getROIColor(financialAnalysis.roi5Year)}`}>
                        {financialAnalysis.roi5Year.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      5-Year Net Savings: ₹{((financialAnalysis.annualSavings * 5) - financialAnalysis.totalInvestment).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span>Environmental Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {(savings.co2ReductionKg / 1000).toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">Tonnes CO₂ Reduced/Year</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Losses:</span>
                      <span className="font-medium text-red-600">
                        {currentResults.lossesKWh.toLocaleString()} kWh/year
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">New Losses:</span>
                      <span className="font-medium text-yellow-600">
                        {newResults.lossesKWh.toLocaleString()} kWh/year
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-green-600">Losses Reduced:</span>
                      <span className="font-bold text-green-600">
                        {savings.lossesSavingsKWh.toLocaleString()} kWh/year
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Equivalent to:</strong><br />
                      • {Math.round(savings.co2ReductionKg / 411)} trees planted<br />
                      • {Math.round(savings.energySavingsKWh / 2400)} homes powered for 1 month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Efficiency Upgrade Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {((newEquipment.efficiency - currentEquipment.efficiency)).toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Efficiency Improvement</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{savings.costSavingsAnnual.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Annual Cost Savings</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">
                      {financialAnalysis.paybackPeriod.toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">Years Payback</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {(savings.co2ReductionKg / 1000).toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">Tonnes CO₂ Saved/Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EnergyEfficiencyCalculator;
