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
- [x] Add new message
  - [x] Add modal with textarea and symbols count checker 
  - [x] API method (done)
  - [x] Optimistic Update chat on message
  - [x] Auto focus input 
  - [x] Handle ESC/ENTER key press
- [ ] UserInfo with user's messages
  - [ ] Add layout with user's info
  - [ ] Add model for get messages by user
- [ ] Filtration
  - [ ] Add filter UI by text and user
  - [ ] Add filter logic to model
  - [ ] Add highlight wrapper to texts
  - [ ] Resolve AND/OR problems
    - [ ] Mb discuss this later
- [ ] Beautify and tech debt
  - [ ] Add aria?
- [ ] Build optimizations
  - [ ] css & js minimize
 

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
