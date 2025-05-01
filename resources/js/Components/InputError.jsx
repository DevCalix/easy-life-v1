export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={`text-danger small ${className}`}
        >
            {message}
        </p>
    ) : null;
}
