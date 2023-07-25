import styles from "./Form.module.sass";

export const Form = () => {
  return (
    <>
      {
      // eslint-disable-next-line no-constant-condition
        null
          ? <div className={styles.Form}>
            <script src="https://yastatic.net/s3/frontend/forms/_/embed.js" />
            <iframe src="https://forms.yandex.ru/cloud/647de297068ff00b97c7a0c4/?iframe=1" frameBorder="0" name="ya-form-647de297068ff00b97c7a0c4" width="290px" height={window.innerHeight}/>
          </div>
          : <>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdS2-aIGbICJu7tfL4t-3fEgBvXpewcODwqs9J0nAGRStetTg/viewform?embedded=true" width="100%" height={window.innerHeight} frameBorder={0} marginHeight={0} marginWidth={0}>Загрузка…</iframe>
          </>}
    </>
  );
};
