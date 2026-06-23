import { Link, useParams } from "react-router"
import { InputComponent } from "../../../shared/components/Input/InputComponent"
import InputSelectComponent from "../../../shared/components/InputSelect/InputSelectComponent"
import { ESex } from "../../../shared/Enums/ESex"
import { useEffect, useState } from "react"
import type { IUserRequest } from "../interfaces/IUserRequest"
import { EStatus } from "../../../shared/Enums/EStatus"
import UserViewModel from "../model/user.model"
import { AddressViewModel } from "../../address/model/address.model"
import type { IAddress } from "../interfaces/IAddress"


export const EditUser = () => {
    const [user, setUser] = useState<IUserRequest>({
        id: 0,
        name: "",
        dateOfBirth: "",
        cpf: "",
        sex: 0,
        status: 0,
        address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "",
            neighborhood: "",
            state: "",
            zipCode: ""
        }
    });

    const { GetUser, UpdateUser } = UserViewModel();
    const { UpdateAddressAsync } = AddressViewModel();
    const { id } = useParams();


    useEffect(() => {
        const loadUser = async () => {
            if (!id) return;
            const result = await GetUser(Number(id));
            if (result) {
                const data = result;
                setUser({
                    id: data?.id,
                    name: data?.name ?? "",
                    dateOfBirth: data?.dateOfBirth.split("T")[0] ?? "",
                    cpf: data?.cpf ?? "",
                    sex: data?.sex ?? 0,
                    status: data?.status ?? 0,
                    address: {
                        id: data.id,
                        addressLine1: data?.address?.addressLine1 || "",
                        addressLine2: data?.address?.addressLine2 || "",
                        city: data?.address?.city || "",
                        country: data?.address?.country || "",
                        neighborhood: data?.address?.neighborhood || "",
                        state: data?.address?.state || "",
                        zipCode: data?.address?.zipCode || ""
                    }
                });
            }
        }
        loadUser();
    }, [])

    const handleSubmitUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            ...user,
            cpf: user.cpf.replace(/\D/g, "")
        };

        await UpdateUser(payload);
    };

    const handleSubmitAddress = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            ...user.address,
            ZipCode: user.address?.zipCode.replace(/\D/g, "")
        };
        await UpdateAddressAsync(payload as IAddress);
    };


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setUser(prev => {
            if (!prev) return prev;

            if (name.includes(".")) {
                const [parent, child] = name.split(".");

                const parentObj = prev[parent as keyof IUserRequest] as any;

                return {
                    ...prev,
                    [parent]: {
                        ...parentObj,
                        [child]: value
                    }
                };
            }

            return {
                ...prev,
                [name]:
                    name === "sex" || name === "status"
                        ? Number(value)
                        : value
            };
        });
    };


    return (
        <>
            <div className="card">
                <div className="card-header p-3 d-flex justify-content-between align-items-center">
                    Usuarios
                    <Link className="btn btn-dark" to="/usuarios">Cancelar</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmitUser}>
                        <InputComponent
                            label="Nome"
                            placeholder="Nome do paciente"
                            name="name"
                            id="name"
                            type="text"
                            value={user?.name}
                            onChange={handleChange}
                        />
                        <InputComponent
                            label="Data de nascimento"
                            id="date"
                            name="dateOfBirth"
                            type="date"
                            maskType="date"
                            value={user?.dateOfBirth}
                            onChange={handleChange}
                        />
                        <InputComponent
                            label="Cpf"
                            placeholder="Cpf do paciente"
                            id="cpf"
                            name="cpf"
                            type="text"
                            maskType="cpf"
                            value={user?.cpf}
                            onChange={handleChange}
                        />
                        <InputSelectComponent
                            listSelect={
                                Object.entries(ESex).map(([key, value]) => ({
                                    text: value,
                                    value: Number(key)
                                }))
                            }
                            label="Sexo"
                            id="sex"
                            name="sex"
                            value={user?.sex}
                            onChange={handleChange}
                        />

                        <InputSelectComponent
                            listSelect={
                                Object.entries(EStatus).map(([key, value]) => ({
                                    text: value,
                                    value: parseInt(key)
                                }))
                            }
                            label="Status"
                            id="status"
                            name="status"
                            value={user?.status}
                            onChange={handleChange}
                        />
                        <button className="btn btn-primary mt-3">Salvar usuario</button>
                    </form>
                    <form onSubmit={handleSubmitAddress}>
                        <h4 className="mt-3">Endereço:</h4>
                        <div className="row">
                            <div className="col-6">
                                <InputComponent
                                    type="text"
                                    maskType="cep"
                                    name="address.zipCode"
                                    id="cep"
                                    label="CEP"
                                    value={user?.address?.zipCode ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-6">
                                <InputComponent
                                    type="text"
                                    name="address.addressLine1"
                                    id="AddressLine1"
                                    label="Endereço"
                                    value={user?.address?.addressLine1 ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-6">
                                <InputComponent
                                    type="text"
                                    name="address.neighborhood"
                                    id="Neighborhood"
                                    label="Bairro"
                                    value={user?.address?.neighborhood ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-6">
                                <InputComponent
                                    type="text"
                                    name="address.addressLine2"
                                    id="AddressLine2"
                                    label="Complemento"
                                    value={user?.address?.addressLine2 ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-4">
                                <InputComponent
                                    type="text"
                                    name="address.city"
                                    id="City"
                                    label="Cidade"
                                    value={user?.address?.city ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-4">
                                <InputComponent
                                    type="text"
                                    name="address.state"
                                    id="State"
                                    label="Estado"
                                    value={user?.address?.state ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-4">
                                <InputComponent
                                    type="text"
                                    name="address.country"
                                    id="Country"
                                    label="Pais"
                                    value={user?.address?.country ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary mt-3">Salvar endereço</button>
                    </form>
                </div>
            </div>
        </>
    )
}