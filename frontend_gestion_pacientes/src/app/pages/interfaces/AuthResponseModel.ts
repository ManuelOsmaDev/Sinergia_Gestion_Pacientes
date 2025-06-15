export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  token_type: string;
  expires_in: number;
}
