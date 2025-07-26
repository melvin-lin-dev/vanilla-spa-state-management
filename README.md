# TECHNOLOGIES

- **HTML**
- **CSS** - TailwindCSS
- **JAVASCRIPT**


# PURPOSES/EXPERIMENTS
- [x] Implement state management from scratch
- [x] Implement SPA (Single Page Application) from scratch


# FEATURES

## Posts Page
- [x] Load Posts
- [x] Search Posts and Highlight
- [x] Posts pagination
- [x] Highlight "rerum" in 'body' field
- [x] Show popup of post comments on "comments" button clicked

## Reports Page
- [x] Count posts with "rerum" in the 'body' field
- [x] Count users post with (User ID, Post Count)

## Potential Improvement
- [ ] Create proper state management layer
- [ ] Extract routes handling to a class
- [ ] routes per module
- [ ] UI/UX improvements
- [ ] Lazy load module


# DOCUMENTATIONS

## Folder Pattern
- /assets
    - /images
        - /logo.png
- /libs **Contain logic of modules, could contain reusable component in the future**
    - /modules
        - /post **Post module contain services, in the future might contain other than services such as model, form rules, dto, etc.**
            - /models *Potential development*
                - /post.ts **Use TypeScript for data types**
            - /services **Service logic related to post**
                - /post.service.js **xxxxx.service.js, with xxxxx as the module name**
            - /repositories **Handling subscribe values**
                - /post-interaction.repository.js **xxxxx-interaction.repository.js, with xxxxx as the module name, focus handling user interaction**
                - /post.repository.js **xxxxx.repository.js, with xxxxx as the module name, focus handling data**
            - /queries **Query logic connect to main service**
                - /post.query.js **xxxxx.query.js, with xxxxx as the module name**
        - /comment/**
    - /store
        - /interaction-state.js
        - /state.js
    - /api.service.js **Base api service functionality**
    - /base.js **Common logic/functions**
    - /behavior-subject.js **Handle value changed similar to Angular (create subscriber system) [https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject]**
    - /subscription.js **Subscriptions consist of subscribes**
- /modules
    - /post **Page module**
        - /pages
            - /index **Main page, usually contain list of the data**
                - /index.page.css **xxxxx.page.css, with xxxxx as the page name**
                - /index.page.html **xxxxx.page.html, with xxxxx as the page name**
                - /index.page.js **xxxxx.page.js, with xxxxx as the page name**
            - /detail *Potential development, the detail of a post*
                - /detail.page.css
                - /detail.page.html
                - /detail.page.js
    - /report/**
    - 404.html **404! Page Not Found**
    - routes.js **List of existing routes**
- /index.css **Global Styling**
- /index.html **Main page**
- /README.md **Documentation**