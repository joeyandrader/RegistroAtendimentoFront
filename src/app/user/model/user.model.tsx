import { useEffect, useState } from "react";
import type { IDataColumn } from "../../../shared/interfaces/IDataColumn";
import { UserService } from "../service/user.service";
import type { IUser } from "../interfaces/IUser";
import { EStatus } from "../../../shared/Enums/EStatus";
import { ESex } from "../../../shared/Enums/ESex";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import type { IUserRequest } from "../interfaces/IUserRequest";
import { formatCPF } from "../../../shared/utils/Utils";


const DEFINE_COLUMNS: IDataColumn[] = [
    {
        key: "id",
        label: "#"
    },
    {
        key: "name",
        label: "Nome"
    },
    {
        key: "cpf",
        label: "CPF",
        htmlCustom(item: IUser) {
            return formatCPF(item.cpf);
        }
    },
    {
        key: "dateOfBirth",
        label: "Data de Nascimento",
        htmlCustom(item: IUser) {
            return new Date(item.dateOfBirth).toLocaleDateString('pt-BR');
        }
    },
    {
        key: "status",
        label: "Status",
        htmlCustom(item: IUser) {
            return EStatus[item.status];
        }
    },
    {
        key: "sex",
        label: "Sexo",
        htmlCustom(item: IUser) {
            return ESex[item.sex];
        }
    }
]

const UserViewModel = () => {
    const {
        GetAllUser,
        RegisterUser,
        DeleteUser,
        GetUserById,
        EditUser
    } = UserService("user");
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigator = useNavigate();

    useEffect(() => {
        const getAllUser = async () => {
            try {
                setLoading(true);
                var result = await GetAllUser("list");
                if (result) {
                    setLoading(false);
                    setUser(result);
                } else
                    setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log("Error: ", error)
            }
        }

        getAllUser();
    }, []);


    const handleDelete = (value: IUser) => {
        Swal.fire({
            title: "Atenção: Excluir usuario!",
            text: `Tem certeza que deseja excluir o usuario ${value.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Deletar"
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    var result = await DeleteUser(value.id!);
                    if (result) {
                        Swal.fire("Deletado com sucesso!", "", "success")
                        setUser((prev: IUser[]) =>
                            prev.filter(item => item.id !== value.id)
                        );
                    }
                } catch (error: any) {
                    console.log(error.response.data.message)
                    Swal.fire({
                        title: "Error Inesperado!",
                        icon: "error",
                        html: `
                            <div class="card">
                            <div class="card-body text-center" style="background: #ddd">
                                ${error.response.data.message}
                            </div>
                            </div>
                        `,
                        text: `${error.response.data.message}`
                    })
                }
            }
            else if (res.isDismissed) Swal.fire("Ação cancelada", "", "info");
        });
    }

    const handleEdit = async (value: IUser) => {
        navigator(`edit/${value.id!}`)
    }

    const handleRegister = async (request: IUserRequest) => {
        try {
            request.address!.zipCode = request.address?.zipCode.replace(/\D/g, "") ?? "";
            request.cpf = request.cpf.replace(/\D/g, "");

            const newRequest: IUserRequest = {
                ...request,
                cpf: request.cpf.replace(/\D/g, ""),
                address: {
                    ...request.address!,
                    zipCode: request.address?.zipCode.replace(/\D/g, "") ?? ""
                }
            }

            var result = await RegisterUser(newRequest);
            if (result) {
                Swal.fire({
                    title: "Cadastrado com sucesso",
                    theme: 'auto',
                    icon: "success",
                })
                    .then(() => {
                        navigator("/usuarios");
                    })
            }
        } catch (error: any) {
            Swal.fire({
                title: "Error ao cadastrar usuario!",
                text: `${error.response.data.message}`,
                theme: 'auto',
                icon: "error",
            })
        }
    }

    const GetUser = async (id: number) => {
        try {
            var result = await GetUserById(id);
            return result;
        } catch (error) {
            Swal.fire({
                title: "Error ao carregar dados!",
                icon: "error"
            })
        }
    }

    const UpdateUser = async (request: IUserRequest) => {
        console.log(request);
        try {
            var result = await EditUser(request);
            if (result) {
                Swal.fire({
                    title: "Usuario atualizado com sucesso",
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
        DEFINE_COLUMNS,
        user,
        loading,
        handleDelete,
        handleEdit,
        handleRegister,
        GetUser,
        UpdateUser
    }
}

export default UserViewModel;