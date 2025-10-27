// API configuration and base service
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : '/api';

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: Record<string, unknown>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface QuoteRequestData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  location?: string;
  productType: 'transformers' | 'servo-stabilizers' | 'wires-cables' | 'other';
  specifications?: string;
  quantity?: string;
  budgetRange?: 'under-1-lakh' | '1-5-lakh' | '5-25-lakh' | '25-lakh-plus' | 'not-specified';
  timeline?: 'immediate' | '1-month' | '3-months' | '6-months' | 'flexible';
  additionalRequirements?: string;
  attachments?: File[];
}

export interface EmailData {
  to: string;
  subject: string;
  message: string;
  senderName?: string;
  senderEmail?: string;
  template?: string;
  templateData?: Record<string, unknown>;
}

// Base API class with common functionality
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP ${response.status}`);
      }
      
      return data;
    } else {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return {
        success: true,
        message: 'Request completed successfully'
      };
    }
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Don't set Content-Type for FormData (let browser set it with boundary)
    if (options.body instanceof FormData) {
      delete defaultHeaders['Content-Type'];
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse<T>(response);
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        console.error(`API request failed: ${endpoint}`, error);
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error(`API request failed: ${endpoint}`);
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request with JSON data
  async post<T>(endpoint: string, data: Record<string, unknown> | ContactFormData | EmailData): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // POST request with FormData
  async postFormData<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.get('/health');
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Contact service
export class ContactService {
  static async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    try {
      return await apiService.post('/contact', data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Contact form submission failed:', error);
      }
      throw error;
    }
  }

  static async getContactInfo(): Promise<ApiResponse> {
    try {
      return await apiService.get('/contact/info');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to get contact info:', error);
      }
      throw error;
    }
  }

  static async checkHealth(): Promise<ApiResponse> {
    try {
      return await apiService.get('/contact/health');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Contact service health check failed:', error);
      }
      throw error;
    }
  }
}

// Quote service
export class QuoteService {
  static async submitQuoteRequest(data: QuoteRequestData): Promise<ApiResponse> {
    try {
      return await apiService.post('/quote', data as unknown as Record<string, unknown>);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Quote request submission failed:', error);
      }
      throw error;
    }
  }

  static async getProductTypes(): Promise<ApiResponse> {
    try {
      return await apiService.get('/quote/product-types');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to get product types:', error);
      }
      throw error;
    }
  }

  static async checkHealth(): Promise<ApiResponse> {
    try {
      return await apiService.get('/quote/health');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Quote service health check failed:', error);
      }
      throw error;
    }
  }
}

// Email service
export class EmailService {
  static async sendEmail(data: EmailData): Promise<ApiResponse> {
    try {
      return await apiService.post('/email/send', data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Email sending failed:', error);
      }
      throw error;
    }
  }

  static async sendBulkEmail(
    recipients: string[], 
    subject: string, 
    message: string, 
    template?: string, 
    templateData?: Record<string, unknown>
  ): Promise<ApiResponse> {
    try {
      return await apiService.post('/email/send-bulk', {
        recipients,
        subject,
        message,
        template,
        templateData
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Bulk email sending failed:', error);
      }
      throw error;
    }
  }

  static async testEmailConfig(): Promise<ApiResponse> {
    try {
      return await apiService.get('/email/test');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Email configuration test failed:', error);
      }
      throw error;
    }
  }
}

// Utility functions
export const ApiUtils = {
  // Check if API is available
  async isApiAvailable(): Promise<boolean> {
    try {
      await apiService.healthCheck();
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('API is not available:', error);
      }
      return false;
    }
  },

  // Format error message for display
  formatErrorMessage(error: unknown): string {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error && typeof error === 'object') {
      if ('message' in error && typeof error.message === 'string') {
        return error.message;
      }
      
      if ('error' in error && typeof error.error === 'string') {
        return error.error;
      }
    }
    
    return 'An unexpected error occurred. Please try again.';
  },

  // Validate email format
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone format (basic)
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  // Format file size for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

export default apiService;
