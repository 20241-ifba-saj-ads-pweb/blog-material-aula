import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as p,c as l,a as n,b as a,d as t,e as c}from"./app-SRO3CZzy.js";const i={},u=n("h1",{id:"web-component",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#web-component"},[n("span",null,"Web Component")])],-1),r={href:"https://developer.mozilla.org/pt-BR/docs/Web/API/Web_components",target:"_blank",rel:"noopener noreferrer"},d=n("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/01YKQmia2Jw?si=B5WMq945-jaX6k3q",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1),k={href:"https://github.com/dcode-youtube/notes-app-javascript-localstorage",target:"_blank",rel:"noopener noreferrer"},m=n("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/vLkPBj9ZaU0?si=vChBi_w1UYMAWwD1",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1),b=n("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/gfvFEBXMVSU?si=IspleqJCBxpafgyq",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1),v={href:"https://github.com/FullstackSimplified/html-web-components",target:"_blank",rel:"noopener noreferrer"},g=n("h2",{id:"publicando-um-web-component",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#publicando-um-web-component"},[n("span",null,"Publicando um web component")])],-1),h=n("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/vakoopKxV0k?si=aNxVmK4DCSc3bU5Y",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1),w=n("h2",{id:"passo-a-passo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#passo-a-passo"},[n("span",null,"Passo à Passo")])],-1),y={href:"https://youtu.be/qoC2C_C0Ntg?si=0XjK0Huqu_SuyunN",target:"_blank",rel:"noopener noreferrer"},f=c(`<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pt<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Meu HTML<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pw-title</span><span class="token punctuation">&gt;</span></span>Que Maravilha!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pw-title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pw-button</span><span class="token punctuation">&gt;</span></span>Que show de bola!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pw-button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>js/lib.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">PWButton</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">attachShadow</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;open&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>shadowRoot<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        &lt;style&gt;
            button{
                background: green;
                padding:10px;
                border-radius:5px;
                color: white;
                border:none;
            }
            button:hover{
                background: lightgreen;
            }
        &lt;/style&gt;
            &lt;button&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/button&gt;
        </span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">PWTitle</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">attachShadow</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;open&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>shadowRoot<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        &lt;style&gt;
            h1{
                font-size:40px;
                font-weight:bold;
                background-color: teal;
            }           
        &lt;/style&gt;
            &lt;h1&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/h1&gt;
        </span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> PWButton <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./pwbutton.js&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> PWTitle <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./pwtitle.js&quot;</span><span class="token punctuation">;</span>

customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;pw-button&#39;</span><span class="token punctuation">,</span> PWButton<span class="token punctuation">)</span><span class="token punctuation">;</span>
customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;pw-title&#39;</span><span class="token punctuation">,</span> PWTitle<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function _(q,j){const s=o("ExternalLinkIcon");return p(),l("div",null,[u,n("p",null,[n("a",r,[a("Web Components"),t(s)])]),d,n("p",null,[n("a",k,[a("https://github.com/dcode-youtube/notes-app-javascript-localstorage"),t(s)])]),m,b,n("p",null,[n("a",v,[a("https://github.com/FullstackSimplified/html-web-components"),t(s)])]),g,h,w,n("p",null,[n("a",y,[a("Link Video"),t(s)])]),f])}const P=e(i,[["render",_],["__file","09_web-component.html.vue"]]),C=JSON.parse('{"path":"/posts/09_web-component.html","title":"Web Component","lang":"pt-BR","frontmatter":{"icon":"edit","date":"2024-07-30T23:29:00.000Z","category":["aula"],"tag":["javascript"],"order":9,"description":"Web Component Web Components https://github.com/dcode-youtube/notes-app-javascript-localstorage https://github.com/FullstackSimplified/html-web-components Publicando um web comp...","head":[["meta",{"property":"og:url","content":"https://20241-ifba-saj-ads-pweb.github.io/blog-material-aula/blog-material-aula/posts/09_web-component.html"}],["meta",{"property":"og:site_name","content":"20241 PWEB Blog das Aulas"}],["meta",{"property":"og:title","content":"Web Component"}],["meta",{"property":"og:description","content":"Web Component Web Components https://github.com/dcode-youtube/notes-app-javascript-localstorage https://github.com/FullstackSimplified/html-web-components Publicando um web comp..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"pt-BR"}],["meta",{"property":"og:updated_time","content":"2024-08-05T23:07:10.000Z"}],["meta",{"property":"article:author","content":"Leandro Souza"}],["meta",{"property":"article:tag","content":"javascript"}],["meta",{"property":"article:published_time","content":"2024-07-30T23:29:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-05T23:07:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Web Component\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-30T23:29:00.000Z\\",\\"dateModified\\":\\"2024-08-05T23:07:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Leandro Souza\\",\\"url\\":\\"https://github.com/leandro-costa\\"}]}"]]},"headers":[{"level":2,"title":"Publicando um web component","slug":"publicando-um-web-component","link":"#publicando-um-web-component","children":[]},{"level":2,"title":"Passo à Passo","slug":"passo-a-passo","link":"#passo-a-passo","children":[]}],"git":{"createdTime":1722368958000,"updatedTime":1722899230000,"contributors":[{"name":"Leandro Costa","email":"leandro.costa@ifba.edu.br","commits":2},{"name":"leandro-costa","email":"leandro.costa@ifba.edu.br","commits":2}]},"readingTime":{"minutes":0.75,"words":225},"filePathRelative":"posts/09_web-component.md","localizedDate":"30 de julho de 2024","autoDesc":true}');export{P as comp,C as data};
