import styles from './Button.module.css';

export default function Button({ children, onClick, type = "button" }) {
    return (
        <button className={styles.editButton} type={type} onClick={onClick}>
            {children}
        </button>
    );
}
