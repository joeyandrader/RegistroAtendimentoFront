import { api } from "../../../shared/api/api"
import type { IUser } from "../interfaces/IUser"
import type { IUserRequest } from "../interfaces/IUserRequest"
import type { IUserResponse } from "../interfaces/IUserResponse"

export const UserService = (baseUrl: string) => {
    const GetAllUser = async (urlApi?: string): Promise<IUserResponse[]> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.get(`${baseUrl + "/" + urlApi}`)
            .then(res => { return res.data });
        return result;
    }

    const GetUserById = async (id: number, urlApi?: string): Promise<IUserResponse> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.get(`${baseUrl + "/" + urlApi}`, { params: { id } });
        return result.data;
    }

    const RegisterUser = async (request: any, urlApi?: string): Promise<IUser> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.post(`${baseUrl + "/" + urlApi}`, request)
        return result.data;
    }

    const DeleteUser = async (id: number, urlApi?: string): Promise<boolean> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.delete(`${baseUrl + "/" + urlApi}`, { params: { id } });
        return result.data;
    }

    const EditUser = async (request: IUserRequest, urlApi?: string): Promise<IUserResponse> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.put(`${baseUrl + "/" + urlApi}`, request);
        return result.data;
    }

    return {
        GetAllUser,
        RegisterUser,
        DeleteUser,
        EditUser,
        GetUserById
    }
}
