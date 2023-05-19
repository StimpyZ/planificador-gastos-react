import { useId } from 'react'

export default function Filter ({ filter, setFilter }) {
  const categoryId = useId()
  return (
    <div className='filtros sombra contenedor'>
      <form>
        <div className='campo'>
          <label htmlFor={categoryId}>Filtrar Gastos</label>
          <select
            value={filter}
            id={categoryId}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value='' disabled>-- Seleccione --</option>
            <option value=''>Todas las categorias</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos varios</option>
            <option value='ocio'>Ocios</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  )
}
