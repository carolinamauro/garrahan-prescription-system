import styles from './InfoPatient.module.css';
import InfoItem from '../InfoItem';
import Button from '../Button';

export default function InfoPatient({ id }) {
    return (
        <div className={styles.patientInfo}>
            <div className={styles.infoCard}>
                <div className={styles.infoGrid}>
                    <InfoItem label="Edad" value="10 años" />
                    <InfoItem label="Peso" value="-" />
                    <InfoItem label="Superficie corporal" value="-" />
                    <InfoItem label="Obra social" value="-" />
                    <InfoItem label="Historia clínica" value={id} />
                    <Button>Ver más / Editar</Button>
                </div>
            </div>
        </div>
    )
}
