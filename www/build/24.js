webpackJsonp([24],{686:function(l,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e(0),u=(e(1),e(17),e(83)),o=e(106),a=e(38),i=e(66),d=function(){function l(l,n,e,t,u,o){var a=this;this.navCtrl=n,this.iab=e,this.storageProvider=t,this.commonProvider=u,this.endpointProvider=o,this.search="",this.bills=[],l.ready().then(function(){l.registerBackButtonAction(function(){a.navCtrl.setRoot("HomePage",{},{animate:!0,direction:"back"})})}),this.getBills()}return l.prototype.onCancel=function(){this.search=""},l.prototype.getBills=function(){var l=this,n=this.commonProvider.loading();this.endpointProvider.get("projects").subscribe(function(e){n.dismiss(),l.bills=e.response.filter(function(l){return 1==l.favorite})},function(l){n.dismiss()})},l.prototype.toggleFavorite=function(l,n,e){l.preventDefault(),l.stopPropagation(),n.favorite=!n.favorite,this.bills.splice(e,1),this.storageProvider.get("help-remove-favorite")||(this.commonProvider.toast("Se removió este Proyecto de ley a sus favoritos"),this.storageProvider.set("help-remove-favorite",!0)),this.endpointProvider.put("projects/favorite/"+n.id,{}).subscribe(function(l){},function(l){})},l.prototype.goToLink=function(l){this.iab.create(l,"_blank")},l}(),r=e(207),s=function(){return function(){}}(),c=e(471),v=e(472),f=e(473),g=e(474),h=e(475),p=e(476),m=e(477),b=e(478),R=e(479),C=e(50),P=e(21),_=e(20),k=e(3),y=e(36),E=e(42),F=e(25),w=e(215),B=e(68),x=e(7),T=e(104),j=e(40),L=e(9),M=e(24),I=e(27),q=e(18),A=e(103),D=e(39),N=e(105),O=e(49),$=e(481),V=e(23),H=e(107),S=e(6),J=e(67),U=e(26),Z=e(11),z=e(30),G=e(43),K=e(10),Q=e(14),W=t["ɵcrt"]({encapsulation:2,styles:[],data:{}});function X(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,3,"p",[["text-center",""]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" "])),(l()(),t["ɵeld"](2,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["No tiene Proyectos de ley favoritos"]))],null,null)}function Y(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,15,"button",[["class","item item-block"],["ion-item",""],["text-wrap",""]],null,[[null,"click"]],function(l,n,e){var t=!0;"click"===n&&(t=!1!==l.component.goToLink(l.context.$implicit.link)&&t);return t},C.b,C.a)),t["ɵdid"](1,1097728,null,3,P.a,[_.a,k.a,t.ElementRef,t.Renderer,[2,y.a]],null,null),t["ɵqud"](335544320,2,{contentLabel:0}),t["ɵqud"](603979776,3,{_buttons:1}),t["ɵqud"](603979776,4,{_icons:1}),t["ɵdid"](5,16384,null,0,E.a,[],null,null),(l()(),t["ɵted"](-1,2,["\n\t\t\t"])),(l()(),t["ɵeld"](7,0,null,0,1,"ion-icon",[["class","icon-estrella active"],["item-start",""],["role","img"]],[[2,"hide",null]],[[null,"click"]],function(l,n,e){var t=!0;"click"===n&&(t=!1!==l.component.toggleFavorite(e,l.context.$implicit,l.context.index)&&t);return t},null,null)),t["ɵdid"](8,147456,[[4,4]],0,F.a,[k.a,t.ElementRef,t.Renderer],null,null),(l()(),t["ɵted"](-1,2,["\n\t    "])),(l()(),t["ɵeld"](10,0,null,2,1,"h2",[],null,null,null,null,null)),(l()(),t["ɵted"](11,null,["",""])),(l()(),t["ɵted"](-1,2,["\n\t    "])),(l()(),t["ɵeld"](13,0,null,2,1,"p",[],null,null,null,null,null)),(l()(),t["ɵted"](14,null,["",""])),(l()(),t["ɵted"](-1,2,["\n\t  "]))],null,function(l,n){l(n,7,0,t["ɵnov"](n,8)._hidden),l(n,11,0,n.context.$implicit.name),l(n,14,0,n.context.$implicit.categories[0].name)})}function ll(l){return t["ɵvid"](0,[t["ɵpid"](0,w.a,[]),(l()(),t["ɵeld"](1,0,null,null,26,"ion-header",[],null,null,null,null,null)),t["ɵdid"](2,16384,null,0,B.a,[k.a,t.ElementRef,t.Renderer,[2,x.a]],null,null),(l()(),t["ɵted"](-1,null,["\n  "])),(l()(),t["ɵeld"](4,0,null,null,15,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,T.b,T.a)),t["ɵdid"](5,49152,null,0,j.a,[L.a,[2,x.a],[2,M.a],k.a,t.ElementRef,t.Renderer],null,null),(l()(),t["ɵted"](-1,3,["\n    "])),(l()(),t["ɵeld"](7,0,null,0,11,"button",[["ion-button",""],["menuToggle",""]],[[8,"hidden",0]],[[null,"click"]],function(l,n,e){var u=!0;"click"===n&&(u=!1!==t["ɵnov"](l,9).toggle()&&u);return u},I.b,I.a)),t["ɵdid"](8,1097728,[[1,4]],0,q.a,[[8,""],k.a,t.ElementRef,t.Renderer],null,null),t["ɵdid"](9,1064960,null,0,A.a,[D.a,[2,x.a],[2,q.a],[2,j.a]],{menuToggle:[0,"menuToggle"]},null),t["ɵdid"](10,16384,null,1,N.a,[k.a,t.ElementRef,t.Renderer,[2,O.a],[2,j.a]],null,null),t["ɵqud"](603979776,1,{_buttons:1}),(l()(),t["ɵted"](-1,0,["\n      "])),(l()(),t["ɵeld"](13,0,null,0,1,"ion-icon",[["class","icon-hamburguesa"],["role","img"]],[[2,"hide",null]],null,null,null,null)),t["ɵdid"](14,147456,null,0,F.a,[k.a,t.ElementRef,t.Renderer],null,null),(l()(),t["ɵted"](-1,0,["\n      "])),(l()(),t["ɵeld"](16,0,null,0,1,"span",[["class","title"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["Favoritos"])),(l()(),t["ɵted"](-1,0,["\n    "])),(l()(),t["ɵted"](-1,3,["\n  "])),(l()(),t["ɵted"](-1,null,["\n\n  "])),(l()(),t["ɵeld"](21,0,null,null,5,"ion-searchbar",[["placeholder","Buscar"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"searchbar-animated",null],[2,"searchbar-has-value",null],[2,"searchbar-active",null],[2,"searchbar-show-cancel",null],[2,"searchbar-left-aligned",null],[2,"searchbar-has-focus",null]],[[null,"ngModelChange"],[null,"ionCancel"]],function(l,n,e){var t=!0,u=l.component;"ngModelChange"===n&&(t=!1!==(u.search=e)&&t);"ionCancel"===n&&(t=!1!==u.onCancel(e)&&t);return t},$.b,$.a)),t["ɵdid"](22,671744,null,0,V.h,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),t["ɵprd"](2048,null,V.f,null,[V.h]),t["ɵdid"](24,16384,null,0,V.g,[V.f],null,null),t["ɵdid"](25,1294336,null,0,H.a,[k.a,S.a,t.ElementRef,t.Renderer,[2,V.f]],{showCancelButton:[0,"showCancelButton"],placeholder:[1,"placeholder"]},{ionCancel:"ionCancel"}),(l()(),t["ɵted"](-1,null,["\n\t"])),(l()(),t["ɵted"](-1,null,["\n"])),(l()(),t["ɵted"](-1,null,["\n\n"])),(l()(),t["ɵeld"](29,0,null,null,13,"ion-content",[["no-bounce",""]],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,J.b,J.a)),t["ɵdid"](30,4374528,null,0,U.a,[k.a,S.a,Z.a,t.ElementRef,t.Renderer,L.a,z.a,t.NgZone,[2,x.a],[2,M.a]],null,null),(l()(),t["ɵted"](-1,1,["\n\t"])),(l()(),t["ɵeld"](32,0,null,1,9,"ion-list",[["class","list-borders"],["no-lines",""]],null,null,null,null,null)),t["ɵdid"](33,16384,null,0,G.a,[k.a,t.ElementRef,t.Renderer,S.a,K.l,Z.a],null,null),(l()(),t["ɵted"](-1,null,["\n\t\t\n\t\t"])),(l()(),t["ɵand"](16777216,null,null,1,null,X)),t["ɵdid"](36,16384,null,0,Q.j,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["ɵted"](-1,null,["\n\n\t\t"])),(l()(),t["ɵand"](16777216,null,null,2,null,Y)),t["ɵdid"](39,802816,null,0,Q.i,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["ɵppd"](40,3),(l()(),t["ɵted"](-1,null,[" \n\t \n\t"])),(l()(),t["ɵted"](-1,1,["\n"])),(l()(),t["ɵted"](-1,null,["\n"]))],function(l,n){var e=n.component;l(n,9,0,""),l(n,22,0,e.search);l(n,25,0,e.shouldShowCancel,"Buscar"),l(n,36,0,0==e.bills.length),l(n,39,0,t["ɵunv"](n,39,0,l(n,40,0,t["ɵnov"](n,0),e.bills,"name",e.search)))},function(l,n){l(n,4,0,t["ɵnov"](n,5)._hidden,t["ɵnov"](n,5)._sbPadding),l(n,7,0,t["ɵnov"](n,9).isHidden),l(n,13,0,t["ɵnov"](n,14)._hidden),l(n,21,1,[t["ɵnov"](n,24).ngClassUntouched,t["ɵnov"](n,24).ngClassTouched,t["ɵnov"](n,24).ngClassPristine,t["ɵnov"](n,24).ngClassDirty,t["ɵnov"](n,24).ngClassValid,t["ɵnov"](n,24).ngClassInvalid,t["ɵnov"](n,24).ngClassPending,t["ɵnov"](n,25)._animated,t["ɵnov"](n,25)._value,t["ɵnov"](n,25)._isActive,t["ɵnov"](n,25)._showCancelButton,t["ɵnov"](n,25)._shouldAlignLeft,t["ɵnov"](n,25)._isFocus]),l(n,29,0,t["ɵnov"](n,30).statusbarPadding,t["ɵnov"](n,30)._hasRefresher)})}var nl=t["ɵccf"]("page-favorites",d,function(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,1,"page-favorites",[],null,null,null,ll,W)),t["ɵdid"](1,49152,null,0,d,[S.a,M.a,u.a,o.a,a.a,i.a],null,null)],null,null)},{},{},[]),el=e(206),tl=e(75);e.d(n,"FavoritesPageModuleNgFactory",function(){return ul});var ul=t["ɵcmf"](s,[],function(l){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[c.a,v.a,f.a,g.a,h.a,p.a,m.a,b.a,R.a,nl]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,Q.l,Q.k,[t.LOCALE_ID,[2,Q.v]]),t["ɵmpd"](4608,V.k,V.k,[]),t["ɵmpd"](4608,V.c,V.c,[]),t["ɵmpd"](512,Q.b,Q.b,[]),t["ɵmpd"](512,V.j,V.j,[]),t["ɵmpd"](512,V.d,V.d,[]),t["ɵmpd"](512,V.i,V.i,[]),t["ɵmpd"](512,el.a,el.a,[]),t["ɵmpd"](512,el.b,el.b,[]),t["ɵmpd"](512,r.a,r.a,[]),t["ɵmpd"](512,s,s,[]),t["ɵmpd"](256,tl.a,d,[])])})}});