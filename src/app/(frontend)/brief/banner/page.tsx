import BriefForm from '../../../../components/BriefForm'
import { getLocale } from '../../../../lib/locale'
import { makeT } from '../../../../lib/t'

export const metadata = {
  title: 'Бриф: банер · Kolir',
  description: 'Заповніть бриф для розробки банера — Kolir Agency повернеться з планом та оцінкою.',
}

export default async function BriefBannerPage() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <div className="wrapper__brifes">
      <main className="main__brifes">
        <section className="brief__brifes" id="briefs">
          <div className="container__brifes">
            <BriefForm className="brief__form__brifes" id="brief-banner-form" locale={locale}>
              <input type="hidden" name="brief_type" value="banner" />

              {/* HEAD */}
              <div className="brief__item__brifes brief__item--head__brifes">
                <div className="brief__heading__brifes">
                  <h1 data-reveal="up">{t('Бриф для розробки банера')}</h1>
                </div>

                <div className="brief__subheading__brifes">
                  <p><span>{t('* Обов\'язково')}</span></p>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    Будь ласка, надайте якомога більше інформації. Це потрібно, щоб ми могли максимально зануритися у задачу та запропонувати найкраще рішення.
                    <br /><br />
                    Усі моменти, які не описані в цьому ТЗ, вважатимуться невизначеними — і дизайнер прийматиме рішення, спираючись на досвід та професійні знання.
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
                    <label className="brief__field-name__brifes" htmlFor="banner-email">
                      <p>{t('Електронна пошта *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="email" id="banner-email" name="email" placeholder="e-mail@example.com" autoComplete="email" required />
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

              {/* SECTION: Загальна інформація */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Загальна інформація')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Формат банера')}</p>
                    </div>

                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="banner_format" value="jpg_png" />
                        <div className="brief__field-radio-name__brifes"><p>JPG/PNG</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="banner_format" value="gif" />
                        <div className="brief__field-radio-name__brifes"><p>GIF</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="banner_format" value="html" />
                        <div className="brief__field-radio-name__brifes"><p>HTML</p></div>
                      </label>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-format-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-format-other" name="banner_format_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-accommodation-site">
                      <p>{t('Майданчик розміщення (Наприклад, facebook)')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-accommodation-site" name="accommodation_site" placeholder={t('Детальна відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-sizes">
                      <p>{t('Потрібні розміри?')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-sizes" name="necessary_sizes" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-theme">
                      <p>{t('Тема банера (Приклад: новорічна акція)')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-theme" name="banner_theme" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-deadline">
                      <p>{t('Дедлайн всього проекту?')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-deadline" name="project_deadline" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-text">
                      <p>{t('Текст банера')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-text" name="banner_text" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-button-text">
                      <p>{t('Текст кнопки')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-button-text" name="button_text" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-max-weight">
                      <p>{t('Максимальна вага банеру')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-max-weight" name="max_banner_weight" placeholder={t('Детальна відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="banner-animation-ref">
                      <p>{t('Референс анімації')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="banner-animation-ref" name="animation_reference" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* FILE UPLOAD */}
              <div className="brief__item__brifes brief__item--foot__brifes" style={{ paddingTop: 0 }}>
                <label className="brief__field__brifes">
                  <div className="brief__field-input__brifes brief__field-input--file__brifes">
                    <input type="file" name="additional_file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.png,.jpg,.jpeg" />
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
                        {t('Можна прикріпити додатковий файл із ТЗ або презентацією (опціонально)')}<br /><span>(pdf/doc/ppt/zip)</span>
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* FOOTER */}
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

            {/* POPUP */}
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
