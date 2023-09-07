import { Link } from 'react-router-dom'

import imageLogo from '../../assets/logo.svg'

import styles from './index.module.scss'

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img src={imageLogo} alt="logo" />
      </Link>
      <p className={styles.text}>
        ООО “Команда им. Б. Уиллиса”. Взрываем астероиды с
        1998 года.
      </p>
    </div>
  )
}
