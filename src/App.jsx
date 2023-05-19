/* eslint-disable no-undef */
import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarID } from './helpers'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filter from './components/Filter'

function App () {
  const [presupuesto, setPresupuesto] = useState(() => {
    const presupuestoLocal = JSON.parse(localStorage.getItem('presupuesto'))
    return presupuestoLocal || 0
  })
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(() => {
    const gastosLocal = JSON.parse(localStorage.getItem('gastos'))
    return gastosLocal || []
  })
  const [gastoEditar, setGastoEditar] = useState({})
  const [filter, setFilter] = useState('')
  const [filterGastos, setFilterGastos] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto) ?? 0)
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [presupuesto, gastos])

  useEffect(() => {
    if (filter) {
      const gastosFiltrados = gastos.filter(gasto => gasto.category === filter)
      setFilterGastos(gastosFiltrados)
    }
  }, [filter])

  useEffect(() => {
    const presupuestoLocal = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLocal > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNewGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const saveGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoItem => gastoItem.id === gasto.id ? gasto : gastoItem)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      gasto.date = Date.now()
      gasto.id = generarID()
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const deleteGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filter
              filter={filter}
              setFilter={setFilter}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              deleteGasto={deleteGasto}
              filter={filter}
              filterGastos={filterGastos}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='Nuevo gasto'
              onClick={handleNewGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          saveGasto={saveGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  )
}

export default App
