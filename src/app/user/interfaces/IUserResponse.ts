import type { IAddress } from "./IAddress";

export interface IUserResponse {
    id?: number;
    name: string,
    dateOfBirth: string,
    cpf: string,
    sex: number,
    status: number,
    address: IAddress
}