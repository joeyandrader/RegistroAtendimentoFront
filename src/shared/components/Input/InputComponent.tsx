import { useMask } from "@react-input/mask";
import { useState } from "react";

interface InputBaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value: any | Date;
    onChange: (e: any) => void;
    errors?: string;
    maskType?: 'cpf' | 'cep' | 'date'
}

export const InputComponent: React.FC<InputBaseProps> = ({
    label,
    placeholder,
    maskType,
    type = "text",
    value,
    id,
    onChange,
    ...props
}
) => {
    const getMask = (type: string, value?: string) => {
        switch (type) {
            case 'cpf':
                placeholder = '000.000.000-00';
                return '___.___.___-__'; // Máscara para CPF
            case 'cep':
                placeholder = '00000-000';
                return '_____-___'; // Máscara para CEP
            case 'date':
                if (value) {
                    const [ano, mes, dia] = value.split('-');
                    return `${dia}/${mes}/${ano}`;
                }
                return '';
            default:
                return '';
        }
    }

    const mask = getMask(maskType!);
    const inputRef = useMask({
        mask,
        replacement: { _: /\d/ }
    });

    return (
        <>
            <div className="mb-3">
                <label htmlFor={id} className="form-label">{label}</label>
                <input
                    className="form-control"
                    ref={maskType && inputRef}
                    type={type}
                    value={value}
                    id={id}
                    onChange={onChange}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        </>
    )
}