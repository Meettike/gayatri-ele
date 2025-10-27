import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  Download,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface LoadItem {
  id: string;
  name: string;
  power: number;
  quantity: number;
  powerFactor: number;
  category: string;
  operatingHours: number;
}

const LoadCalculator = () => {
  const [loads, setLoads] = useState<LoadItem[]>([]);
  const [newLoad, setNewLoad] = useState<Partial<LoadItem>>({
    name: "",
    power: 0,
    quantity: 1,
    powerFactor: 0.8,
    category: "lighting",
    operatingHours: 8
  });
  const [facilityType, setFacilityType] = useState("commercial");
  const [safetyFactor, setSafetyFactor] = useState(1.25);
  const { toast } = useToast();

  const loadCategories = [
    { value: "lighting", label: "Lighting", icon: "💡" },
    { value: "hvac", label: "HVAC", icon: "❄️" },
    { value: "motors", label: "Motors", icon: "⚙️" },
    { value: "computers", label: "Computers/IT", icon: "💻" },
    { value: "appliances", label: "Appliances", icon: "🏠" },
    { value: "industrial", label: "Industrial Equipment", icon: "🏭" },
    { value: "other", label: "Other", icon: "🔌" }
  ];

  const facilityTypes = [
    { value: "residential", label: "Residential", factor: 1.0 },
    { value: "commercial", label: "Commercial", factor: 1.25 },
    { value: "industrial", label: "Industrial", factor: 1.5 },
    { value: "hospital", label: "Hospital/Critical", factor: 2.0 }
  ];

  const addLoad = () => {
    if (!newLoad.name || !newLoad.power) {
      toast({
        title: "Missing Information",
        description: "Please enter load name and power rating.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const load: LoadItem = {
      id: Date.now().toString(),
      name: newLoad.name!,
      power: newLoad.power!,
      quantity: newLoad.quantity || 1,
      powerFactor: newLoad.powerFactor || 0.8,
      category: newLoad.category || "other",
      operatingHours: newLoad.operatingHours || 8
    };

    setLoads([...loads, load]);
    setNewLoad({
      name: "",
      power: 0,
      quantity: 1,
      powerFactor: 0.8,
      category: "lighting",
      operatingHours: 8
    });

    toast({
      title: "Load Added",
      description: `${load.name} added to calculation.`,
      duration: 2000,
    });
  };

  const removeLoad = (id: string) => {
    setLoads(loads.filter(load => load.id !== id));
  };

  const calculateResults = () => {
    const totalConnectedLoad = loads.reduce((sum, load) => 
      sum + (load.power * load.quantity), 0
    );

    const totalApparentPower = loads.reduce((sum, load) => 
      sum + (load.power * load.quantity / load.powerFactor), 0
    );

    const demandFactor = facilityTypes.find(f => f.value === facilityType)?.factor || 1.25;
    const maxDemand = totalConnectedLoad * demandFactor;
    const designLoad = maxDemand * safetyFactor;

    const dailyEnergyConsumption = loads.reduce((sum, load) => 
      sum + (load.power * load.quantity * load.operatingHours / 1000), 0
    );

    const monthlyEnergyConsumption = dailyEnergyConsumption * 30;

    return {
      totalConnectedLoad,
      totalApparentPower,
      maxDemand,
      designLoad,
      dailyEnergyConsumption,
      monthlyEnergyConsumption,
      averagePowerFactor: loads.length > 0 ? 
        loads.reduce((sum, load) => sum + load.powerFactor, 0) / loads.length : 0
    };
  };

  const results = calculateResults();

  const getRecommendedTransformer = (designLoad: number) => {
    const standardSizes = [25, 50, 75, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000];
    const recommendedSize = standardSizes.find(size => size >= designLoad / 1000) || 2000;
    return recommendedSize;
  };

  const exportResults = () => {
    const reportData = {
      facilityType,
      safetyFactor,
      loads,
      results,
      recommendedTransformer: getRecommendedTransformer(results.designLoad),
      generatedOn: new Date().toISOString()
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `load-calculation-report-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "Load calculation report has been downloaded.",
      duration: 3000,
    });
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
                <Calculator className="h-8 w-8" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Load Calculator
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                  Electrical Load
                </span>
                <br />
                <span className="text-accent">Calculator</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Calculate electrical load requirements, energy consumption, and 
                get transformer sizing recommendations for your facility.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Facility Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Facility Settings</CardTitle>
                    <CardDescription>Configure your facility type and safety factors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="facility-type">Facility Type</Label>
                        <Select value={facilityType} onValueChange={setFacilityType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {facilityTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label} (Factor: {type.factor})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="safety-factor">Safety Factor</Label>
                        <Input
                          id="safety-factor"
                          type="number"
                          step="0.05"
                          min="1.0"
                          max="2.0"
                          value={safetyFactor}
                          onChange={(e) => setSafetyFactor(parseFloat(e.target.value) || 1.25)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Add Load */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add Electrical Load</CardTitle>
                    <CardDescription>Enter details for each electrical load in your facility</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="load-name">Load Name</Label>
                        <Input
                          id="load-name"
                          placeholder="e.g., Office Lighting"
                          value={newLoad.name || ""}
                          onChange={(e) => setNewLoad({...newLoad, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={newLoad.category} 
                          onValueChange={(value) => setNewLoad({...newLoad, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {loadCategories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.icon} {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="power">Power (W)</Label>
                        <Input
                          id="power"
                          type="number"
                          placeholder="1000"
                          value={newLoad.power || ""}
                          onChange={(e) => setNewLoad({...newLoad, power: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={newLoad.quantity || 1}
                          onChange={(e) => setNewLoad({...newLoad, quantity: parseInt(e.target.value) || 1})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="power-factor">Power Factor</Label>
                        <Input
                          id="power-factor"
                          type="number"
                          step="0.01"
                          min="0.1"
                          max="1.0"
                          value={newLoad.powerFactor || 0.8}
                          onChange={(e) => setNewLoad({...newLoad, powerFactor: parseFloat(e.target.value) || 0.8})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hours">Hours/Day</Label>
                        <Input
                          id="hours"
                          type="number"
                          min="0"
                          max="24"
                          value={newLoad.operatingHours || 8}
                          onChange={(e) => setNewLoad({...newLoad, operatingHours: parseFloat(e.target.value) || 8})}
                        />
                      </div>
                    </div>

                    <Button onClick={addLoad} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Load
                    </Button>
                  </CardContent>
                </Card>

                {/* Load List */}
                {loads.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Added Loads ({loads.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {loads.map((load) => (
                          <div key={load.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <Badge variant="secondary">{loadCategories.find(c => c.value === load.category)?.icon}</Badge>
                                <div>
                                  <p className="font-medium">{load.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {load.power}W × {load.quantity} = {load.power * load.quantity}W
                                    {" • PF: "}{load.powerFactor}
                                    {" • "}{load.operatingHours}h/day
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLoad(load.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Results Section */}
              <div className="space-y-6">
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
                        <span className="text-sm text-muted-foreground">Connected Load:</span>
                        <span className="font-medium">{results.totalConnectedLoad.toFixed(0)} W</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Apparent Power:</span>
                        <span className="font-medium">{results.totalApparentPower.toFixed(0)} VA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Max Demand:</span>
                        <span className="font-medium">{results.maxDemand.toFixed(0)} W</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-medium">Design Load:</span>
                        <span className="font-bold text-accent">{results.designLoad.toFixed(0)} W</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Design Load (kW):</span>
                        <span className="font-bold text-accent">{(results.designLoad / 1000).toFixed(2)} kW</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Energy Consumption</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Daily:</span>
                      <span className="font-medium">{results.dailyEnergyConsumption.toFixed(2)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monthly:</span>
                      <span className="font-medium">{results.monthlyEnergyConsumption.toFixed(2)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Power Factor:</span>
                      <span className="font-medium">{results.averagePowerFactor.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Recommended Transformer:</p>
                      <p className="font-bold text-lg text-accent">
                        {getRecommendedTransformer(results.designLoad)} kVA
                      </p>
                    </div>
                    
                    {results.averagePowerFactor < 0.85 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">Power Factor Warning</p>
                            <p className="text-xs text-yellow-700">
                              Consider power factor correction to improve efficiency.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button onClick={exportResults} className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
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

export default LoadCalculator;
