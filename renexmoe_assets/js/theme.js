import mdui from"../../web_modules/mdui.js";import cookies from"./cookies.js";const $=mdui.$,func={mutation:()=>{if(window.disableddarkmode){mdui.$("li[onclick^=renexmoe]").remove(),cookies.setItem("darkmode",!1,1200,"/");return}cookies.getItem("darkmode")||(window.matchMedia("(prefers-color-scheme: dark)").matches?(cookies.setItem("darkmode",!0,1200,"/"),$("body").addClass("mdui-theme-layout-dark")):(cookies.setItem("darkmode",!1,1200,"/"),$("body").removeClass("mdui-theme-layout-dark"))),eval(cookies.getItem("darkmod"))?$("body").addClass("mdui-theme-layout-dark"):$("body").removeClass("mdui-theme-layout-dark")},toggle:()=>{eval(cookies.getItem("darkmode"))?($("body").removeClass("mdui-theme-layout-dark"),cookies.setItem("darkmode",!1,1200,"/")):($("body").addClass("mdui-theme-layout-dark","/"),cookies.setItem("darkmode",!0,1200,"/"))}};export default func;
