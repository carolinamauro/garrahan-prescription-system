import styles from './InfoItem.module.css';

export default function InfoItem({ label, value }) {
    return (
        <div className={styles.infoItem}>
            <span className={styles.label}>{label}:</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
}
