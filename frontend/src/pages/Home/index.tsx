import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'
import Button from '../../shared/components/Button'
import { Link } from 'react-router-dom'

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
        <Link to='/join'>
          <Button className='mr-70' label='Войти' />
        </Link>

        <Link to='/create'>
          <Button label='Создать' />
        </Link>
      </div>
    </div>
  )
}

export default Home
