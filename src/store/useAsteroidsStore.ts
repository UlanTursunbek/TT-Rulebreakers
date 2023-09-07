/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios'
import dayjs from 'dayjs'
import { create } from 'zustand'

import {
  Asteroid,
  ResponseData,
  ResponseDataDetails,
} from './types'

const NASA_API_URL = 'https://api.nasa.gov/neo/rest/v1/feed'
const ASTEROID_DETAIL_URL =
  'https://api.nasa.gov/neo/rest/v1/neo/'

interface AsteroidStore {
  isLoading: boolean
  nextLink: string
  asteroids: Asteroid[]
  distanceIn: 'kilometer' | 'lunar'
  cart: string[]
  asteroidDetails: ResponseDataDetails
  fetchMoreAsteroids: () => Promise<void>
  setDistanceIn: (distance: 'kilometer' | 'lunar') => void
  sendToCart: (id: string) => void
  fetchAsteroidDetails: (id: string) => Promise<void>
}

export const useAsteroidStore = create<AsteroidStore>(
  (set, get) => ({
    isLoading: false,
    asteroids: [],
    nextLink: '',
    distanceIn: 'kilometer',
    cart: [],
    asteroidDetails: { name: '' },
    sendToCart: (id) =>
      set({
        cart: get().cart.includes(id)
          ? get().cart.filter((it) => it !== id)
          : [...get().cart, id],
      }),
    fetchAsteroidDetails: async (id) => {
      try {
        set({ isLoading: true })
        const response =
          await axios.get<ResponseDataDetails>(
            `${ASTEROID_DETAIL_URL}${id}`,
            {
              params: {
                api_key: import.meta.env.VITE_NASA_API_KEY,
              },
            },
          )

        set({
          asteroidDetails: { name: response.data.name },
        })
      } catch (error) {
        alert(error)
      } finally {
        set({ isLoading: false })
      }
    },
    setDistanceIn: (distance) =>
      set({ distanceIn: distance }),

    fetchMoreAsteroids: async () => {
      try {
        set({ isLoading: true })

        const date = dayjs()

        const response = get().nextLink
          ? await axios.get<ResponseData>(get().nextLink)
          : await axios.get<ResponseData>(NASA_API_URL, {
              params: {
                start_date: date.format('YYYY-MM-DD'),
                end_date: date
                  .add(1, 'day')
                  .format('YYYY-MM-DD'),
                api_key: import.meta.env.VITE_NASA_API_KEY,
              },
            })

        const result = Object.values(
          response.data.near_earth_objects,
        ).flat()

        const normalizedData = result.map((it) => ({
          date: it.close_approach_data[0]
            .close_approach_date_full,
          distance: it.close_approach_data[0].miss_distance,
          hazardous: it.is_potentially_hazardous_asteroid,
          diameter:
            it.estimated_diameter.kilometers
              .estimated_diameter_max,
          name: it.name,
          id: it.id,
        }))

        set((state) => ({
          ...state,
          asteroids: [...normalizedData],
          nextLink: response.data.links.next,
        }))
      } catch (error) {
        alert(error)
      } finally {
        set({ isLoading: false })
      }
    },
  }),
)
