import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAsteroidStore } from 'store/useAsteroidsStore'

import { Layout } from 'components/Layout'

import styles from './AbouPage.module.scss'

export const AboutPage = () => {
  const { asteroidDetails, fetchAsteroidDetails } =
    useAsteroidStore()

  const params = useParams()

  useEffect(() => {
    if (params.id) {
      void fetchAsteroidDetails(params.id)
    }
  }, [])

  return (
    <Layout>
      <div className={styles.wrapper}>
        Name: {asteroidDetails.name}
      </div>
    </Layout>
  )
}
