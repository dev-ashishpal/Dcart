import { Fragment } from 'react'
import '../styles/globals.css'
import Navigation from '../components/navigation/Navigation';
import NextNProgress from "nextjs-progressbar";


const MyApp = ({ Component, pageProps }) => {
  return (
    <Fragment>
        {/* <Modal show={true}>this is shit.</Modal> */}
        {/* <a
        href='javascript:(function(){var i=function(a){this.sections=[];this.startingNode=a};i.prototype={heading:false,append:function(a){a.container=this;this.sections.push(a)},asHTML:function(a){var b=u(this.heading);if(a)b=&apos;&lt;a href="#&apos;+v(this.startingNode)+&apos;"&gt;&apos;+b+"&lt;/a&gt;";return b+q(this.sections,a)}};var q=function(a,b){for(var f="",c=0;c&lt;a.length;c++)f+="&lt;li&gt;"+a[c].asHTML(b)+"&lt;/li&gt;";return f==""?f:"&lt;ol&gt;"+f+"&lt;/ol&gt;"},r=function(a){a=a.heading;return h(a)?j(a):1},u=function(a){if(h(a)){if(k(a)=="HGROUP")a=a.getElementsByTagName("h"+
                                        -j(a))[0];return a.textContent||a.innerText||"&lt;i&gt;No text content inside "+a.nodeName+"&lt;/i&gt;"}return""+a},v=function(a){var b=a.getAttribute("id");if(b)return b;do b="h5o-"+ ++s;while(t.getElementById(b));a.setAttribute("id",b);return b},e,d,g,s,t,w=function(a,b,f){var c=a;a:for(;c;){b(c);if(c.firstChild){c=c.firstChild;continue a}for(;c;){f(c);if(c.nextSibling){c=c.nextSibling;continue a}c=c==a?null:c.parentNode}}},x=function(a){if(!h(o(g)))if(l(a)||m(a)){e!=null&amp;&amp;g.push(e);e=a;d=new i(a);e.outline=
                                        {sections:[d],startingNode:a,asHTML:function(c){return q(this.sections,c)}}}else if(e!=null)if(h(a)){if(d.heading)if(j(a)&gt;=r(n(e.outline))){var b=new i(a);e.outline.sections.push(b);d=b;d.heading=a}else{b=false;var f=d;do{if(j(a)&lt;r(f)){b=new i(a);f.append(b);d=b;d.heading=a;b=true}f=f.container}while(!b)}else d.heading=a;g.push(a)}},y=function(a){var b=o(g);if(h(b))b==a&amp;&amp;g.pop();else{if((l(a)||m(a))&amp;&amp;!d.heading)d.heading="&lt;i&gt;Untitled "+k(a)+"&lt;/i&gt;";if(l(a)&amp;&amp;g.length&gt;0){e=g.pop();d=n(e.outline);for(b=
                                        0;b&lt;a.outline.sections.length;b++)d.append(a.outline.sections[b])}else if(m(a)&amp;&amp;g.length&gt;0){e=g.pop();for(d=n(e.outline);d.sections.length&gt;0;)d=n(d)}else if(l(a)||m(a))d=e.outline.sections[0]}},k=function(a){return a.tagName.toUpperCase()},p=function(a){return function(b){return z(b)&amp;&amp;(new RegExp(a,"i")).test(k(b))}},m=p("^BLOCKQUOTE|BODY|DETAILS|FIELDSET|FIGURE|TD$"),l=p("^ARTICLE|ASIDE|NAV|SECTION$"),h=p("^H[1-6]|HGROUP$"),z=function(a){return a&amp;&amp;a.tagName},j=function(a){var b=k(a);if(b=="HGROUP")for(b=
                                        1;b&lt;=6;b++){if(a.getElementsByTagName("H"+b).length&gt;0)return-b}else return-parseInt(b.substr(1))},n=function(a){return o(a.sections)},o=function(a){return a[a.length-1]};HTML5Outline=function(a){s=0;t=a.ownerDocument||window.document;d=e=null;g=[];w(a,x,y);return e!=null?e.outline:null}})();
                                        ;(function(){var b=function(e,f){for(var d=0;d&lt;e.length;d++)e[d].setAttribute("style",f)},g=HTML5Outline(document.body).asHTML(true),a=document.createElement("div");b([a],"position:fixed;top:10px;right:10px;border:2px solid #000;background:rgba(255,255,255,.9);padding:15px;z-index:999;max-height:400px;overflow:auto;font-size:11px;font-family:Verdana, sans-serif;");a.innerHTML=g;b(a.getElementsByTagName("li"),"list-style:decimal outside;margin-left:20px;font-size:11px;font-family:Verdana, sans-serif;");
                                        b(a.getElementsByTagName("ol"),"margin: 0;padding:0;font-size:11px;font-family:Verdana, sans-serif;");b(a.getElementsByTagName("a"),"color:#008;text-decoration:underline;font-size:11px;font-family:Verdana, sans-serif;");var c=a.insertBefore(document.createElement("a"),a.firstChild);b([c],"float: right; margin: 0 0 5px 5px; padding: 5px; border: 1px #008 solid;color:#00f;background-color:#ccf;");c.innerHTML="Close";c.href="#";c.onclick=function(){document.body.removeChild(a);a=c=null};document.body.appendChild(a)})();
                                        ;'
        title="TableDeMatiere"
      >
        <h1>Click!</h1>
      </a> */}
        <NextNProgress
          color="hsl(197, 37%, 24%)"
          startPosition={0.3}
          stopDelayMs={100}
          height={3}
          showOnShallow={true}
        />
        <Navigation />
        <Component {...pageProps} />
    </Fragment>
  ); 
}

export default MyApp

// import React from "react";
// import PropTypes from "prop-types";
// import Head from "next/head";
// import { ThemeProvider } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import theme from "../src/theme";

// export default function MyApp(props) {
//   const { Component, pageProps } = props;

//   React.useEffect(() => {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector("#jss-server-side");
//     if (jssStyles) {
//       jssStyles.parentElement.removeChild(jssStyles);
//     }
//   }, []);

//   return (
//     <React.Fragment>
//       <Head>
//         <title>My page</title>
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width"
//         />
//       </Head>
//       <ThemeProvider theme={theme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <CssBaseline />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </React.Fragment>
//   );
// }

// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// };