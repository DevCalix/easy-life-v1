import React, { forwardRef } from 'react';

const FileInput = forwardRef(({ className = '', onChange, error, ...props }, ref) => {
    return (
        <div>
            <input
                {...props}
                type="file"
                className={`form-control ${className} ${error ? 'is-invalid' : ''}`}
                ref={ref}
                onChange={onChange}

            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

export default FileInput;
