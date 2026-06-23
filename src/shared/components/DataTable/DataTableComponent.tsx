import type React from "react"
import type { IDataColumn } from "../../interfaces/IDataColumn";
import SpinnerLoading from "../Spiner/SpinnerLoading";
import { useState } from "react";


interface DataTableProps {
    data?: any[] | null;
    columns: IDataColumn[];
    actions?: {
        type?: "primary" | "success" | "danger" | "info" | "warning";
        customClass?: string;
        label: React.ReactNode;
        onClick: (row: any) => void;
    }[];
    loading?: boolean;
    EmptyMessage?: string;
    rowEmptyText?: string;
    searchableFields?: {
        field: string;
        getValue?: (item: any) => string;
    }[];

}

/**
 * Data Table personalizada
 * @OBS A data table foi criada usando divs para melhor aprimoração dos estilos e deixar da melhor forma possivel.
 * @OBS A data table pode nao está 100% funcional. qualquer problema ou erro pode ser melhorado ou ajustado.
 * @
 * @param data[] Array de dados para popular tabela.
 * @param  columns[] colunas que a tabela irá possuir.
 * @param actions[] ações para tabela como editar, excluir etc.
 * @param loading loading ao carregar dados da tabela.
 * @param EmptyMessage mensagem padrao caso nao retornar nada da tabela.
 * @returns
 */
export const DataTable: React.FC<DataTableProps> = ({
    data = [],
    columns = [],
    actions = [],
    loading,
    EmptyMessage = "😢 Nenhum dado foi encontrado!",
    searchableFields,
    rowEmptyText = "------"
}) => {

    const [search, setSearch] = useState("");

    const filteredData = data?.filter((item) => {
        if (!search) return true;
        if (!searchableFields?.length) return true;

        return searchableFields.some(({ field, getValue }) => {
            const value = getValue
                ? getValue(item)
                : item[field];

            if (!value) return false;

            return value
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    });

    return (
        <>

            <div className="d-flex justify-content-end">
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        {columns.map((columns) => (
                            <th scope="col" key={columns.key}>{columns.label}</th>
                        ))}
                        {actions.length > 0 && <th className="table-header-cell">Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {loading ?
                        (
                            <>
                                <tr>
                                    <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                                        <p style={{ textAlign: "center" }}>
                                            <SpinnerLoading />
                                            <p>Buscando dados da tabela!</p>
                                        </p>
                                    </td>
                                </tr>
                            </>
                        )
                        :
                        (
                            <>
                                {(filteredData && filteredData.length > 0) ? (
                                    <>
                                        {filteredData.map((item, index) => (
                                            <tr key={index}>
                                                {columns.map((column) => (
                                                    <td key={column.key}>
                                                        {column.htmlCustom ?
                                                            column.htmlCustom(item, item.id)
                                                                ? column.htmlCustom(item, item.id) : rowEmptyText
                                                            : item[column.key] ? item[column.key] : rowEmptyText}
                                                    </td>
                                                ))}

                                                {/* Actions */}
                                                {actions.length > 0 && (
                                                    <td>
                                                        {actions.map(
                                                            (
                                                                { type = "primary", customClass, label, onClick },
                                                                i
                                                            ) => (
                                                                <div key={i} className="btn-group" role="group" aria-label="Basic example">
                                                                    <button
                                                                        onClick={() => onClick(item)}
                                                                        className={`btn btn-sm btn-${type} mx-1  d-flex justify-content-center align-items-center ${customClass || ""
                                                                            }`}
                                                                        style={{ width: 30 }}
                                                                    >
                                                                        {label}
                                                                    </button>
                                                                </div>

                                                            )
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                                            <p style={{ textAlign: "center" }}>{EmptyMessage}</p>
                                        </td>
                                    </tr>
                                )}
                            </>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}