import { Link } from "react-router"
import { DataTable } from "../../../shared/components/DataTable/DataTableComponent"
import { AppointmentViewModel } from "../model/appointment.model"


export const Appointment = () => {

    const { DEFINE_COLUMNS, appointment, loading, handleEdit, handleDelete } = AppointmentViewModel();

    return (
        <div className="card">
            <div className="card-header p-3 d-flex justify-content-between align-items-center">
                Agendamentos
                <Link className="btn btn-primary" to="cadastro">Cadastrar</Link>
            </div>
            <div className="card-body">

                {/* O modelo de search é simples, porem poderia usar requisições a API para melhor search. apenas simplifiquei. */}
                <DataTable
                    data={appointment}
                    columns={DEFINE_COLUMNS}
                    loading={loading}
                    actions={[
                        {
                            type: "primary",
                            label: "✏️",
                            onClick: (row) => handleEdit(row)
                        },
                        {
                            type: "danger",
                            label: "🗑️",
                            onClick: (row) => handleDelete(row)
                        }
                    ]}

                />
            </div>
        </div>
    )
}