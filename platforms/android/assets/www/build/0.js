webpackJsonp([0],{710:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=u(0),e=(u(1),u(17),u(38)),a=u(83),d=function(){function l(l,n,u,t,e){var a=this;this.navCtrl=n,this.navParams=u,this.commonProvider=t,this.iab=e,this.myVote=null,this.question={},this.percentage={},l.ready().then(function(){l.registerBackButtonAction(function(){a.back()})}),this.question=this.navParams.get("survey"),console.log(this.question)}return l.prototype.back=function(){this.navCtrl.setRoot("SurveyFormPage",{},{animate:!0,direction:"back"})},l.prototype.ionViewDidLoad=function(){this.generateCharts()},l.prototype.generateCharts=function(){var l=this.question.votes_true_count+this.question.votes_false_count;this.percentage.true=this.getProm(l,this.question.votes_true_count),this.percentage.false=this.getProm(l,this.question.votes_false_count),this.doughnutChartYes=this.commonProvider.generateDoughnutChart(this.doughnutCanvasYes,this.percentage.true,"rgba(61, 174, 85, 1)"),this.doughnutChartNo=this.commonProvider.generateDoughnutChart(this.doughnutCanvasNo,this.percentage.false,"rgba(248, 29, 0, 1)")},l.prototype.getProm=function(l,n){var u=Math.round(100*n/l);return isNaN(u)?0:u},l.prototype.goToLink=function(l){this.iab.create(l,"_blank")},l}(),o=function(){return function(){}}(),i=u(471),r=u(472),s=u(473),c=u(474),h=u(475),g=u(476),m=u(477),v=u(478),p=u(479),f=u(68),b=u(3),R=u(7),C=u(104),_=u(40),k=u(9),y=u(24),q=u(105),P=u(49),E=u(27),N=u(18),w=u(25),D=u(103),F=u(39),L=u(67),M=u(26),S=u(6),T=u(11),Y=u(30),j=u(211),O=u(212),A=u(210),B=u(19),H=t["ɵcrt"]({encapsulation:2,styles:[],data:{}});function I(l){return t["ɵvid"](0,[t["ɵqud"](402653184,1,{doughnutCanvasYes:0}),t["ɵqud"](402653184,2,{doughnutCanvasNo:0}),(l()(),t["ɵeld"](2,0,null,null,31,"ion-header",[],null,null,null,null,null)),t["ɵdid"](3,16384,null,0,f.a,[b.a,t.ElementRef,t.Renderer,[2,R.a]],null,null),(l()(),t["ɵted"](-1,null,["\n  "])),(l()(),t["ɵeld"](5,0,null,null,27,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,C.b,C.a)),t["ɵdid"](6,49152,null,0,_.a,[k.a,[2,R.a],[2,y.a],b.a,t.ElementRef,t.Renderer],null,null),(l()(),t["ɵted"](-1,3,["\n  \t"])),(l()(),t["ɵeld"](8,0,null,1,10,"ion-buttons",[["class","fake-back"],["start",""]],null,null,null,null,null)),t["ɵdid"](9,16384,null,1,q.a,[b.a,t.ElementRef,t.Renderer,[2,P.a],[2,_.a]],null,null),t["ɵqud"](603979776,3,{_buttons:1}),(l()(),t["ɵted"](-1,null,["\n      "])),(l()(),t["ɵeld"](12,0,null,null,5,"button",[["clear",""],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;"click"===n&&(t=!1!==l.component.back()&&t);return t},E.b,E.a)),t["ɵdid"](13,1097728,[[3,4]],0,N.a,[[8,""],b.a,t.ElementRef,t.Renderer],{clear:[0,"clear"]},null),(l()(),t["ɵted"](-1,0,["\n        "])),(l()(),t["ɵeld"](15,0,null,0,1,"ion-icon",[["class","icon-flecha3"],["name","menu"],["role","img"]],[[2,"hide",null]],null,null,null,null)),t["ɵdid"](16,147456,null,0,w.a,[b.a,t.ElementRef,t.Renderer],{name:[0,"name"]},null),(l()(),t["ɵted"](-1,0,["\n      "])),(l()(),t["ɵted"](-1,null,["\n    "])),(l()(),t["ɵted"](-1,3,["\n    \n    "])),(l()(),t["ɵeld"](20,0,null,0,11,"button",[["ion-button",""],["menuToggle",""]],[[8,"hidden",0]],[[null,"click"]],function(l,n,u){var e=!0;"click"===n&&(e=!1!==t["ɵnov"](l,22).toggle()&&e);return e},E.b,E.a)),t["ɵdid"](21,1097728,[[4,4]],0,N.a,[[8,""],b.a,t.ElementRef,t.Renderer],null,null),t["ɵdid"](22,1064960,null,0,D.a,[F.a,[2,R.a],[2,N.a],[2,_.a]],{menuToggle:[0,"menuToggle"]},null),t["ɵdid"](23,16384,null,1,q.a,[b.a,t.ElementRef,t.Renderer,[2,P.a],[2,_.a]],null,null),t["ɵqud"](603979776,4,{_buttons:1}),(l()(),t["ɵted"](-1,0,["\n      "])),(l()(),t["ɵeld"](26,0,null,0,1,"ion-icon",[["class","icon-hamburguesa"],["role","img"]],[[2,"hide",null]],null,null,null,null)),t["ɵdid"](27,147456,null,0,w.a,[b.a,t.ElementRef,t.Renderer],null,null),(l()(),t["ɵted"](-1,0,["\n      "])),(l()(),t["ɵeld"](29,0,null,0,1,"span",[["class","title"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["Resultados encuesta"])),(l()(),t["ɵted"](-1,0,["\n    "])),(l()(),t["ɵted"](-1,3,["\n  "])),(l()(),t["ɵted"](-1,null,["\n"])),(l()(),t["ɵted"](-1,null,["\n\n"])),(l()(),t["ɵeld"](35,0,null,null,46,"ion-content",[["no-bounce",""]],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,L.b,L.a)),t["ɵdid"](36,4374528,null,0,M.a,[b.a,S.a,T.a,t.ElementRef,t.Renderer,k.a,Y.a,t.NgZone,[2,R.a],[2,y.a]],null,null),(l()(),t["ɵted"](-1,1,["\n\t"])),(l()(),t["ɵeld"](38,0,null,1,4,"div",[["id","question"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["\n\t\t"])),(l()(),t["ɵeld"](40,0,null,null,1,"p",[["class","question"]],null,null,null,null,null)),(l()(),t["ɵted"](41,null,["",""])),(l()(),t["ɵted"](-1,null,["\n\t"])),(l()(),t["ɵted"](-1,1,["\n\t\n\t"])),(l()(),t["ɵeld"](44,0,null,1,36,null,null,null,null,null,null,null)),(l()(),t["ɵted"](-1,null,[" \n\t\t"])),(l()(),t["ɵeld"](46,0,null,null,1,"p",[["class","answers dark"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["Hasta ahora sus seguidores han votado así"])),(l()(),t["ɵted"](-1,null,["\n\n\t\t"])),(l()(),t["ɵeld"](49,0,null,null,30,"ion-grid",[["class","grid"]],null,null,null,null,null)),t["ɵdid"](50,16384,null,0,j.a,[],null,null),(l()(),t["ɵted"](-1,null,["\n\t\t\t"])),(l()(),t["ɵeld"](52,0,null,null,26,"ion-row",[["class","row"]],null,null,null,null,null)),t["ɵdid"](53,16384,null,0,O.a,[],null,null),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),t["ɵeld"](55,0,null,null,10,"ion-col",[["class","content-chart col"],["col-6",""]],null,null,null,null,null)),t["ɵdid"](56,16384,null,0,A.a,[],null,null),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t\t"])),(l()(),t["ɵeld"](58,0,[[1,0],["doughnutCanvasYes",1]],null,0,"canvas",[["width","250"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t\t"])),(l()(),t["ɵeld"](60,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t["ɵted"](61,null,["","%"])),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t\t"])),(l()(),t["ɵeld"](63,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["SI"])),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),t["ɵeld"](67,0,null,null,10,"ion-col",[["class","content-chart col"],["col-6",""]],null,null,null,null,null)),t["ɵdid"](68,16384,null,0,A.a,[],null,null),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t\t"])),(l()(),t["ɵeld"](70,0,[[2,0],["doughnutCanvasNo",1]],null,0,"canvas",[["width","250"]],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t\t"])),(l()(),t["ɵeld"](72,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t["ɵted"](73,null,["","%"])),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t\t"])),(l()(),t["ɵeld"](75,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),t["ɵted"](-1,null,["NO"])),(l()(),t["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),t["ɵted"](-1,null,["\n\t\t\t"])),(l()(),t["ɵted"](-1,null,["\n\t\t"])),(l()(),t["ɵted"](-1,null,["\n\t\t\n\t"])),(l()(),t["ɵted"](-1,1,["\t\n\t\t\n"])),(l()(),t["ɵted"](-1,null,["\n\n"]))],function(l,n){l(n,13,0,"");l(n,16,0,"menu");l(n,22,0,"")},function(l,n){var u=n.component;l(n,5,0,t["ɵnov"](n,6)._hidden,t["ɵnov"](n,6)._sbPadding),l(n,15,0,t["ɵnov"](n,16)._hidden),l(n,20,0,t["ɵnov"](n,22).isHidden),l(n,26,0,t["ɵnov"](n,27)._hidden),l(n,35,0,t["ɵnov"](n,36).statusbarPadding,t["ɵnov"](n,36)._hasRefresher),l(n,41,0,u.question.question),l(n,61,0,u.percentage.true),l(n,73,0,u.percentage.false)})}var V=t["ɵccf"]("page-survey-senator-details",d,function(l){return t["ɵvid"](0,[(l()(),t["ɵeld"](0,0,null,null,1,"page-survey-senator-details",[],null,null,null,I,H)),t["ɵdid"](1,49152,null,0,d,[S.a,y.a,B.a,e.a,a.a],null,null)],null,null)},{},{},[]),J=u(14),Z=u(23),x=u(206),z=u(75);u.d(n,"SurveySenatorDetailsPageModuleNgFactory",function(){return G});var G=t["ɵcmf"](o,[],function(l){return t["ɵmod"]([t["ɵmpd"](512,t.ComponentFactoryResolver,t["ɵCodegenComponentFactoryResolver"],[[8,[i.a,r.a,s.a,c.a,h.a,g.a,m.a,v.a,p.a,V]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["ɵmpd"](4608,J.l,J.k,[t.LOCALE_ID,[2,J.v]]),t["ɵmpd"](4608,Z.k,Z.k,[]),t["ɵmpd"](4608,Z.c,Z.c,[]),t["ɵmpd"](512,J.b,J.b,[]),t["ɵmpd"](512,Z.j,Z.j,[]),t["ɵmpd"](512,Z.d,Z.d,[]),t["ɵmpd"](512,Z.i,Z.i,[]),t["ɵmpd"](512,x.a,x.a,[]),t["ɵmpd"](512,x.b,x.b,[]),t["ɵmpd"](512,o,o,[]),t["ɵmpd"](256,z.a,d,[])])})}});