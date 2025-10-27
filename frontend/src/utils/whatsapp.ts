// WhatsApp integration utilities for Gayatri Electricals

// Company WhatsApp contact number
export const WHATSAPP_NUMBER = "+919824620304"; // Gayatri Electricals sales team

// Product interface for type safety
interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  specifications?: Record<string, string>;
  models?: Array<{
    name: string;
    capacity: string;
    voltage: string;
    efficiency: string;
  }>;
}

/**
 * Generates a WhatsApp quote message for a specific product
 */
export const generateWhatsAppQuoteMessage = (product: Product): string => {
  const companyName = "Gayatri Electricals";
  const website = "www.gayatrielectricals.com";
  
  // Create formatted message
  let message = `🔌 *QUOTE REQUEST - ${companyName}*\n\n`;
  
  message += `📋 *Product Details:*\n`;
  message += `• Product: ${product.title}\n`;
  message += `• Category: ${product.category.replace('-', ' ').toUpperCase()}\n`;
  message += `• Description: ${product.description}\n\n`;
  
  // Add specifications if available
  if (product.specifications) {
    message += `⚡ *Technical Specifications:*\n`;
    Object.entries(product.specifications).forEach(([key, value]) => {
      message += `• ${key}: ${value}\n`;
    });
    message += `\n`;
  }
  
  // Add available models if any
  if (product.models && product.models.length > 0) {
    message += `🔧 *Available Models:*\n`;
    product.models.slice(0, 3).forEach((model) => {
      message += `• ${model.name} - ${model.capacity} (${model.efficiency})\n`;
    });
    if (product.models.length > 3) {
      message += `• And ${product.models.length - 3} more models...\n`;
    }
    message += `\n`;
  }
  
  message += `📞 *Request Information:*\n`;
  message += `I am interested in getting a quote for the above product. Please provide:\n`;
  message += `• Best pricing and availability\n`;
  message += `• Technical specifications\n`;
  message += `• Delivery timeline\n`;
  message += `• Installation support\n\n`;
  
  message += `🏢 *Customer Details:*\n`;
  message += `• Company/Name: [Please fill]\n`;
  message += `• Location: [Please fill]\n`;
  message += `• Quantity Required: [Please fill]\n`;
  message += `• Application: [Please fill]\n\n`;
  
  message += `Thank you!\n`;
  message += `Website: ${website}`;
  
  return message;
};

/**
 * Opens WhatsApp with pre-filled quote message
 */
export const openWhatsAppQuote = (product: Product): void => {
  const message = generateWhatsAppQuoteMessage(product);
  const encodedMessage = encodeURIComponent(message);
  
  // WhatsApp Web/App URL
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
  
  // Open in new tab/window
  window.open(whatsappUrl, '_blank');
};

/**
 * Generates a general inquiry WhatsApp message
 */
export const generateGeneralInquiryMessage = (): string => {
  const companyName = "Gayatri Electricals";
  
  let message = `🔌 *GENERAL INQUIRY - ${companyName}*\n\n`;
  message += `Hello! I am interested in your electrical products and services.\n\n`;
  message += `Please provide information about:\n`;
  message += `• Product catalog and pricing\n`;
  message += `• Technical specifications\n`;
  message += `• Delivery and installation\n`;
  message += `• After-sales support\n\n`;
  message += `Thank you!`;
  
  return message;
};

/**
 * Opens WhatsApp for general inquiry
 */
export const openWhatsAppInquiry = (): void => {
  const message = generateGeneralInquiryMessage();
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

/**
 * Validates phone number format
 */
export const isValidWhatsAppNumber = (number: string): boolean => {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(number);
};

/**
 * Formats phone number for WhatsApp URL
 */
export const formatWhatsAppNumber = (number: string): string => {
  return number.replace(/[^\d+]/g, '');
};
