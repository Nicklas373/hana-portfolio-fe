export interface contactMap {
  fullname: string;
  email: string;
  message: string;
  turnstileToken: string;
}

export interface contactInsertMap {
  messageid: string;
}

export interface contactResponseMap {
  success: boolean;
  message: string;
  data: {
    contact: contactMap[];
  };
  error: string;
}

export interface contactInsertResponseMap {
  success: boolean;
  message: string;
  data: {
    contact: contactInsertMap[];
  };
  error: string;
}
