// 在开发环境使用代理，生产环境使用完整URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://api.lovetest.com.cn');
