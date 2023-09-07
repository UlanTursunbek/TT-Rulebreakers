import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Asteroid as IAsteroid } from 'store/types'

import Arrow from '../../assets/arrow.svg'
import Asteroid from '../../assets/asteroid.png'

import { OrderButton } from './OrderButton'

import styles from './index.module.scss'

interface AsteroidCardProps
  extends Omit<IAsteroid, 'distance'> {
  size: 'small' | 'regular'
  sendToCart: (id: string) => void
  itemInCart: boolean
  distance: string
}

export const AsteroidCard = ({
  date,
  distance,
  hazardous,
  diameter,
  name,
  id,
  size = 'regular',
  itemInCart,
  sendToCart,
}: AsteroidCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.date}>{date}</div>
      <div className={styles.info}>
        <div className={styles.distance}>
          <span>{distance}</span>
          <img src={Arrow} alt="arrow line" />
        </div>
        <img
          src={Asteroid}
          alt="asteroid"
          className={clsx(styles.asteroid, {
            [styles.asteroidsmall]: size === 'small',
          })}
        />

        <div className={styles.sizeInfo}>
          <div>
            <Link
              to={`/about/${id}`}
              className={styles.link}
            >
              {name}
            </Link>
          </div>
          <span className={styles.diameter}>
            ø {diameter} m
          </span>
        </div>
      </div>
      <div className={styles.action}>
        <OrderButton
          inCart={itemInCart}
          onClick={() => sendToCart(id)}
        />

        {hazardous && (
          <span className={styles.danger}>⚠️ Опасен</span>
        )}
      </div>
    </div>
  )
}
