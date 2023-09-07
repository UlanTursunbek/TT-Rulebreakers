import { useAsteroidStore } from 'store/useAsteroidsStore'

import { Layout } from 'components/Layout'

export const CartPage = () => {
  const { cart } = useAsteroidStore((state) => state)
  return (
    <Layout>
      {cart.length > 0 ? (
        <>
          Астероиды в Корзине
          {cart.map((it) => (
            <div key={it}>{it}</div>
          ))}
        </>
      ) : (
        <div>Астероидов нет</div>
      )}
    </Layout>
  )
}
