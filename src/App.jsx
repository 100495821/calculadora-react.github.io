import React, { useState } from 'react'

const buttons = [
  '7','8','9','÷',
  '4','5','6','×',
  '1','2','3','-',
  '0','.','=','+',
  'AC'
]

function sanitizeExpression(expr) {
  // Reemplaza símbolos visuales y permite sólo caracteres seguros
  const cleaned = expr.replace(/×/g, '*').replace(/÷/g, '/')
  if (!/^[0-9+\-*/.() ]*$/.test(cleaned)) throw new Error('Expresión inválida')
  return cleaned
}

export default function App() {
  const [expr, setExpr] = useState('')
  const [error, setError] = useState(null)

  function handleClick(value) {
    setError(null)
    if (value === 'AC') {
      setExpr('')
      return
    }
    if (value === '=') {
      try {
        const sanitized = sanitizeExpression(expr)
        // eslint-disable-next-line no-new-func
        const result = Function(`return (${sanitized})`)()
        setExpr(String(result))
      } catch (e) {
        setError('Error')
      }
      return
    }
    setExpr(prev => (prev + value))
  }

  return (
    <div className="calculator-root">
      <h1>Calculadora React</h1>
      <div className="calculator">
        <div className="display" data-testid="display">
          {error ? error : (expr || '0')}
        </div>
        <div className="buttons">
          {buttons.map((b) => (
            <button
              key={b}
              className={`btn ${b === 'AC' ? 'btn-ac' : ''} ${b === '=' ? 'btn-eq' : ''}`}
              onClick={() => handleClick(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <p className="footer">Interfaz en español • Operaciones: + − × ÷</p>
    </div>
  )
}
