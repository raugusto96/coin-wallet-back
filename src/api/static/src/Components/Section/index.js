import style from '../../App.module.scss';
import propTypes from 'prop-types';

import React from 'react'

const Section = ({ id, sectionSubtitle, children }) => {
  return (
    <section className={ `${style.main_content_container}` }>
      <h2 id={ id }>{ sectionSubtitle }</h2>
      { children }
    </section>
  )
}

Section.propTypes = {
  id: propTypes.string,
  sectionSubtitle: propTypes.string,
  children: propTypes.node,
}.isRequired;

export default Section;