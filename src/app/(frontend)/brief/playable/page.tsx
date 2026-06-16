import BriefForm from '../../../../components/BriefForm'
import { getLocale } from '../../../../lib/locale'
import { makeT } from '../../../../lib/t'

export const metadata = {
  title: 'Бриф: Playable Ads · Kolir',
  description: 'Заповніть бриф на розробку Playable Ads — Kolir Agency повернеться з планом та оцінкою.',
}

export default async function BriefPlayablePage() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <div className="wrapper__brifes">
      <main className="main__brifes">
        <section className="brief__brifes" id="briefs">
          <div className="container__brifes">
            <BriefForm className="brief__form__brifes" id="form" locale={locale}>
              <input type="hidden" name="brief_type" value="playable" />

              {/* HEAD */}
              <div className="brief__item__brifes brief__item--head__brifes">
                <div className="brief__heading__brifes">
                  <h1 data-reveal="up">{t('Бриф на розробку Playable Ads')}</h1>
                </div>

                <div className="brief__subheading__brifes">
                  <p>{t('* Обов\'язково')}</p>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    Будь ласка, надайте якнайбільше інформації — це допоможе швидше і точніше зібрати сценарій, структуру,
                    ресурси та технічні вимоги для playable.
                    <br /><br />
                    Всі специфічні питання, не викладені в даному технічному завданні, трактуватимуться дизайнером/розробником як
                    невизначені, і виконання робіт здійснюватиметься, ґрунтуючись на досвіді команди.
                  </p>
                </div>
              </div>

              {/* SECTION: Основне */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Основне')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="playable-email">
                      <p>{t('Електронна пошта *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="email" id="playable-email" name="email" placeholder="e-mail@example.com" autoComplete="email" required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="kolir-contact">
                      <p>{t('Ваша контактна особа в Kolir Agency *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <select id="kolir-contact" name="kolir_contact" required defaultValue="">
                        <option value="">{t('Обрати')}</option>
                        <option value="Олександр Березовський">{t('Олександр Березовський')}</option>
                        <option value="Дмитро Богданов">{t('Дмитро Богданов')}</option>
                        <option value="Олеся Буша">{t('Олеся Буша')}</option>
                        <option value="Денис Кійко">{t('Денис Кійко')}</option>
                        <option value="Олексій Лукашевич">{t('Олексій Лукашевич')}</option>
                        <option value="Ганна Перепелиця">{t('Ганна Перепелиця')}</option>
                        <option value="Марія Фабрикант">{t('Марія Фабрикант')}</option>
                        <option value="Юлія Шевченко">{t('Юлія Шевченко')}</option>
                        <option value="Двейрін Наталя">{t('Двейрін Наталя')}</option>
                        <option value="Оля Фезлер">{t('Оля Фезлер')}</option>
                        <option value="Ярослав Бабец">{t('Ярослав Бабец')}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Інформація про проект */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Інформація про проект')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="game-title-link">
                      <p>{t('Для якої гри робимо плеєбл, бажано надати посилання на AppStore/Google Play гри *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="game-title-link" name="game_title_link" placeholder={t('Тема гри playable...')} required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="competitors">
                      <p>{t('Конкуренти вашої гри')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="competitors" name="competitors" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="references">
                      <p>{t('Референси ігор та плеєблів, які подобаються та на які ми маємо орієнтуватись')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="references" name="references" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Структура та сценарій */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Структура та сценарій')}</h2>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    {t('Розпишіть, що саме відбувається на кожному етапі плеєблу за класичною структурою, бажано з прив\'язкою до хронометражу, тобто яка дія відбувається на якій секунді креативу. Або надайте сценарій по тій структурі, яка вам потрібна')}
                  </p>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="intro-onboarding">
                      <p>{t('Інтро/Онбординг *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="intro-onboarding" name="intro_onboarding" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="microgame">
                      <p>{t('Мікро-гра *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="microgame" name="microgame" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="endcard">
                      <p>{t('Фінальна карта (End Card), умови її відкриття *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="endcard" name="endcard_conditions" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="total-timing">
                      <p>{t('Загальний хронометраж креативу (в секундах) *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="number" id="total-timing" name="total_timing_seconds" min="1" step="1" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>
                </div>

                <div className="brief__item__brifes brief__item--foot__brifes" style={{ paddingTop: 0 }}>
                  <label className="brief__field__brifes">
                    <div className="brief__field-input__brifes brief__field-input--file__brifes">
                      <input type="file" name="script_file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.png,.jpg,.jpeg" />
                      <div className="brief__field-icon__brifes">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_3216_2472)">
                            <circle cx="28" cy="28" r="27.5" fill="#5E00CF" stroke="#5E00CF" />
                            <path d="M33.8333 22.1668V34.4168C33.8333 37.9635 30.9633 40.8335 27.4167 40.8335C23.87 40.8335 21 37.9635 21 34.4168V21.0002C21 18.4218 23.0883 16.3335 25.6667 16.3335C28.245 16.3335 30.3333 18.4218 30.3333 21.0002V33.2502C30.3333 34.0237 30.026 34.7656 29.4791 35.3126C28.9321 35.8595 28.1902 36.1668 27.4167 36.1668C26.6431 36.1668 25.9013 35.8595 25.3543 35.3126C24.8073 34.7656 24.5 34.0237 24.5 33.2502V22.1668H25.6667V33.2502C25.6667 33.7143 25.851 34.1594 26.1792 34.4876C26.5074 34.8158 26.9525 35.0002 27.4167 35.0002C27.8808 35.0002 28.3259 34.8158 28.6541 34.4876C28.9823 34.1594 29.1667 33.7143 29.1667 33.2502V21.0002C29.1667 20.0719 28.7979 19.1817 28.1415 18.5253C27.4852 17.8689 26.5949 17.5002 25.6667 17.5002C24.7384 17.5002 23.8482 17.8689 23.1918 18.5253C22.5354 19.1817 22.1667 20.0719 22.1667 21.0002V34.4168C22.1667 35.8092 22.7198 37.1446 23.7044 38.1291C24.6889 39.1137 26.0243 39.6668 27.4167 39.6668C28.8091 39.6668 30.1444 39.1137 31.129 38.1291C32.1135 37.1446 32.6667 35.8092 32.6667 34.4168V22.1668H33.8333Z" fill="#FAFAFA" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3216_2472">
                              <rect width="56" height="56" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="brief__field-name__brifes">
                        <p>
                          {t('Додайте файл зі сценарієм/ТЗ (опціонально)')}<br /><span>(pdf/doc/ppt/zip)</span>
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* SECTION: Ресурси */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Ресурси')}</h2>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    {t('Які ресурси для продакшену плеєбла готові, а які потрібно зробити і що саме. Надайте готові матеріали для їх перевірки відповідним спеціалістом:')}
                  </p>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="res-art">
                      <p>{t('Арт *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="res-art" name="resources_art" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="res-ui">
                      <p>{t('UI (текст, шрифт, попапи виграшу, поразки, інші попапи, ігрові лічильники, таймер до кінця плеєблу, любі інші елементи інтерфейсу) *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="res-ui" name="resources_ui" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="res-audio">
                      <p>{t('Музика/звуки*')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="res-audio" name="resources_audio" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="res-animation">
                      <p>{t('Анімація*')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="res-animation" name="resources_animation" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>
                </div>

                <div className="brief__item__brifes brief__item--foot__brifes" style={{ paddingTop: 0 }}>
                  <label className="brief__field__brifes">
                    <div className="brief__field-input__brifes brief__field-input--file__brifes">
                      <input type="file" name="resources_file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.png,.jpg,.jpeg,.mp3,.wav,.mp4" />
                      <div className="brief__field-icon__brifes">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_3216_2473)">
                            <circle cx="28" cy="28" r="27.5" fill="#5E00CF" stroke="#5E00CF" />
                            <path d="M33.8333 22.1668V34.4168C33.8333 37.9635 30.9633 40.8335 27.4167 40.8335C23.87 40.8335 21 37.9635 21 34.4168V21.0002C21 18.4218 23.0883 16.3335 25.6667 16.3335C28.245 16.3335 30.3333 18.4218 30.3333 21.0002V33.2502C30.3333 34.0237 30.026 34.7656 29.4791 35.3126C28.9321 35.8595 28.1902 36.1668 27.4167 36.1668C26.6431 36.1668 25.9013 35.8595 25.3543 35.3126C24.8073 34.7656 24.5 34.0237 24.5 33.2502V22.1668H25.6667V33.2502C25.6667 33.7143 25.851 34.1594 26.1792 34.4876C26.5074 34.8158 26.9525 35.0002 27.4167 35.0002C27.8808 35.0002 28.3259 34.8158 28.6541 34.4876C28.9823 34.1594 29.1667 33.7143 29.1667 33.2502V21.0002C29.1667 20.0719 28.7979 19.1817 28.1415 18.5253C27.4852 17.8689 26.5949 17.5002 25.6667 17.5002C24.7384 17.5002 23.8482 17.8689 23.1918 18.5253C22.5354 19.1817 22.1667 20.0719 22.1667 21.0002V34.4168C22.1667 35.8092 22.7198 37.1446 23.7044 38.1291C24.6889 39.1137 26.0243 39.6668 27.4167 39.6668C28.8091 39.6668 30.1444 39.1137 31.129 38.1291C32.1135 37.1446 32.6667 35.8092 32.6667 34.4168V22.1668H33.8333Z" fill="#FAFAFA" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3216_2473">
                              <rect width="56" height="56" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="brief__field-name__brifes">
                        <p>
                          {t('Додайте файл із ресурсами/ТЗ (опціонально)')}<br /><span>(zip/pdf/png/jpg/mp3...)</span>
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* SECTION: Розробка та QA */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Розробка та QA')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="key-devices">
                      <p>{t('Чи є ключові девайси, на яких буде оцінюватись верстка плеєблу? *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="key-devices" name="key_devices" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Необхідна орієнтація плеєблу: вертикальна, горизонтальна, обидві')}</p>
                    </div>

                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="orientation" value="vertical" required />
                        <div className="brief__field-radio-name__brifes"><p>{t('Вертикальна')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="orientation" value="horizontal" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Горизонтальна')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="orientation" value="both" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Обидві')}</p></div>
                      </label>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="qa-for-playable">
                      <p>{t('Чи потрібен наш QA плеєблу? *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="qa-for-playable" name="qa-for-playable" placeholder={t('Моя відповідь...')} required />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Рекламна кампанія */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Рекламна кампанія')}</h2>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    {t('Якою вважається успішна рекламна кампанія з даним плеєблом? Ця інформація є конфіденційною і буде використовуватись лише для розуміння, які тригери, акценти та механіки краще задіяти для досягнення необхідної мети рекламної кампанії, якщо це не описано в сценарії.')}
                  </p>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="campaign-kpi">
                      <p>{t('Мета та KPI рекламної кампанії')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="campaign-kpi" name="campaign_kpi" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="target-audience">
                      <p>{t('Цільова аудиторія')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="target-audience" name="target_audience" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="placements">
                      <p>{t('Майданчики та плейсменти для розміщення')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="placements" name="ad_placements" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="need-leadin">
                      <p>{t('Якщо плейсмент Facebook Feed або Stories, вкажіть чи потрібен вам lead-in video? *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="need-leadin" name="need-leadin" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="additional-comment">
                      <p>{t('Додатковий коментар для команди')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="additional-comment" name="additional_comment" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>

                <div className="brief__item__brifes brief__item--foot__brifes" style={{ paddingTop: 0 }}>
                  <label className="brief__field__brifes">
                    <div className="brief__field-input__brifes brief__field-input--file__brifes">
                      <input type="file" name="additional_file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.png,.jpg,.jpeg" />
                      <div className="brief__field-icon__brifes">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_3216_2474)">
                            <circle cx="28" cy="28" r="27.5" fill="#5E00CF" stroke="#5E00CF" />
                            <path d="M33.8333 22.1668V34.4168C33.8333 37.9635 30.9633 40.8335 27.4167 40.8335C23.87 40.8335 21 37.9635 21 34.4168V21.0002C21 18.4218 23.0883 16.3335 25.6667 16.3335C28.245 16.3335 30.3333 18.4218 30.3333 21.0002V33.2502C30.3333 34.0237 30.026 34.7656 29.4791 35.3126C28.9321 35.8595 28.1902 36.1668 27.4167 36.1668C26.6431 36.1668 25.9013 35.8595 25.3543 35.3126C24.8073 34.7656 24.5 34.0237 24.5 33.2502V22.1668H25.6667V33.2502C25.6667 33.7143 25.851 34.1594 26.1792 34.4876C26.5074 34.8158 26.9525 35.0002 27.4167 35.0002C27.8808 35.0002 28.3259 34.8158 28.6541 34.4876C28.9823 34.1594 29.1667 33.7143 29.1667 33.2502V21.0002C29.1667 20.0719 28.7979 19.1817 28.1415 18.5253C27.4852 17.8689 26.5949 17.5002 25.6667 17.5002C24.7384 17.5002 23.8482 17.8689 23.1918 18.5253C22.5354 19.1817 22.1667 20.0719 22.1667 21.0002V34.4168C22.1667 35.8092 22.7198 37.1446 23.7044 38.1291C24.6889 39.1137 26.0243 39.6668 27.4167 39.6668C28.8091 39.6668 30.1444 39.1137 31.129 38.1291C32.1135 37.1446 32.6667 35.8092 32.6667 34.4168V22.1668H33.8333Z" fill="#FAFAFA" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3216_2474">
                              <rect width="56" height="56" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="brief__field-name__brifes">
                        <p>
                          {t('Можна прикріпити додатковий файл (опціонально)')}<br /><span>(ТЗ / презентація)</span>
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* FOOTER: submit */}
              <div className="brief__item__brifes brief__item--foot__brifes">
                <div className="brief__file-info__brifes">
                  <p>{t('Копії відповідей будуть надіслані на вказану вами адресу.')}</p>
                </div>

                <div className="brief__buttons__brifes">
                  <button className="button__brifes button--submit__brifes" type="submit">
                    {t('Надіслати бриф')}
                  </button>
                  <button className="button__brifes button--reset__brifes" type="reset">
                    {t('Очистити форму')}
                  </button>
                </div>
              </div>
            </BriefForm>

            {/* POPUP: confirm reset */}
            <section className="popups__brifes">
              <div className="popups__item__brifes">
                <div className="popups__box__brifes">
                  <div className="popups__close__brifes">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_3337_1802)">
                        <path d="M24 8L8 24" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 8L24 24" stroke="white" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_3337_1802">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className="popups__content__brifes">
                    <div className="popups__title__brifes">
                      <h2>{t('Ви впевнені, що хочете очистити форму?')}</h2>
                    </div>
                    <div className="popups__buttons__brifes">
                      <button className="button__brifes button--confirm__brifes" type="button">
                        {t('Очистити')}
                      </button>
                      <button className="button__brifes button--cancel__brifes" type="button">
                        {t('Скасувати')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
