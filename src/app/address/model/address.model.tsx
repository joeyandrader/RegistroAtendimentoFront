import Swal from "sweetalert2";
import type { IAddress } from "../../user/interfaces/IAddress";
import { AddressService } from "../service/address.service"
import { useNavigate } from "react-router";


export const AddressViewModel = () => {
    const {
        UpdateAddress
    } = AddressService("address");

    const navigator = useNavigate();

    const UpdateAddressAsync = async (request: IAddress) => {
        try {
            var result = await UpdateAddress(request);
            if (result) {
                Swal.fire({
                    title: "Endereço atualizado com sucesso",
                    theme: 'auto',
                    icon: "success",
                })
                    .then(() => {
                        navigator("/usuarios");
                    })
            }
        } catch (error) {
            Swal.fire({
                title: "Error ao atualizar usuario!",
                icon: "error"
            })
        }
    }

    return {
        UpdateAddressAsync
    }
}

