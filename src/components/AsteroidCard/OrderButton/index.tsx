import styles from './index.module.scss'

interface OrderButtonProps {
  inCart: boolean
  onClick: () => void
}

export const OrderButton = ({
  inCart,
  onClick,
}: OrderButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
    >
      {inCart ? 'В Корзине' : 'Заказать'}
    </button>
  )
}
