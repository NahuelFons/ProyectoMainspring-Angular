import { FormControl } from "@angular/forms";
import { ICourse } from "../../courses/models";
import { IUsers } from "../../users/models";

export interface IInscription {
    id: number;
    course: ICourse;
    enrolled: IUsers;
}

export interface IInscriptionForm {
    course: FormControl<ICourse | null>,
    enrolled: FormControl<IUsers | null>,
}

export interface ICreateInscriptionData {
    course: ICourse | null;
    enrolled: IUsers | null;
}

