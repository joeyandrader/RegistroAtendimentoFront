import type { IAddress } from "./IAddress";

export interface IUserRequest {
    id?: number;
    name: string,
    dateOfBirth: string,
    cpf: string,
    sex: number,
    status: number,
    address?: IAddress
}