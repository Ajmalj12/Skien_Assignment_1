
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/products",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/products"
  },
  {
    "renderMode": 2,
    "route": "/cart"
  },
  {
    "renderMode": 2,
    "redirectTo": "/products",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 433, hash: '320669983b1654a59ef1b7bfb50b1c0bc8610ab47de0e378d0d30f664629a70d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: 'bb073ef58ac1160853ad42666c0e0827eea48f819579a6c56ad2b0153dfd10a8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 6751, hash: 'b293d39035e0e81e3bcfbde29b280085c49c8726bacf5aab0cc8b8e6e8f14e14', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 8217, hash: 'e88fec5828ce0f5ff9b64a8bc522ba7ff581061d008242bf31c56b84df2fb4c7', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'products/index.html': {size: 6062, hash: '42a6b0e8887b397cc5d8382d4dcd9f131a8df9d994352ec53070acb0f93ae729', text: () => import('./assets-chunks/products_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
