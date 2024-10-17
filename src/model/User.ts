export interface User {
    id?: string; 
    name: string;
    phone_number: string;
    email: string;
    password: string;
    role: string;
    avatar_file_name: string;
    license_number?:string;
  }