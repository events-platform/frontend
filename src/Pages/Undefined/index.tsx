import styles from "./Undefined.module.sass";
export const Undefined = () => {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.flexBlock}></div>
        <div>
          <h1 className={styles.error}>
            404
          </h1>
          <p className={styles.text}>Упс, тут ничего нет</p>
        </div>
      </div>
    </>
  );
};
