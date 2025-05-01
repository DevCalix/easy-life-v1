import React from 'react';

const TextInput = ({
    id,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    readOnly = false,
    className = '',
    error,
}) => {
    return (
        <div>
            <input
                id={id}
                type={type}
                name={name}
                value={value || ''} // Assurez-vous que la valeur n'est jamais null
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                className={`form-control ${className} ${error ? 'is-invalid' : ''}`} // Ajoute une classe pour les erreurs
            />
            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export default TextInput;
