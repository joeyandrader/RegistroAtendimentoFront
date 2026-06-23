import React from 'react'

export interface ISelectList {
    text: string;
    value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    listSelect: ISelectList[];
    selectDefault?: boolean;
    value: any;
    onChange: (e: any) => void;
    label?: string;
    placeholder?: string;
}


const InputSelectComponent: React.FC<SelectProps> = ({
    listSelect,
    selectDefault = false,
    value,
    label,
    id,
    placeholder = "selecione um valor",
    onChange,
    ...props
}) => {
    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <select
                className="form-select"
                value={value}
                onChange={onChange}
                {...props}
            >
                {selectDefault ?? selectDefault ? <option value="">
                    {placeholder}
                </option> : ""}

                {listSelect?.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.text}
                    </option>
                ))}
            </select >
        </>
    );
};

export default InputSelectComponent;
