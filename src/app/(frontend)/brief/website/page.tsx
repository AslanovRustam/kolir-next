import BriefForm from '../../../../components/BriefForm'
import { getLocale } from '../../../../lib/locale'
import { makeT } from '../../../../lib/t'

export const metadata = {
  title: 'Бриф: сайт · Kolir',
  description: 'Заповніть бриф на розробку сайту — і Kolir Agency повернеться з планом та оцінкою.',
}

export default async function BriefWebsitePage() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <div className="wrapper__brifes">
      <main className="main__brifes">
        <section className="brief__brifes" id="briefs">
          <div className="container__brifes">
            <BriefForm className="brief__form__brifes" id="form" data-demo-form locale={locale}>
              <input type="hidden" name="brief_type" value="website" />

              {/* HEAD */}
              <div className="brief__item__brifes brief__item--head__brifes">
                <div className="brief__heading__brifes">
                  <h1 data-reveal="up">{t('Бриф на розробку сайту')}</h1>
                </div>

                <div className="brief__subheading__brifes">
                  <p><span>{t('* Обов\'язково')}</span></p>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    Будь ласка, надайте якомога більше інформації. Це потрібно, щоб ми могли максимально зануритися у задачу та запропонувати найкраще рішення.
                    <br /><br />
                    Усі конкретні питання, які не описані в цьому брифі, будуть трактуватися як невизначені — і команда прийматиме рішення, спираючись на досвід та професійні знання.
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
                    <label className="brief__field-name__brifes" htmlFor="ws-email">
                      <p>{t('Електронна пошта *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="email" id="ws-email" name="email" placeholder="e-mail@example.com" autoComplete="email" required />
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
                    <label className="brief__field-name__brifes" htmlFor="ws-about-company">
                      <p>{t('Про вашу компанію')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-about-company" name="about_company" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-main-goal">
                      <p>{t('Мета сайту')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-main-goal" name="website_main_goal" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-current-link">
                      <p>{t('Адреса поточного сайту або посилання на соціальну мережу')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="url" id="ws-current-link" name="current_website_or_social" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-deadline">
                      <p>{t('Дедлайн проекту')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-deadline" name="project_deadline" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-strategic-docs">
                      <p>{t('У вас є стратегічна документація? (брендбук, гайдлайни, логотип)')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-strategic-docs" name="strategic_documentation" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: Дизайн */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes">
                  <h2 data-reveal="up">{t('Дизайн')}</h2>
                </div>

                <div className="brief__description__brifes" style={{ marginTop: '1rem' }}>
                  <p>{t('Допоможіть нам створити найбільш підходящий дизайн для вашого сайту')}</p>
                </div>

                <div className="brief__fields__brifes">
                  {/* Тип сайту */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Якого типу сайт вам потрібен')}</p>
                    </div>

                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="website_type" value="landing_page" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Посадкова сторінка')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="website_type" value="ecommerce" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Інтернет магазин')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="website_type" value="catalog" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Сайт каталог')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="website_type" value="promo_page" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Сайт візитка')}</p></div>
                      </label>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-type-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-type-other" name="website_type_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-sites-like">
                      <p>{t('Вкажіть приклади сайтів, які вам подобаються')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-sites-like" name="examples_sites_like" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-animation-like">
                      <p>{t('Вкажіть сайти з анімацією, яка вам подобається')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-animation-like" name="examples_animation_like" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-competitors-sites">
                      <p>{t('Вкажіть сайти прямих конкурентів')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-competitors-sites" name="competitors_sites" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-unique-illustration">
                      <p>{t('Чи потрібні вам унікальні іконки та ілюстрації для сайту, якщо так, то які')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-unique-illustration" name="unique_illustration_icons_mascot" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  {/* Графічні елементи (checkbox) */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Вкажіть, які графічні елементи у вас вже є:')}</p>
                    </div>

                    <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="existing_graphics[]" value="corporate_style_brandbook" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Фірмовий стиль (Brandbook)')}</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="existing_graphics[]" value="logo_in_vector" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Логотип у векторі')}</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="existing_graphics[]" value="corporate_fonts" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Корпоративні шрифти')}</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="existing_graphics[]" value="corporate_colors" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Корпоративні кольори')}</p></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-graphics-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-graphics-other" name="existing_graphics_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи є у вас контент для сайту (текст, фото, відео)?')}</p>
                    </div>

                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_content" value="yes" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так, є')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_content" value="no" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_content" value="partial" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так, але не весь')}</p></div>
                      </label>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-add-language">
                      <p>{t('Чи варто продумувати мультимовність сайту? Якщо так, якими мовами він буде')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-add-language" name="additional_language" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-cms">
                      <p>{t('Чи буде інтеграція з CMS системою, якщо так, то якою')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-cms" name="cms_integration" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-change-current">
                      <p>{t('Що не влаштовує на поточному сайті?')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-change-current" name="change_in_current_website" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  {/* Mobile/Desktop first */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи варто розробляти mobile first або desktop first дизайн')}</p>
                    </div>

                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="priority_platform" value="mobile_first" />
                        <div className="brief__field-radio-name__brifes"><p>Mobile first</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="priority_platform" value="desktop_first" />
                        <div className="brief__field-radio-name__brifes"><p>Desktop first</p></div>
                      </label>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-priority-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-priority-other" name="priority_platform_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  {/* Інформаційна архітектура */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи є у вас інформаційна архітектура сайту?')}</p>
                    </div>

                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="info_architecture" value="yes" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="info_architecture" value="no" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні')}</p></div>
                      </label>

                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="info_architecture" value="not_finished" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так, але не завершено')}</p></div>
                      </label>
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-main-page">
                      <p>{t('Що має бути на головній сторінці')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-main-page" name="main_page_content" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="ws-internal-pages">
                      <p>{t('Які внутрішні сторінки ви хотіли б бачити у себе на веб-сайті. (Прим. Ціни, особистий кабінет користувача, приклади робіт)')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="ws-internal-pages" name="internal_pages" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* FILE ATTACHMENT */}
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

              {/* SUBMIT / RESET */}
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
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
