import*as l from"../../../_snowpack/env.js";import n from"../pack.js";const o=l.MODE;export default async function s(){let e=new URL("https://public.186526.xyz/renexmoe/checkupdate");return e.search=`?version=${n.version}`,(await fetch(e.href)).json()}export async function click(){let e=new mdui.dialog({title:"Loading...",content:'<div class="mdui-spinner mdui-theme-pink"></div>',buttons:[],closeOnEsc:!1});mdui.mutation();const i=await s();e.close(),new mdui.alert(`
        <div class="mdui-typo">
        \u672C\u7248\u672C\u65E5\u5FD7: ${i.log}
            <h5>\u4E3B\u7EBF\u7248\u672C</h5>
            <ul>
                <li>\u7248\u672C: ${i.version.main.ver}</li>
                <li>\u4E3B\u9898\u94FE\u63A5: <a href="${i.version.main.url}">This</a></li>
                <li>LOG: ${i.version.main.log}</li>
            </ul>
            <h5>LTS\u7248\u672C</h5>
            <ul>
                <li>\u7248\u672C: ${i.version.lts.ver}</li>
                <li>\u4E3B\u9898\u94FE\u63A5: <a href="${i.version.lts.url}">This</a></li>
                <li>LOG: ${i.version.lts.log}</li>
            </ul>
        </div>
        `,`\u5F53\u524D\u7248\u672C\u662F ${n.version}-${o}-${n.builder},${i.status}`)}
