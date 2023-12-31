import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'

import { generateNewGameState } from '../../util/game'
import {
  formatNamesake,
  namesakeEqualsDistrict,
} from '../../util/clean'
import './index.css'

const generateAllQuestions = () => ({
  easy: generateNewGameState(1).questions,
  medium: generateNewGameState(2).questions,
  hard: generateNewGameState(3).questions,
})

const DebugButton = styled(Button)`
  width: auto;
`

export default function Debug() {
  const [results, setResults] = useState(
    generateAllQuestions(),
  )
  const onRegenerate = () =>
    setResults(generateAllQuestions())

  return (
    <>
      <h2>Debug Mode: generateNewGameState(difficulty)</h2>
      <DebugButton onClick={onRegenerate}>
        Regenerate
      </DebugButton>
      <div className="debug_columns">
        {['easy', 'medium', 'hard'].map((difficulty) => (
          <div key={difficulty} className="debug_column">
            <h3>{difficulty.toUpperCase()}</h3>
            {results[difficulty].map((ac) => (
              <AreaCodeBlock
                key={ac.question.code}
                areacode={ac}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

function AreaCodeBlock(props) {
  const ac = props.areacode

  return (
    <div className="debug__ac">
      <AreaCodeParagraph areacode={ac.question} />
      {ac.choices
        .filter(
          (choice) => ac.question.code !== choice.code,
        )
        .map((choice) => (
          <AreaCodeParagraph
            key={choice.code}
            areacode={{ ...choice, code: '' }}
          />
        ))}
    </div>
  )
}

function AreaCodeParagraph(props) {
  const ac = props.areacode

  return (
    <p>
      {ac.code && `- ${ac.code}, `}
      {formatNamesake(ac.namesake)}
      {!namesakeEqualsDistrict(ac.namesake, ac.district) &&
        ` (${ac.district})`}
      , {ac.state}
      {ac.score && (
        <em style={{ opacity: 0.5 }}>, score={ac.score}</em>
      )}
      <br />
    </p>
  )
}
