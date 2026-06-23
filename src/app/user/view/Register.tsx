import { Link } from "react-router"
import { InputComponent } from "../../../shared/components/Input/InputComponent"
import InputSelectComponent from "../../../shared/components/InputSelect/InputSelectComponent"
import { ESex } from "../../../shared/Enums/ESex"
import { useState } from "react"
import type { IUserRequest } from "../interfaces/IUserRequest"
import { EStatus } from "../../../shared/Enums/EStatus"
import UserViewModel from "../model/user.model"


export const Register = () => {
    const [user, setUser] = useState<IUserRequest>({
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


    const { handleRegister } = UserViewModel();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleRegister(user);
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
                    Cadastro Usuario
                    <Link className="btn btn-dark" to="/usuarios">Cancelar</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
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
                        <button className="btn btn-primary mt-3">Cadastrar</button>

                    </form>
                </div>
            </div>
        </>
    )
}