import { FC } from "react";
import styles from "./Form.module.sass";

interface FormInterface {
  url?: string
}

export const Form: FC<FormInterface> = ({ url }) => {
  return (
    <>
      {
        url?.indexOf("google") !== -1
          ? <iframe src={url} width="100%" height={window.innerHeight} frameBorder={0} marginHeight={0} marginWidth={0}>Загрузка…</iframe>
          : <div className={styles.Form}>
            <script src="https://yastatic.net/s3/frontend/forms/_/embed.js" />
            <iframe src={url} frameBorder="0" name="ya-form-647de297068ff00b97c7a0c4" width="290px" height={window.innerHeight}/>
          </div>
      }
    </>
  );
};

// "https://forms.yandex.ru/cloud/647de297068ff00b97c7a0c4/?iframe=1"
// "https://docs.google.com/forms/d/e/1FAIpQLSdS2-aIGbICJu7tfL4t-3fEgBvXpewcODwqs9J0nAGRStetTg/viewform?embedded=true"
