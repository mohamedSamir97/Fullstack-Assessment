export interface CustomerDto {
    ID: number;
    NAME: string;
  }

  export interface CustomerResponseDto {
    hardware: CustomerDto[];
    software: CustomerDto[];
  }

  export interface CustomerHdrDto {
    id: number;
    name: string;
    email: string;
    category: number;
    customerDetails: CustomerDetail[];
    isUpdate : boolean;
  }

  export interface CustomerDetail {
    id?: number;
    sn?: number;
    time?: Date;
    date?: Date;
    remark?: string;
    sendEmail?: string;
  }
