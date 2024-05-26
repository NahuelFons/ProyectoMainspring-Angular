export type userLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type UserRole = 'ADMIN' | 'USER';

export interface IUsers {
    id: number;
    firstName: string;
    lastName: string;
    englishLevel: string;
    email: string;
    role: string;
    createdAt: Date;
}

export interface CreateUserPayload {
    firstName: string | null;
    lastName: string | null;
    englishLevel: string | null;
    email: string | null;
    role: string | null;
    createdAt: Date | null;
}