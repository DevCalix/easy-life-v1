import React from 'react';

const DatalistInput = ({ id, name, options, value, onChange, placeholder }) => {
    return (
        <div>
            <input
                list={`${id}-list`}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
                placeholder={placeholder}
            />
            <datalist id={`${id}-list`}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </datalist>
        </div>
    );
};

export default DatalistInput;
