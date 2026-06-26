import BriefForm from '../../../../components/BriefForm'
import { getLocale } from '../../../../lib/locale'
import { makeT } from '../../../../lib/t'

export const metadata = {
  title: 'Бриф: лендінг · Kolir',
  description: 'Заповніть бриф для розробки лендінгу — Kolir Agency повернеться з планом та оцінкою.',
}

export default async function BriefLandingPage() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <div className="wrapper__brifes">
      <main className="main__brifes">
        <section className="brief__brifes" id="briefs">
          <div className="container__brifes">
            <BriefForm className="brief__form__brifes" id="landing-brief-form" locale={locale}>
              <input type="hidden" name="brief_type" value="landing_page" />

              {/* HEAD */}
              <div className="brief__item__brifes brief__item--head__brifes">
                <div className="brief__heading__brifes">
                  <h1 data-reveal="up">{t('Бриф для розробки лендінгу')}</h1>
                </div>

                <div className="brief__subheading__brifes">
                  <p><span>{t('* Обов\'язково')}</span></p>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    Будь ласка, надайте якомога більше інформації. Це потрібно, щоб ми могли максимально зануритися в задачу та запропонувати вам ідеальний варіант.
                    <br /><br />
                    Усі питання, які не описані в цьому брифі, будуть трактуватися як невизначені — і рішення прийматимуться командою, спираючись на досвід та професійні знання.
                  </p>
                </div>
              </div>

              {/* SECTION: Головне */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Головне')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-email">
                      <p><span>{t('Електронна пошта *')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="email" id="lp-email" name="email" placeholder="e-mail@example.com" autoComplete="email" required />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="kolir-contact">
                      <p><span>{t('Ваша контактна особа в Kolir Agency *')}</span></p>
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

              {/* SECTION: Інформація про компанію */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Інформація про компанію')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p><span>{t('Будь ласка, надайте якомога більше інформації. Це необхідно, щоб ми могли максимально зануритися і забезпечити вам ідеальний продукт.')}</span></p>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-niche">
                      <p><span>{t('Ніша, напрямок (що робить компанія?)')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-niche" name="company_niche" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-competitors">
                      <p><span>{t('Конкуренти компанії')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-competitors" name="company_competitors" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-phone">
                      <p><span>{t('Телефон (буде розміщений на сайті)')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="tel" id="lp-phone" name="company_phone" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-application-email">
                      <p><span>{t('Електронна пошта (до яких заявок надійде)')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="email" id="lp-application-email" name="application_email" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-legal-address">
                      <p><span>{t('Юридична адреса (якщо потрібно вказати на лендінгу)')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-legal-address" name="legal_address" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Цільова аудиторія */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Ваша цільова аудиторія')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p><span>{t('Охарактеризуйте якомога детальніше персонажа (аватар), який є вашим потенційним покупцем/користувачем.')}</span></p>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-ta-gender-age">
                      <p><span>{t('— стать, вік')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-ta-gender-age" name="ta_gender_age" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-ta-status-wealth">
                      <p><span>{t('— соціальний статус, достаток')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-ta-status-wealth" name="ta_status_wealth" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-ta-features">
                      <p><span>{t('- особливості: Хто ця людина (за власними словами)')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-ta-features" name="ta_features" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-ta-needs">
                      <p><span>{t('- потреби: Чому конкретно ваш товар чи послуга')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-ta-needs" name="ta_needs" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-ta-criteria">
                      <p><span>{t('- критерії того, що важливо. Наприклад: ціна, надійність, терміновість, статус, як це виглядає.')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-ta-criteria" name="ta_criteria" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Інформація про продукт */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Інформація про продукт або послугу')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-selling">
                      <p><span>{t('Що ви продаєте? Навіщо та в якій ситуації це купують?')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-selling" name="product_selling" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-problem">
                      <p><span>{t('Яку проблему у житті чи бізнесі ваш продукт вирішує?')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-problem" name="product_problem" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-benefits">
                      <p><span>{t('Переваги продукту')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-benefits" name="product_benefits" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Необхідні розділи */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Необхідні розділи')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-required-blocks">
                      <p><span>{t('З яких розділів має складатися Landing page')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-required-blocks" name="required_blocks" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-mission">
                      <p><span>{t('Мета цієї посадкової сторінки')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-mission" name="landing_mission" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-examples">
                      <p><span>{t('Покажіть приклади посадкових сторінок, схожих за стилем до очікуваного результату.')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-examples" name="landing_examples" placeholder={t('Посилання / приклади')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p><span>{t('Чи є текст для всіх блоків сторінки, у тому числі для кнопок?')}</span></p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_text_for_blocks" value="yes" required />
                        <div className="brief__field-radio-name__brifes"><p><span>{t('Так, ми надамо текст')}</span></p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_text_for_blocks" value="we_will_handle" />
                        <div className="brief__field-radio-name__brifes"><p><span>{t('Ні, але ми підготуємо')}</span></p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_text_for_blocks" value="need_assistance" />
                        <div className="brief__field-radio-name__brifes"><p><span>{t('Ні, потрібна ваша допомога')}</span></p></div>
                      </label>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-texts-other">
                      <p><span>{t('Інше')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-texts-other" name="texts_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-deadline">
                      <p><span>{t('Дедлайн всього проєкту?')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-deadline" name="project_deadline" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  {/* Корпоративний стиль */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p><span>{t('Які елементи фірми ми повинні враховувати при розробці посадкової сторінки')}</span></p>
                    </div>

                    <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="corp_style[]" value="logo_rules" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes">
                            <p><span>{t('Логотип з правилами його застосування')}</span></p>
                          </div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="corp_style[]" value="colors_rules" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes">
                            <p><span>{t('Фірмові кольори з правилами їх застосування')}</span></p>
                          </div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="corp_style[]" value="fonts_rules" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes">
                            <p><span>{t('Фірмові шрифти з правилами їх застосування')}</span></p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-corp-style-other">
                      <p><span>{t('Інше')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-corp-style-other" name="corp_style_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  {/* Devices */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p><span>{t('Які пристрої потребують адаптації під цей лендінг')}</span></p>
                    </div>

                    <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="devices[]" value="desktop" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p><span>{t('Десктоп')}</span></p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="devices[]" value="mobile" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p><span>{t('Мобільний')}</span></p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="devices[]" value="tablet" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p><span>{t('Планшет')}</span></p></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="lp-additional">
                      <p><span>{t('Додаткова інформація, яку слід врахувати')}</span></p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="lp-additional" name="additional_info" placeholder={t('Коротка відповідь')} />
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

              {/* FOOTER SUBMIT */}
              <div className="brief__item__brifes brief__item--foot__brifes">
                <div className="brief__file-info__brifes">
                  <p><span>{t('Копії відповідей будуть надіслані на вказану вами адресу.')}</span></p>
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

            {/* RESET POPUP */}
            <section className="popups__brifes" id="resetPopup" aria-hidden="true">
              <div className="popups__item__brifes">
                <div className="popups__box__brifes" role="dialog" aria-modal="true" aria-label="Підтвердження очищення форми">
                  <div className="popups__close__brifes" data-popup-close role="button" tabIndex={0} aria-label="Закрити">
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
                      <h2>{t('Ви дійсно хочете очистити всі заповнені відповіді?')}</h2>
                    </div>
                    <div className="popups__buttons__brifes">
                      <button className="button__brifes button--confirm__brifes" type="button" data-popup-confirm>
                        {t('Очистити')}
                      </button>
                      <button className="button__brifes button--cancel__brifes" type="button" data-popup-cancel>
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
