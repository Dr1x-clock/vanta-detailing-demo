# VANTA DETAILING

Одностраничный сайт вымышленной детейлинг-студии для коммерческого портфолио. В проекте используются HTML, CSS и JavaScript. Все ресурсы страницы хранятся локально, сборка и установка зависимостей не нужны.

## Как открыть

Откройте `index.html` в браузере. Для просмотра по HTTP запустите в PowerShell из папки проекта:

```powershell
py -m http.server 8765 --bind 127.0.0.1
```

Затем откройте [http://127.0.0.1:8765/](http://127.0.0.1:8765/). Команда требует Python 3. Сервер останавливается сочетанием Ctrl+C в том же окне.

## Публикация на GitHub Pages

1. Когда будете готовы к публичному показу, создайте публичный репозиторий на GitHub и загрузите содержимое папки в корень ветки `main`, включая `.nojekyll`.
2. В **Settings → Pages** выберите **Deploy from a branch**, ветку **main** и папку **/ (root)**. Нажмите **Save**.
3. После сборки откройте адрес из **Settings → Pages**. Пути к ресурсам относительные, поэтому сайт работает и по адресу вида `https://username.github.io/repository/`.

[Документация GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Форма в демонстрационном режиме

Кнопки из прайса подставляют услугу в форму. Форма проверяет выбор, имя и контакт в браузере. Она принимает email или телефон из 10–15 цифр с обычными разделителями. После проверки пользователь видит, что заявка не отправлена. Данные формы не передаются по сети и не записываются в хранилище сайта.

Для подключения реальных заявок используйте отмеченное место в обработчике `submit` в `script.js`. Объект `request` содержит `service`, `name` и `contact`. Передавайте его методом POST на HTTPS-адрес обработчика, который повторно проверяет поля и подтверждает приём заявки. Если обработчик расположен на другом домене, настройте CORS на его стороне. Обновите статус формы для ожидания, подтверждения и ошибки, а в `index.html` замените демонстрационные контакты, цены и тексты на утверждённые владельцем. Секретные ключи храните только на сервере.

## Структура проекта

| Файл или папка | Содержимое |
| --- | --- |
| `index.html` | Разделы сайта, форма, метаданные и ссылки на источники |
| `styles.css` | Типографика, адаптивные сетки и состояния элементов |
| `script.js` | Мобильное меню, выбор услуги из прайса и проверка формы |
| `assets/images/` | Фотографии в WebP, включая варианты для первого экрана |
| `assets/fonts/` | Локальные файлы Manrope и текст лицензии |
| `assets/favicon.svg` | Значок сайта |
| `.nojekyll` | Публикация статических файлов на GitHub Pages |

## Источники фотографий

Фотографии иллюстрируют услуги. Файлы подготовлены для сайта кадрированием, цветокоррекцией и сжатием в WebP. Исходники распространяются по [лицензии Unsplash](https://unsplash.com/license), которая разрешает коммерческое использование фотографий. Марки автомобилей принадлежат их правообладателям.

| Файл в `assets/images/` | Автор и оригинал |
| --- | --- |
| `hero.webp`, `hero-medium.webp`, `hero-mobile.webp` | [Luca Angilello](https://unsplash.com/photos/a-sleek-black-porsche-is-displayed-0-Il8Ct9Sz8) |
| `polish.webp` | [Luke Miller](https://unsplash.com/photos/the-front-of-a-black-porsche-eNBRrqfpPIg) |
| `interior.webp` | [Graham Mansfield](https://unsplash.com/photos/the-interior-of-a-car-with-a-steering-wheel-qNL7D80Rl-M) |
| `protection.webp` | [Ben Wicks](https://unsplash.com/photos/close-up-of-water-droplets-on-a-dark-surface-7EMYjpQ4IG4) |
| `complete.webp` | [Nejc Soklič](https://unsplash.com/photos/a-black-sports-car-parked-in-front-of-a-building-_c21lKtR9-M) |
| `studio.webp` | [Hasnain Sikora](https://unsplash.com/photos/black-porsche-carrera-from-behind-Onll1-aGi8s) |

Шрифт [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) распространяется по SIL Open Font License 1.1. Текст лицензии находится в `assets/fonts/OFL.txt`.
