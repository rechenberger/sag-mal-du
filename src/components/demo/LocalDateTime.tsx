'use client'

export const LocalDateTime = ({ datetime }: { datetime: string }) => {
  const date = new Date(datetime)
  return <>{date.toLocaleString('de')}</>
}

export const LocalDate = ({ datetime }: { datetime: string }) => {
  const date = new Date(datetime)
  return <>{date.toLocaleDateString('de')}</>
}
