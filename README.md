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
  - [ ] Add highlight wrapper to texts
- [ ] Beautify and tech debt
  - [ ] Fix time format
  - [ ] Fix date format
  - [ ] Add Skeleton loading animation
  - [ ] Add aria?
  - [ ] Use mount/unmount instead of display:none in Modal 
  - [ ] DX lint imports
- [ ] Build optimizations
  - [ ] css & js minimize
 
# Additional Features
## Common
- [ ] Add cheat-sheet with keyboard shortcuts
- [ ] Cache Images from stable mocks
## User
- [ ] Edit User Data
## Feed
- [ ] Add debounce / cancellation to load users/avatars while scrolling
- [x] Press Ctrl + F to focus on Text Filter


## Profile Routing
Since mocks are generated on the fly, you can's open the same profile after reload page.
For thar purpose:
- [x] Add stable mocks for testing purposes (e.g. user profile page) with LocalStorage
- [ ] Add stable mocks with InnoDB

# Known Bugs:
  - [ ] List of users does not follow input when resized (fix or use floating UI)
  * [ ] Twice rendering http://localhost:5173/profile/:id 
  - [ ] On change feedCount and reload page -> smooth scroll down. (Flickering / Scrolling on filter) Try @tanstack/react-virtual
  - UserAvatar / UserFullName:
    - [ ] Bad skeletons layout
    - [ ] Refactoring skeletons like that:
      ```javascript lines
        <img/>
        {isLoading && <Skeleton/>}
      ```

# Tech Debt:
  - [ ] https://www.w3.org/WAI/ARIA/apg/#dialog_modal
  - [ ] Add stable mocks for testing purposes (e.g. user profile page)
  - [ ] User cache control (need to choose a strategy)
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

# Using REST API instead of WS or SSE:
  - In real life, we need to communicate in real time, but task is very abstract by requirements
