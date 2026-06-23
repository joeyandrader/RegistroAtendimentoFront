import type { JSX } from "react/jsx-runtime";

export interface IDataColumn {
    key: string;
    label: string;
    htmlCustom?: (value: any, id?: number) => JSX.Element | React.ReactNode;
    sortKey?: string;
}