import { Link } from 'react-router-dom'

import styles from './index.module.css'
interface CartProps {
  cart: string[]
}
export const Cart = ({ cart }: CartProps) => {
  return (
    <div className={styles.cart}>
      <div className={styles.text}>
        <p className={styles.title}>Корзина</p>
        <p className={styles.info}>
          {cart.length} астероидов
        </p>
      </div>
      <button className={styles.button}>
        <Link to="/cart">Отправить</Link>
      </button>
    </div>
  )
}
