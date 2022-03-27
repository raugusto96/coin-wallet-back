import style from '../../App.module.scss';

import React from 'react'

const Sidebar = () => {
  return (
    <nav className={ `${style.side_bar_container}` }>
      <div className={ `${style.menu_container}` }>
        <section className={ `${style.section}` }>
          <a href="#overview">Visão Geral</a>
          <a href="#getting-started">Começando</a>
          <a href="#base-url">URL Base</a>
          <a href="#authetication">Autenticação</a>
        </section>
        <section className={ `${style.section_indent}` }>
          <a href="#user-endpoints"><h4>Endpoints do Usuário</h4></a>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.post_span}` }>POST</span>
            <a href="#register">Registrar</a>
          </div>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.post_span}` }>POST</span>
            <a href="#login">Login</a>
          </div>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.get_span}` }>GET</span>
            <a href="#get-user">Requisitar usuário</a>
          </div>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.del_span}` }>DEL</span>
            <a href="#delete-user">Deletar usuário</a>
          </div>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.post_span}` }>POST</span>
            <a href="#reset-password">Resetar senha</a>
          </div>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.put_span}` }>PUT</span>
            <a href="#edit-password">Editar senha</a>
          </div>
        </section>
        <section className={ `${style.section_indent}` }>
          <a href="#expenses-endpoints">
            <h4>Endpoints das despesas</h4>
          </a>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.post_span}` }>POST</span>
            <a href="#create-expense">Criar despesa</a>
          </div>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.del_span}` }>DEL</span>
            <a href="#delete-expense">Deletar despesa</a>
          </div>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.put_span}` }>PUT</span>
            <a href="#edit-expense">Editar despesa</a>
          </div>
          <div className={ `${style.method_container}` }>
            <span className={ `${style.get_span}` }>GET</span>
            <a href="#get-expense">Requisitar despesa</a>
          </div>
        </section>
      </div>
    </nav>
  )
}

export default Sidebar