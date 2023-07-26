Лента текстовых сообщений с фильтрацией.
Сообщения состоят из:
- даты и времени;
- текста;
- автора.

Модальное окно добавления нового сообщения
- Поле ввода текста со счётчиком символов и ограничением по длине 200 знаков.

Страница автора:
- произвольная информация по автору;
- список сообщений.

Roadmap:
- [x] Fake API 
  - [x] Generate data with config
  - [x] Fake AxiosInstance
  - [x] Add API client methods
- [x] Chat Layout
  - [x] Virtual list
  - [x] Scroll from bottom
  - [x] "Go back" button
- [ ] Add new message
  - [ ] Add modal with textarea and symbols count checker 
  - [x] API method (done)
  - [ ] Update chat
- [ ] Searching
  - [ ] Add highlight wrapper to texts 
  - [ ] Add search logic to model
- [ ] Filtration
  - [ ] Add filter UI by user, and by 
  - [ ] Add filter logic to model
- [ ] Search + Filter, AND/OR problems
  - [ ] Ask an HR about this
- [ ] UserInfo with user's messages
  - [ ] Add layout with user's info
  - [ ] Add model for get messages by user
- [ ] Beautify and tech debt
- [ ] Build optimizations
  - [ ] css & js minimize


Обращения к серверу можно замокать и описать требуемое API.
- get /feed
    - date
    - user
    - text
- post /feed
    - text: string
    - user
- get /feed
    - users: [1,2,3] // не обязательно, т.к. для Страницы автора достаточно user=1, что гипотетически удовлетовряет условиям
    - text: 'string'
- get /user/me - информация о пользователе
- get /user/feed - сообщения текущего пользователя
- get /user/1/ - информация о пользователе
- get /user/1/feed - сообщения пользователя

UX/UI
- виртуализация (check)
- возврат в последнему сообщению (done)
- добавить разделение по датам? (done)

todo:
- вероятно будет баг с датами (done)
- добавить минификацию js/css (попробовать lightningcss?)
- скроллинг снизу вверх (done)


Предположим, что фид реализован через REST api. (о_0 не вебсокеты)

Ибо на чистых моках скучно, особенно учитывая что оценивается UX.

Если приложение уже имеет данные, UX может сильно отличаться.

Не нужно ждать загрузку и т.д. и т.п.


Мотивация:
Кажется, что фейковое апи в текущей реализации - лишнее.
Т.к. для ux/ui можно обойтись моками в памяти приложения.

Например, если сообщений очень много, то фильтровать на фронтенде бессмысленно,
т.к. мы не можем гарантировать что загрузили в память все сообщения.

Из данных соображений, мы можем реализовать гибридную фильтрацию.

То есть, если сообщений не много, то мы фильтруем их на фронтенде.

// однако, если это например, реалтайм-чат, то здесь больше смысла в вебсокетах


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
