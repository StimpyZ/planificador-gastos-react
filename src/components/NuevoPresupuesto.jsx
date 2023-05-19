import { useState } from 'react'
import ErrorMessage from './ErrorMessage'

export default function NuevoPresupuesto ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto
}) {
  const [mensaje, setMensaje] = useState('')
  const handlePresupuesto = (e) => {
    e.preventDefault()
    if (!presupuesto || presupuesto < 0) {
      setMensaje('No es un presupuesto valido')
      return
    }
    setMensaje('')
    setIsValidPresupuesto(true)
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form className='formulario' onSubmit={handlePresupuesto}>
        <div className='campo'>
          <label>Definir presupuesto</label>
          <input
            className='nuevo-presupuesto'
            type='number'
            placeholder='$700'
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type='submit' value='Añadir' />
        {mensaje && <ErrorMessage tipo='error'>{mensaje}</ErrorMessage>}
      </form>
    </div>
  )
}
