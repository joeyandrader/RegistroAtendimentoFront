import { useEffect, useState } from "react";
import { EStatus } from "../../../shared/Enums/EStatus";
import type { IDataColumn } from "../../../shared/interfaces/IDataColumn";
import type { IAppointment } from "../interface/IAppointment";
import { AppointmentService } from "../service/appointment.service"
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


const DEFINE_COLUMNS: IDataColumn[] = [
    {
        key: "id",
        label: "#"
    },
    {
        key: "appointmentDate",
        label: "Data do agendamento",
        htmlCustom(item: IAppointment) {
            return new Date(item.appointmentDate).toLocaleDateString('pt-BR');
        }
    },
    {
        key: "description",
        label: "Descrição"
    },
    {
        key: "status",
        label: "Status",
        htmlCustom(item: IAppointment) {
            return EStatus[item.status];
        }
    }
]

export const AppointmentViewModel = () => {
    const {
        GetAllAppointment,
        Regiter,
        Delete,
        GetAppointmentById,
        UpdateAppointment
    } = AppointmentService("appointment");

    const [appointment, setAppointment] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const navigator = useNavigate();

    useEffect(() => {
        const GetAllAsync = async () => {
            try {
                setLoading(true);
                var result = await GetAllAppointment("list");
                if (result) {
                    setLoading(false)
                    setAppointment(result)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        GetAllAsync();
    }, []);

    const handleEdit = (e: any) => {
        navigator(`edit/${e.id}`)
    }

    const handleDelete = (e: IAppointment) => {
        Swal.fire({
            title: "Atenção: Excluir agendamento!",
            text: `Tem certeza que deseja excluir o agendamento de ${e.user?.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Deletar"
        }).then(async (res) => {
            if (res.isConfirmed) {
                var result = await Delete(e.id!);
                if (result) {
                    Swal.fire("Deletado com sucesso!", "", "success")
                    setAppointment((prev: IAppointment[]) =>
                        prev.filter(item => item.id !== e.id)
                    );
                }
            }
            else if (res.isDismissed) Swal.fire("Ação cancelada", "", "info");
        });
    }

    const RegisterAppointment = async (request: IAppointment) => {
        try {
            var result = await Regiter(request);
            if (result) {
                Swal.fire({
                    title: "Agendamento cadastrado com sucesso",
                    icon: "success",
                })
                    .then(() => {
                        navigator("/agendamentos");
                    })
            }
        } catch (error: any) {
            Swal.fire({
                title: "Error interno!",
                text: `${error.response.data.message}`,
                icon: "error"
            })
        }
    }


    const GetAppointmentId = async (id: number) => {
        try {
            var result = await GetAppointmentById(id);
            if (result)
                return result;
            else
                Swal.fire({
                    title: "Dados não encontrado!",
                    icon: "error"
                });
        } catch (error: any) {
            Swal.fire({
                title: "Error interno!",
                text: `${error.response.data.message}`,
                icon: "error"
            })
        }
    }

    const Update = async (request: IAppointment) => {
        try {
            console.log("chegou, ", request)
            var result = await UpdateAppointment(request)
            if (result) {
                Swal.fire({
                    title: "Agendamento atualizado com sucesso",
                    icon: "success",
                })
                    .then(() => {
                        navigator("/agendamentos");
                    })
            } else {
                Swal.fire({
                    title: "Houve algum problema ao atualizar agendamento!",
                    icon: "error",
                })
                    .then(() => {
                        navigator("/agendamentos");
                    })
            }
        } catch (error: any) {
            Swal.fire({
                title: "Error ao atualizar agendamento!",
                text: `${error.response.data.message}`,
                icon: "error"
            })
        }
    }

    return {
        DEFINE_COLUMNS,
        appointment,
        loading,
        handleEdit,
        handleDelete,
        RegisterAppointment,
        GetAppointmentId,
        Update
    }
}