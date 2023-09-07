import { ReactNode } from 'react'

import { Logo } from 'components/Logo'

import styles from './index.module.scss'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.top}>
        <Logo />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
