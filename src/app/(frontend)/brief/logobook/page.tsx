import BriefForm from '../../../../components/BriefForm'
import { getLocale } from '../../../../lib/locale'
import { makeT } from '../../../../lib/t'

export const metadata = {
  title: 'Бриф: логобук · Kolir',
  description: 'Заповніть бриф на розробку логобука — і Kolir повернеться з планом та оцінкою.',
}

export default async function BriefLogobookPage() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <div className="wrapper__brifes">
      <main className="main__brifes">
        <section className="brief__brifes" id="briefs">
          <div className="container__brifes">
            <BriefForm
              className="brief__form__brifes"
              id="brief-logobook-form"
              data-kolir-brief="logobook"
              locale={locale}
            >
              <input type="hidden" name="brief_type" value="logobook" />

              {/* HEAD */}
              <div className="brief__item__brifes brief__item--head__brifes">
                <div className="brief__heading__brifes" data-reveal="up">
                  <h1>{t('Бриф на розробку логобука')}</h1>
                </div>

                <div className="brief__subheading__brifes">
                  <p>{t('* Обов\'язково')}</p>
                </div>

                <div className="brief__description__brifes">
                  <p>
                    Будь ласка, надайте якнайбільше інформації. Це необхідно для того, щоб ми могли
                    максимально зануритися в розробку і надати вам ідеальний варіант.
                    <br /><br />
                    Всі специфічні питання, не викладені в даному технічному завданні, трактуватимуться
                    дизайнером як невизначені, і виконання дизайн-робіт в рамках неосвітлених замовником
                    питань дизайнер здійснює, ґрунтуючись на власному досвіді та професійних знаннях.
                  </p>
                </div>
              </div>

              {/* GENERAL */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Основне')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-email">
                      <p>{t('Електронна пошта *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input
                        type="email"
                        id="logobook-email"
                        name="email"
                        placeholder="e-mail@example.com"
                        autoComplete="email"
                        required
                      />
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

              {/* MARKETING */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Маркетинг')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-project-desc">
                      <p>{t('Опис проекту (тезово)')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-project-desc" name="project_description" placeholder={t('Наш проект займається...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-heard">
                      <p>{t('Як ви про нас почули?')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-heard" name="how_heard" placeholder={t('Напишіть свій варіант...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-name-wordmark">
                      <p>{t('Назва – те, що використовуємо у Вордмарку')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-name-wordmark" name="name_wordmark" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-why-change">
                      <p>{t('Чому потрібно змінити логотип та фірмовий стиль? Що хотілося б змінити насамперед?')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-why-change" name="why_change_logo" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* PREFERENCES */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Уподобання')}</h2>
                </div>

                <div className="brief__subtitle__brifes">
                  <p>{t('Який тип логотипу вам подобається найбільше? *')}</p>
                </div>

                <div className="brief__note__brifes">
                  <p>{t('*Всі логотипи представлені лише з ознайомлювальною метою і належать не нам')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_1">
                      <input type="checkbox" id="logo_type_ref_1" name="logo_type_ref[]" value="integrated_1" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/1.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Інтегрований')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_2">
                      <input type="checkbox" id="logo_type_ref_2" name="logo_type_ref[]" value="integrated_2" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/2.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Інтегрований')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_3">
                      <input type="checkbox" id="logo_type_ref_3" name="logo_type_ref[]" value="typographic" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/3.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Композиційно-шрифтовий')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_4">
                      <input type="checkbox" id="logo_type_ref_4" name="logo_type_ref[]" value="character" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/4.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Персонаж')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_5">
                      <input type="checkbox" id="logo_type_ref_5" name="logo_type_ref[]" value="symbol_only" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/5.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Тільки знак')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_6">
                      <input type="checkbox" id="logo_type_ref_6" name="logo_type_ref[]" value="coat_of_arms" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/6.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Герб')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_7">
                      <input type="checkbox" id="logo_type_ref_7" name="logo_type_ref[]" value="emblem" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/7.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Емблема')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_8">
                      <input type="checkbox" id="logo_type_ref_8" name="logo_type_ref[]" value="ligature_1" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/8.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Лігатура')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_9">
                      <input type="checkbox" id="logo_type_ref_9" name="logo_type_ref[]" value="ligature_2" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/9.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Лігатура')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_type_ref_10">
                      <input type="checkbox" id="logo_type_ref_10" name="logo_type_ref[]" value="ornament" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/logo/10.png" alt="Logo" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Орнамент')}</p></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* STYLE */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Стиль')}</h2>
                </div>

                <div className="brief__subtitle__brifes">
                  <p>{t('Виберіть стилі, які вам найбільше подобаються *')}</p>
                </div>

                <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_1">
                      <input type="checkbox" id="logo_style_ref_1" name="logo_style_ref[]" value="style_1" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/1.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Інтегрований')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_2">
                      <input type="checkbox" id="logo_style_ref_2" name="logo_style_ref[]" value="style_2" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/2.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Інтегрований')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_3">
                      <input type="checkbox" id="logo_style_ref_3" name="logo_style_ref[]" value="style_3" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/3.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Композиційно-шрифтовий')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_4">
                      <input type="checkbox" id="logo_style_ref_4" name="logo_style_ref[]" value="style_4" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/4.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Персонаж')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_5">
                      <input type="checkbox" id="logo_style_ref_5" name="logo_style_ref[]" value="style_5" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/5.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Тільки знак')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_6">
                      <input type="checkbox" id="logo_style_ref_6" name="logo_style_ref[]" value="style_6" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/6.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Герб')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_7">
                      <input type="checkbox" id="logo_style_ref_7" name="logo_style_ref[]" value="style_7" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/7.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Емблема')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_8">
                      <input type="checkbox" id="logo_style_ref_8" name="logo_style_ref[]" value="style_8" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/8.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Лігатура')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_9">
                      <input type="checkbox" id="logo_style_ref_9" name="logo_style_ref[]" value="style_9" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/9.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Лігатура')}</p></div>
                    </label>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-checkbox__brifes" htmlFor="logo_style_ref_10">
                      <input type="checkbox" id="logo_style_ref_10" name="logo_style_ref[]" value="style_10" />
                      <div className="brief__field-pic__brifes">
                        <img src="/img/checkboxes/style/10.png" alt="Style" width="143" height="143" />
                      </div>
                      <div className="brief__field-checkbox-name__brifes"><p>{t('Орнамент')}</p></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* COMPETITORS */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Конкуренти')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-competitors">
                      <p>{t('Ваші конкуренти / аналоги на ринку')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-competitors" name="competitors" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-advantages">
                      <p>{t('Переваги вашого проекту (на що робимо акцент):')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-advantages" name="advantages" placeholder={t('Наш проект...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-differences">
                      <p>{t('Основні відмінності від конкурентів')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-differences" name="differences" placeholder={t('Наш продукт...')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* AUDIENCE */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Аудиторія')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-ta">
                      <p>{t('Цільова аудиторія (для кого працюємо: наш споживач, наш регіон)')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-ta" name="target_audience" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-mood">
                      <p>{t('Настрій (яке відчуття має робити Бренд на аудиторію?)')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-mood" name="brand_mood" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-like-projects">
                      <p>{t('Які проекти вам подобаються стилістично (можна посиланням на логотип/сайт) та чому')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-like-projects" name="liked_projects" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-features">
                      <p>{t('Особливості/фічі, на яких ви хочете зробити додатковий акцент?')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-features" name="extra_emphasis" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ADDITIONAL LOGO BOOK ELEMENTS */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Додаткові елементи логобука')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-colors">
                      <p>{t('Яким кольорам надаєте перевагу?')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-colors" name="preferred_colors" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Які шрифти вам подобаються?')}</p>
                    </div>

                    <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes" htmlFor="fonts_ref_1">
                          <input type="checkbox" id="fonts_ref_1" name="fonts_ref[]" value="font_1" />
                          <div className="brief__field-pic__brifes">
                            <img src="/img/checkboxes/style/1.png" alt="Font ref" width="143" height="143" />
                          </div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Варіант 1')}</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes" htmlFor="fonts_ref_2">
                          <input type="checkbox" id="fonts_ref_2" name="fonts_ref[]" value="font_2" />
                          <div className="brief__field-pic__brifes">
                            <img src="/img/checkboxes/style/2.png" alt="Font ref" width="143" height="143" />
                          </div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Варіант 2')}</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes" htmlFor="fonts_ref_3">
                          <input type="checkbox" id="fonts_ref_3" name="fonts_ref[]" value="font_3" />
                          <div className="brief__field-pic__brifes">
                            <img src="/img/checkboxes/style/3.png" alt="Font ref" width="143" height="143" />
                          </div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Варіант 3')}</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes" htmlFor="fonts_ref_4">
                          <input type="checkbox" id="fonts_ref_4" name="fonts_ref[]" value="font_4" />
                          <div className="brief__field-pic__brifes">
                            <img src="/img/checkboxes/style/4.png" alt="Style" width="143" height="143" />
                          </div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Варіант 4')}</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes" htmlFor="fonts_ref_5">
                          <input type="checkbox" id="fonts_ref_5" name="fonts_ref[]" value="font_5" />
                          <div className="brief__field-pic__brifes">
                            <img src="/img/checkboxes/style/5.png" alt="Style" width="143" height="143" />
                          </div>
                          <div className="brief__field-checkbox-name__brifes"><p>{t('Варіант 5')}</p></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FINAL DETAILS */}
              <div className="brief__item__brifes">
                <div className="brief__title__brifes" data-reveal="up">
                  <h2>{t('Останні уточнення')}</h2>
                </div>

                <div className="brief__fields__brifes">
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-merch">
                      <p>{t('Вкажіть для якої фірмової продукції вам потрібний дизайн')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-merch" name="brand_materials" placeholder={t('Футболка, кепка, папка...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-bc-fields">
                      <p>{t('Вкажіть необхідні поля для візитки')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-bc-fields" name="business_card_fields" placeholder={t('Моя відповідь...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-bc-data">
                      <p>{t('Вкажіть дані для візитки (якщо вже відомо)')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-bc-data" name="business_card_data" placeholder={t('ПІБ, посада, адреса, телефон, сайт...')} />
                    </div>
                  </div>

                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="logobook-comment">
                      <p>{t('Додатковий коментар')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="logobook-comment" name="additional_comment" placeholder={t('Хочу ще додати...')} />
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
                        {t('Ви можете прикріпити додатковий файл із ТЗ або презентацією')} <br /><span>(опціонально)</span>
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
