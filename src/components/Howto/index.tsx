import LicensePlate from '../LicensePlate'
import { useTranslation } from '../../hooks/translation'
import './index.css'

export default function Howto() {
  const { t } = useTranslation()

  return (
    <div className="howto">
      <h2>{t('components.Howto.title')}</h2>
      <p>{t('components.Howto.description')}</p>
      <LicensePlate prefix="M" code="KL 8136" />
      <div>
        <div className="howto__arrow"></div>
        <div className="howto__text">
          {t('components.Howto.m-for-munchen')}
        </div>
      </div>
    </div>
  )
}
