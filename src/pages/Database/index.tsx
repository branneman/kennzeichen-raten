import { useState } from 'react'
import { filter } from 'ramda'
import { AreaCode } from '../../types/area-codes'
import { isMatch } from '../../util/search'

import areaCodes from '../../data/area-codes.json' assert { type: 'json' }

export default function Database() {
  const [query, setQuery] = useState('')

  const results: AreaCode[] =
    query !== ''
      ? filter(isMatch(query), areaCodes)
      : areaCodes

  return (
    <>
      <h2>Database</h2>
      <div>
        <label htmlFor="query">Search:</label>
        <input
          id="query"
          type="search"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
      </div>
      <ol>
        {results.map((ac) => (
          <li key={`ac-${ac.code}`}>
            {ac.code} - {ac.namesake} - {ac.district} -{' '}
            {ac.state}
          </li>
        ))}
      </ol>
    </>
  )
}
