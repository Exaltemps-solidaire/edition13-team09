import styles from "./page.module.css";

// Écran 1 du prototype retenu (passation/prototype/index.html) : « Vue de la situation ».
// Données en dur (Itération 1) — la navigation vers l'écran « Rapport » arrive en Itération 2.
export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.labelService}>Intervention en cours</div>
          <h1>Famille Martin</h1>
          <div className={styles.subtitle}>Mesure AEMO · depuis le 14 mars 2025</div>
        </header>

        <div className={styles.relationsArea}>
          <div className={styles.areaLabel}>Acteurs de la situation</div>
          <div className={styles.relationsDiagram}>
            <div className={styles.actorBubble}>
              Enfant
              <br />
              <span className={styles.actorMeta}>Léa, 9 ans</span>
            </div>
            <div className={styles.actorBubble}>
              Juge
              <br />
              <span className={styles.actorMeta}>Mme Perrin</span>
            </div>
            <div className={`${styles.actorBubble} ${styles.central}`}>
              Assistant social
              <br />
              <span className={styles.actorMeta}>Moi</span>
            </div>
          </div>
          <div className={styles.parentRow}>
            <span>→ Parent · M. Martin</span>
          </div>
        </div>

        <div className={styles.sectionTitle}>Que faire maintenant ?</div>
        <div className={styles.actionList}>
          <div className={styles.actionItem}>
            <span className={styles.actionItemText}>Capturer ce que j&apos;entends</span>
            <span className={styles.actionItemArrow}>›</span>
          </div>
          <div className={styles.actionItem}>
            <span className={styles.actionItemText}>Rédiger le rapport d&apos;intervention</span>
            <span className={styles.actionItemArrow}>›</span>
          </div>
          <div className={styles.actionItem}>
            <span className={styles.actionItemText}>Envoyer au magistrat</span>
            <span className={styles.actionItemArrow}>›</span>
          </div>
        </div>

        <nav className={styles.navBar}>
          <button type="button" className="active">Situation</button>
          <button type="button">Rapport</button>
        </nav>
      </div>
    </div>
  );
}
