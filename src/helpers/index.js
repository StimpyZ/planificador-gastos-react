export const generarID = () => {
  const random = Math.random().toString(36).slice(2)
  const fecha = Date.now().toString(36)

  return random + fecha
}

export const formatDate = (date) => {
  const newDate = new Date(date)

  const paramters = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return newDate.toLocaleDateString('es-ES', paramters)
}
