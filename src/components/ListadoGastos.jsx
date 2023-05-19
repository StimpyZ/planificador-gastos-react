import React from 'react'
import Gasto from './Gasto'

export default function ListadoGastos ({
  gastos,
  setGastoEditar,
  deleteGasto,
  filter,
  filterGastos
}) {
  return (
    <div className='listado-gastos contenedor'>
      {
        filter
          ? (
            <>
              <h2>{filterGastos.length ? 'Gastos' : 'No Hay Gastos en esta categoría'}</h2>
              {filterGastos.map(gasto => (
                <Gasto
                  key={gasto.id}
                  gastos={gasto}
                  setGastoEditar={setGastoEditar}
                  deleteGasto={deleteGasto}
                />
              ))}
            </>
            )
          : (
            <>
              <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
              {gastos.map(gasto => (
                <Gasto
                  key={gasto.id}
                  gastos={gasto}
                  setGastoEditar={setGastoEditar}
                  deleteGasto={deleteGasto}
                />
              ))}
            </>
            )
      }

    </div>
  )
}
