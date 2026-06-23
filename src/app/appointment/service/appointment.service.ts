import { api } from "../../../shared/api/api";
import type { IAppointment } from "../interface/IAppointment";

export const AppointmentService = (baseUrl: string) => {

    const GetAllAppointment = async (urlApi?: string): Promise<IAppointment[]> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.get(`${baseUrl + "/" + urlApi}`)
            .then(res => { return res.data });
        return result;
    }

    const GetAppointmentById = async (id: number, urlApi?: string): Promise<IAppointment> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.get(`${baseUrl + "/" + urlApi}`, { params: { id } })
            .then(res => { return res.data });
        return result;
    }

    const Regiter = async (request: IAppointment, urlApi?: string): Promise<IAppointment> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.post(`${baseUrl + "/" + urlApi}`, request)
            .then(res => { return res.data });
        return result;
    }

    const UpdateAppointment = async (request: IAppointment, urlApi?: string): Promise<boolean> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.put(`${baseUrl + "/" + urlApi}`, request)
            .then(res => { return res.data });
        return result;
    }

    const Delete = async (id: number, urlApi?: string): Promise<Boolean> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.delete(`${baseUrl + "/" + urlApi}`, { params: { id } })
            .then(res => { return res.data });
        return result;
    }

    return {
        GetAllAppointment,
        Regiter,
        Delete,
        GetAppointmentById,
        UpdateAppointment
    }
}