import BriefForm from '../../../../components/BriefForm'
import { getLocale } from '../../../../lib/locale'
import { makeT } from '../../../../lib/t'

export const metadata = {
  title: 'Бриф: відео · Kolir',
  description: 'Заповніть бриф для розробки відео — Kolir Agency повернеться з планом та оцінкою.',
}

export default async function BriefVideoPage() {
  const locale = await getLocale()
  const t = makeT(locale)
  return (
    <div className="wrapper__brifes">
      <main className="main__brifes">
        <section className="brief__brifes" id="briefs">
          <div className="container__brifes">
            <BriefForm className="brief__form__brifes" id="form" locale={locale}>
              <input type="hidden" name="brief_type" value="video" />

              {/* HEAD */}
              <div className="brief__item__brifes brief__item--head__brifes">
                <div className="brief__heading__brifes">
                  <h1 data-reveal="up">{t('Бриф для розробки відео')}</h1>
                </div>

                <div className="brief__subheading__brifes">
                  <p>{t('* Обов\'язково')}</p>
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
                    <label className="brief__field-name__brifes" htmlFor="video-email">
                      <p>{t('Електронна пошта *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="email" id="video-email" name="email" placeholder="e-mail@example.com" autoComplete="email" required />
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
                  {/* Сайт компанії */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="corp-website">
                      <p>{t('Сайт компанії *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="url" id="corp-website" name="corporate_website" placeholder={t('Посилання...')} required />
                    </div>
                  </div>

                  {/* Продукт */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="product-service">
                      <p>{t('Продукт, про який буде відео-ролик *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="product-service" name="product_or_service" placeholder={t('Коротка відповідь...')} required />
                    </div>
                  </div>

                  {/* Назва компанії */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="company-name">
                      <p>{t('Вкажіть, будь ласка, назву компанії (або прізвище, ім\'я) *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="company-name" name="company_name" placeholder={t('Коротка відповідь...')} required />
                    </div>
                  </div>

                  {/* Сценарій */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи є сценарій з розкадруванням та розписаним хронометражем? *')}</p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_scenario" value="yes" required />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так, готовий надати')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_scenario" value="no" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні, потрібно розробити сценарій')}</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Аніматики/рефи */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи є аніматики чи рефи анімації персонажів, бекграундів, інтерфейсу, ефектів, інших елементів, які потрібно буде анімувати у відео?')}</p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_animation_refs" value="yes" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так (можу надати)')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_animation_refs" value="no" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні (створіть для нас)')}</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Тексти */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи є тексти для відео?')}</p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_texts" value="yes" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так, готовий надати')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_texts" value="no_text_needed" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні, текст не потрібен')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_texts" value="no_need_develop" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні, потрібно розробити текст')}</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Графіка */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи є графіка для відео?')}</p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_graphics" value="yes" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так, готовий надати')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="has_graphics" value="no" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні, потрібно розробити графіку')}</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Персонажі зариговані */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Персонажі зариговані та готові для анімації?')}</p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="characters_rigged" value="yes" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так (можу надати)')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="characters_rigged" value="no" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні (створіть для нас)')}</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Роздільна здатність */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Який дозвіл потрібний?')}</p>
                    </div>

                    <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="resolution[]" value="uhd_8k_7680x4320" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>UHD 8K 7680×4320</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="resolution[]" value="uhd_4k_4096x3112" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>Ultra HD 4K 4096×3112</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="resolution[]" value="full_hd_1920x1080" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>Full HD 1080p 1920×1080</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="resolution[]" value="full_hd_1440x1080" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>Full HD 1440×1080</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="resolution[]" value="hd_ready_1280x720" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>HD Ready 1280×720</p></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Роздільна здатність — інше */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="resolution-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="resolution-other" name="resolution_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  {/* Озвучення диктора */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи потрібне озвучення диктора?')}</p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="need_voiceover" value="yes" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Так')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="need_voiceover" value="no" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Ні')}</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Музика та ліцензія */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Чи потрібна музика та ліцензія музичної композиції')}</p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="music_license" value="stock_music" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Стокова музика')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="music_license" value="music_licence" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Музична ліцензія')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="music_license" value="dont_needed" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Не потрібно')}</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Музика — інше */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="music-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="music-other" name="music_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  {/* Стать диктора */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Стать диктора')}</p>
                    </div>
                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="speaker_gender" value="female" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Жіноча')}</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="speaker_gender" value="male" />
                        <div className="brief__field-radio-name__brifes"><p>{t('Чоловіча')}</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Стиль подачі */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="voice-style">
                      <p>{t('Стиль подачі озвучки')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="voice-style" name="voice_acting_style" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  {/* Мови відео */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="video-languages">
                      <p>{t('Вкажіть, будь ласка, всі мови, якою буде перекладено відео')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="video-languages" name="video_languages" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  {/* Тривалість ролика */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Вкажіть, будь ласка, тривалість ролика *')}</p>
                    </div>

                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_duration" value="10-15" required />
                        <div className="brief__field-radio-name__brifes"><p>10–15 seconds</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_duration" value="20-30" />
                        <div className="brief__field-radio-name__brifes"><p>20–30 seconds</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_duration" value="30-60" />
                        <div className="brief__field-radio-name__brifes"><p>30–60 seconds</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_duration" value="60-90" />
                        <div className="brief__field-radio-name__brifes"><p>60–90 seconds</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_duration" value="90-120" />
                        <div className="brief__field-radio-name__brifes"><p>90–120 seconds</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Тривалість — інше */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="duration-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="duration-other" name="video_duration_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  {/* Тип ролику */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Тип ролику *')}</p>
                    </div>

                    <div className="brief__field-radios__brifes">
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_type" value="brand_videos" required />
                        <div className="brief__field-radio-name__brifes"><p>Brand videos</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_type" value="explainer" />
                        <div className="brief__field-radio-name__brifes"><p>Explainer video</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_type" value="industrial" />
                        <div className="brief__field-radio-name__brifes"><p>Industrial video</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_type" value="movie_clips" />
                        <div className="brief__field-radio-name__brifes"><p>Movie clips</p></div>
                      </label>
                      <label className="brief__field-radio__brifes">
                        <input type="radio" name="video_type" value="storytelling" />
                        <div className="brief__field-radio-name__brifes"><p>Storytelling</p></div>
                      </label>
                    </div>
                  </div>

                  {/* Тип ролику — інше */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="video-type-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="video-type-other" name="video_type_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  {/* Приклади роликів */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="examples-like">
                      <p>{t('Приклади роликів, які вам подобаються (за стилем, структурою, концепцією та ін.). Прикріпіть будь-ласка посилання *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="url" id="examples-like" name="examples_links" placeholder={t('Посилання')} required />
                    </div>
                  </div>

                  {/* Максимальна вага */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="max-size-mb">
                      <p>{t('Максимальна вага в Mb')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="number" id="max-size-mb" name="max_size_mb" min="0" step="1" placeholder={t('Вкажіть розмір')} />
                    </div>
                  </div>

                  {/* Майданчик для розміщення */}
                  <div className="brief__field__brifes">
                    <div className="brief__field-name__brifes">
                      <p>{t('Майданчик для розміщення')}</p>
                    </div>

                    <div className="brief__fields__brifes brief__fields--checkbox__brifes">
                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="placement[]" value="youtube" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>YouTube</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="placement[]" value="tv" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>TV</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="placement[]" value="facebook" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>Facebook</p></div>
                        </label>
                      </div>

                      <div className="brief__field__brifes">
                        <label className="brief__field-checkbox__brifes">
                          <input type="checkbox" name="placement[]" value="tiktok" />
                          <div className="brief__field-pic__brifes" aria-hidden="true"></div>
                          <div className="brief__field-checkbox-name__brifes"><p>TikTok</p></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Майданчик — інше */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="placement-other">
                      <p>{t('Інше')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="placement-other" name="placement_other" placeholder={t('Ваш текст')} />
                    </div>
                  </div>

                  {/* Де розміщуватиметься відео */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="where-placed">
                      <p>{t('Вкажіть, будь ласка, де розміщуватиметься відео')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="where-placed" name="where_video_placed" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  {/* Основна мета ролика */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="main-goal">
                      <p>{t('Основна мета ролика *')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="main-goal" name="main_goal" placeholder={t('Коротка відповідь')} required />
                    </div>
                  </div>

                  {/* Дата отримання фінальної версії */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="final-version-date">
                      <p>{t('Коли ви хотіли б отримати фінальну версію відео-ролика?')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="final-version-date" name="final_version_date" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>

                  {/* Додаткова інформація */}
                  <div className="brief__field__brifes">
                    <label className="brief__field-name__brifes" htmlFor="additional-essential">
                      <p>{t('Вкажіть, будь ласка, які ще моменти нам необхідно врахувати під час створення ролика')}</p>
                    </label>
                    <div className="brief__field-input__brifes">
                      <input type="text" id="additional-essential" name="additional_essential_info" placeholder={t('Коротка відповідь')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Завантаження файлу */}
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

              {/* FOOTER форми */}
              <div className="brief__item__brifes brief__item--foot__brifes">
                <div className="brief__file-info__brifes">
                  <p>{t('Копії відповідей будуть надіслані на вказану вами адресу.')}</p>
                </div>

                <div className="brief__buttons__brifes">
                  <button className="button__brifes button--submit__brifes" type="submit" data-magnetic="0.2">
                    <span>{t('Надіслати бриф')}</span>
                  </button>
                  <button className="button__brifes button--reset__brifes" type="reset">
                    <span>{t('Очистити форму')}</span>
                  </button>
                </div>
              </div>
            </BriefForm>

            {/* POPUP: підтвердження очищення форми */}
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
                        <span>{t('Очистити')}</span>
                      </button>
                      <button className="button__brifes button--cancel__brifes" type="button">
                        <span>{t('Скасувати')}</span>
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
