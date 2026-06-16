import BriefForm from '../../../../components/BriefForm'
import { getLocale } from '../../../../lib/locale'
import { makeT } from '../../../../lib/t'

export const metadata = {
  title: 'Бриф: брендбук · Kolir',
  description:
    'Заповніть бриф для розробки брендбуку — Kolir Agency, Одеса. Логотип, кольори, типографіка та правила використання.',
}

export default async function BriefBrandbookPage() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <div className="wrapper__brifes">
      <main className="main__brifes">
        <section className="brief__brifes" id="briefs">
          <div className="container__brifes">
            <BriefForm className="brief__form__brifes" id="form" data-demo-form locale={locale}>
              <input type="hidden" name="brief_type" value="brandbook" />

              {/* HEAD */}
              <div className="brief__item__brifes brief__item--head__brifes">
                <div className="brief__heading__brifes" data-reveal="up">
                  <h1>{t('Бриф для розробки Брендбуку')}</h1>
                </div>

                <div className="brief__subheading__brifes">
                  <p>{t('* Обов\'язково')}</p>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    Будь ласка, надайте якомога більше інформації. Це необхідно, щоб ми могли максимально зануритися і надати вам ідеальний варіант.
                    <br /><br />
                    Усі конкретні питання, які не викладені в цьому технічному завданні, буде інтерпретувати дизайнер як невизначений, а дизайнер реалізує реалізацію дизайнерських робіт як замовника, виходячи з власного досвіду та професійних знань.
                  </p>
                </div>
              </div>

              {/* SECTION: Основне */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Основне')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="brief-email">
                      <p>{t('Електронна пошта *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="email" id="brief-email" name="email" placeholder="e-mail@example.com" autoComplete="email" required />
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

              {/* SECTION: Компоненти брендбуку */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Компоненти брендбуку')}</h2>
                </div>

                <div className="brief__subtitle__brifes">
                  <p>{t('Будь ласка, вкажи необхідні компоненти брендбука:')}</p>
                </div>

                {/* Соціальні мережі */}
                <div className="brief__subtitle__brifes">
                  <p>{t('Оформлення соціальних мереж:')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_social[]" value="avatar" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Аватар')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_social[]" value="cover" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Обкладинка')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_social[]" value="post_template" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Приклад посту')}</p></div>
                    </label>
                  </div>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="bb-social-other"><p>{t('Інше')}</p></label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="bb-social-other" name="bb_social_other" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>

                <br />

                {/* Поліграфія та рекламні макети */}
                <div className="brief__subtitle__brifes">
                  <p>{t('Поліграфія та рекламні макети:')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_print[]" value="rules_printing" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Правила верстки друкованої продукції')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_print[]" value="document_blank" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Бланк документу')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_print[]" value="business_card" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Візитка')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_print[]" value="envelope" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Конверт')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_print[]" value="folder" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Папка')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_print[]" value="sticker" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Наклейка')}</p></div>
                    </label>
                  </div>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="bb-print-other"><p>{t('Інше')}</p></label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="bb-print-other" name="bb_print_other" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>

                <br />

                {/* Сувенірна продукція */}
                <div className="brief__subtitle__brifes">
                  <p>{t('Сувенірна продукція:')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_souvenir[]" value="tshirts" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Футболки')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_souvenir[]" value="caps" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Кепки')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_souvenir[]" value="bracelets" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Браслети')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_souvenir[]" value="bags" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Сумки')}</p></div>
                    </label>
                  </div>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="bb-souvenir-other"><p>{t('Інше')}</p></label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="bb-souvenir-other" name="bb_souvenir_other" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>

                <br />

                {/* Оформлення фасадів та будівель */}
                <div className="brief__subtitle__brifes">
                  <p>{t('Оформлення фасадів та будівель:')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_decor[]" value="signboard" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Вивіска')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_decor[]" value="plates" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Таблички')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_decor[]" value="pointers" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Вказівники')}</p></div>
                    </label>
                  </div>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="bb-decor-other"><p>{t('Інше')}</p></label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="bb-decor-other" name="bb_decor_other" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>

                <br />

                {/* Дизайн для реклами та просування */}
                <div className="brief__subtitle__brifes">
                  <p>{t('Дизайн для реклами та просування:')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_ads[]" value="banner_examples" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes">
                        <p>{t('Приклади банерної реклами (JPEG/GIF/HTML)')}</p>
                      </div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_ads[]" value="info_materials" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Рекламно-інформаційні матеріали')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_ads[]" value="stands" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Оформлення стендів для конференцій')}</p></div>
                    </label>
                  </div>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="bb-ads-other"><p>{t('Інше')}</p></label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="bb-ads-other" name="bb_ads_other" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>

                <br />

                {/* Особливий дизайн для промисловості */}
                <div className="brief__subtitle__brifes">
                  <p>{t('Особливий дизайн для промисловості:')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_industry[]" value="uniform" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Уніформа працівників')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_industry[]" value="car_branding" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Оформлення автомобіля')}</p></div>
                    </label>
                  </div>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="bb-industry-other"><p>{t('Інше')}</p></label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="bb-industry-other" name="bb_industry_other" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>

                <br />

                {/* Фірмові елементи */}
                <div className="brief__subtitle__brifes">
                  <p>{t('Фірмові елементи:')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_corporate[]" value="pictograms" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Піктограми')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_corporate[]" value="decorative_backgrounds" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Декоративні фони')}</p></div>
                    </label>
                  </div>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="bb-corporate-other"><p>{t('Інше')}</p></label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="bb-corporate-other" name="bb_corporate_other" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>

                <br />

                {/* Бізнес документація */}
                <div className="brief__subtitle__brifes">
                  <p>{t('Бізнес документація:')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_docs[]" value="business_card" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Візитка')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_docs[]" value="letterhead" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Фірмовий бланк')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_docs[]" value="info_sheet" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Інформаційний бланк')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_docs[]" value="envelope" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Конверт')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes">
                      <input type="checkbox" name="bb_docs[]" value="leaflet" />
                      <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Листівка')}</p></div>
                    </label>
                  </div>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="bb-docs-other"><p>{t('Інше')}</p></label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="bb-docs-other" name="bb_docs_other" placeholder={t('Моя відповідь...')} />
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
                        {t('Можна прикріпити додатковий файл (опціонально)')}<br /><span>(ТЗ / презентація)</span>
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
