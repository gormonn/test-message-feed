# Publish to Github Pages
[Vite Static Deploy](https://vitejs.dev/guide/static-deploy.html#github-pages)
Pipeline starts after push to main.

# Comments:
## Architecture and state
Here I am using the [FSD](https://feature-sliced.design/) methodology with [Effector](https://effector.dev/).

## Type of FeedMessage contains userId prop instead of userFullName / userAvatar props:
  - It can depends on API design
  - Pros:
    - Light version of the message
  - Cons:
    - Additional delay when first loading a user
    - Need to manage user cache
    
## Request all messages at once:
  - It's a bad practice in real life, when the feed is big
  - So in real life, we need to request messages in parts (by date, page/limit/offset, etc.)

## Using REST API instead of WS or SSE:
  - In real life, we need to communicate in real time, but task is very abstract by requirements

# Task
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
- [x] Filtration
  - [x] Add filter UI by text and user
  - [x] Add filter logic to model
  - [x] Resolve AND/OR problems
  - [x] Add additional filters to UserInfo page
  - [x] Add highlight wrapper to texts
- [ ] Beautify and tech debt
  - [ ] Fix time format
  - [ ] Fix date format
  - [ ] Add Skeleton loading animation
  - [ ] Add aria?
  - [ ] Use mount/unmount instead of display:none in Modal 
- [ ] Build optimizations
  - [ ] css & js minimize
 
# Additional Features
## Common 
- [x] Add Keyboard Shortcuts Cheat Sheet
- [ ] Fix deplow workflow with pnpm: [issue](https://github.com/orgs/pnpm/discussions/3953)
- [ ] Cache Images from stable mocks (to indexed db?)  
- [ ] Add debounce / cancellation to load users/avatars while scrolling 
- [ ] Feed movement between found words / users (if using "search" instead of "filter by text")


## Profile Routing
Since mocks are generated on the fly, you can's open the same profile after reload can't
For thar purpose:
- [x] Add stable mocks for testing purposes (e.g. user profile page) with LocalStorage
- [ ] Add stable mocks with InnoDB

# Known Bugs:
  - [x] currentUser still random
  - [x] Empty search text doesn't reset the filter by text
  - [x] Reset filter doesn't work properly in profile (nothing changed in feed)
  - [x] Filter doesn't reset on change route (closeGate?)
  - [x] Twice rendering http://localhost:5173/profile/:id 
  - [x] On change feedCount and reload page -> smooth scroll down. (Flickering / Scrolling on filter)
  - [ ] May have accessibility issues. Problem with focus in "Filter By Users". 
  - [ ] Bad skeletons layout UserAvatar / UserFullName
  - [ ] List of users does not follow input when resized (fix or use floating UI)
  - [ ] Wrong type in shortcutsKeys

# Tech Debt:
  - [x] Add stable mocks for testing purposes (e.g. user profile page)
  - [ ] https://www.w3.org/WAI/ARIA/apg/#dialog_modal
  - [ ] Use contenteditable instead of textarea (to use stickers)
  - [ ] Add message state: Pending / Delivered / Seen / Error
  - [ ] May be use some UI lib
