(this.webpackJsonpmetagon=this.webpackJsonpmetagon||[]).push([[0],{108:function(e,n,t){e.exports=t(193)},113:function(e,n,t){},114:function(e,n,t){},138:function(e,n,t){e.exports=t.p+"static/media/plus.9f0d2b0a.svg"},193:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),l=t(83),c=t.n(l),o=(t(113),t(114),t(9)),i=t(8),s=t(16),m=t.n(s),u=t(36),d=t(4),p=(t(41),t(101)),f=t(84),g=t.n(f),E=function(){return r.a.createElement(g.a,{type:"Oval",color:"#00BFFF",height:25,width:35})},b=t(2),v=t(3);function h(){var e=Object(b.a)(["\nheight: 38px;\nfont-size: 14px;\nborder: 1px solid  ",";\nborder-radius: 0;\nwidth: 100%;\npadding:0 15px;\n:focus{\n    outline:none;\n}\n\n"]);return h=function(){return e},e}var x=v.a.input(h(),(function(e){return e.usererror?"red":"#c9c9c9"})),w=function(e){return r.a.createElement(x,Object.assign({ref:e.refs},e,{usererror:e.error}))};t(138);function j(){var e=Object(b.a)(["\nheight: 37px;\nbackground: #000;\nborder-radius: 5px;\nfont-size: 14px;\ncolor: #fff;\nfont-weight: 500;\nfont-family: 'Roboto',sans-serif;\ndisplay: inline-flex;\nalign-items: center;\njustify-content: center;\npadding: 0 10px;\nmin-width: 95px;\ncursor:pointer;\nborder:none;\n:hover{\n  background: rgba(0,0,0,0.9);\n}\n"]);return j=function(){return e},e}var y=v.a.button(j()),N=function(e){return r.a.createElement(y,e)},O=function(e){var n=e.match.url,t=Object(a.useState)(),l=Object(d.a)(t,2),c=l[0],i=l[1],s=Object(a.useState)(),f=Object(d.a)(s,2),g=f[0],b=f[1],v=Object(a.useState)(!1),h=Object(d.a)(v,2),x=h[0],j=h[1],y=Object(a.useState)(!1),O=Object(d.a)(y,2),S=O[0],k=O[1],C=Object(a.useState)(!1),P=Object(d.a)(C,2),z=P[0],_=P[1],A=Object(a.useState)(!1),R=Object(d.a)(A,2),B=R[0],F=R[1],L=Object(a.useState)(),T=Object(d.a)(L,2),D=T[0],I=T[1],M=Object(a.useState)(!1),W=Object(d.a)(M,2),H=W[0],Y=W[1];Object(a.useEffect)((function(){(function(){var e=Object(u.a)(m.a.mark((function e(n){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.a.currentAuthenticatedUser();case 3:j(!0),e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(n){return e.apply(this,arguments)}})()()}),[]);var Z=function(e){e.preventDefault(),G()&&(Y(!0),p.a.signIn({username:c,password:g}).then((function(){j(!0)})).catch((function(e){return I(e.message)}),k(!0)),i(""),b(""))},G=function(){if(function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}(c)||_(!0),g)return!0;F(!0)},J=function(e){k(!1),_(!1),F(!1),"username"===e.target.id?i(e.target.value):"password"===e.target.id&&b(e.target.value)};return x?r.a.createElement("div",null,r.a.createElement("h1",null,"You have signed in!"),r.a.createElement("button",{type:"submit",onClick:function(){return p.a.signOut(),window.location.reload()},className:"btn btn-primary"},"  ",r.a.createElement(o.b,{to:"/register"}),"Logout")):r.a.createElement("div",{className:"login-wrapper"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6 cover-image"}," "),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"login-form-wrapper"},r.a.createElement("div",{className:"login-form-header"},r.a.createElement("h1",null,"Howdy! Welcome Back"),r.a.createElement("p",null," login to start working on your business profile page ")),S?r.a.createElement("div",{class:"form-group"},r.a.createElement("br",null),r.a.createElement("h6",null,D)):null,r.a.createElement("div",{className:"login-form-nested-wrapper login-fields-spacing"},r.a.createElement("form",{onSubmit:function(e){return Z(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"text",id:"username",onChange:function(e){return J(e)},error:z,placeholder:"Email address"})),r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"password",id:"password",onChange:function(e){return J(e)},error:B,placeholder:"Password"})),r.a.createElement("div",{className:"form-group remember-checkbox"},r.a.createElement("input",{type:"checkbox",id:"rememberMe"}),r.a.createElement("label",{htmlFor:"rememberMe"},"Remember me")),r.a.createElement(N,{type:"submit",className:"btn btn-primary"},H&&!D?r.a.createElement(E,null):"Login"),r.a.createElement("div",{className:"login-links-wrapper login-links-extra-links"},n.includes("business")?r.a.createElement(o.b,{to:"/business/register"},"Don't have an account? ",r.a.createElement("strong",null,"Signup")):r.a.createElement(o.b,{to:"/curator/register"},"Don't have an account? ",r.a.createElement("strong",null,"Signup")),n.includes("business")?r.a.createElement(o.b,{to:"/business/forgot-password"},"Forgot Password"):r.a.createElement(o.b,{to:"/curator/forgot-password"},"Forgot Password")))))))))},S=t(97),k=Object(S.a)();var C=function(){var e,n=Object(a.useState)(""),t=Object(d.a)(n,2),l=t[0],c=t[1],o=Object(a.useRef)(null);function i(n,t){(e=new window.google.maps.places.Autocomplete(t.current)).setFields(["address_components","formatted_address","name"]),e.addListener("place_changed",(function(){return function(e){return s.apply(this,arguments)}(n)}))}function s(){return(s=Object(u.a)(m.a.mark((function n(t){var a,r;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a=e.getPlace(),r=a.name,t(r);case 3:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return Object(a.useEffect)((function(){!function(e,n){var t=document.createElement("script");t.type="text/javascript",t.readyState?t.onreadystatechange=function(){"loaded"!==t.readyState&&"complete"!==t.readyState||(t.onreadystatechange=null,n())}:t.onload=function(){return n()},t.src=e,document.getElementsByTagName("head")[0].appendChild(t)}("https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVZIvAZkQsaxLD3UdFH5EH3DvYmSYG6Q&libraries=places",(function(){return i(c,o)}))}),[]),r.a.createElement(w,{refs:o,onChange:function(e){return c(e.target.value)},placeholder:"Business Name",value:l})},P=function(e){var n=e.match.url,t=Object(a.useState)(),l=Object(d.a)(t,2),c=l[0],i=l[1],s=Object(a.useState)(),m=Object(d.a)(s,2),u=m[0],f=m[1],g=Object(a.useState)(!1),E=Object(d.a)(g,2),b=E[0],v=E[1],h=Object(a.useState)(),x=Object(d.a)(h,2),j=x[0],y=x[1],O=Object(a.useState)(),S=Object(d.a)(O,2),P=S[0],z=S[1],_=Object(a.useState)(),A=Object(d.a)(_,2),R=A[0],B=A[1],F=Object(a.useState)(!1),L=Object(d.a)(F,2),T=L[0],D=L[1],I=Object(a.useState)(),M=Object(d.a)(I,2),W=M[0],H=M[1],Y=Object(a.useState)(!1),Z=Object(d.a)(Y,2),G=Z[0],J=Z[1],U=Object(a.useState)(!1),Q=Object(d.a)(U,2),$=Q[0],q=Q[1],V=Object(a.useState)(!1),K=Object(d.a)(V,2),X=K[0],ee=K[1],ne=Object(a.useState)(!1),te=Object(d.a)(ne,2),ae=te[0],re=te[1],le=Object(a.useState)(!1),ce=Object(d.a)(le,2),oe=ce[0],ie=ce[1],se=Object(a.useState)(!1),me=Object(d.a)(se,2),ue=me[0],de=me[1];var pe=function(){if(c||q(!0),R||re(!0),function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}(j)||ee(!0),u)return!0;ie(!0)},fe=function(e){e.preventDefault(),b&&(p.a.confirmSignUp(j,P).then((function(){return n.includes("business")?(k.push("/business/login"),window.location.reload()):(k.push("/curator/login"),window.location.reload())})).catch((function(e){return J(!0)})),z(""),i("")),pe()&&(p.a.signUp({username:j,password:u,attributes:{email:j,phone_number:R,name:c}}).then((function(){v(!0)})).catch((function(e){return H(e.message)}),D(!0)),f(),B())},ge=function(e){q(!1),re(!1),ee(!1),ie(!1),D(!1),J(!1),"username"===e.target.id?i(e.target.value):"password"===e.target.id?f(e.target.value):"phone_number"===e.target.id?B(e.target.value):"email"===e.target.id?y(e.target.value):"confirmationCode"===e.target.id&&z(e.target.value)};return n.includes("business")?r.a.createElement("div",{className:"login-wrapper"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6 cover-image"}," "),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"login-form-wrapper"},r.a.createElement("div",{className:"login-form-header"},r.a.createElement("h1",null,"Register to Get Started"),r.a.createElement("p",null," Start working on your business profile page ")),T?r.a.createElement("div",{class:"form-group"},r.a.createElement("br",null),r.a.createElement("h6",null,W)):null,r.a.createElement("div",{className:"login-form-nested-wrapper"},b?r.a.createElement("form",{onSubmit:function(e){return fe(e)}},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("p",null," Enter the Confirmation code sent to your Registered Email"),r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{id:"confirmationCode",type:"text",onChange:function(e){return ge(e)},placeholder:"Confirmation Code"})),r.a.createElement(N,{type:"submit",className:"btn btn-primary"},"Confirm Sign up"),G?r.a.createElement("div",{class:"form-group"},r.a.createElement("br",null),r.a.createElement("h6",null,"Confirmation code does not match")):null))):r.a.createElement("form",{onSubmit:function(e){return fe(e)}},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"text",id:"username",onChange:function(e){return ge(e)},error:$,placeholder:"First Name"}))),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{id:"last_name",onChange:function(e){return ge(e)},type:"text",placeholder:"Last Name"})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{id:"phone_number",onChange:function(e){return ge(e)},error:ae,placeholder:"Phone Number"})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"email",id:"email",onChange:function(e){return ge(e)},error:X,placeholder:"Email address"})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"password",id:"password",onChange:function(e){return ge(e)},error:oe,placeholder:"Password"})))),r.a.createElement("div",{className:"find-your-business-wrapper"},r.a.createElement("h2",{onClick:function(){return de(!0)}}," Find Your Business"),r.a.createElement("br",null),r.a.createElement("div",{className:"form-group"},ue?r.a.createElement(C,{onChange:function(){return null}}):null),r.a.createElement("p",null,"By clicking register, I represent I have read, understand, and agree to the Postmates Privacy Policy and Terms of Service. This site is protected bt reCAPTCHA and google Privacy Policy and Terms of Service apply.")),r.a.createElement(N,{type:"submit",className:"btn btn-primary"},"Register"),r.a.createElement("div",{className:"login-links-wrapper login-links-extra-links"},n.includes("business")?r.a.createElement(o.b,{to:"/business/login",className:"link-btn"},"Already have an account? ",r.a.createElement("strong",null,"Log In")):r.a.createElement(o.b,{to:"/curator/login",className:"link-btn"},"Already have an account? ",r.a.createElement("strong",null,"Log In")))))))))):r.a.createElement("div",{className:"login-wrapper"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6 cover-image"}," "),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"login-form-wrapper"},r.a.createElement("div",{className:"login-form-header"},r.a.createElement("h1",null,"Register to Get Started"),r.a.createElement("p",null," Start working on your business profile page ")),r.a.createElement("div",{className:"login-form-nested-wrapper"},b?r.a.createElement("form",{onSubmit:function(e){return fe(e)}},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6"},r.a.createElement("p",null," Enter the Confirmation code sent to your Registered Email"),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{id:"confirmationCode",type:"text",onChange:function(e){return ge(e)},placeholder:"Confirmation Code"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Sign up"),G?r.a.createElement("div",{className:"form-group"},r.a.createElement("br",null),r.a.createElement("h6",null,"Confirmation code does not match")):null))):r.a.createElement("form",{onSubmit:function(e){return fe(e)}},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"text",id:"username",onChange:function(e){return ge(e)},error:$,placeholder:"First Name"}))),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{id:"last_name",onChange:function(e){return ge(e)},type:"text",placeholder:"Last Name"})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{id:"phone_number",onChange:function(e){return ge(e)},error:ae,placeholder:"Phone Number"})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"email",id:"email",onChange:function(e){return ge(e)},error:X,placeholder:"Email address"})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"password",id:"password",onChange:function(e){return ge(e)},error:oe,placeholder:"Password"})))),r.a.createElement("div",{className:"find-your-business-wrapper"},r.a.createElement("p",null,"By clicking register, I represent I have read, understand, and agree to the Postmates Privacy Policy and Terms of Service. This site is protected bt reCAPTCHA and google Privacy Policy and Terms of Service apply.")),r.a.createElement(N,{type:"submit",className:"btn btn-primary"},"Register"),T?r.a.createElement("div",{className:"form-group"},r.a.createElement("br",null),r.a.createElement("h6",null,W)):null,r.a.createElement("div",{className:"login-links-wrapper login-links-extra-links"},n.includes("business")?r.a.createElement(o.b,{to:"/business/login",className:"link-btn"},"Already have an account? ",r.a.createElement("strong",null,"Log In")):r.a.createElement(o.b,{to:"/curator/login",className:"link-btn"},"Already have an account? ",r.a.createElement("strong",null,"Log In"))))))))))},z=function(e){var n=e.match.url,t=Object(a.useState)(),l=Object(d.a)(t,2),c=l[0],i=l[1],s=Object(a.useState)(),m=Object(d.a)(s,2),u=m[0],f=m[1],g=Object(a.useState)(),b=Object(d.a)(g,2),v=b[0],h=b[1],x=Object(a.useState)(),j=Object(d.a)(x,2),y=j[0],O=j[1],S=Object(a.useState)(!1),C=Object(d.a)(S,2),P=C[0],z=C[1],_=Object(a.useState)(!1),A=Object(d.a)(_,2),R=A[0],B=A[1],F=Object(a.useState)(!1),L=Object(d.a)(F,2),T=L[0],D=L[1],I=Object(a.useState)(!1),M=Object(d.a)(I,2),W=M[0],H=M[1],Y=Object(a.useState)(),Z=Object(d.a)(Y,2),G=Z[0],J=Z[1],U=Object(a.useState)(!1),Q=Object(d.a)(U,2),$=Q[0],q=Q[1],V=Object(a.useState)(!1),K=Object(d.a)(V,2),X=K[0],ee=K[1],ne=Object(a.useState)(!1),te=Object(d.a)(ne,2),ae=te[0],re=te[1],le=Object(a.useState)(!1),ce=Object(d.a)(le,2),oe=ce[0],ie=ce[1],se=function(){if(u||q(!0),v||ee(!0),y)return!0;re(!0)},me=function(e){B(!1),q(!1),ee(!1),re(!1),H(!1),"username"===e.target.id?i(e.target.value):"password"===e.target.id?h(e.target.value):"code"===e.target.id?f(e.target.value):"conPassword"===e.target.id&&O(e.target.value)};return!0===P?r.a.createElement("div",{className:"login-wrapper"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6 cover-image"}," "),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"login-form-wrapper"},r.a.createElement("div",{className:"login-form-header"},r.a.createElement("h1",null,"Reset Password "),r.a.createElement("p",null," Enter the code sent to your Registered Email And also Enter your new password ")),r.a.createElement("div",{className:"login-form-nested-wrapper"},r.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),B(!1),H(!1),v===y&&se()?(p.a.forgotPasswordSubmit(c,u,v).then((function(e){return n.includes("business")?(k.push("/business/login"),window.location.reload()):(k.push("/curator/login"),window.location.reload())})).catch((function(e){return J(e.message)}),B(!0)),h(""),f("")):v!==y&&H(!0)}(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"text",id:"code",error:$,onChange:function(e){return me(e)},placeholder:"Confirmation Code"})),r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"password",id:"password",error:X,onChange:function(e){return me(e)},placeholder:"New Password"})),r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"password",id:"conPassword",error:ae,onChange:function(e){return me(e)},placeholder:"Confirm Password"})),r.a.createElement(N,{type:"submit",className:"btn btn-primary"},"Submit"),R?r.a.createElement("div",{className:"form-group"},r.a.createElement("br",null),r.a.createElement("h6",null," ",G)):null,W?r.a.createElement("div",{className:"form-group"},r.a.createElement("br",null),r.a.createElement("h6",null," Password Does not match.")):null,r.a.createElement("div",{className:"login-links-wrapper"},n.includes("business")?r.a.createElement(o.b,{to:"/business/login",className:"link-btn"},"Back to Login"):r.a.createElement(o.b,{to:"/curator/login",className:"link-btn"},"Back to Login"))))))))):r.a.createElement("div",{className:"login-wrapper"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6 cover-image"}," "),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("div",{className:"login-form-wrapper"},r.a.createElement("div",{className:"login-form-header"},r.a.createElement("h1",null,"Reset Password "),r.a.createElement("p",null," Enter the email address you registered with and we'll send you instruction to Reset your password ")),r.a.createElement("div",{className:"login-form-nested-wrapper"},r.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),ie(!0),p.a.forgotPassword(c).then((function(e){return z(!0)})).catch((function(e){return D(!0)})),e.target.reset()}(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement(w,{type:"email",id:"username",onChange:function(e){return me(e)},placeholder:"Email address"})),r.a.createElement(N,{type:"submit",className:"btn btn-primary"},oe&&!T?r.a.createElement(E,null):"Reset"),T?r.a.createElement("div",{className:"form-group"},r.a.createElement("br",null),r.a.createElement("h6",null,"This Email is not Registered.")):null,r.a.createElement("div",{className:"login-links-wrapper"},n.includes("business")?r.a.createElement(o.b,{to:"/business/login",className:"link-btn"},"Back to Login"):r.a.createElement(o.b,{to:"/curator/login",className:"link-btn"},"Back to Login")))))))))};function _(){var e=Object(b.a)(["\n font-size: 24px;\n color:#000;\n font-weight:500;\n font-family: 'Roboto', sans-serif;\n"]);return _=function(){return e},e}var A=v.a.h2(_()),R=function(e){return r.a.createElement(A,null,e.name)};function B(){var e=Object(b.a)(["\nfont-size:18px;\nfont-weight:500;\nmargin-top:10px;\nfont-family: 'Roboto', sans-serif;\n"]);return B=function(){return e},e}var F=v.a.h2(B()),L=function(e){return r.a.createElement(F,null,e.name)};function T(){var e=Object(b.a)(["\nfont-size:14px;\nmargin-top:10px;\nfont-family: 'Roboto', sans-serif;\n"]);return T=function(){return e},e}function D(){var e=Object(b.a)(["\nwidth: 124px;\nheight: 124px;\nborder-radius: 100%;\nbackground-color:#C4C4C4;\nmargin:0 auto 10px;\n"]);return D=function(){return e},e}function I(){var e=Object(b.a)(["\nmargin-bottom:25px;\ntext-align:center;\n"]);return I=function(){return e},e}var M=v.a.div(I()),W=v.a.div(D()),H=v.a.p(T()),Y=function(){return r.a.createElement(M,null,r.a.createElement(W,null),r.a.createElement(R,{name:"Steve\u2019s Pizza"}),r.a.createElement(L,{name:"Followers"}),r.a.createElement(H,null,"121"),r.a.createElement(N,{buttontext:"Edit Profile"}))},Z=t(53),G=t.n(Z),J=t(54),U=t.n(J),Q=t(55),$=t.n(Q),q=t(56),V=t.n(q);function K(){var e=Object(b.a)(["\ndisplay:flex;\nmargin-top: 10px;\nalign-items: center;\nimg{\n  margin-right:10px;\n}\n"]);return K=function(){return e},e}function X(){var e=Object(b.a)(["\nheight: 26px;\nbackground: #E4E4E4;\nfont-size: 14px;\ndisplay: inline-flex;\nborder-radius: 4px;\njustify-content: center;\nalign-items: center;\npadding: 0 10px;\nmargin-right: 10px;\nmargin: 10px 10px 0px 0;\nline-height:26px;\ncursor:pointer;\n\n"]);return X=function(){return e},e}function ee(){var e=Object(b.a)(["\npadding:15px;\nborder-bottom: 1px solid #ddd;\nh2{\n  margin:0px;\n}\np{\nfont-size:14px;\nmargin-bottom:0px;\nmargin-top:5px;\ndisplay:flex;\nwidth:100%;\nspan:last-child{\nmargin-left: auto;\nwidth: 33%;\n}\n}\n"]);return ee=function(){return e},e}function ne(){var e=Object(b.a)(["\n  width:270px;\n  background: #fff;\n  padding:15px 0;\n  @media (max-width:767px){\n    width:100%; \n  }\n"]);return ne=function(){return e},e}var te=v.a.div(ne()),ae=v.a.div(ee()),re=v.a.div(X()),le=v.a.div(K()),ce=function(){return r.a.createElement(te,null,r.a.createElement(Y,null),r.a.createElement(ae,null,r.a.createElement(L,{name:"Address"}),r.a.createElement("p",null,"110 Cedar St, New York, NY 10006")),r.a.createElement(ae,null,r.a.createElement(L,{name:"Website"}),r.a.createElement("p",null,"www.stevepizza.com")),r.a.createElement(ae,null,r.a.createElement(L,{name:"General Type"}),r.a.createElement("p",null,"Restaurant")),r.a.createElement(ae,null,r.a.createElement(L,{name:"Specific Type"}),r.a.createElement("p",null,"-")),r.a.createElement(ae,null,r.a.createElement(L,{name:"Phone"}),r.a.createElement("p",null,"202 619 3062")),r.a.createElement(ae,null,r.a.createElement(L,{name:"Opening Hours"}),r.a.createElement("p",null,r.a.createElement("span",null,"Monday - Friday"),r.a.createElement("span",null,"8 am - 9 pm")),r.a.createElement("p",null,r.a.createElement("span",null,"Saturday - Sunday"),r.a.createElement("span",null,"Closed"))),r.a.createElement(ae,null,r.a.createElement(L,{name:"Hashtags"}),r.a.createElement(re,null,"Comfort food"),r.a.createElement(re,null,"Quick bite"),r.a.createElement(re,null,"Bar"),r.a.createElement(re,null,"Longe")),r.a.createElement(ae,null,r.a.createElement(L,{name:"Social Media"}),r.a.createElement(le,null,r.a.createElement("img",{src:G.a,alt:G.a}),r.a.createElement("img",{src:U.a,alt:U.a}),r.a.createElement("img",{src:$.a,alt:$.a}),r.a.createElement("img",{src:V.a,alt:V.a}))))};function oe(){var e=Object(b.a)(["\npadding: 20px 20px;\nbackground: #fff;\n"]);return oe=function(){return e},e}var ie=v.a.div(oe()),se=function(e,n){return r.a.createElement(ie,null,e.children)},me=t(57),ue=t.n(me);function de(){var e=Object(b.a)(["\nheight: 37px;\nborder:1px solid #A8A8A8;\nborder-radius: 5px;\nfont-size: 12px;\ncolor: #848484;\nfont-family: 'Roboto',sans-serif;\ndisplay: inline-flex;\nalign-items: center;\njustify-content: center;\npadding: 0 10px;\ncursor:pointer;\nimg{\n  margin-left:6px;\n}\n"]);return de=function(){return e},e}var pe=v.a.div(de()),fe=function(e){return r.a.createElement(pe,null,e.name,r.a.createElement("img",{src:ue.a,alt:ue.a}))},ge=t(102),Ee=t(58),be=t.n(Ee),ve=t(59),he=t.n(ve);function xe(){var e=Object(b.a)(["\ntext-align:right;\nimg{\n    margin-left: 30px;\n    cursor:pointer;\n}\n"]);return xe=function(){return e},e}function we(){var e=Object(b.a)(["\ndisplay: flex;\njustify-content: space-between;\nalign-items:center;\n"]);return we=function(){return e},e}function je(){var e=Object(b.a)(["\nwidth: calc(100% - 42px);\nmargin-left: 15px;\nh4{\n    font-size:16px;\n    font-weight:500px;\n}\nspan{\n    font-size:12px;\n    margin-left:auto;\n    margin-bottom:10px;\n}\np{\n    font-size:14px;\n    margin-bottom:0px;\n    margin-top:5px;\n}\n"]);return je=function(){return e},e}function ye(){var e=Object(b.a)(["\nwidth:24px;\nheight:24px;\nbackground:#C4C4C4;\nborder-radius:100%;\n"]);return ye=function(){return e},e}function Ne(){var e=Object(b.a)(["\ndisplay:flex;\nfont-family: 'Roboto',sans-serif;\nborder-bottom: 1px solid #ddd;\npadding: 15px 0;\n"]);return Ne=function(){return e},e}var Oe=v.a.div(Ne()),Se=v.a.div(ye()),ke=v.a.div(je()),Ce=v.a.div(we()),Pe=v.a.div(xe()),ze=function(e,n){return r.a.createElement(Oe,null,r.a.createElement(Se,null),r.a.createElement(ke,null,r.a.createElement(Ce,null,r.a.createElement("h4",null,"Steve\u2019s Pizza"),r.a.createElement("span",null,"2 hours ago")),r.a.createElement("p",null,"The situation here in Boston is better than other states. We have so far 46 confirmed cases and the quarantined places took..."),r.a.createElement(Pe,null,r.a.createElement("img",{src:be.a,alt:be.a}),r.a.createElement("img",{src:he.a,alt:he.a}))))},_e=t(60),Ae=t.n(_e);function Re(){var e=Object(b.a)(["\nfont-family: 'Roboto',sans-serif;\nmargin-top: 20px;\nheight:33px;\nborder:1px solid #A8A8A8;\nborder-radius:4px;\ndisplay:flex;\npadding:0 15px;\ninput{\n    border:none;\n    background: transparent;\n    width:100%;\n    font-size:14px;\n    line-height: 33px;\n    padding: 0 0 0 10px;\n\n::placeholder{\n    font-size:10px;\n    color:#B1B1B1;\n}\n:focus{\n    outline:none;\n}\n}\n"]);return Re=function(){return e},e}var Be=v.a.div(Re()),Fe=function(e,n){return r.a.createElement(Be,null,r.a.createElement("img",{src:Ae.a,alt:Ae.a}),r.a.createElement("input",{type:"search",placeholder:"search"}))},Le=t(61),Te=t.n(Le);function De(){var e=Object(b.a)(["\nmargin-left:auto;\nfont-size:14px;\nfont-weight:500px;\nmargin-right:20px;\ncursor:pointer;\n"]);return De=function(){return e},e}function Ie(){var e=Object(b.a)(["\ndisplay: flex;\njustify-content: space-between;\nalign-items:center;\nmargin-top:30px;\n"]);return Ie=function(){return e},e}function Me(){var e=Object(b.a)(["\nheight: 26px;\nbackground: #E4E4E4;\nfont-size: 14px;\ndisplay: inline-flex;\nborder-radius: 4px;\njustify-content: center;\nalign-items: center;\npadding: 0 10px;\nmargin-right: 10px;\nmargin: 10px 10px 0px 0;\nline-height:26px;\ncolor:#848484;\ncursor:pointer;\nimg{\n    margin-left: 9px;\n}\n"]);return Me=function(){return e},e}function We(){var e=Object(b.a)(["\nborder-bottom:1px solid #ddd;\nmargin-bottom:15px;\npadding-bottom: 10px;\nspan{\n  font-size:14px;\n  margin-right:5px;\n  font-weight:500;\n}\n"]);return We=function(){return e},e}function He(){var e=Object(b.a)(["\nfont-family: 'Roboto',sans-serif;\nmargin-top:30px;\ninput{\n  border:none;\n  width:100%;\n  :focus{\n    outline:none;\n  }\n}\ntextarea{\n  border: none;\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 12px;\n  width: 100%;\n  height: 26px;\n  resize: none;\n  font-size: 12px;\n  :focus{\n    outline:none;\n  }\n}\n"]);return He=function(){return e},e}var Ye=v.a.div(He()),Ze=v.a.div(We()),Ge=v.a.div(Me()),Je=v.a.div(Ie()),Ue=v.a.a(De()),Qe=function(e){return r.a.createElement(Ye,null,r.a.createElement(Ze,null,r.a.createElement("span",null,"TO:"),r.a.createElement(Ge,null,"Steve Murph ",r.a.createElement("img",{src:Te.a,alt:Te.a}))),r.a.createElement("textarea",{placeholder:"Messages"}),r.a.createElement(fe,{name:"Media"}),r.a.createElement(Je,null,r.a.createElement(Ue,null,"Cancle"),r.a.createElement(N,{buttontext:"Post"})))},$e=t(98),qe=t.n($e),Ve=t(99),Ke=t.n(Ve),Xe=t(62),en=t.n(Xe);function nn(){var e=Object(b.a)(["\npadding:0px;\ndisplay:flex;\nalign-items:center;\nimg:first-child{\n  margin-right:10px;\n}\n"]);return nn=function(){return e},e}function tn(){var e=Object(b.a)(["\nbackground: #DEDEDE;\nheight: 46px;\nborder-radius: 6px;\ndisplay: flex;\nalign-items: center;\nmargin-top:50px;\npadding:0 15px;\ntextarea{\n  background: none;\n  border: none;\n  resize: none;\n  width: calc(100% - 61px);\n}\n"]);return tn=function(){return e},e}function an(){var e=Object(b.a)(["\n   background-color: #363636;\n    font-size: 14px;\n    width: 50%;\n    color: #fff;\n    min-height: 47px;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    padding: 15px;\n    border-radius: 6px;\n    position:relative;\n    margin-top:30px;\n    margin-left:auto;\n  span{\n    position:absolute;\n    right:5px;\n    bottom:3px;\n    font-size:10px;\n    color:#aaa;\n  }\n"]);return an=function(){return e},e}function rn(){var e=Object(b.a)(["\nbackground-color: #f2f2f2;\n    font-size: 14px;\n    width: 50%;\n    color: #676767;\n    min-height: 47px;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    padding: 15px;\n    border-radius: 6px;\n    position:relative;\n    margin-top:30px;\n  span{\n    position:absolute;\n    right:5px;\n    bottom:3px;\n    font-size:10px;\n    color:#aaa;\n  }\n"]);return rn=function(){return e},e}function ln(){var e=Object(b.a)(["\ndisplay:flex;\nalign-items:center;\nimg{\n  margin-right:15px;\n}\n"]);return ln=function(){return e},e}function cn(){var e=Object(b.a)(["\nmargin-top:30px;\nfont-family: 'Roboto',sans-serif;\n"]);return cn=function(){return e},e}var on=v.a.div(cn()),sn=v.a.div(ln()),mn=v.a.div(rn()),un=v.a.div(an()),dn=v.a.div(tn()),pn=v.a.div(nn()),fn=function(e){return r.a.createElement(on,null,r.a.createElement(sn,null,r.a.createElement("img",{src:en.a,alt:en.a})," ",r.a.createElement(L,{name:"John Watson"})),r.a.createElement(mn,null,"This is awesome!",r.a.createElement("span",null,"2 hours ago")),r.a.createElement(un,null,"Will 14:00 est Work?",r.a.createElement("span",null,"2 hours ago")),r.a.createElement(mn,null,"This is awesome!",r.a.createElement("span",null,"2 hours ago")),r.a.createElement(un,null,"Will 14:00 est Work?",r.a.createElement("span",null,"2 hours ago")),r.a.createElement(dn,null,r.a.createElement("textarea",null),r.a.createElement(pn,null,r.a.createElement("img",{src:qe.a,alt:""})," ",r.a.createElement("img",{src:Ke.a,alt:""}))))};function gn(){var e=Object(b.a)(["\npadding: 0px;\nmargin-top: 20px;\nheight: 300px;\noverflow-y: auto;\n"]);return gn=function(){return e},e}function En(){var e=Object(b.a)(["\nmargin-top:30px;\n"]);return En=function(){return e},e}function bn(){var e=Object(b.a)(["\nmargin-left:auto;\nfont-size:14px;\nfont-weight:500px;\nmargin-right:20px;\ncursor:pointer;\n"]);return bn=function(){return e},e}function vn(){var e=Object(b.a)(["\nbackground-color: #F2F2F2;\nborder-radius: 6px;\nwidth: 100%;\nborder: none;\nresize: none;\nheight: 85px;\nmargin-top: 20px;\nfont-size: 14px;\ncolor: #8b8b8b;\npadding: 10px;\nmargin-bottom:7px;\n:focus{\n  outline:none;\n}\n"]);return vn=function(){return e},e}function hn(){var e=Object(b.a)(["\ndisplay: flex;\njustify-content: space-between;\nalign-items:center;\n"]);return hn=function(){return e},e}function xn(){var e=Object(b.a)(["\ndisplay:flex;\nmargin-top:30px;\njustify-content: space-between;\n> div{\n  width:50%;\n  :first-child{\n    margin-right:30px;\n  }\n}\n@media (max-width:767px){\n  flex-direction: column;\n  > div{\n    width:100%;\n    :first-child{\n      margin-right:0px;\n      margin-bottom: 30px;\n    }\n}\n"]);return xn=function(){return e},e}function wn(){var e=Object(b.a)(["\nheight: 100px;\n"]);return wn=function(){return e},e}function jn(){var e=Object(b.a)(["\nmargin-left: 30px;\nwidth: calc(100% - 300px);\nfont-family: 'Roboto',sans-serif;\n@media (max-width:767px){\n  margin-left: 0;\n  width: 100%;\n  margin-top: 30px;\n}\n"]);return jn=function(){return e},e}var yn=v.a.div(jn()),Nn=v.a.div(wn()),On=v.a.div(xn()),Sn=v.a.div(hn()),kn=v.a.textarea(vn()),Cn=v.a.a(bn()),Pn=v.a.div(En()),zn=v.a.div(gn()),_n=function(){return r.a.createElement(yn,null,r.a.createElement(se,null,r.a.createElement(R,{name:"Event"}),r.a.createElement(Nn,null)),r.a.createElement(On,null,r.a.createElement(se,null,r.a.createElement(Sn,null,r.a.createElement(R,{name:"Post"}),r.a.createElement(R,{name:"Mentions"})),r.a.createElement(kn,{placeholder:"Type your post here"}),r.a.createElement(Sn,null,r.a.createElement(fe,{name:"Public"}),r.a.createElement(Cn,null,"cancle"),r.a.createElement(N,{buttontext:"Publish"},r.a.createElement(ge.a,null))),r.a.createElement(Pn,null,r.a.createElement(R,{name:"Feed"}),r.a.createElement(zn,null,r.a.createElement(ze,null),r.a.createElement(ze,null),r.a.createElement(ze,null)))),r.a.createElement(se,null,r.a.createElement(Sn,null,r.a.createElement(R,{name:"Messages"}),r.a.createElement(N,{buttontext:"New"})),r.a.createElement(Fe,null),r.a.createElement(zn,null,r.a.createElement(ze,null),r.a.createElement(ze,null),r.a.createElement(ze,null)),r.a.createElement(Qe,null),r.a.createElement(fn,null))))};function An(){var e=Object(b.a)(["\ndisplay:flex;\n@media (max-width:767px){\n    flex-direction: column;  \n}\n"]);return An=function(){return e},e}var Rn=v.a.div(An()),Bn=function(){return r.a.createElement(Rn,null,r.a.createElement(ce,null),r.a.createElement(_n,null))},Fn=function(){return r.a.createElement(o.a,null,r.a.createElement(i.d,null,r.a.createElement(i.b,{path:"/business/login",component:O}),r.a.createElement(i.b,{path:"/curator/login",component:O}),r.a.createElement(i.b,{path:"/business/register",component:P}),r.a.createElement(i.b,{path:"/curator/register",component:P}),r.a.createElement(i.b,{path:"/business/forgot-password",component:z}),r.a.createElement(i.b,{path:"/curator/forgot-password",component:z}),r.a.createElement(i.b,{path:"/dashboard",component:Bn}),r.a.createElement(i.a,{exact:!0,from:"/*",to:"/business/login"})))};var Ln=function(){return r.a.createElement(Fn,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Tn={aws_project_region:"us-east-1",aws_cognito_identity_pool_id:"us-east-1:3189e103-8335-4b48-bb26-71e14898acc4",aws_cognito_region:"us-east-1",aws_user_pools_id:"us-east-1_W5dpJ0PhM",aws_user_pools_web_client_id:"7v7acardjlsrksegaim52bbqv4",oauth:{}};t(28).default.configure(Tn),c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Ln,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},41:function(e,n,t){},53:function(e,n,t){e.exports=t.p+"static/media/facebook.63bc58cd.svg"},54:function(e,n,t){e.exports=t.p+"static/media/twitter.6ff6c7b8.svg"},55:function(e,n,t){e.exports=t.p+"static/media/instagram.0288de58.svg"},56:function(e,n,t){e.exports=t.p+"static/media/linkedin.9469ccc9.svg"},57:function(e,n,t){e.exports=t.p+"static/media/down-arrow.afee6954.svg"},58:function(e,n,t){e.exports=t.p+"static/media/like.8a18e7da.svg"},59:function(e,n,t){e.exports=t.p+"static/media/comment.8e9f9660.svg"},60:function(e,n,t){e.exports=t.p+"static/media/search.56759190.svg"},61:function(e,n,t){e.exports=t.p+"static/media/cross.c5717ac2.svg"},62:function(e,n,t){e.exports=t.p+"static/media/arrow-left.a3f1b152.svg"},98:function(e,n,t){e.exports=t.p+"static/media/pin.8efc2b1b.svg"},99:function(e,n,t){e.exports=t.p+"static/media/send.7de60657.svg"}},[[108,1,2]]]);
//# sourceMappingURL=main.10ab345c.chunk.js.map