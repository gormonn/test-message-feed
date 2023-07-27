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
  - [x] Add keyboard shortcuts
  - [x] Fix line break of messages
- [x] UserInfo with user's messages
  - [x] Add router
  - [x] Add layout with user's info and filtered feed
- [ ] Filtration
  - [ ] Add filter UI by text and user
  - [ ] Add filter logic to model
  - [ ] Add highlight wrapper to texts
  - [ ] Resolve AND/OR problems
    - [ ] Mb discuss this later
  - [ ] Add additional filters to UserInfo page
  
- [ ] Beautify and tech debt
  - [ ] Fix time format
  - [ ] Fix date format
  - [ ] Add Skeleton loading animation
  - [ ] Add aria?
  - [ ] Add cheat-sheet with keyboard shortcuts 
  - [ ] Use mount/unmount instead of display:none in Modal 
- [ ] Build optimizations
  - [ ] css & js minimize

- Known Bugs:
  * [ ] Twice rendering http://localhost:5173/profile/:id
  - [ ] Reset feed mock data on route
  - [ ] On change feedCount and reload, smooth scroll down. It will be loaded on down;
  - UserAvatar / UserFullName:
    - [ ] Bad skeletons layout
    - [ ] Refactoring skeletons like that:
      ```javascript lines
        <img/>
        {isLoading && <Skeleton/>}
      ```
    - [ ] Add debounce / cancellation to load users/avatars while scrolling

- Tech Debt:
  - [ ] Add stable mocks for testing purposes (e.g. user profile page)
  - [ ] User cache control (need to choose a strategy)
  - [ ] Use contenteditable instead of textarea (to use stickers)
  - [ ] Sending / Delivered / Seen / Error

Comments:
- type FeedMessage have userId field instead of userFullName / userAvatar fields:
  - It can depends on API design
  - Pros:
    - Light version of the message
  - Cons:
    - Additional delay when first loading a user
    - Need to manage user cache
- I request all messages at once:
  - It's a bad practice in real life, when the feed is big
  - So in real life, we need to request messages in parts (by date, page/limit/offset, etc.)
- I use REST API instead of WS or SSE:
  - In real life, we need to communicate in real time, but task is very abstract by requirements

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
