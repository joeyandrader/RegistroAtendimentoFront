import { Link } from "react-router";
import { DataTable } from "../../../shared/components/DataTable/DataTableComponent";
import UserViewModel from "../model/user.model";
import { EStatus } from "../../../shared/Enums/EStatus";

const Usuario = () => {
    const {
        DEFINE_COLUMNS,
        loading,
        user,
        handleEdit,
        handleDelete
    } = UserViewModel();

    return (
        <div className="card">
            <div className="card-header p-3 d-flex justify-content-between align-items-center">
                Usuarios
                <Link className="btn btn-primary" to="cadastro">Cadastrar</Link>
            </div>
            <div className="card-body">
                <DataTable
                    data={user}
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

                    searchableFields={[
                        { field: "name" },
                        { field: "cpf" },
                        {
                            field: "status",
                            getValue: (item) => EStatus[item.status]
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default Usuario;