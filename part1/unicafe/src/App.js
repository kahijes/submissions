import React, { useState } from 'react'

const Statistics = ({values}) => {
  const good = values[0]
  const neutral = values[1]
  const bad = values[2]
  const sum = values[3]

  if (sum === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return(
  <table>
    <Statistic text='good' value={good} />
    <Statistic text='neutral' value={neutral} />
    <Statistic text='bad' value={bad} />
    <Statistic text='all' value={sum} />
    <Statistic text='average' value={ (good-bad)/sum } />
    <Statistic text='positive' value={ good/sum * 100 + "%"  } />
  </table>
  )
}

const Statistic = ( {text, value} ) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ handleClick, text }) => (
  <button onClick={ handleClick }>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalClicks, setTotal] = useState(0)
  
  const handleBadClick = () => {
    setTotal(totalClicks + 1)
    setBad(bad + 1)
  }
  
  const handleNeutralClick = () => {
    setTotal(totalClicks + 1)
    setNeutral(neutral + 1)
  }
  
  const handleGoodClick = () => {
    setTotal(totalClicks + 1)
    setGood(good + 1)
    }

  return (
      <div>
          <h1>give feedback</h1>
          <Button handleClick={handleGoodClick} text='good' />
          <Button handleClick={handleNeutralClick} text='neutral' />
          <Button handleClick={handleBadClick} text='bad' />
          <h1>statistics</h1>
          <Statistics values={[good, neutral, bad, totalClicks]} />
      </div>
    )
}


export default App