import { api } from "../../../shared/api/api"
import type { IAddress } from "../../user/interfaces/IAddress"

export const AddressService = (baseUrl: string) => {

    const UpdateAddress = async (request: IAddress, urlApi?: string): Promise<IAddress> => {
        if (urlApi == undefined) urlApi = "";
        var result = await api.put(`${baseUrl + "/" + urlApi}`, request)
            .then((res) => { return res.data });
        return result;
    }


    return {
        UpdateAddress
    }
}
