import React from 'react'
import style from '../../App.module.scss';
import '../../App.scss';

const MethodCard = (
  { cardTitle, cardMethod, codeUrl, id, isGetMethod, objectKeys, objectValues }
  ) => {
  return (
    <section className={ `${style.main_method_container}` }>
      <div className={ `${style.method_container}` }>
        <span className={ `${style.post_span} ${cardMethod}_span` }>{ cardMethod.toUpperCase() }</span>
        <h3 id={ id }>{ cardTitle }</h3>
      </div>
      <pre>
        <div className={ `${style.axios_span_container}` }>
          <span className={ `${style.axios_span}` }>axios</span>
          <span className={ `${style.method_span}` }>{ `.${cardMethod === 'del' ? 'delete' : cardMethod }` }</span>
          <span className={ `${style.paraenthesis_span}` }>(</span>
          <span className={ `${style.url_span}` }>{ `'baseURL/${codeUrl}'` }</span>
          {
            !isGetMethod && (<span>,</span>)
          }
        </div>
        { !isGetMethod && (
        <div className={ `${style.object_container}` }>
          <span className={ `${style.bracket_span}` }>{ '{' }</span>
            <div className={ `${style.data_container}` }>
              { objectKeys.map((key, index) => (
                <div className={ `${style.map_container}` } key={ key }>
                  <span className={ `${style.data_key_container}` }>{ key }</span>
                    :
                    { ' ' }
                    <span className={ `${style.data_value_container}` }>
                    { `"${objectValues[index]}"` },
                  </span>
                </div>
              )) }
            </div>
          <span className={ `${style.bracket_span}` }>{ '}' }</span>
        </div>
        )}
        <div className={ `${style.axios_span_end_container}` }>
          <span className={ `${style.paraenthesis_span}` }>)</span>
          <span className={ `${style.trailling_comma_span}` }>;</span>
        </div>
      </pre>
    </section>
  )
}

export default MethodCard