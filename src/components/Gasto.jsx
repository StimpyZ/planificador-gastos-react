import React from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatDate } from '../helpers'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import Iconogastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: Iconogastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones
}

export default function Gasto ({ gastos, setGastoEditar, deleteGasto }) {
  const { category, name, date, quantity, id } = gastos

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gastos)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => deleteGasto(id)}
        destructive
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img
              src={diccionarioIconos[category]}
              alt={category}
              draggable='false'
            />
            <div className='descripcion-gasto'>
              <p className='categoria'>{category}</p>
              <p className='nombre-gasto'>{name}</p>
              <p className='fecha-gasto'>
                Agregado el: <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>${quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
