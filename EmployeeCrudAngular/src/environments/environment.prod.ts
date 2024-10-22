export const environment = {
  production: true,
  apiUrl: (typeof window !== 'undefined' && window.env && window.env.apiUrl) 
             ? window.env.apiUrl
             : 'http://localhost:7150/api/Employee' // Valor por defecto
};
