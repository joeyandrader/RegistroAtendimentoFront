import type { IUser } from "../../user/interfaces/IUser";

export interface IAppointment {
    id?: number;
    appointmentDate: Date;
    description: string;
    status: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
    user?: IUser
}