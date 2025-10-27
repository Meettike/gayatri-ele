export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  industry: string;
}

export const partners: Partner[] = [
  {
    id: "powerline-industries",
    name: "Powerline Industries",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "https://powerlineindustries.com",
    description: "Leading manufacturer of power transmission equipment",
    industry: "Power Transmission"
  },
  {
    id: "comptech",
    name: "Comptech",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "https://comptechcompressor.com",
    description: "Air compressor and industrial equipment solutions",
    industry: "Industrial Equipment"
  },
  {
    id: "ib-group",
    name: "IB Group",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "https://ibgroup.co.in",
    description: "Diversified industrial conglomerate",
    industry: "Industrial Solutions"
  },
  {
    id: "soleos-solar",
    name: "Soleos Solar",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "#",
    description: "Solar energy solutions and renewable power systems",
    industry: "Renewable Energy"
  },
  {
    id: "vidyut-sales",
    name: "Vidyut Sales",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "#",
    description: "Electrical equipment sales and distribution",
    industry: "Electrical Distribution"
  },
  {
    id: "powercon",
    name: "Powercon",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "#",
    description: "Power control and automation solutions",
    industry: "Power Control"
  },
  {
    id: "dolphin-lasers",
    name: "Dolphin Lasers Pvt Ltd",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "#",
    description: "Laser technology and precision equipment",
    industry: "Laser Technology"
  },
  {
    id: "trishul-power",
    name: "Trishul Power Systems",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "#",
    description: "Power generation and electrical systems",
    industry: "Power Generation"
  },
  {
    id: "hi-life-machinery",
    name: "Hi-Life Machinery",
    logo: "/placeholder.svg", // Replace with actual logo
    website: "#",
    description: "Industrial machinery and equipment manufacturing",
    industry: "Industrial Machinery"
  }
];

export const getPartnersByIndustry = (industry: string) => {
  return partners.filter(partner => partner.industry === industry);
};

export const getPartnerById = (id: string) => {
  return partners.find(partner => partner.id === id);
};
