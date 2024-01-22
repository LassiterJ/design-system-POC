import"../sb-preview/runtime.js";(function(){const _=document.createElement("link").relList;if(_&&_.supports&&_.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const E="modulepreload",d=function(i,_){return new URL(i,_).href},m={},r=function(_,s,c){if(!s||s.length===0)return _();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=d(e,c),e in m)return;m[e]=!0;const o=e.endsWith(".css"),O=o?'[rel="stylesheet"]':"";if(!!c)for(let a=t.length-1;a>=0;a--){const l=t[a];if(l.href===e&&(!o||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${O}`))return;const n=document.createElement("link");if(n.rel=o?"stylesheet":E,o||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),o)return new Promise((a,l)=>{n.addEventListener("load",a),n.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>_()).catch(e=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e})},{createBrowserChannel:p}=__STORYBOOK_MODULE_CHANNELS__,{addons:R}=__STORYBOOK_MODULE_PREVIEW_API__,u=p({page:"preview"});R.setChannel(u);window.__STORYBOOK_ADDONS_CHANNEL__=u;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=u);const f={"./src/components/consuming-app/layout/box/Box.stories.js":async()=>r(()=>import("./Box.stories-94fbfe16.js"),["./Box.stories-94fbfe16.js","./Box-314d3517.js","./jsx-runtime-29545a09.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./extends-98964cd2.js","./Box-a97ec2d8.css"],import.meta.url),"./src/components/consuming-app/page/home-page/HomePage.stories.js":async()=>r(()=>import("./HomePage.stories-7ccda6a6.js"),["./HomePage.stories-7ccda6a6.js","./index-ab3fe526.js","./jsx-runtime-29545a09.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./Box-314d3517.js","./extends-98964cd2.js","./Box-a97ec2d8.css","./index-d3ea75b5.js","./HomePage.stories-e65d67dd.css"],import.meta.url),"./src/stories/Button.stories.js":async()=>r(()=>import("./Button.stories-1d81f5b6.js"),["./Button.stories-1d81f5b6.js","./Button-32da8f92.js","./jsx-runtime-29545a09.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./index-8d47fad6.js","./Button-bc1a867b.css"],import.meta.url),"./src/stories/Configure.mdx":async()=>r(()=>import("./Configure-4bef7ee8.js"),["./Configure-4bef7ee8.js","./jsx-runtime-29545a09.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./index-71d79ecc.js","./index-d3ea75b5.js","./index-11d98b33.js","./extends-98964cd2.js","./index-8fd8397b.js","./index-356e4a49.js","./index-a1cf9e47.js"],import.meta.url),"./src/stories/Header.stories.js":async()=>r(()=>import("./Header.stories-24b3917f.js"),["./Header.stories-24b3917f.js","./Header-ad095763.js","./jsx-runtime-29545a09.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./index-8d47fad6.js","./Button-32da8f92.js","./Button-bc1a867b.css","./Header-a6911580.css"],import.meta.url),"./src/stories/Page.stories.js":async()=>r(()=>import("./Page.stories-89ae4e3c.js"),["./Page.stories-89ae4e3c.js","./index-ab3fe526.js","./jsx-runtime-29545a09.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./Header-ad095763.js","./index-8d47fad6.js","./Button-32da8f92.js","./Button-bc1a867b.css","./Header-a6911580.css","./Page.stories-ece1482a.css"],import.meta.url)};async function P(i){return f[i]()}const{composeConfigs:T,PreviewWeb:w,ClientApi:L}=__STORYBOOK_MODULE_PREVIEW_API__,I=async()=>{const i=await Promise.all([r(()=>import("./entry-preview-1f5c28fc.js"),["./entry-preview-1f5c28fc.js","./index-76fb7be0.js","./_commonjsHelpers-de833af9.js","./react-18-988a5df2.js","./index-d3ea75b5.js"],import.meta.url),r(()=>import("./entry-preview-docs-ffa139cb.js"),["./entry-preview-docs-ffa139cb.js","./index-8fd8397b.js","./_commonjsHelpers-de833af9.js","./index-8d47fad6.js","./index-356e4a49.js","./index-76fb7be0.js"],import.meta.url),r(()=>import("./preview-73104b77.js"),["./preview-73104b77.js","./index-11d98b33.js"],import.meta.url),r(()=>import("./preview-400790f7.js"),[],import.meta.url),r(()=>import("./preview-d01b88e8.js"),["./preview-d01b88e8.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-30b54f76.js"),["./preview-30b54f76.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-c56bf6ac.js"),[],import.meta.url),r(()=>import("./preview-da31036b.js"),["./preview-da31036b.js","./index-356e4a49.js"],import.meta.url),r(()=>import("./preview-0ef86afd.js"),[],import.meta.url),r(()=>import("./preview-21802b0a.js"),["./preview-21802b0a.js","./_commonjsHelpers-de833af9.js"],import.meta.url),r(()=>import("./preview-0dd2d606.js"),["./preview-0dd2d606.js","./preview-24a18c8d.css"],import.meta.url)]);return T(i)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new w;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new L({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:P,getProjectAnnotations:I});export{r as _};
