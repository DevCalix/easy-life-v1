import React from 'react';

const CheckboxInput = ({ label, id, value = false, onChange,checked, errors = {}, required = false }) => {
    return (
        <div className="form-check mb-3">
            <input
                type="checkbox"
                id={id}
                className={`form-check-input ${errors[id] ? 'is-invalid' : ''}`}
                // checked={value || false}
                checked={checked || false}
                onChange={(e) => onChange(e.target.checked)}
                required={required}
            />
            <label htmlFor={id} className="form-check-label">
                {label}
            </label>
            {errors[id] && <div className="invalid-feedback">{errors[id]}</div>}
        </div>
    );
};

export default CheckboxInput;
