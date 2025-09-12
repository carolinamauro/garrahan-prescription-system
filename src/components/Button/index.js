import styles from './Button.module.css';

export default function Button({ children, onClick, type = "button", disabled = false }) {
    return (
        <button
            className={`${styles.editButton} ${disabled ? styles.disabled : ''}`}
            type={type}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
