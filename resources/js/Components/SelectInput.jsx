import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function SelectInput(
    { options = [], className = '', isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    // Permet à la référence de se concentrer sur le champ
    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    // Focus automatique lorsque `isFocused` est vrai
    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={`form-control ${className}`}
            ref={localRef}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});
