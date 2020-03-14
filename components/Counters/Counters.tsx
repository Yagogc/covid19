const Counters: React.FC<{ stats: any }> = ({ stats }) => {
  if (!stats) return <p>Loading...</p>
  return (
    <>
      <p>{`Confirmed: ${stats.confirmed.value}`}</p>
      <p>{`Recoverd: ${stats.recovered.value}`}</p>
      <p>{`Deaths: ${stats.deaths.value}`}</p>
    </>
  )
}

export default Counters
