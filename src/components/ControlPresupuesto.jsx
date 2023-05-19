import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function ControlPresupuesto ({
  gastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
  setGastos
}) {
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [poecentaje, setPoecentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((acc, gasto) => gasto.quantity + acc, 0)
    const presupuestoRestante = presupuesto - totalGastado
    const poecentajeNuevo = ((totalGastado / presupuesto) * 100).toFixed(2)
    setTimeout(() => {
      setPoecentaje(poecentajeNuevo)
    }, 700)
    setDisponible(presupuestoRestante)
    setGastado(totalGastado)
  }, [gastos])

  const formatPrice = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const handleResetApp = () => {
    const result = window.confirm('¿Estas seguro de resetear la app?')
    if (result) {
      setPresupuesto(0)
      setGastos([])
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: poecentaje > 100 ? '#dc2626' : '#501c9f',
            textColor: poecentaje > 100 ? '#dc2626' : '#501c9f',
            trailColor: '#d6d6d6'
          })}
          value={poecentaje}
          text={`${poecentaje}%`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button
          className='reset-app'
          onClick={handleResetApp}
        >Resetear App
        </button>
        <p>
          <span>Presupuesto: </span>{formatPrice(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>{formatPrice(disponible)}
        </p>
        <p>
          <span>Gastado: </span>{formatPrice(gastado)}
        </p>
      </div>
    </div>
  )
}
