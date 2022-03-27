import React from 'react'
import style from '../../App.module.scss';
import { BsGithub } from 'react-icons/bs';

const Header = () => {
  return (
    <header className={ `${style.header_container}` }>
      <h2>Coin Wallet API</h2>
      <div>
        <BsGithub />
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/raugusto96/coin-wallet-back">
          Github
        </a>
      </div>
    </header>
  )
}

export default Header