import styles from './page.module.css';

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Paciente requiere atención',
      message: 'Juan Perez necesita revisión de su tratamiento',
      time: '2 horas atrás'
    },
    {
      id: 2,
      type: 'error',
      title: 'Medicamento agotado',
      message: 'Stock bajo de medicamento X',
      time: '5 horas atrás'
    },
    {
      id: 3,
      type: 'info',
      title: 'Nuevo protocolo disponible',
      message: 'Protocolo actualizado para LLA',
      time: '1 día atrás'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Alertas del Sistema</h1>
        <p>Gestiona las notificaciones y alertas importantes</p>
      </div>

      <div className={styles.alertsList}>
        {alerts.map((alert) => (
          <div key={alert.id}
            className={`${styles.alertCard} ${styles[alert.type]}`}>
            <div className={styles.alertIcon}>
              {alert.type === 'warning' && '⚠️'}
              {alert.type === 'error' && '🚨'}
              {alert.type === 'info' && 'ℹ️'}
            </div>
            <div className={styles.alertContent}>
              <h3>{alert.title}</h3>
              <p>{alert.message}</p>
              <span className={styles.alertTime}>{alert.time}</span>
            </div>
            <button className={styles.alertAction}>
              Ver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
