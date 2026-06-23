import { Link } from "react-router"
import { InputComponent } from "../../../shared/components/Input/InputComponent"
import InputSelectComponent, { type ISelectList } from "../../../shared/components/InputSelect/InputSelectComponent"
import { useState } from "react"
import type { IAppointment } from "../interface/IAppointment"
import UserViewModel from "../../user/model/user.model"
import type { IUser } from "../../user/interfaces/IUser"
import { AppointmentViewModel } from "../model/appointment.model"


const DEFINE_STATUS_LIST: ISelectList[] = [
    {
        text: "Desativado",
        value: 0
    },
    {
        text: "Ativado",
        value: 1
    },
]

export const AppointmentRegister = () => {
    const [appointment, setAppointment] = useState<IAppointment>({
        appointmentDate: new Date(),
        status: 0,
        description: "",
        userId: 0
    });

    const { user } = UserViewModel();
    const { RegisterAppointment } = AppointmentViewModel();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await RegisterAppointment(appointment);
    };


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setAppointment(prev => ({
            ...prev,
            [name]: name === "userId" || name === "status"
                ? Number(value)
                : value
        }));

    };


    return (
        <>
            <div className="card">
                <div className="card-header p-3 d-flex justify-content-between align-items-center">
                    Cadastro Agendamento
                    <Link className="btn btn-dark" to="/usuarios">Cancelar</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <InputComponent
                            label="Data do agendamento"
                            name="appointmentDate"
                            id="appointmentDate"
                            type="datetime-local"
                            value={appointment?.appointmentDate}
                            onChange={handleChange}
                        />
                        <InputComponent
                            label="Descrição"
                            name="description"
                            id="description"
                            type="text"
                            value={appointment?.description}
                            onChange={handleChange}
                        />

                        <InputSelectComponent
                            listSelect={DEFINE_STATUS_LIST}
                            label="Status"
                            id="status"
                            name="status"
                            value={appointment?.status}
                            onChange={handleChange}
                        />

                        <InputSelectComponent
                            listSelect={
                                user ? user.map((item: IUser) => ({
                                    text: item.name,
                                    value: item.id
                                }))
                                    : []
                            }
                            label="Usuario"
                            id="userId"
                            name="userId"
                            value={appointment?.userId}
                            selectDefault={true}
                            onChange={handleChange}
                            placeholder="Selecione um usuario"
                        />
                        <button className="btn btn-primary mt-3">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}