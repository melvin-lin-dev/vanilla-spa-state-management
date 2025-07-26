const routes = [
    { path: '', redirect: '/posts' },
    { path: '/posts', component: 'post/pages/index/index.page.html' },
    { path: '/reports', component: 'report/pages/index/index.page.html' },
    { path: '**', component: '404.html' },
];