import dayjs from 'dayjs'
import humanizeDuration from 'humanize-duration'

const Counters: React.FC<{ time: string }> = ({ time }) => {
  const formated = dayjs(time).format('DD/MM/YYYY')
  const humanized = humanizeDuration(dayjs(time).diff(new Date()), {
    largest: 2,
  })

  return (
    <p>
      <span style={{ display: 'block' }}>Last updated: </span>
      <span style={{ display: 'block' }}>{`${humanized} ago`}</span>
      <span style={{ display: 'block' }}>{`(${formated})`}</span>
    </p>
  )
}

export default Counters
