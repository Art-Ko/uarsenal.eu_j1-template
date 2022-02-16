!function(){var e,n,a={};e=function(s){var a,d=[],t=Object.keys,R=Object.create(null),r=Object.create(null),S=!0,n=/^(no-?highlight|plain|text)$/i,l=/\blang(?:uage)?-([\w-]+)\b/i,i=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,h="</span>",A="Could not find the language '{}', did you forget to load/include a language module?",C={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},c="of and for in not or if then".split(" ");function w(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function u(e){return e.nodeName.toLowerCase()}function o(e){return n.test(e)}function g(e){var n,a={},s=Array.prototype.slice.call(arguments,1);for(n in e)a[n]=e[n];return s.forEach(function(e){for(n in e)a[n]=e[n]}),a}function b(e){var i=[];return function e(n,a){for(var s=n.firstChild;s;s=s.nextSibling)3===s.nodeType?a+=s.nodeValue.length:1===s.nodeType&&(i.push({event:"start",offset:a,node:s}),a=e(s,a),u(s).match(/br|hr|img|input/)||i.push({event:"stop",offset:a,node:s}));return a}(e,0),i}function E(e,n,a){var s=0,i="",t=[];function r(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function l(e){i+="<"+u(e)+d.map.call(e.attributes,function(e){return" "+e.nodeName+'="'+w(e.value).replace(/"/g,"&quot;")+'"'}).join("")+">"}function c(e){i+="</"+u(e)+">"}function o(e){("start"===e.event?l:c)(e.node)}for(;e.length||n.length;){var g=r();if(i+=w(a.substring(s,g[0].offset)),s=g[0].offset,g===e){for(t.reverse().forEach(c);o(g.splice(0,1)[0]),(g=r())===e&&g.length&&g[0].offset===s;);t.reverse().forEach(l)}else"start"===g[0].event?t.push(g[0].node):t.pop(),o(g.splice(0,1)[0])}return i+w(a.substr(s))}function _(n){return n.variants&&!n.cached_variants&&(n.cached_variants=n.variants.map(function(e){return g(n,{variants:null},e)})),n.cached_variants||(function e(n){return!!n&&(n.endsWithParent||e(n.starts))}(n)?[g(n,{starts:n.starts?g(n.starts):null})]:Object.isFrozen(n)?[g(n)]:[n])}function m(e){if(a&&!e.langApiRestored){for(var n in e.langApiRestored=!0,a)e[n]&&(e[a[n]]=e[n]);(e.contains||[]).concat(e.variants||[]).forEach(m)}}function N(n,s){var i={};return"string"==typeof n?a("keyword",n):t(n).forEach(function(e){a(e,n[e])}),i;function a(a,e){(e=s?e.toLowerCase():e).split(" ").forEach(function(e){var n=e.split("|");i[n[0]]=[a,(e=n[0],(n=n[1])?Number(n):function(e){return-1!=c.indexOf(e.toLowerCase())}(e)?0:1)]})}}function y(s){function g(e){return e&&e.source||e}function d(e,n){return new RegExp(g(e),"m"+(s.case_insensitive?"i":"")+(n?"g":""))}function i(i){var t={},r=[],l={},a=1;function e(e,n){t[a]=e,r.push([e,n]),a+=new RegExp(n.toString()+"|").exec("").length-1+1}for(var n=0;n<i.contains.length;n++){var s,c=(s=i.contains[n]).beginKeywords?"\\.?(?:"+s.begin+")\\.?":s.begin;e(s,c)}i.terminator_end&&e("end",i.terminator_end),i.illegal&&e("illegal",i.illegal);var o=d(function(e,n){for(var a=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,s=0,i="",t=0;t<e.length;t++){var r=s+=1,l=g(e[t]);for(0<t&&(i+=n),i+="(";0<l.length;){var c=a.exec(l);if(null==c){i+=l;break}i+=l.substring(0,c.index),l=l.substring(c.index+c[0].length),"\\"==c[0][0]&&c[1]?i+="\\"+String(Number(c[1])+r):(i+=c[0],"("==c[0]&&s++)}i+=")"}return i}(r.map(function(e){return e[1]}),"|"),!0);return l.lastIndex=0,l.exec=function(e){var n;if(0===r.length)return null;o.lastIndex=l.lastIndex;var a=o.exec(e);if(!a)return null;for(var s=0;s<a.length;s++)if(null!=a[s]&&null!=t[""+s]){n=t[""+s];break}return"string"==typeof n?(a.type=n,a.extra=[i.illegal,i.terminator_end]):(a.type="begin",a.rule=n),a},l}if(s.contains&&-1!=s.contains.indexOf("self")){if(!S)throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");s.contains=s.contains.filter(function(e){return"self"!=e})}!function n(a,e){a.compiled||(a.compiled=!0,a.keywords=a.keywords||a.beginKeywords,a.keywords&&(a.keywords=N(a.keywords,s.case_insensitive)),a.lexemesRe=d(a.lexemes||/\w+/,!0),e&&(a.beginKeywords&&(a.begin="\\b("+a.beginKeywords.split(" ").join("|")+")\\b"),a.begin||(a.begin=/\B|\b/),a.beginRe=d(a.begin),a.endSameAsBegin&&(a.end=a.begin),a.end||a.endsWithParent||(a.end=/\B|\b/),a.end&&(a.endRe=d(a.end)),a.terminator_end=g(a.end)||"",a.endsWithParent&&e.terminator_end&&(a.terminator_end+=(a.end?"|":"")+e.terminator_end)),a.illegal&&(a.illegalRe=d(a.illegal)),null==a.relevance&&(a.relevance=1),a.contains||(a.contains=[]),a.contains=Array.prototype.concat.apply([],a.contains.map(function(e){return _("self"===e?a:e)})),a.contains.forEach(function(e){n(e,a)}),a.starts&&n(a.starts,e),a.terminators=i(a))}(s)}function T(n,e,s,a){var i=e;function t(e,n,a,s){if(!a&&""===n)return"";if(!e)return n;s='<span class="'+(s?"":C.classPrefix);return(s+=e+'">')+n+(a?"":h)}function r(){var e,n,a,s,i;if(!E.keywords)return w(f);for(a="",E.lexemesRe.lastIndex=e=0,n=E.lexemesRe.exec(f);n;)a+=w(f.substring(e,n.index)),s=E,i=n,i=b.case_insensitive?i[0].toLowerCase():i[0],(i=s.keywords.hasOwnProperty(i)&&s.keywords[i])?(v+=i[1],a+=t(i[0],w(n[0]))):a+=w(n[0]),e=E.lexemesRe.lastIndex,n=E.lexemesRe.exec(f);return a+w(f.substr(e))}function l(){m+=(null!=E.subLanguage?function(){var e="string"==typeof E.subLanguage;if(e&&!R[E.subLanguage])return w(f);var n=e?T(E.subLanguage,f,!0,_[E.subLanguage]):D(f,E.subLanguage.length?E.subLanguage:void 0);return 0<E.relevance&&(v+=n.relevance),e&&(_[E.subLanguage]=n.top),t(n.language,n.value,!1,!0)}:r)(),f=""}function c(e){m+=e.className?t(e.className,"",!0):"",E=Object.create(e,{parent:{value:E}})}function o(e){var n=e[0],e=e.rule;return e&&e.endSameAsBegin&&(e.endRe=new RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),e.skip?f+=n:(e.excludeBegin&&(f+=n),l(),e.returnBegin||e.excludeBegin||(f=n)),c(e),e.returnBegin?0:n.length}function g(e){var n=e[0],e=i.substr(e.index),a=function e(n,a){if(s=n.endRe,i=a,(i=s&&s.exec(i))&&0===i.index){for(;n.endsParent&&n.parent;)n=n.parent;return n}var s,i;if(n.endsWithParent)return e(n.parent,a)}(E,e);if(a){e=E;for(e.skip?f+=n:(e.returnEnd||e.excludeEnd||(f+=n),l(),e.excludeEnd&&(f=n));E.className&&(m+=h),E.skip||E.subLanguage||(v+=E.relevance),(E=E.parent)!==a.parent;);return a.starts&&(a.endSameAsBegin&&(a.starts.endRe=a.endRe),c(a.starts)),e.returnEnd?0:n.length}}var d={};function u(e,n){var a=n&&n[0];if(f+=e,null==a)return l(),0;if("begin"==d.type&&"end"==n.type&&d.index==n.index&&""===a)return f+=i.slice(n.index,n.index+1),1;if("illegal"===d.type&&""===a)return f+=i.slice(n.index,n.index+1),1;if("begin"===(d=n).type)return o(n);if("illegal"===n.type&&!s)throw new Error('Illegal lexeme "'+a+'" for mode "'+(E.className||"<unnamed>")+'"');if("end"===n.type){n=g(n);if(null!=n)return n}return f+=a,a.length}var b=x(n);if(!b)throw console.error(A.replace("{}",n)),new Error('Unknown language: "'+n+'"');y(b);for(var E=a||b,_={},m="",N=E;N!==b;N=N.parent)N.className&&(m=t(N.className,"",!0)+m);var f="",v=0;try{for(var O,M,p=0;;){if(E.terminators.lastIndex=p,!(O=E.terminators.exec(i)))break;M=u(i.substring(p,O.index),O),p=O.index+M}for(u(i.substr(p)),N=E;N.parent;N=N.parent)N.className&&(m+=h);return{relevance:v,value:m,illegal:!1,language:n,top:E}}catch(e){if(e.message&&-1!==e.message.indexOf("Illegal"))return{illegal:!0,relevance:0,value:w(i)};if(S)return{relevance:0,value:w(i),language:n,top:E,errorRaised:e};throw e}}function D(a,e){e=e||C.languages||t(R);var s={relevance:0,value:w(a)},i=s;return e.filter(x).filter(p).forEach(function(e){var n=T(e,a,!1);n.language=e,n.relevance>i.relevance&&(i=n),n.relevance>s.relevance&&(i=s,s=n)}),i.language&&(s.second_best=i),s}function f(e){return C.tabReplace||C.useBR?e.replace(i,function(e,n){return C.useBR&&"\n"===e?"<br>":C.tabReplace?n.replace(/\t/g,C.tabReplace):""}):e}function v(e){var n,a,s,i,t=function(e){var n,a,s,i,t=e.className+" ";if(t+=e.parentNode?e.parentNode.className:"",a=l.exec(t)){var r=x(a[1]);return r||(console.warn(A.replace("{}",a[1])),console.warn("Falling back to no-highlight mode for this block.",e)),r?a[1]:"no-highlight"}for(n=0,s=(t=t.split(/\s+/)).length;n<s;n++)if(o(i=t[n])||x(i))return i}(e);o(t)||(C.useBR?(n=document.createElement("div")).innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n"):n=e,i=n.textContent,a=t?T(t,i,!0):D(i),(n=b(n)).length&&((s=document.createElement("div")).innerHTML=a.value,a.value=E(n,b(s),i)),a.value=f(a.value),e.innerHTML=a.value,e.className=(s=e.className,i=t,t=a.language,i=i?r[i]:t,t=[s.trim()],s.match(/\bhljs\b/)||t.push("hljs"),-1===s.indexOf(i)&&t.push(i),t.join(" ").trim()),e.result={language:a.language,re:a.relevance},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.relevance}))}function O(){var e;O.called||(O.called=!0,e=document.querySelectorAll("pre code"),d.forEach.call(e,v))}var M={disableAutodetect:!0};function x(e){return e=(e||"").toLowerCase(),R[e]||R[r[e]]}function p(e){e=x(e);return e&&!e.disableAutodetect}return s.highlight=T,s.highlightAuto=D,s.fixMarkup=f,s.highlightBlock=v,s.configure=function(e){C=g(C,e)},s.initHighlighting=O,s.initHighlightingOnLoad=function(){window.addEventListener("DOMContentLoaded",O,!1),window.addEventListener("load",O,!1)},s.registerLanguage=function(n,e){var a;try{a=e(s)}catch(e){if(console.error("Language definition for '{}' could not be registered.".replace("{}",n)),!S)throw e;console.error(e),a=M}m(R[n]=a),a.rawDefinition=e.bind(null,s),a.aliases&&a.aliases.forEach(function(e){r[e]=n})},s.listLanguages=function(){return t(R)},s.getLanguage=x,s.requireLanguage=function(e){var n=x(e);if(n)return n;throw new Error("The '{}' language is required, but not loaded.".replace("{}",e))},s.autoDetection=p,s.inherit=g,s.debugMode=function(){S=!1},s.IDENT_RE="[a-zA-Z]\\w*",s.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",s.NUMBER_RE="\\b\\d+(\\.\\d+)?",s.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",s.BINARY_NUMBER_RE="\\b(0b[01]+)",s.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",s.BACKSLASH_ESCAPE={begin:"\\\\[\\s\\S]",relevance:0},s.APOS_STRING_MODE={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[s.BACKSLASH_ESCAPE]},s.QUOTE_STRING_MODE={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[s.BACKSLASH_ESCAPE]},s.PHRASAL_WORDS_MODE={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},s.COMMENT=function(e,n,a){a=s.inherit({className:"comment",begin:e,end:n,contains:[]},a||{});return a.contains.push(s.PHRASAL_WORDS_MODE),a.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),a},s.C_LINE_COMMENT_MODE=s.COMMENT("//","$"),s.C_BLOCK_COMMENT_MODE=s.COMMENT("/\\*","\\*/"),s.HASH_COMMENT_MODE=s.COMMENT("#","$"),s.NUMBER_MODE={className:"number",begin:s.NUMBER_RE,relevance:0},s.C_NUMBER_MODE={className:"number",begin:s.C_NUMBER_RE,relevance:0},s.BINARY_NUMBER_MODE={className:"number",begin:s.BINARY_NUMBER_RE,relevance:0},s.CSS_NUMBER_MODE={className:"number",begin:s.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},s.REGEXP_MODE={className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[s.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[s.BACKSLASH_ESCAPE]}]},s.TITLE_MODE={className:"title",begin:s.IDENT_RE,relevance:0},s.UNDERSCORE_TITLE_MODE={className:"title",begin:s.UNDERSCORE_IDENT_RE,relevance:0},s.METHOD_GUARD={begin:"\\.\\s*"+s.UNDERSCORE_IDENT_RE,relevance:0},[s.BACKSLASH_ESCAPE,s.APOS_STRING_MODE,s.QUOTE_STRING_MODE,s.PHRASAL_WORDS_MODE,s.COMMENT,s.C_LINE_COMMENT_MODE,s.C_BLOCK_COMMENT_MODE,s.HASH_COMMENT_MODE,s.NUMBER_MODE,s.C_NUMBER_MODE,s.BINARY_NUMBER_MODE,s.CSS_NUMBER_MODE,s.REGEXP_MODE,s.TITLE_MODE,s.UNDERSCORE_TITLE_MODE,s.METHOD_GUARD].forEach(function(e){!function n(a){Object.freeze(a);var s="function"==typeof a;Object.getOwnPropertyNames(a).forEach(function(e){!a.hasOwnProperty(e)||null===a[e]||"object"!=typeof a[e]&&"function"!=typeof a[e]||s&&("caller"===e||"callee"===e||"arguments"===e)||Object.isFrozen(a[e])||n(a[e])});return a}(e)}),s},n="object"==typeof window&&window||"object"==typeof self&&self,void 0===a||a.nodeType?n&&(n.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return n.hljs})):e(a);function s(e){return{aliases:["adoc"],contains:[e.COMMENT("^/{4,}\\n","\\n/{4,}$",{relevance:10}),e.COMMENT("^//","$",{relevance:0}),{className:"title",begin:"^\\.\\w.*$"},{begin:"^[=\\*]{4,}\\n",end:"\\n^[=\\*]{4,}$",relevance:10},{className:"section",relevance:10,variants:[{begin:"^(={1,5}) .+?( \\1)?$"},{begin:"^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$"}]},{className:"meta",begin:"^:.+?:",end:"\\s",excludeEnd:!0,relevance:10},{className:"meta",begin:"^\\[.+?\\]$",relevance:0},{className:"quote",begin:"^_{4,}\\n",end:"\\n_{4,}$",relevance:10},{className:"code",begin:"^[\\-\\.]{4,}\\n",end:"\\n[\\-\\.]{4,}$",relevance:10},{begin:"^\\+{4,}\\n",end:"\\n\\+{4,}$",contains:[{begin:"<",end:">",subLanguage:"xml",relevance:0}],relevance:10},{className:"bullet",begin:"^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+"},{className:"symbol",begin:"^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",relevance:10},{className:"strong",begin:"\\B\\*(?![\\*\\s])",end:"(\\n{2}|\\*)",contains:[{begin:"\\\\*\\w",relevance:0}]},{className:"emphasis",begin:"\\B'(?!['\\s])",end:"(\\n{2}|')",contains:[{begin:"\\\\'\\w",relevance:0}],relevance:0},{className:"emphasis",begin:"_(?![_\\s])",end:"(\\n{2}|_)",relevance:0},{className:"string",variants:[{begin:"``.+?''"},{begin:"`.+?'"}]},{className:"code",begin:"(`.+?`|\\+.+?\\+)",relevance:0},{className:"code",begin:"^[ \\t]",end:"$",relevance:0},{begin:"^'{3,}[ \\t]*$",relevance:10},{begin:"(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]",returnBegin:!0,contains:[{begin:"(link|image:?):",relevance:0},{className:"link",begin:"\\w",end:"[^\\[]+",relevance:0},{className:"string",begin:"\\[",end:"\\]",excludeBegin:!0,excludeEnd:!0,relevance:0}],relevance:10}]}}function i(e){var n={className:"attribute",begin:/\S/,end:":",excludeEnd:!0,starts:{endsWithParent:!0,excludeEnd:!0,contains:[{begin:/[\w-]+\(/,returnBegin:!0,contains:[{className:"built_in",begin:/[\w-]+/},{begin:/\(/,end:/\)/,contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.CSS_NUMBER_MODE]}]},e.CSS_NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,e.C_BLOCK_COMMENT_MODE,{className:"number",begin:"#[0-9A-Fa-f]+"},{className:"meta",begin:"!important"}]}};return{case_insensitive:!0,illegal:/[=\/|'\$]/,contains:[e.C_BLOCK_COMMENT_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/},{className:"selector-class",begin:/\.[A-Za-z0-9_-]+/},{className:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},{className:"selector-pseudo",begin:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{begin:"@(page|font-face)",lexemes:"@[a-z-]+",keywords:"@page @font-face"},{begin:"@",end:"[{;]",illegal:/:/,returnBegin:!0,contains:[{className:"keyword",begin:/@\-?\w[\w]*(\-\w+)*/},{begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:"and or not only",contains:[{begin:/[a-z-]+:/,className:"attribute"},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"[a-zA-Z-][a-zA-Z0-9_-]*",relevance:0},{begin:"{",end:"}",illegal:/\S/,contains:[e.C_BLOCK_COMMENT_MODE,{begin:/(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,returnBegin:!0,end:";",endsWithParent:!0,contains:[n]}]}]}}function t(e){return{keywords:{literal:"true false null",keyword:"byte short char int long boolean float double void def as in assert trait super this abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"},contains:[e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"string",begin:'"""',end:'"""'},{className:"string",begin:"'''",end:"'''"},{className:"string",begin:"\\$/",end:"/\\$",relevance:10},e.APOS_STRING_MODE,{className:"regexp",begin:/~?\/[^\/\n]+\//,contains:[e.BACKSLASH_ESCAPE]},e.QUOTE_STRING_MODE,{className:"meta",begin:"^#!/usr/bin/env",end:"$",illegal:"\n"},e.BINARY_NUMBER_MODE,{className:"class",beginKeywords:"class interface trait enum",end:"{",illegal:":",contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},e.C_NUMBER_MODE,{className:"meta",begin:"@[A-Za-z]+"},{className:"string",begin:/[^\?]{0}[A-Za-z0-9_$]+ *:/},{begin:/\?/,end:/\:/},{className:"symbol",begin:"^\\s*[A-Za-z0-9_$]+:",relevance:0}],illegal:/#|<\//}}function r(e){var n="false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",a={className:"number",begin:"\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",relevance:0};return{aliases:["jsp"],keywords:n,illegal:/<\/|#/,contains:[e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{className:"class",beginKeywords:"class interface",end:/[{;=]/,excludeEnd:!0,keywords:"class interface",illegal:/[:"\[\]]/,contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"new throw return else",relevance:0},{className:"function",begin:"([À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(<[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(\\s*,\\s*[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*)*>)?\\s+)+"+e.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:n,contains:[{begin:e.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,relevance:0,contains:[e.UNDERSCORE_TITLE_MODE]},{className:"params",begin:/\(/,end:/\)/,keywords:n,relevance:0,contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.C_NUMBER_MODE,e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},a,{className:"meta",begin:"@[A-Za-z]+"}]}}function l(e){var n="<>",a="</>",s=/<[A-Za-z0-9\\._:-]+/,i=/\/[A-Za-z0-9\\._:-]+>|\/>/,t="[A-Za-z$_][0-9A-Za-z$_]*",r={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},l={className:"number",variants:[{begin:"\\b(0[bB][01]+)n?"},{begin:"\\b(0[oO][0-7]+)n?"},{begin:e.C_NUMBER_RE+"n?"}],relevance:0},c={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},o={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"xml"}},g={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"css"}},d={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,c]};return c.contains=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,o,g,d,l,e.REGEXP_MODE],c=c.contains.concat([e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]),{aliases:["js","jsx","mjs","cjs"],keywords:r,contains:[{className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},{className:"meta",begin:/^#!/,end:/$/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,o,g,d,e.C_LINE_COMMENT_MODE,e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+",contains:[{className:"type",begin:"\\{",end:"\\}",relevance:0},{className:"variable",begin:t+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,l,{begin:/[{,\n]\s*/,relevance:0,contains:[{begin:t+"\\s*:",returnBegin:!0,relevance:0,contains:[{className:"attr",begin:t,relevance:0}]}]},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.REGEXP_MODE,{className:"function",begin:"(\\(.*?\\)|"+t+")\\s*=>",returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t},{begin:/\(\s*\)/},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:c}]}]},{className:"",begin:/\s/,end:/\s*/,skip:!0},{variants:[{begin:n,end:a},{begin:s,end:i}],subLanguage:"xml",contains:[{begin:s,end:i,skip:!0,contains:["self"]}]}],relevance:0},{className:"function",beginKeywords:"function",end:/\{/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:t}),{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,contains:c}],illegal:/\[|%/},{begin:/\$[(.]/},e.METHOD_GUARD,{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"\[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"constructor get set",end:/\{/,excludeEnd:!0}],illegal:/#(?!!)/}}function c(e){var n={literal:"true false null"},a=[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],s=[e.QUOTE_STRING_MODE,e.C_NUMBER_MODE],i={end:",",endsWithParent:!0,excludeEnd:!0,contains:s,keywords:n},t={begin:"{",end:"}",contains:[{className:"attr",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE],illegal:"\\n"},e.inherit(i,{begin:/:/})].concat(a),illegal:"\\S"},i={begin:"\\[",end:"\\]",contains:[e.inherit(i)],illegal:"\\S"};return s.push(t,i),a.forEach(function(e){s.push(e)}),{contains:s,keywords:n,illegal:"\\S"}}function o(e){return{aliases:["md","mkdown","mkd"],contains:[{className:"section",variants:[{begin:"^#{1,6}",end:"$"},{begin:"^.+?\\n[=-]{2,}$"}]},{begin:"<",end:">",subLanguage:"xml",relevance:0},{className:"bullet",begin:"^\\s*([*+-]|(\\d+\\.))\\s+"},{className:"strong",begin:"[*_]{2}.+?[*_]{2}"},{className:"emphasis",variants:[{begin:"\\*.+?\\*"},{begin:"_.+?_",relevance:0}]},{className:"quote",begin:"^>\\s+",end:"$"},{className:"code",variants:[{begin:"^```\\w*\\s*$",end:"^```[ ]*$"},{begin:"`.+?`"},{begin:"^( {4}|\\t)",end:"$",relevance:0}]},{begin:"^[-\\*]{3,}",end:"$"},{begin:"\\[.+?\\][\\(\\[].*?[\\)\\]]",returnBegin:!0,contains:[{className:"string",begin:"\\[",end:"\\]",excludeBegin:!0,returnEnd:!0,relevance:0},{className:"link",begin:"\\]\\(",end:"\\)",excludeBegin:!0,excludeEnd:!0},{className:"symbol",begin:"\\]\\[",end:"\\]",excludeBegin:!0,excludeEnd:!0}],relevance:10},{begin:/^\[[^\n]+\]:/,returnBegin:!0,contains:[{className:"symbol",begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0},{className:"link",begin:/:\s*/,end:/$/,excludeBegin:!0}]}]}}function g(e){var n={keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10",built_in:"Ellipsis NotImplemented",literal:"False None True"},a={className:"meta",begin:/^(>>>|\.\.\.) /},s={className:"subst",begin:/\{/,end:/\}/,keywords:n,illegal:/#/},i={begin:/\{\{/,relevance:0},t={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/(u|b)?r?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,a],relevance:10},{begin:/(u|b)?r?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,a],relevance:10},{begin:/(fr|rf|f)'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,a,i,s]},{begin:/(fr|rf|f)"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,a,i,s]},{begin:/(u|r|ur)'/,end:/'/,relevance:10},{begin:/(u|r|ur)"/,end:/"/,relevance:10},{begin:/(b|br)'/,end:/'/},{begin:/(b|br)"/,end:/"/},{begin:/(fr|rf|f)'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,i,s]},{begin:/(fr|rf|f)"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,i,s]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},r={className:"number",relevance:0,variants:[{begin:e.BINARY_NUMBER_RE+"[lLjJ]?"},{begin:"\\b(0o[0-7]+)[lLjJ]?"},{begin:e.C_NUMBER_RE+"[lLjJ]?"}]},i={className:"params",begin:/\(/,end:/\)/,contains:["self",a,r,t,e.HASH_COMMENT_MODE]};return s.contains=[t,r,a],{aliases:["py","gyp","ipython"],keywords:n,illegal:/(<\/|->|\?)|=>/,contains:[a,r,{beginKeywords:"if",relevance:0},t,e.HASH_COMMENT_MODE,{variants:[{className:"function",beginKeywords:"def"},{className:"class",beginKeywords:"class"}],end:/:/,illegal:/[${=;\n,]/,contains:[e.UNDERSCORE_TITLE_MODE,i,{begin:/->/,endsWithParent:!0,keywords:"None"}]},{className:"meta",begin:/^[\t ]*@/,end:/$/},{begin:/\b(print|exec)\(/}]}}function d(e){var n="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",a={keyword:"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",literal:"true false nil"},s={className:"doctag",begin:"@[A-Za-z]+"},i={begin:"#<",end:">"},t=[e.COMMENT("#","$",{contains:[s]}),e.COMMENT("^\\=begin","^\\=end",{contains:[s],relevance:10}),e.COMMENT("^__END__","\\n$")],r={className:"subst",begin:"#\\{",end:"}",keywords:a},l={className:"string",contains:[e.BACKSLASH_ESCAPE,r],variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/`/,end:/`/},{begin:"%[qQwWx]?\\(",end:"\\)"},{begin:"%[qQwWx]?\\[",end:"\\]"},{begin:"%[qQwWx]?{",end:"}"},{begin:"%[qQwWx]?<",end:">"},{begin:"%[qQwWx]?/",end:"/"},{begin:"%[qQwWx]?%",end:"%"},{begin:"%[qQwWx]?-",end:"-"},{begin:"%[qQwWx]?\\|",end:"\\|"},{begin:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/},{begin:/<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,returnBegin:!0,contains:[{begin:/<<[-~]?'?/},{begin:/\w+/,endSameAsBegin:!0,contains:[e.BACKSLASH_ESCAPE,r]}]}]},s={className:"params",begin:"\\(",end:"\\)",endsParent:!0,keywords:a},e=[l,i,{className:"class",beginKeywords:"class module",end:"$|;",illegal:/=/,contains:[e.inherit(e.TITLE_MODE,{begin:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{begin:"<\\s*",contains:[{begin:"("+e.IDENT_RE+"::)?"+e.IDENT_RE}]}].concat(t)},{className:"function",beginKeywords:"def",end:"$|;",contains:[e.inherit(e.TITLE_MODE,{begin:n}),s].concat(t)},{begin:e.IDENT_RE+"::"},{className:"symbol",begin:e.UNDERSCORE_IDENT_RE+"(\\!|\\?)?:",relevance:0},{className:"symbol",begin:":(?!\\s)",contains:[l,{begin:n}],relevance:0},{className:"number",begin:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",relevance:0},{begin:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{className:"params",begin:/\|/,end:/\|/,keywords:a},{begin:"("+e.RE_STARTERS_RE+"|unless)\\s*",keywords:"unless",contains:[i,{className:"regexp",contains:[e.BACKSLASH_ESCAPE,r],illegal:/\n/,variants:[{begin:"/",end:"/[a-z]*"},{begin:"%r{",end:"}[a-z]*"},{begin:"%r\\(",end:"\\)[a-z]*"},{begin:"%r!",end:"![a-z]*"},{begin:"%r\\[",end:"\\][a-z]*"}]}].concat(t),relevance:0}].concat(t);return r.contains=e,s.contains=e,{aliases:["rb","gemspec","podspec","thor","irb"],keywords:a,illegal:/\/\*/,contains:t.concat([{begin:/^\s*=>/,starts:{end:"$",contains:e}},{className:"meta",begin:"^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)",starts:{end:"$",contains:e}}]).concat(e)}}function u(e){return{aliases:["console"],contains:[{className:"meta",begin:"^\\s{0,3}[/\\w\\d\\[\\]()@-]*[>%$#]",starts:{end:"$",subLanguage:"bash"}}]}}function b(e){var n={className:"symbol",begin:"&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;"},a={begin:"\\s",contains:[{className:"meta-keyword",begin:"#?[a-z_][a-z1-9_-]+",illegal:"\\n"}]},s=e.inherit(a,{begin:"\\(",end:"\\)"}),i=e.inherit(e.APOS_STRING_MODE,{className:"meta-string"}),t=e.inherit(e.QUOTE_STRING_MODE,{className:"meta-string"}),r={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:"[A-Za-z0-9\\._:-]+",relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[n]},{begin:/'/,end:/'/,contains:[n]},{begin:/[^\s"'=<>`]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,contains:[{className:"meta",begin:"<![a-z]",end:">",relevance:10,contains:[a,t,i,s,{begin:"\\[",end:"\\]",contains:[{className:"meta",begin:"<![a-z]",end:">",contains:[a,s,t,i]}]}]},e.COMMENT("\x3c!--","--\x3e",{relevance:10}),{begin:"<\\!\\[CDATA\\[",end:"\\]\\]>",relevance:10},n,{className:"meta",begin:/<\?xml/,end:/\?>/,relevance:10},{begin:/<\?(php)?/,end:/\?>/,subLanguage:"php",contains:[{begin:"/\\*",end:"\\*/",skip:!0},{begin:'b"',end:'"',skip:!0},{begin:"b'",end:"'",skip:!0},e.inherit(e.APOS_STRING_MODE,{illegal:null,className:null,contains:null,skip:!0}),e.inherit(e.QUOTE_STRING_MODE,{illegal:null,className:null,contains:null,skip:!0})]},{className:"tag",begin:"<style(?=\\s|>)",end:">",keywords:{name:"style"},contains:[r],starts:{end:"</style>",returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:"<script(?=\\s|>)",end:">",keywords:{name:"script"},contains:[r],starts:{end:"<\/script>",returnEnd:!0,subLanguage:["actionscript","javascript","handlebars","xml"]}},{className:"tag",begin:"</?",end:"/?>",contains:[{className:"name",begin:/[^\/><\s]+/,relevance:0},r]}]}}function E(e){var n="true false yes no null",a={className:"string",relevance:0,variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/\S+/}],contains:[e.BACKSLASH_ESCAPE,{className:"template-variable",variants:[{begin:"{{",end:"}}"},{begin:"%{",end:"}"}]}]};return{case_insensitive:!0,aliases:["yml","YAML","yaml"],contains:[{className:"attr",variants:[{begin:"\\w[\\w :\\/.-]*:(?=[ \t]|$)"},{begin:'"\\w[\\w :\\/.-]*":(?=[ \t]|$)'},{begin:"'\\w[\\w :\\/.-]*':(?=[ \t]|$)"}]},{className:"meta",begin:"^---s*$",relevance:10},{className:"string",begin:"[\\|>]([0-9]?[+-])?[ ]*\\n( *)[\\S ]+\\n(\\2[\\S ]+\\n?)*"},{begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:"!"+e.UNDERSCORE_IDENT_RE},{className:"type",begin:"!!"+e.UNDERSCORE_IDENT_RE},{className:"meta",begin:"&"+e.UNDERSCORE_IDENT_RE+"$"},{className:"meta",begin:"\\*"+e.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"\\-(?=[ ]|$)",relevance:0},e.HASH_COMMENT_MODE,{beginKeywords:n,keywords:{literal:n}},{className:"number",begin:e.C_NUMBER_RE+"\\b"},a]}}!function(){"use strict";a.registerLanguage("asciidoc",s),a.registerLanguage("css",i),a.registerLanguage("groovy",t),a.registerLanguage("java",r),a.registerLanguage("javascript",l),a.registerLanguage("json",c),a.registerLanguage("markdown",o),a.registerLanguage("python",g),a.registerLanguage("ruby",d),a.registerLanguage("shell",u),a.registerLanguage("xml",b),a.registerLanguage("yaml",E),[].slice.call(document.querySelectorAll("pre code.hljs")).forEach(function(e){a.highlightBlock(e)})}()}();