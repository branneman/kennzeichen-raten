import { useState } from 'react'
import { filter } from 'ramda'

import { useTranslation } from '../../hooks/translation'
import { namesakeEqualsDistrict } from '../../util/clean'
import { isMatch } from '../../util/search'
import { splitByBoldStar } from '../../util/string'
import Namesake from '../../components/Namesake'
import './index.css'

import areaCodes from '../../data/area-codes.json'

export default function Database() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const results =
    query === ''
      ? areaCodes
      : filter(isMatch(query), areaCodes)

  return (
    <>
      <h2>{t('pages.Database.title')}</h2>
      <div className="database__search">
        <label htmlFor="query">
          {t('pages.Database.search-label')}:
        </label>
        <input
          id="query"
          type="search"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
      </div>
      <table className="database__table">
        <tbody>
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
        </tbody>
      </table>
    </>
  )
}
