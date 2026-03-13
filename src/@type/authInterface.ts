export interface InitialState {
  status: "pending" | "fulfilled" | "rejected" | "idle";
  data: AdminLoginResponse[];
  error: string | null;
}

export interface AuthInterface {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: string;
  message?: string;
}
