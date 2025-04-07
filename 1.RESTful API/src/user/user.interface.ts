// use to define internal data structure of the user object
export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    subscribeToNewsletter: boolean;
  }