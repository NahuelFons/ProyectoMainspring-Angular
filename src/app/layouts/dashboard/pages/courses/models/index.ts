export interface ICourse {
    id: string;
    name: string;
    description: string;
    price: number;
}

export interface ICreateCoursePayload {
    name: string;
    description: string;
    price: number;
}