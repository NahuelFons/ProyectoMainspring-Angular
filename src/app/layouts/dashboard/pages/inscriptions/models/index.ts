import { FormControl } from "@angular/forms";
import { ICourse } from "../../courses/models";
import { IUsers } from "../../users/models";

export interface IInscription {
    id: string;
    course: ICourse;
    user: IUsers;
    userId: string;
    courseId: string;
}

export interface IInscriptionForm {
    course: FormControl<ICourse | null>,
    user: FormControl<IUsers | null>,
}

export interface ICreateInscriptionPayload {
    course: ICourse | null;
    user: IUsers | null;
}

