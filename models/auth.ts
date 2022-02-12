export interface EnterForm {
  email?: string;
  phone?: string;
}

export interface ResponseType {
  data?: object | null;
  errDetail?: string | null;
  errCode?: number | null;
}
