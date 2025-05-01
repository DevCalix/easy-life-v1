import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.css'; // Importer les styles de Tom Select

export default forwardRef(function SelectInput(
    { options = [], className = '', isFocused = false, onChange, value = [], ...props },
    ref
) {
    const selectRef = useRef(null); // Référence pour le <select>
    const tomSelectRef = useRef(null); // Référence pour l'instance Tom Select

    // Permet à la référence de se concentrer sur le champ
    useImperativeHandle(ref, () => ({
        focus: () => selectRef.current?.focus(),
    }));

    // Focus automatique lorsque `isFocused` est vrai
    useEffect(() => {
        if (isFocused && selectRef.current) {
            selectRef.current.focus();
        }
    }, [isFocused]);

    // Initialisation et nettoyage de Tom Select
    useEffect(() => {
        // Détruire l'ancienne instance de Tom Select si elle existe
        if (tomSelectRef.current) {
            tomSelectRef.current.destroy();
        }

        // Initialiser Tom Select
        tomSelectRef.current = new TomSelect(selectRef.current, {
            plugins: ['remove_button'], // Plugin pour ajouter un bouton de suppression
            items: value, // Valeurs initiales sélectionnées
            onChange: onChange, // Gestion des changements
            options: options.map((option) => ({
                value: option.value,
                text: option.label,
            })), // Mapper les options au format attendu
        });

        return () => {
            // Nettoyer l'instance lors du démontage
            if (tomSelectRef.current) {
                tomSelectRef.current.destroy();
            }
        };
    }, [options, value, onChange]);

    return (
        <select
            {...props}
            className={`form-control ${className}`}
            ref={selectRef}
            multiple // Activer la sélection multiple pour Tom Select
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});
