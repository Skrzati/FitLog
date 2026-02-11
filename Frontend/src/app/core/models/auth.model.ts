export interface User {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface LoginDto {
  username: string;
  password?: string;
}

// TO MUSISZ MIEĆ:
export interface RegisterDto {
  username: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}