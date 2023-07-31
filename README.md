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
- [ ] Cache Images from stable mocks (to indexed db?)  
- [ ] Add debounce / cancellation to load users/avatars while scrolling 
- [ ] Feed movement between found words / users (if using "search" instead of "filter by text")


## Profile Routing
Since mocks are generated on the fly, you can's open the same profile after reload page.
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
  - [ ] Bad skeletons layout UserAvatar / UserFullName
  - [ ] List of users does not follow input when resized (fix or use floating UI)
  - [ ] Wrong type in shortcutsKeys

# Tech Debt:
  - [x] Add stable mocks for testing purposes (e.g. user profile page)
  - [ ] https://www.w3.org/WAI/ARIA/apg/#dialog_modal
  - [ ] Use contenteditable instead of textarea (to use stickers)
  - [ ] Add message state: Pending / Delivered / Seen / Error
  - [ ] May be use some UI lib

# Comments:
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

## IndexedDB doesn't work in Firefox Incognito
[issue](https://bugzilla.mozilla.org/show_bug.cgi?id=781982)

## Huge amount of data
I did a little research and here's what I found out.
Almost any virtualization library has a big data problem:
- [react-virtuoso](https://github.com/petyosi/react-virtuoso/issues/728)
- [@tanstack/react-virtual](https://github.com/TanStack/virtual/issues/460)
- [react-cool-virtual](https://github.com/wellyshen/react-cool-virtual/issues/520)

This is due to CSS [restrictions](https://stackoverflow.com/questions/16637530/whats-the-maximum-pixel-value-of-css-width-and-height-properties) on the height of elements:
However, it is also reported that there is no such problem in the *react-virtualized* library.
This is cool, but quite risky because this library is not supported.
Try: [@egjs/infinitegrid](https://github.com/naver/egjs-infinitegrid)

It is hypothetically possible to "work around" this problem with some methods:
- lazy loading content in both directions
- list content management, to remove unused messages at the moment
- message caching
Thus, we will come to the implementation of the "virtual window" but in a slightly different context.
 
