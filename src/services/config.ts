const VITE_HOST_URL = import.meta.env.VITE_HOST_URL as string;
export const BASE_API_URL = `http://${VITE_HOST_URL}/api/public/`;
export const WS_API_URL = `ws://${VITE_HOST_URL}/api/public/ws`;
