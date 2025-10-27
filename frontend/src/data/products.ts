import { Zap, Settings, Cable, Shield, Gauge, Cpu, Battery, AlertTriangle } from "lucide-react";

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  icon: any;
  features: string[];
  specifications: Record<string, string>;
  applications: string[];
  certifications: string[];
  models: ProductModel[];
  images: string[];
}

export interface ProductModel {
  name: string;
  capacity: string;
  voltage: string;
  efficiency: string;
  price?: string;
}

export const productCategories = [
  {
    id: "transformers",
    title: "Transformers",
    description: "High-efficiency power transformers for industrial applications"
  },
  {
    id: "servo-stabilizers", 
    title: "Servo Stabilizers",
    description: "Precision voltage regulation systems"
  },
  {
    id: "wires-cables",
    title: "Wires & Cables", 
    description: "Premium quality electrical cables"
  }
];

export const products: Product[] = [
  // TRANSFORMERS
  {
    id: "power-transformer",
    slug: "power-transformer", 
    title: "Power Transformers",
    category: "transformers",
    description: "Heavy-duty power transformers for high-voltage transmission systems",
    longDescription: "Designed for heavy-duty applications in power transmission systems, our power transformers deliver exceptional performance under demanding conditions. These transformers feature advanced cooling systems and robust construction.",
    icon: Battery,
    features: [
      "High voltage handling capability",
      "Advanced cooling systems",
      "Robust construction",
      "Low noise operation",
      "Extended service life"
    ],
    specifications: {
      "Capacity Range": "1 MVA to 100 MVA",
      "Voltage Ratio": "132kV/33kV, 220kV/33kV, 400kV/132kV",
      "Frequency": "50 Hz",
      "Cooling": "ONAN/ONAF/OFAF",
      "Insulation Class": "Class A/F",
      "Standards": "IS:2026, IEC:60076"
    },
    applications: [
      "Power transmission substations",
      "Heavy industries",
      "Steel plants", 
      "Mining operations",
      "Large manufacturing facilities"
    ],
    certifications: ["CEA Approved", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "PT-1000", capacity: "1 MVA", voltage: "132kV/33kV", efficiency: "99.2%" },
      { name: "PT-5000", capacity: "5 MVA", voltage: "220kV/33kV", efficiency: "99.5%" },
      { name: "PT-25000", capacity: "25 MVA", voltage: "400kV/132kV", efficiency: "99.7%" },
      { name: "PT-100000", capacity: "100 MVA", voltage: "400kV/132kV", efficiency: "99.8%" }
    ],
    images: ["https://www.chintglobal.com/content/dam/chintsite/global/en/about-us/news-center/blog/220kV-Power-Transformer-20220422.jpg"]
  },
  {
    id: "distribution-transformer",
    slug: "distribution-transformer",
    title: "Distribution Transformers",
    category: "transformers",
    description: "Step-down transformers for final voltage distribution to end consumers",
    longDescription: "Our distribution transformers are designed for the final stage of power distribution, converting high grid voltage to consumer-required voltage levels. Available in both single-phase and three-phase configurations.",
    icon: Zap,
    features: [
      "Step-down voltage conversion",
      "Single & three-phase options",
      "Pole & pad mounted variants",
      "Low maintenance design",
      "Weather-resistant construction"
    ],
    specifications: {
      "Capacity Range": "5 KVA to 200 KVA",
      "Primary Voltage": "11kV, 22kV, 33kV",
      "Secondary Voltage": "415V, 240V, 120V",
      "Frequency": "50/60 Hz",
      "Insulation": "Dry type/Oil filled",
      "Standards": "IS:1180, IEC:60076"
    },
    applications: [
      "Residential areas",
      "Commercial buildings",
      "Small industries",
      "Rural electrification",
      "Urban distribution networks"
    ],
    certifications: ["CEA Approved", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "DT-25", capacity: "25 KVA", voltage: "11kV/415V", efficiency: "98.5%" },
      { name: "DT-63", capacity: "63 KVA", voltage: "22kV/415V", efficiency: "98.8%" },
      { name: "DT-100", capacity: "100 KVA", voltage: "33kV/415V", efficiency: "99.0%" },
      { name: "DT-200", capacity: "200 KVA", voltage: "33kV/415V", efficiency: "99.2%" }
    ],
    images: ["https://vietnamtransformer.com/upload/ckfinder/images/2000kva/oil-immersed-transformer-60.jpg"]
  },
  {
    id: "auto-transformer",
    slug: "auto-transformer",
    title: "Auto Transformers", 
    category: "transformers",
    description: "Efficient auto transformers for voltage regulation and motor starting",
    longDescription: "Our auto transformers provide efficient voltage transformation with a single winding design. Perfect for applications requiring voltage regulation and soft starting of motors.",
    icon: Cpu,
    features: [
      "Single winding design",
      "Compact size",
      "Cost-effective solution",
      "High efficiency",
      "Variable voltage output"
    ],
    specifications: {
      "Capacity Range": "1 KVA to 1000 KVA",
      "Input Voltage": "415V, 440V, 480V",
      "Output Voltage": "0-110% of input",
      "Frequency": "50/60 Hz",
      "Efficiency": "97-99%",
      "Standards": "IS:2026, IEC:60076"
    },
    applications: [
      "Motor soft starting",
      "Voltage regulation",
      "Laboratory testing",
      "Industrial heating",
      "Lighting control"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "AT-5", capacity: "5 KVA", voltage: "0-415V", efficiency: "97%" },
      { name: "AT-25", capacity: "25 KVA", voltage: "0-415V", efficiency: "98%" },
      { name: "AT-100", capacity: "100 KVA", voltage: "0-440V", efficiency: "98.5%" },
      { name: "AT-500", capacity: "500 KVA", voltage: "0-480V", efficiency: "99%" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2021/4/TE/MD/ML/3049389/auto-transformer.jpg"]
  },
  {
    id: "isolation-transformer",
    slug: "isolation-transformer",
    title: "Isolation Transformers (IT)",
    category: "transformers",
    description: "Boxed IT transformers for electrical isolation, safety protection and noise reduction",
    longDescription: "IT (Isolation Transformers) provide complete electrical isolation between primary and secondary circuits while maintaining the same voltage level. Available in protective metal enclosures/boxes for safety and environmental protection. Essential for medical, laboratory, and sensitive electronic applications.",
    icon: Shield,
    features: [
      "1:1 voltage ratio",
      "Complete electrical isolation",
      "Protective metal enclosure/box",
      "Noise suppression & EMI filtering",
      "Safety protection & medical grade",
      "IP-rated enclosures available"
    ],
    specifications: {
      "Capacity Range": "100 VA to 50 KVA",
      "Voltage Ratio": "1:1 (same input/output)",
      "Input Voltage": "230V, 415V, 480V",
      "Frequency": "50/60 Hz",
      "Enclosure": "IP21/IP54 Metal Box",
      "Insulation": "Class F/H",
      "Standards": "IEC:61558, UL:5085, IS:2026"
    },
    applications: [
      "Medical equipment isolation",
      "Sensitive electronics protection",
      "Computer & server systems",
      "Laboratory instruments",
      "Audio/video equipment",
      "Clean room applications"
    ],
    certifications: ["UL Listed", "CE Marked", "Medical Grade", "IP Rated"],
    models: [
      { name: "IT-1K-BOX", capacity: "1 KVA", voltage: "230V/230V", efficiency: "98% (Boxed)" },
      { name: "IT-5K-BOX", capacity: "5 KVA", voltage: "415V/415V", efficiency: "98.5% (Boxed)" },
      { name: "IT-15K-BOX", capacity: "15 KVA", voltage: "480V/480V", efficiency: "99% (Boxed)" },
      { name: "IT-50K-BOX", capacity: "50 KVA", voltage: "480V/480V", efficiency: "99.2% (Boxed)" }
    ],
    images: ["https://www.ato.com/content/images/thumbs/0005340_5-kva-isolation-transformer-single-phase-230v-to-120v_550.jpeg"]
  },
  {
    id: "cast-resin-transformer",
    slug: "cast-resin-transformer",
    title: "Cast Resin Dry Type Transformers",
    category: "transformers",
    description: "Environmentally friendly dry type transformers with epoxy resin insulation",
    longDescription: "Cast resin transformers use epoxy resin encapsulation for superior insulation and environmental protection. Fire-resistant and maintenance-free, ideal for indoor installations where safety is paramount.",
    icon: AlertTriangle,
    features: [
      "Epoxy resin insulation",
      "Fire resistant",
      "Maintenance free",
      "Environmentally friendly",
      "Indoor installation"
    ],
    specifications: {
      "Capacity Range": "100 KVA to 2500 KVA",
      "Voltage Class": "Up to 36kV",
      "Temperature Rise": "100K/80K",
      "Insulation Class": "Class F/H",
      "Protection": "IP23/IP54",
      "Standards": "IEC:60076, IS:11171"
    },
    applications: [
      "Shopping malls",
      "Hospitals",
      "High-rise buildings",
      "Underground installations",
      "Hazardous locations"
    ],
    certifications: ["Fire Resistant", "Environmental Friendly", "CE Marked"],
    models: [
      { name: "CR-315", capacity: "315 KVA", voltage: "11kV/415V", efficiency: "98.5%" },
      { name: "CR-500", capacity: "500 KVA", voltage: "22kV/415V", efficiency: "98.8%" },
      { name: "CR-1000", capacity: "1000 KVA", voltage: "33kV/415V", efficiency: "99.0%" },
      { name: "CR-2500", capacity: "2500 KVA", voltage: "33kV/415V", efficiency: "99.2%" }
    ],
    images: ["https://5.imimg.com/data5/UY/AQ/MY-4501775/cast-resin-dry-type-transformer-500x500.jpg"]
  },
  {
    id: "current-transformer",
    slug: "current-transformer",
    title: "Current Transformers (CT)",
    category: "transformers",
    description: "Instrument transformers for current measurement and protection",
    longDescription: "Current transformers are instrument transformers designed to produce an alternating current in its secondary which is proportional to the current being measured in its primary. Essential for metering and protection systems.",
    icon: Gauge,
    features: [
      "Accurate current measurement",
      "High insulation strength",
      "Multiple ratio options",
      "Protection & metering class",
      "Compact design"
    ],
    specifications: {
      "Primary Current": "5A to 4000A",
      "Secondary Current": "1A or 5A",
      "Accuracy Class": "0.2, 0.5, 1.0, 3.0",
      "Insulation Level": "Up to 36kV",
      "Burden": "2.5VA to 30VA",
      "Standards": "IEC:61869, IS:2705"
    },
    applications: [
      "Power system metering",
      "Protection relays",
      "Energy management",
      "Load monitoring",
      "Fault detection"
    ],
    certifications: ["Type Tested", "NABL Calibrated", "IS Certified"],
    models: [
      { name: "CT-100/5", capacity: "100/5A", voltage: "11kV", efficiency: "Class 0.5" },
      { name: "CT-400/5", capacity: "400/5A", voltage: "22kV", efficiency: "Class 0.2" },
      { name: "CT-800/1", capacity: "800/1A", voltage: "33kV", efficiency: "Class 0.5" },
      { name: "CT-2000/1", capacity: "2000/1A", voltage: "132kV", efficiency: "Class 0.2" }
    ],
    images: ["https://picsum.photos/800/600?random=6"]
  },
  {
    id: "voltage-transformer",
    slug: "voltage-transformer",
    title: "Voltage Transformers (VT/PT)",
    category: "transformers",
    description: "Potential transformers for voltage measurement and protection",
    longDescription: "Voltage transformers (also called Potential Transformers) are instrument transformers used to measure voltage in high voltage circuits. They step down high voltages to safe, measurable levels.",
    icon: Zap,
    features: [
      "Accurate voltage measurement",
      "High voltage isolation",
      "Multiple secondary windings",
      "Metering & protection class",
      "Oil filled or dry type"
    ],
    specifications: {
      "Primary Voltage": "11kV to 400kV",
      "Secondary Voltage": "110V or 100V",
      "Accuracy Class": "0.2, 0.5, 1.0, 3.0",
      "Burden": "10VA to 200VA",
      "Insulation": "Oil/SF6/Dry type",
      "Standards": "IEC:61869, IS:3156"
    },
    applications: [
      "Voltage measurement",
      "Protection systems",
      "Synchronizing circuits",
      "Power quality monitoring",
      "Revenue metering"
    ],
    certifications: ["Type Tested", "NABL Calibrated", "CEA Approved"],
    models: [
      { name: "VT-11/0.11", capacity: "11kV/110V", voltage: "50VA", efficiency: "Class 0.5" },
      { name: "VT-33/0.11", capacity: "33kV/110V", voltage: "100VA", efficiency: "Class 0.2" },
      { name: "VT-132/0.11", capacity: "132kV/110V", voltage: "200VA", efficiency: "Class 0.5" },
      { name: "VT-400/0.11", capacity: "400kV/110V", voltage: "200VA", efficiency: "Class 0.2" }
    ],
    images: ["https://picsum.photos/800/600?random=7"]
  },
  {
    id: "furnace-transformer",
    slug: "furnace-transformer",
    title: "Furnace Transformers",
    category: "transformers",
    description: "Heavy-duty transformers for electric arc furnaces and induction heating",
    longDescription: "Specially designed transformers for electric arc furnaces and induction heating applications. Built to withstand extreme electrical and thermal stresses with rapid load variations.",
    icon: Settings,
    features: [
      "High short-circuit strength",
      "Rapid load variation capability",
      "Special cooling systems",
      "Multiple tap changers",
      "Robust construction"
    ],
    specifications: {
      "Capacity Range": "5 MVA to 150 MVA",
      "Primary Voltage": "33kV, 132kV",
      "Secondary Voltage": "400V to 1500V",
      "Frequency": "50/60 Hz",
      "Cooling": "OFAF/ODAF",
      "Standards": "IEC:60076, IS:2026"
    },
    applications: [
      "Electric arc furnaces",
      "Induction heating",
      "Steel melting",
      "Non-ferrous melting",
      "Heat treatment"
    ],
    certifications: ["Heavy Duty Rated", "Arc Furnace Approved", "ISO 9001"],
    models: [
      { name: "FT-10", capacity: "10 MVA", voltage: "33kV/800V", efficiency: "98.5%" },
      { name: "FT-25", capacity: "25 MVA", voltage: "132kV/1000V", efficiency: "99.0%" },
      { name: "FT-50", capacity: "50 MVA", voltage: "132kV/1200V", efficiency: "99.2%" },
      { name: "FT-100", capacity: "100 MVA", voltage: "132kV/1500V", efficiency: "99.5%" }
    ],
    images: ["https://picsum.photos/800/600?random=8"]
  },
  {
    id: "rectifier-transformer",
    slug: "rectifier-transformer",
    title: "Rectifier Transformers",
    category: "transformers",
    description: "Specialized transformers for DC power supply and electrochemical processes",
    longDescription: "Rectifier transformers are designed to supply rectifier circuits for DC power applications. They feature special winding configurations to minimize harmonics and provide stable DC output.",
    icon: Battery,
    features: [
      "Low harmonic distortion",
      "Multiple secondary windings",
      "High efficiency",
      "Stable DC output",
      "Electrochemical grade"
    ],
    specifications: {
      "Capacity Range": "100 KVA to 10 MVA",
      "Primary Voltage": "11kV, 22kV, 33kV",
      "Secondary Voltage": "400V to 2000V",
      "DC Output": "12V to 1500V DC",
      "Efficiency": "98-99.5%",
      "Standards": "IEC:60146, IS:4722"
    },
    applications: [
      "Electroplating",
      "Aluminum smelting",
      "Chlor-alkali plants",
      "DC motor drives",
      "Battery charging"
    ],
    certifications: ["Electrochemical Grade", "Low Harmonic", "Energy Efficient"],
    models: [
      { name: "RT-500", capacity: "500 KVA", voltage: "11kV/800V", efficiency: "98.5%" },
      { name: "RT-1000", capacity: "1 MVA", voltage: "22kV/1200V", efficiency: "99.0%" },
      { name: "RT-2500", capacity: "2.5 MVA", voltage: "33kV/1500V", efficiency: "99.2%" },
      { name: "RT-5000", capacity: "5 MVA", voltage: "33kV/2000V", efficiency: "99.5%" }
    ],
    images: ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRDEE_OOTT9Bmm4QRNJ_JJAn4k71gr9ZlTdKWOWpQhb1xA1wmSNHA_FkalK_dASZDkPBneIXSles1wiWtl96pW30ndtoKR85Q"]
  },
  {
    id: "welding-transformer",
    slug: "welding-transformer",
    title: "Welding Transformers",
    category: "transformers",
    description: "Step-down transformers for arc welding and metal joining applications",
    longDescription: "Welding transformers convert high voltage, low current AC power to low voltage, high current suitable for arc welding. Designed for continuous duty with excellent arc stability.",
    icon: Zap,
    features: [
      "High current output",
      "Excellent arc stability",
      "Continuous duty rating",
      "Multiple current settings",
      "Portable designs available"
    ],
    specifications: {
      "Input Voltage": "415V, 440V",
      "Output Voltage": "20V to 80V",
      "Output Current": "150A to 1000A",
      "Duty Cycle": "60% to 100%",
      "Frequency": "50/60 Hz",
      "Standards": "IS:4137, IEC:60974"
    },
    applications: [
      "Arc welding",
      "Metal fabrication",
      "Shipbuilding",
      "Construction",
      "Repair workshops"
    ],
    certifications: ["Welding Grade", "Continuous Duty", "Safety Certified"],
    models: [
      { name: "WT-300", capacity: "300A", voltage: "415V/40V", efficiency: "85%" },
      { name: "WT-400", capacity: "400A", voltage: "415V/50V", efficiency: "87%" },
      { name: "WT-600", capacity: "600A", voltage: "440V/60V", efficiency: "88%" },
      { name: "WT-1000", capacity: "1000A", voltage: "440V/80V", efficiency: "90%" }
    ],
    images: ["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSorEjdGbMXYZvcUJVSXU_vUOKMIKv1Mx_-fN9udeAw8WwsBQN77uSNI_2KCiivlpDpAHKCCd1gXDYxwrF4jdz-j_m1hvcbH8CF2fWksflkmO_J29SbyKZgtw"]
  },
  {
    id: "three-phase-transformer",
    slug: "three-phase-transformer",
    title: "Three Phase Transformers",
    category: "transformers",
    description: "High-efficiency three-phase transformers for industrial power systems",
    longDescription: "Our three-phase transformers are designed for industrial applications requiring balanced three-phase power distribution. Available in various configurations including Delta-Delta, Delta-Wye, and Wye-Wye connections.",
    icon: Settings,
    features: [
      "Balanced three-phase operation",
      "Multiple winding configurations",
      "High power density",
      "Reduced harmonic distortion",
      "Cost-effective solution"
    ],
    specifications: {
      "Capacity Range": "15 KVA to 5000 KVA",
      "Primary Voltage": "415V, 11kV, 22kV, 33kV",
      "Secondary Voltage": "415V, 440V, 480V",
      "Frequency": "50/60 Hz",
      "Connection": "Delta-Delta, Delta-Wye, Wye-Wye",
      "Standards": "IS:2026, IEC:60076"
    },
    applications: [
      "Industrial motor drives",
      "Manufacturing plants",
      "Commercial buildings",
      "Power distribution systems",
      "Renewable energy systems"
    ],
    certifications: ["CEA Approved", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "3PT-100", capacity: "100 KVA", voltage: "11kV/415V", efficiency: "98.5%" },
      { name: "3PT-315", capacity: "315 KVA", voltage: "22kV/415V", efficiency: "98.8%" },
      { name: "3PT-1000", capacity: "1000 KVA", voltage: "33kV/415V", efficiency: "99.0%" },
      { name: "3PT-2500", capacity: "2500 KVA", voltage: "33kV/415V", efficiency: "99.2%" }
    ],
    images: ["https://electricityforum.com/uploads/articles/three-phase-transformers_1482136153.webp"]
  },
  {
    id: "line-choke",
    slug: "line-choke",
    title: "Line Chokes (Reactors)",
    category: "transformers",
    description: "Inductive reactors for power quality improvement and harmonic filtering",
    longDescription: "Line chokes (reactors) are inductive components used to improve power quality by limiting harmonics, reducing inrush currents, and providing impedance in electrical circuits. Essential for VFD applications and power factor correction.",
    icon: Cpu,
    features: [
      "Harmonic filtering",
      "Inrush current limiting",
      "Power factor improvement",
      "Motor protection",
      "Compact design"
    ],
    specifications: {
      "Inductance Range": "0.1 mH to 100 mH",
      "Current Rating": "10A to 2000A",
      "Voltage Rating": "415V, 690V, 1000V",
      "Frequency": "50/60 Hz",
      "Impedance": "3%, 5%, 7%",
      "Standards": "IEC:60289, IS:13925"
    },
    applications: [
      "Variable frequency drives",
      "Motor starting",
      "Harmonic mitigation",
      "Power factor correction",
      "Soft starters"
    ],
    certifications: ["VFD Compatible", "Low Loss Design", "UL Listed"],
    models: [
      { name: "LC-50A", capacity: "50A", voltage: "415V", efficiency: "3% Impedance" },
      { name: "LC-100A", capacity: "100A", voltage: "415V", efficiency: "5% Impedance" },
      { name: "LC-400A", capacity: "400A", voltage: "690V", efficiency: "5% Impedance" },
      { name: "LC-800A", capacity: "800A", voltage: "1000V", efficiency: "7% Impedance" }
    ],
    images: ["https://4.imimg.com/data4/DI/QX/GLADMIN-179351/three-phase-line-choke-250x250.jpg"]
  },
  {
    id: "pin-type-transformer",
    slug: "pin-type-transformer",
    title: "Pin Type Transformers",
    category: "transformers",
    description: "Compact pin-mounted transformers for overhead distribution lines",
    longDescription: "Pin type transformers are compact, single-phase transformers designed for mounting on distribution poles. They are ideal for rural electrification and low-density load areas where three-phase supply is not economical.",
    icon: Zap,
    features: [
      "Pole-mounted design",
      "Weather-resistant construction",
      "Single-phase operation",
      "Compact size",
      "Easy installation"
    ],
    specifications: {
      "Capacity Range": "5 KVA to 25 KVA",
      "Primary Voltage": "11kV, 22kV",
      "Secondary Voltage": "230V, 240V",
      "Frequency": "50 Hz",
      "Insulation": "Oil filled",
      "Standards": "IS:1180, IEC:60076"
    },
    applications: [
      "Rural electrification",
      "Street lighting",
      "Small residential loads",
      "Agricultural pumping",
      "Remote installations"
    ],
    certifications: ["Weather Resistant", "Rural Grade", "BIS Certified"],
    models: [
      { name: "PIN-5", capacity: "5 KVA", voltage: "11kV/230V", efficiency: "97.5%" },
      { name: "PIN-10", capacity: "10 KVA", voltage: "11kV/230V", efficiency: "98.0%" },
      { name: "PIN-16", capacity: "16 KVA", voltage: "22kV/240V", efficiency: "98.2%" },
      { name: "PIN-25", capacity: "25 KVA", voltage: "22kV/240V", efficiency: "98.5%" }
    ],
    images: ["https://2.imimg.com/data2/PL/VQ/MY-/4-250x250.jpg"]
  },
  {
    id: "step-up-transformer",
    slug: "step-up-transformer",
    title: "Step-Up Transformers",
    category: "transformers",
    description: "Voltage step-up transformers for power generation and transmission",
    longDescription: "Step-up transformers increase voltage levels from generation to transmission systems. Essential for efficient power transmission over long distances by reducing current and minimizing transmission losses.",
    icon: Battery,
    features: [
      "Voltage step-up capability",
      "High efficiency design",
      "Low transmission losses",
      "Robust construction",
      "Advanced cooling systems"
    ],
    specifications: {
      "Capacity Range": "1 MVA to 500 MVA",
      "Primary Voltage": "11kV, 22kV, 33kV",
      "Secondary Voltage": "132kV, 220kV, 400kV",
      "Frequency": "50 Hz",
      "Cooling": "ONAN/ONAF/OFAF",
      "Standards": "IS:2026, IEC:60076"
    },
    applications: [
      "Power generation plants",
      "Transmission substations",
      "Grid interconnections",
      "Renewable energy integration",
      "Industrial captive power"
    ],
    certifications: ["CEA Type Approved", "Grid Code Compliant", "ISO 9001"],
    models: [
      { name: "SUT-5", capacity: "5 MVA", voltage: "11kV/132kV", efficiency: "99.2%" },
      { name: "SUT-25", capacity: "25 MVA", voltage: "22kV/220kV", efficiency: "99.5%" },
      { name: "SUT-100", capacity: "100 MVA", voltage: "33kV/400kV", efficiency: "99.7%" },
      { name: "SUT-315", capacity: "315 MVA", voltage: "33kV/400kV", efficiency: "99.8%" }
    ],
    images: ["https://picsum.photos/800/600?random=14"]
  },
  {
    id: "step-down-transformer",
    slug: "step-down-transformer",
    title: "Step-Down Transformers",
    category: "transformers",
    description: "Voltage step-down transformers for industrial and commercial applications",
    longDescription: "Step-down transformers reduce high transmission voltages to usable levels for industrial and commercial applications. Available in various configurations to meet specific load requirements.",
    icon: Zap,
    features: [
      "Voltage step-down capability",
      "Multiple tap options",
      "Load regulation",
      "Overload protection",
      "Efficient operation"
    ],
    specifications: {
      "Capacity Range": "25 KVA to 2500 KVA",
      "Primary Voltage": "11kV, 22kV, 33kV",
      "Secondary Voltage": "415V, 440V, 480V",
      "Frequency": "50/60 Hz",
      "Taps": "±5%, ±2.5%",
      "Standards": "IS:1180, IEC:60076"
    },
    applications: [
      "Industrial plants",
      "Commercial complexes",
      "Residential colonies",
      "Infrastructure projects",
      "Data centers"
    ],
    certifications: ["Energy Efficient", "Load Tested", "Quality Assured"],
    models: [
      { name: "SDT-100", capacity: "100 KVA", voltage: "11kV/415V", efficiency: "98.5%" },
      { name: "SDT-315", capacity: "315 KVA", voltage: "22kV/415V", efficiency: "98.8%" },
      { name: "SDT-1000", capacity: "1000 KVA", voltage: "33kV/415V", efficiency: "99.0%" },
      { name: "SDT-2500", capacity: "2500 KVA", voltage: "33kV/415V", efficiency: "99.2%" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2021/4/PM/BR/BX/119045933/step-up-down-tranformer-and-choke-500x500.jpg"]
  },

  // SERVO STABILIZERS
  {
    id: "single-phase-stabilizer",
    slug: "single-phase-stabilizer",
    title: "Single Phase Servo Stabilizers",
    category: "servo-stabilizers",
    description: "Precision single phase servo stabilizers for sensitive equipment protection",
    longDescription: "Our single phase servo stabilizers provide precise voltage regulation for sensitive electronic equipment. With quick response time and high accuracy, they ensure optimal performance of your valuable equipment.",
    icon: Settings,
    features: [
      "±1% output accuracy",
      "Fast response time",
      "Digital display",
      "Over/under voltage protection", 
      "Compact design"
    ],
    specifications: {
      "Capacity Range": "500 VA to 50 KVA",
      "Input Voltage": "140V to 260V",
      "Output Voltage": "220V ±1%",
      "Response Time": "< 10ms",
      "Efficiency": "95-98%",
      "Standards": "IS:9815"
    },
    applications: [
      "Computer systems",
      "Medical equipment",
      "Laboratory instruments",
      "Office equipment",
      "Home appliances"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "SS-1K", capacity: "1 KVA", voltage: "220V", efficiency: "95%" },
      { name: "SS-5K", capacity: "5 KVA", voltage: "220V", efficiency: "96%" },
      { name: "SS-15K", capacity: "15 KVA", voltage: "220V", efficiency: "97%" },
      { name: "SS-50K", capacity: "50 KVA", voltage: "220V", efficiency: "98%" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2021/4/TE/MD/ML/3049389/single-phase-servo-stabilizer.jpg"]
  },
  {
    id: "three-phase-stabilizer",
    slug: "three-phase-stabilizer", 
    title: "Three Phase Servo Stabilizers",
    category: "servo-stabilizers",
    description: "Industrial grade three phase servo stabilizers for heavy machinery",
    longDescription: "Designed for industrial applications, our three phase servo stabilizers handle heavy loads while maintaining precise voltage regulation. Perfect for manufacturing facilities and large commercial installations.",
    icon: Gauge,
    features: [
      "Individual phase control",
      "Digital microprocessor control",
      "Phase sequence protection",
      "Overload protection",
      "Remote monitoring capability"
    ],
    specifications: {
      "Capacity Range": "5 KVA to 5000 KVA",
      "Input Voltage": "300V to 460V (each phase)",
      "Output Voltage": "415V ±1%",
      "Response Time": "< 5ms",
      "Efficiency": "96-99%",
      "Standards": "IS:9815"
    },
    applications: [
      "Manufacturing plants",
      "Textile mills",
      "Chemical industries",
      "Printing presses",
      "Commercial complexes"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "TS-10K", capacity: "10 KVA", voltage: "415V", efficiency: "96%" },
      { name: "TS-50K", capacity: "50 KVA", voltage: "415V", efficiency: "97%" },
      { name: "TS-250K", capacity: "250 KVA", voltage: "415V", efficiency: "98%" },
      { name: "TS-1000K", capacity: "1000 KVA", voltage: "415V", efficiency: "99%" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2021/4/TE/MD/ML/3049389/three-phase-servo-stabilizer.jpg"]
  },
  {
    id: "oil-cooled-stabilizer",
    slug: "oil-cooled-stabilizer",
    title: "Oil Cooled Servo Stabilizers", 
    category: "servo-stabilizers",
    description: "Heavy duty oil cooled servo stabilizers for continuous operation",
    longDescription: "Our oil cooled servo stabilizers are built for continuous heavy-duty operation. The oil cooling system ensures optimal temperature control and extended equipment life even under extreme conditions.",
    icon: AlertTriangle,
    features: [
      "Oil immersed design",
      "Superior heat dissipation",
      "Continuous duty operation",
      "Low maintenance",
      "Silent operation"
    ],
    specifications: {
      "Capacity Range": "100 KVA to 5000 KVA", 
      "Input Voltage": "380V to 480V",
      "Output Voltage": "415V ±1%",
      "Cooling": "Oil Natural Air Natural (ONAN)",
      "Efficiency": "97-99%",
      "Standards": "IS:9815, IEC:60076"
    },
    applications: [
      "Steel plants",
      "Cement factories",
      "Mining operations",
      "Power plants",
      "Heavy engineering industries"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "OCS-100K", capacity: "100 KVA", voltage: "415V", efficiency: "97%" },
      { name: "OCS-500K", capacity: "500 KVA", voltage: "415V", efficiency: "98%" },
      { name: "OCS-1500K", capacity: "1500 KVA", voltage: "415V", efficiency: "98.5%" },
      { name: "OCS-5000K", capacity: "5000 KVA", voltage: "415V", efficiency: "99%" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2024/12/476587128/JG/IC/OE/2731971/30-kva-three-phase-variac-type-servo-stabilizers-oil-cooled-125x125.jpg"]
  },
  {
    id: "air-cooled-stabilizer",
    slug: "air-cooled-stabilizer",
    title: "Air Cooled Servo Stabilizers",
    category: "servo-stabilizers",
    description: "Compact air cooled servo stabilizers for general industrial applications",
    longDescription: "Our air cooled servo stabilizers offer reliable voltage regulation with natural air cooling. Ideal for moderate load applications where space and cost are considerations while maintaining high performance standards.",
    icon: Settings,
    features: [
      "Natural air cooling",
      "Compact design",
      "Cost effective solution",
      "Easy installation",
      "Low noise operation"
    ],
    specifications: {
      "Capacity Range": "1 KVA to 500 KVA",
      "Input Voltage": "300V to 460V",
      "Output Voltage": "415V ±1%",
      "Cooling": "Air Natural (AN)",
      "Efficiency": "95-98%",
      "Standards": "IS:9815"
    },
    applications: [
      "Small industries",
      "Commercial buildings",
      "Hospitals",
      "Educational institutions",
      "IT offices"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "ACS-5K", capacity: "5 KVA", voltage: "415V", efficiency: "95%" },
      { name: "ACS-25K", capacity: "25 KVA", voltage: "415V", efficiency: "96%" },
      { name: "ACS-100K", capacity: "100 KVA", voltage: "415V", efficiency: "97%" },
      { name: "ACS-500K", capacity: "500 KVA", voltage: "415V", efficiency: "98%" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2022/12/CR/VE/VP/2731971/three-phase-variac-type-servo-stabilizers-air-cooled-125x125.jpg"]
  },
  {
    id: "digital-servo-stabilizer",
    slug: "digital-servo-stabilizer",
    title: "Digital Microprocessor Servo Stabilizers",
    category: "servo-stabilizers",
    description: "Advanced digital servo stabilizers with microprocessor control and monitoring",
    longDescription: "State-of-the-art servo stabilizers featuring digital microprocessor control, LCD displays, and advanced monitoring capabilities. Offers precise voltage regulation with intelligent protection features.",
    icon: Cpu,
    features: [
      "Microprocessor controlled",
      "LCD digital display",
      "Data logging capability",
      "Remote monitoring",
      "Self diagnostics"
    ],
    specifications: {
      "Capacity Range": "1 KVA to 2000 KVA",
      "Input Voltage": "280V to 480V",
      "Output Voltage": "415V ±0.5%",
      "Response Time": "< 2ms",
      "Efficiency": "97-99%",
      "Standards": "IS:9815, IEC:61000"
    },
    applications: [
      "Data centers",
      "Medical equipment",
      "Precision machinery",
      "Research laboratories",
      "Telecom facilities"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015", "CE Marked"],
    models: [
      { name: "DMS-10K", capacity: "10 KVA", voltage: "415V", efficiency: "97%" },
      { name: "DMS-50K", capacity: "50 KVA", voltage: "415V", efficiency: "98%" },
      { name: "DMS-250K", capacity: "250 KVA", voltage: "415V", efficiency: "98.5%" },
      { name: "DMS-1000K", capacity: "1000 KVA", voltage: "415V", efficiency: "99%" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2022/12/WB/QH/QR/2731971/7-125x125.jpg"]
  },
  {
    id: "static-voltage-stabilizer",
    slug: "static-voltage-stabilizer",
    title: "Static Voltage Stabilizers",
    category: "servo-stabilizers",
    description: "Solid-state static voltage stabilizers with no moving parts",
    longDescription: "Advanced static voltage stabilizers using solid-state electronics for ultra-fast voltage correction. No mechanical parts ensure maintenance-free operation and silent performance for sensitive applications.",
    icon: Zap,
    features: [
      "No moving parts",
      "Ultra-fast response",
      "Maintenance free",
      "Silent operation",
      "High precision control"
    ],
    specifications: {
      "Capacity Range": "1 KVA to 1000 KVA",
      "Input Voltage": "320V to 480V",
      "Output Voltage": "415V ±0.5%",
      "Response Time": "< 1ms",
      "Efficiency": "96-98%",
      "Standards": "IS:9815, IEC:61000"
    },
    applications: [
      "Medical imaging equipment",
      "Server rooms",
      "Laboratory instruments",
      "Telecom base stations",
      "Clean rooms"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015", "Medical Grade"],
    models: [
      { name: "SVS-5K", capacity: "5 KVA", voltage: "415V", efficiency: "96%" },
      { name: "SVS-25K", capacity: "25 KVA", voltage: "415V", efficiency: "97%" },
      { name: "SVS-100K", capacity: "100 KVA", voltage: "415V", efficiency: "97.5%" },
      { name: "SVS-500K", capacity: "500 KVA", voltage: "415V", efficiency: "98%" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2025/1/480756189/FD/CD/XU/2731971/single-variac-type-servo-stabilizer-air-cooled-125x125.jpg"]
  },
  {
    id: "relay-voltage-stabilizer",
    slug: "relay-voltage-stabilizer",
    title: "Relay Type Voltage Stabilizers",
    category: "servo-stabilizers",
    description: "Electromechanical relay based voltage stabilizers for basic applications",
    longDescription: "Cost-effective relay type voltage stabilizers using electromagnetic relays for tap changing. Suitable for applications where moderate precision is acceptable and cost is a primary consideration.",
    icon: Settings,
    features: [
      "Electromagnetic relay control",
      "Step voltage correction",
      "Cost effective",
      "Simple operation",
      "Robust construction"
    ],
    specifications: {
      "Capacity Range": "500 VA to 100 KVA",
      "Input Voltage": "160V to 280V",
      "Output Voltage": "220V ±5%",
      "Response Time": "100-500ms",
      "Efficiency": "92-95%",
      "Standards": "IS:9815"
    },
    applications: [
      "Residential applications",
      "Small offices",
      "Shops and retail",
      "Rural areas",
      "Non-critical equipment"
    ],
    certifications: ["ISI Mark", "BIS Certified"],
    models: [
      { name: "RVS-1K", capacity: "1 KVA", voltage: "220V", efficiency: "92%" },
      { name: "RVS-5K", capacity: "5 KVA", voltage: "220V", efficiency: "93%" },
      { name: "RVS-25K", capacity: "25 KVA", voltage: "220V", efficiency: "94%" },
      { name: "RVS-100K", capacity: "100 KVA", voltage: "220V", efficiency: "95%" }
    ],
    images: ["https://picsum.photos/800/600?random=16"]
  },
  {
    id: "cvt-stabilizer",
    slug: "cvt-stabilizer",
    title: "CVT (Constant Voltage Transformer) Stabilizers",
    category: "servo-stabilizers",
    description: "Ferroresonant CVT stabilizers for isolation and voltage regulation",
    longDescription: "Constant Voltage Transformers (CVT) using ferroresonant technology provide excellent voltage regulation with galvanic isolation. Ideal for sensitive equipment requiring clean, stable power supply.",
    icon: Shield,
    features: [
      "Ferroresonant technology",
      "Galvanic isolation",
      "Noise filtering",
      "Instantaneous correction",
      "No electronics required"
    ],
    specifications: {
      "Capacity Range": "100 VA to 50 KVA",
      "Input Voltage": "180V to 260V",
      "Output Voltage": "220V ±1%",
      "Response Time": "Instantaneous",
      "Efficiency": "85-90%",
      "Standards": "IS:9815, UL Listed"
    },
    applications: [
      "Medical equipment",
      "Telecom systems",
      "SCADA panels",
      "Laboratory instruments",
      "IT equipment"
    ],
    certifications: ["ISI Mark", "UL Listed", "CE Marked", "Medical Grade"],
    models: [
      { name: "CVT-1K", capacity: "1 KVA", voltage: "220V", efficiency: "85%" },
      { name: "CVT-3K", capacity: "3 KVA", voltage: "220V", efficiency: "87%" },
      { name: "CVT-10K", capacity: "10 KVA", voltage: "220V", efficiency: "88%" },
      { name: "CVT-25K", capacity: "25 KVA", voltage: "220V", efficiency: "90%" }
    ],
    images: ["https://picsum.photos/800/600?random=17"]
  },
  {
    id: "ht-servo-stabilizer",
    slug: "ht-servo-stabilizer",
    title: "HT (High Tension) Servo Stabilizers",
    category: "servo-stabilizers",
    description: "High voltage servo stabilizers for HT distribution systems",
    longDescription: "Specialized high tension servo stabilizers designed for HT distribution networks. Provides voltage regulation at transmission and sub-transmission levels for large industrial installations.",
    icon: Battery,
    features: [
      "High voltage operation",
      "Outdoor installation",
      "Weather resistant",
      "Remote monitoring",
      "Grid synchronization"
    ],
    specifications: {
      "Capacity Range": "1 MVA to 50 MVA",
      "Input Voltage": "11kV, 22kV, 33kV",
      "Output Voltage": "±2% regulation",
      "Cooling": "ONAN/ONAF",
      "Efficiency": "98-99%",
      "Standards": "IS:9815, IEC:60076"
    },
    applications: [
      "Industrial substations",
      "Power distribution",
      "Large manufacturing plants",
      "Mining operations",
      "Steel plants"
    ],
    certifications: ["CEA Approved", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "HTS-1M", capacity: "1 MVA", voltage: "11kV", efficiency: "98%" },
      { name: "HTS-5M", capacity: "5 MVA", voltage: "22kV", efficiency: "98.5%" },
      { name: "HTS-25M", capacity: "25 MVA", voltage: "33kV", efficiency: "99%" },
      { name: "HTS-50M", capacity: "50 MVA", voltage: "33kV", efficiency: "99.2%" }
    ],
    images: ["https://picsum.photos/800/600?random=18"]
  },
  {
    id: "mainline-stabilizer",
    slug: "mainline-stabilizer",
    title: "Mainline Voltage Stabilizers",
    category: "servo-stabilizers",
    description: "Centralized mainline stabilizers for complete facility protection",
    longDescription: "Mainline voltage stabilizers installed at the main incoming supply to protect entire facilities. Provides centralized voltage regulation for all connected loads and equipment.",
    icon: Gauge,
    features: [
      "Centralized protection",
      "Whole facility coverage",
      "Load balancing",
      "Phase correction",
      "Energy monitoring"
    ],
    specifications: {
      "Capacity Range": "50 KVA to 10 MVA",
      "Input Voltage": "380V to 480V",
      "Output Voltage": "415V ±1%",
      "Load Factor": "0.8 to 1.0",
      "Efficiency": "96-99%",
      "Standards": "IS:9815, IEC:61000"
    },
    applications: [
      "Industrial complexes",
      "Commercial buildings",
      "Hospitals",
      "Educational campuses",
      "Manufacturing facilities"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "MLS-100K", capacity: "100 KVA", voltage: "415V", efficiency: "96%" },
      { name: "MLS-500K", capacity: "500 KVA", voltage: "415V", efficiency: "97%" },
      { name: "MLS-2000K", capacity: "2000 KVA", voltage: "415V", efficiency: "98%" },
      { name: "MLS-5000K", capacity: "5000 KVA", voltage: "415V", efficiency: "99%" }
    ],
    images: ["https://picsum.photos/800/600?random=19"]
  },

  // WIRES & CABLES
  {
    id: "power-cables",
    slug: "power-cables",
    title: "Power Cables",
    category: "wires-cables", 
    description: "High quality power cables for electrical distribution systems",
    longDescription: "Our power cables are manufactured using premium copper conductors and advanced insulation materials. Designed to meet the highest safety standards for power transmission and distribution applications.",
    icon: Cable,
    features: [
      "Pure copper conductors",
      "XLPE insulation",
      "Flame retardant properties",
      "Low smoke emission",
      "UV resistant outer sheath"
    ],
    specifications: {
      "Conductor": "Copper/Aluminum",
      "Insulation": "XLPE/PVC",
      "Voltage Rating": "1.1kV to 33kV",
      "Size Range": "1.5 sq.mm to 1000 sq.mm",
      "Cores": "Single core to 4 core",
      "Standards": "IS:7098, IEC:60502"
    },
    applications: [
      "Power distribution",
      "Industrial wiring",
      "Building installations",
      "Underground laying",
      "Overhead transmission"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "PC-1.5", capacity: "1.5 sq.mm", voltage: "1.1kV", efficiency: "Low Loss" },
      { name: "PC-25", capacity: "25 sq.mm", voltage: "1.1kV", efficiency: "Low Loss" },
      { name: "PC-95", capacity: "95 sq.mm", voltage: "11kV", efficiency: "Low Loss" },
      { name: "PC-400", capacity: "400 sq.mm", voltage: "33kV", efficiency: "Low Loss" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2021/4/TE/MD/ML/3049389/power-cable.jpg"]
  },
  {
    id: "control-cables",
    slug: "control-cables",
    title: "Control Cables",
    category: "wires-cables",
    description: "Multi-core control cables for automation and control systems",
    longDescription: "Specially designed for control and automation applications, our control cables feature multiple cores with excellent shielding properties to prevent electromagnetic interference.",
    icon: Shield,
    features: [
      "Multi-core design",
      "EMI/EMC shielding",
      "Flexible construction",
      "Oil resistant outer sheath",
      "Color coded cores"
    ],
    specifications: {
      "Conductor": "Tinned copper",
      "Insulation": "PVC",
      "Voltage Rating": "300/500V to 0.6/1kV",
      "Core Range": "2 core to 61 core",
      "Size Range": "0.5 sq.mm to 4 sq.mm",
      "Standards": "IS:1554, IEC:60227"
    },
    applications: [
      "Control panels",
      "Automation systems",
      "Motor control circuits",
      "Instrumentation",
      "Process control"
    ],
    certifications: ["ISI Mark", "BIS Certified", "ISO 9001:2015"],
    models: [
      { name: "CC-2C", capacity: "2 Core x 1.5 sq.mm", voltage: "300/500V", efficiency: "Shielded" },
      { name: "CC-7C", capacity: "7 Core x 4 sq.mm", voltage: "0.6/1kV", efficiency: "Shielded" },
      { name: "CC-19C", capacity: "19 Core x 2.5 sq.mm", voltage: "0.6/1kV", efficiency: "Shielded" },
      { name: "CC-37C", capacity: "37 Core x 1.5 sq.mm", voltage: "0.6/1kV", efficiency: "Shielded" }
    ],
    images: ["https://5.imimg.com/data5/SELLER/Default/2021/4/TE/MD/ML/3049389/control-cable.jpg"]
  }
];

export const getProductsByCategory = (category: string) => {
  if (!category || typeof category !== 'string') {
    return [];
  }
  return products.filter(product => product.category === category);
};

export const getProductBySlug = (slug: string) => {
  if (!slug || typeof slug !== 'string') {
    return undefined;
  }
  return products.find(product => product.slug === slug);
};

// Get all unique categories
export const getAllCategories = () => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};

// Get products by search term
export const searchProducts = (searchTerm: string) => {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return [];
  }
  
  const term = searchTerm.toLowerCase().trim();
  if (term.length < 2) {
    return [];
  }
  
  return products.filter(product => 
    product.title.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term) ||
    product.features.some(feature => feature.toLowerCase().includes(term))
  );
};