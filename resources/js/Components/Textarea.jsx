import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextArea(
    { className = '', isFocused = false, rows = 4, ...props },
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
        <textarea
            {...props}
            className={`form-control ${className}`}
            rows={rows}  // Définit le nombre de lignes visibles dans le textarea
            ref={localRef}
        />
    );
});
