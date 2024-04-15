export type userLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface IUsers {
    id: number;
    firstName: string;
    lastName: string;
    englishLevel: userLevel;
    email: string;
    createdAt: Date;
}