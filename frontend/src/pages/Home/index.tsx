import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'
import Button from '../../shared/components/Button'

type HomeProps = React.HTMLAttributes<HTMLDivElement> & {}

const Home: React.FC<HomeProps> = ({ className }) => {
  const homeStyles = cn(
    styles.home,
    className
  )

  return (
    <div className={homeStyles}>
      <h1>тайный санта</h1>
      <div className='button-block'>
        <Button className='mr-70' label='Войти' />
        <Button label='Создать' />
      </div>
    </div>
  )
}

export default Home
