import {ChangeEvent} from "react";
import selectInputStyle from './select-input.module.sass';

interface Option {
    value: number,
    label: string
}

interface selectInputProps {
    value: number;
    onchange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
}

const SelectInput = ({value, onchange, options}: selectInputProps) => {
    return (
        <div className={selectInputStyle["select-input"]}>
            <select
                className={selectInputStyle["select-input--select"]}
                value={value}
                onChange={onchange}
            >
                {options.map((option) =>
                    <option value={option.value} key={option.value}> {option.label} </option>
                )}
            </select>
        </div>
    )
}

export default SelectInput;