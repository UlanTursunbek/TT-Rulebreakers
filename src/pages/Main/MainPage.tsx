import { useEffect, useRef } from 'react'
import { Asteroid } from 'store/types'
import { useAsteroidStore } from 'store/useAsteroidsStore'

import { AsteroidCard } from 'components/AsteroidCard'
import { Cart } from 'components/Cart'
import { Layout } from 'components/Layout'

import imageEarth from '../../assets/planet-earth.jpeg'

import styles from './MainPage.module.scss'

export const MainPage = () => {
  const {
    isLoading,
    asteroids,
    fetchMoreAsteroids,
    distanceIn,
    setDistanceIn,
    cart,
    sendToCart,
  } = useAsteroidStore()

  const observerRef = useRef(null)

  const options = {
    rootMargin: '0px',
    threshold: 1.0,
  }

  useEffect(() => {
    if (!observerRef.current) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        void fetchMoreAsteroids()
      }
    }, options)

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [])

  const getDistance = (distance: Asteroid['distance']) => {
    if (distanceIn === 'lunar') {
      return `${Number(distance.lunar).toFixed(
        2,
      )} лунных орбит`
    }

    return `${Number(distance.kilometers).toFixed(2)} км`
  }

  return (
    <Layout>
      <div className={styles.container}>
        <img
          src={imageEarth}
          alt="earth"
          className={styles.image}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>
            Ближайшие подлёты астероидов
          </h2>

          <div>
            <button
              className={styles.distanceButton}
              onClick={() => setDistanceIn('kilometer')}
            >
              в километрах
            </button>{' '}
            |{' '}
            <button
              className={styles.distanceButton}
              onClick={() => setDistanceIn('lunar')}
            >
              в лунных орбитах
            </button>
          </div>

          <div className={styles.list}>
            {asteroids.map((it) => (
              <AsteroidCard
                key={it.id}
                size="small"
                date={it.date}
                distance={getDistance(it.distance)}
                hazardous={it.hazardous}
                diameter={it.diameter}
                name={it.name}
                id={it.id}
                sendToCart={sendToCart}
                itemInCart={cart.some(
                  (item) => item === it.id,
                )}
              />
            ))}
            {isLoading && <span>Loading...</span>}
          </div>
          <div
            className={styles.observe}
            ref={observerRef}
          ></div>
        </div>
        <div className={styles.cart}>
          <Cart cart={cart} />
        </div>
      </div>
    </Layout>
  )
}
