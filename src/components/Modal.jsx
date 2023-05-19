import { useId, useState, useEffect } from 'react'
import CerratBtn from '../img/cerrar.svg'
import ErrorMessage from './ErrorMessage'

export default function Modal ({
  setModal,
  animarModal,
  setAnimarModal,
  saveGasto,
  gastoEditar,
  setGastoEditar
}) {
  const nameId = useId()
  const quantityId = useId()
  const categoryId = useId()
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [date, setDate] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setName(gastoEditar.name)
      setQuantity(gastoEditar.quantity)
      setCategory(gastoEditar.category)
      setId(gastoEditar.id)
      setDate(gastoEditar.date)
    }
  }, [])

  const handelCloseModal = () => {
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([name, quantity, category].includes('')) {
      setMessage('Todos los campos son obligatorios')

      setTimeout(() => {
        setMessage('')
      }, 2000)
      return
    }
    saveGasto({ name, quantity, category, id, date })
  }
  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={CerratBtn} alt='cerrar modal' onClick={handelCloseModal} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario sombra2 ${animarModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{Object.keys(gastoEditar).length > 0
          ? 'Editar Gasto'
          : 'Nuevo gasto'}
        </legend>
        {message && <ErrorMessage tipo='error'>{message}</ErrorMessage>}
        <div className='campo'>
          <label htmlFor={nameId}>Nombre</label>
          <input
            type='text'
            id={nameId}
            placeholder='Spotify, Comida, Transporte...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor={quantityId}>Cantidad</label>
          <input
            type='number'
            id={quantityId}
            placeholder='$100, $200...'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor={categoryId}>Categoria</label>
          <select
            id={categoryId}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='' disabled>
              -- Seleccione --
            </option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos varios</option>
            <option value='ocio'>Ocios</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>

        <input
          type='submit' value={Object.keys(gastoEditar).length > 0
            ? 'Editar Gasto'
            : 'Añadir Gasto'}
        />
      </form>
    </div>
  )
}
