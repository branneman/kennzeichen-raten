import { useState } from 'react'
import { filter } from 'ramda'

import { AreaCode } from '../../types/area-codes'
import { namesakeEqualsDistrict } from '../../util/clean'
import { isMatch } from '../../util/search'
import { splitByBoldStar } from '../../util/string'
import Namesake from '../../components/Namesake'
import './index.css'

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
      <div className="database__search">
        <label htmlFor="query">Search:</label>
        <input
          id="query"
          type="search"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
      </div>
      <table className="database__table">
        {results.map((ac) => (
          <tr key={`ac-${ac.code}`}>
            <td className="database__code">{ac.code}</td>
            <td>
              <Namesake
                namesake={splitByBoldStar(ac.namesake)}
              />
              {!namesakeEqualsDistrict(
                ac.namesake,
                ac.district,
              ) && (
                <div className="database__district">
                  {`(${ac.district})`}
                </div>
              )}
            </td>
            <td>{ac.state}</td>
          </tr>
        ))}
      </table>
    </>
  )
}
