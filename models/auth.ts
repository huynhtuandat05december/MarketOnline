export interface EnterForm {
  email?: string;
  phone?: string;
}

export interface ResponseType {
  data?: any;
  errDetail?: string | null;
  errCode?: number | null;
}

export interface TokenForm {
  token: string;
}
