/**
 * Version: 1.0 Alpha-1 
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|after|from)/i,subtract:/^(\-|before|ago)/i,yesterday:/^yesterday/i,today:/^t(oday)?/i,tomorrow:/^tomorrow/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^min(ute)?s?/i,hour:/^h(ou)?rs?/i,week:/^w(ee)?k/i,month:/^m(o(nth)?s?)?/i,day:/^d(ays?)?/i,year:/^y((ea)?rs?)?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard:{GMT:"-000",EST:"-0400",CST:"-0500",MST:"-0600",PST:"-0700"},abbreviatedTimeZoneDST:{GMT:"-000",EDT:"-0500",CDT:"-0600",MDT:"-0700",PDT:"-0800"}};
Date.getMonthNumberFromName=function(name){var n=Date.CultureInfo.monthNames,m=Date.CultureInfo.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.getDayNumberFromName=function(name){var n=Date.CultureInfo.dayNames,m=Date.CultureInfo.abbreviatedDayNames,o=Date.CultureInfo.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.isLeapYear=function(year){return(((year%4===0)&&(year%100!==0))||(year%400===0));};Date.getDaysInMonth=function(year,month){return[31,(Date.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};Date.getTimezoneOffset=function(s,dst){return(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()]:Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];};Date.getTimezoneAbbreviation=function(offset,dst){var n=(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST:Date.CultureInfo.abbreviatedTimeZoneStandard,p;for(p in n){if(n[p]===offset){return p;}}
return null;};Date.prototype.clone=function(){return new Date(this.getTime());};Date.prototype.compareTo=function(date){if(isNaN(this)){throw new Error(this);}
if(date instanceof Date&&!isNaN(date)){return(this>date)?1:(this<date)?-1:0;}else{throw new TypeError(date);}};Date.prototype.equals=function(date){return(this.compareTo(date)===0);};Date.prototype.between=function(start,end){var t=this.getTime();return t>=start.getTime()&&t<=end.getTime();};Date.prototype.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};Date.prototype.addSeconds=function(value){return this.addMilliseconds(value*1000);};Date.prototype.addMinutes=function(value){return this.addMilliseconds(value*60000);};Date.prototype.addHours=function(value){return this.addMilliseconds(value*3600000);};Date.prototype.addDays=function(value){return this.addMilliseconds(value*86400000);};Date.prototype.addWeeks=function(value){return this.addMilliseconds(value*604800000);};Date.prototype.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,this.getDaysInMonth()));return this;};Date.prototype.addYears=function(value){return this.addMonths(value*12);};Date.prototype.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.millisecond||x.milliseconds){this.addMilliseconds(x.millisecond||x.milliseconds);}
if(x.second||x.seconds){this.addSeconds(x.second||x.seconds);}
if(x.minute||x.minutes){this.addMinutes(x.minute||x.minutes);}
if(x.hour||x.hours){this.addHours(x.hour||x.hours);}
if(x.month||x.months){this.addMonths(x.month||x.months);}
if(x.year||x.years){this.addYears(x.year||x.years);}
if(x.day||x.days){this.addDays(x.day||x.days);}
return this;};Date._validate=function(value,min,max,name){if(typeof value!="number"){throw new TypeError(value+" is not a Number.");}else if(value<min||value>max){throw new RangeError(value+" is not a valid value for "+name+".");}
return true;};Date.validateMillisecond=function(n){return Date._validate(n,0,999,"milliseconds");};Date.validateSecond=function(n){return Date._validate(n,0,59,"seconds");};Date.validateMinute=function(n){return Date._validate(n,0,59,"minutes");};Date.validateHour=function(n){return Date._validate(n,0,23,"hours");};Date.validateDay=function(n,year,month){return Date._validate(n,1,Date.getDaysInMonth(year,month),"days");};Date.validateMonth=function(n){return Date._validate(n,0,11,"months");};Date.validateYear=function(n){return Date._validate(n,1,9999,"seconds");};Date.prototype.set=function(config){var x=config;if(!x.millisecond&&x.millisecond!==0){x.millisecond=-1;}
if(!x.second&&x.second!==0){x.second=-1;}
if(!x.minute&&x.minute!==0){x.minute=-1;}
if(!x.hour&&x.hour!==0){x.hour=-1;}
if(!x.day&&x.day!==0){x.day=-1;}
if(!x.month&&x.month!==0){x.month=-1;}
if(!x.year&&x.year!==0){x.year=-1;}
if(x.millisecond!=-1&&Date.validateMillisecond(x.millisecond)){this.addMilliseconds(x.millisecond-this.getMilliseconds());}
if(x.second!=-1&&Date.validateSecond(x.second)){this.addSeconds(x.second-this.getSeconds());}
if(x.minute!=-1&&Date.validateMinute(x.minute)){this.addMinutes(x.minute-this.getMinutes());}
if(x.hour!=-1&&Date.validateHour(x.hour)){this.addHours(x.hour-this.getHours());}
if(x.month!==-1&&Date.validateMonth(x.month)){this.addMonths(x.month-this.getMonth());}
if(x.year!=-1&&Date.validateYear(x.year)){this.addYears(x.year-this.getFullYear());}
if(x.day!=-1&&Date.validateDay(x.day,this.getFullYear(),this.getMonth())){this.addDays(x.day-this.getDate());}
if(x.timezone){this.setTimezone(x.timezone);}
if(x.timezoneOffset){this.setTimezoneOffset(x.timezoneOffset);}
return this;};Date.prototype.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};Date.prototype.isLeapYear=function(){var y=this.getFullYear();return(((y%4===0)&&(y%100!==0))||(y%400===0));};Date.prototype.isWeekday=function(){return!(this.is().sat()||this.is().sun());};Date.prototype.getDaysInMonth=function(){return Date.getDaysInMonth(this.getFullYear(),this.getMonth());};Date.prototype.moveToFirstDayOfMonth=function(){return this.set({day:1});};Date.prototype.moveToLastDayOfMonth=function(){return this.set({day:this.getDaysInMonth()});};Date.prototype.moveToDayOfWeek=function(day,orient){var diff=(day-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};Date.prototype.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};Date.prototype.getDayOfYear=function(){return Math.floor((this-new Date(this.getFullYear(),0,1))/86400000);};Date.prototype.getWeekOfYear=function(firstDayOfWeek){var y=this.getFullYear(),m=this.getMonth(),d=this.getDate();var dow=firstDayOfWeek||Date.CultureInfo.firstDayOfWeek;var offset=7+1-new Date(y,0,1).getDay();if(offset==8){offset=1;}
var daynum=((Date.UTC(y,m,d,0,0,0)-Date.UTC(y,0,1,0,0,0))/86400000)+1;var w=Math.floor((daynum-offset+7)/7);if(w===dow){y--;var prevOffset=7+1-new Date(y,0,1).getDay();if(prevOffset==2||prevOffset==8){w=53;}else{w=52;}}
return w;};Date.prototype.isDST=function(){console.log('isDST');return this.toString().match(/(E|C|M|P)(S|D)T/)[2]=="D";};Date.prototype.getTimezone=function(){return Date.getTimezoneAbbreviation(this.getUTCOffset,this.isDST());};Date.prototype.setTimezoneOffset=function(s){var here=this.getTimezoneOffset(),there=Number(s)*-6/10;this.addMinutes(there-here);return this;};Date.prototype.setTimezone=function(s){return this.setTimezoneOffset(Date.getTimezoneOffset(s));};Date.prototype.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r[0]+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};Date.prototype.getDayName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedDayNames[this.getDay()]:Date.CultureInfo.dayNames[this.getDay()];};Date.prototype.getMonthName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedMonthNames[this.getMonth()]:Date.CultureInfo.monthNames[this.getMonth()];};Date.prototype._toString=Date.prototype.toString;Date.prototype.toString=function(format){var self=this;var p=function p(s){return(s.toString().length==1)?"0"+s:s;};return format?format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,function(format){switch(format){case"hh":return p(self.getHours()<13?self.getHours():(self.getHours()-12));case"h":return self.getHours()<13?self.getHours():(self.getHours()-12);case"HH":return p(self.getHours());case"H":return self.getHours();case"mm":return p(self.getMinutes());case"m":return self.getMinutes();case"ss":return p(self.getSeconds());case"s":return self.getSeconds();case"yyyy":return self.getFullYear();case"yy":return self.getFullYear().toString().substring(2,4);case"dddd":return self.getDayName();case"ddd":return self.getDayName(true);case"dd":return p(self.getDate());case"d":return self.getDate().toString();case"MMMM":return self.getMonthName();case"MMM":return self.getMonthName(true);case"MM":return p((self.getMonth()+1));case"M":return self.getMonth()+1;case"t":return self.getHours()<12?Date.CultureInfo.amDesignator.substring(0,1):Date.CultureInfo.pmDesignator.substring(0,1);case"tt":return self.getHours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;case"zzz":case"zz":case"z":return"";}}):this._toString();};
Date.now=function(){return new Date();};Date.today=function(){return Date.now().clearTime();};Date.prototype._orient=+1;Date.prototype.next=function(){this._orient=+1;return this;};Date.prototype.last=Date.prototype.prev=Date.prototype.previous=function(){this._orient=-1;return this;};Date.prototype._is=false;Date.prototype.is=function(){this._is=true;return this;};Number.prototype._dateElement="day";Number.prototype.fromNow=function(){var c={};c[this._dateElement]=this;return Date.now().add(c);};Number.prototype.ago=function(){var c={};c[this._dateElement]=this*-1;return Date.now().add(c);};(function(){var $D=Date.prototype,$N=Number.prototype;var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),de;var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
return this.moveToDayOfWeek(n,this._orient);};};for(var i=0;i<dx.length;i++){$D[dx[i]]=$D[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};for(var j=0;j<mx.length;j++){$D[mx[j]]=$D[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$D[de]=$D[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}}());Date.prototype.toJSONString=function(){return this.toString("yyyy-MM-ddThh:mm:ssZ");};Date.prototype.toShortDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern);};Date.prototype.toLongDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.longDatePattern);};Date.prototype.toShortTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern);};Date.prototype.toLongTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.longTimePattern);};Date.prototype.getOrdinal=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};Date.Grammar={};Date.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=((s.length==3)?Date.getMonthNumberFromName(s):(Number(s)-1));};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<Date.CultureInfo.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];var now=new Date();this.year=now.getFullYear();this.month=now.getMonth();this.day=1;this.hour=0;this.minute=0;this.second=0;for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
this.hour=(this.meridian=="p"&&this.hour<13)?this.hour+12:this.hour;if(this.day>Date.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
if(this.now){return new Date();}
var today=Date.today();var method=null;var expression=!!(this.days!=null||this.orient||this.operator);if(expression){var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(this.weekday){this.unit="day";gap=(Date.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
if(this.unit=="week"){this.unit="day";this.value=this.value*7;}
this[this.unit+"s"]=this.value*orient;}
return today.add(this);}else{if(this.meridian&&this.hour){this.hour=(this.hour<13&&this.meridian=="p")?this.hour+12:this.hour;}
if(this.weekday&&!this.day){this.day=(today.addDays((Date.getDayNumberFromName(this.weekday)-today.getDay()))).getDate();}
if(this.month&&!this.day){this.day=1;}
return today.set(this);}}};var _=Date.Parsing.Operators,g=Date.Grammar,t=Date.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=Date.CultureInfo.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken(Date.CultureInfo.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.mm,g.ss],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^(\+|\-)?\s*\d\d\d\d?/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^(\+|\-)\s*\d\d\d\d/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[Date.CultureInfo.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw Date.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["yyyy-MM-ddTHH:mm:ss","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};}());Date._parse=Date.parse;Date.parse=function(s){var r=null;if(!s){return null;}
try{r=Date.Grammar.start.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};Date.getParseFunction=function(fx){var fn=Date.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};Date.parseExact=function(s,fx){return Date.getParseFunction(fx)(s);};

// SIG // Begin signature block
// SIG // MIIcSgYJKoZIhvcNAQcCoIIcOzCCHDcCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFOM7qvHzd3dS
// SIG // jd5g+sXOFw6FM/xuoIIXVjCCA+4wggNXoAMCAQICEH6T
// SIG // 6/t8xk5Z6kuad9QG/DswDQYJKoZIhvcNAQEFBQAwgYsx
// SIG // CzAJBgNVBAYTAlpBMRUwEwYDVQQIEwxXZXN0ZXJuIENh
// SIG // cGUxFDASBgNVBAcTC0R1cmJhbnZpbGxlMQ8wDQYDVQQK
// SIG // EwZUaGF3dGUxHTAbBgNVBAsTFFRoYXd0ZSBDZXJ0aWZp
// SIG // Y2F0aW9uMR8wHQYDVQQDExZUaGF3dGUgVGltZXN0YW1w
// SIG // aW5nIENBMB4XDTEyMTIyMTAwMDAwMFoXDTIwMTIzMDIz
// SIG // NTk1OVowXjELMAkGA1UEBhMCVVMxHTAbBgNVBAoTFFN5
// SIG // bWFudGVjIENvcnBvcmF0aW9uMTAwLgYDVQQDEydTeW1h
// SIG // bnRlYyBUaW1lIFN0YW1waW5nIFNlcnZpY2VzIENBIC0g
// SIG // RzIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
// SIG // AQCxrLNJVEuXHBIK2CV5kSJXKm/cuCbEQ3Nrwr8uUFr7
// SIG // FMJ2jkMBJUO0oeJF9Oi3e8N0zCLXtJQAAvdN7b+0t0Qk
// SIG // a81fRTvRRM5DEnMXgotptCvLmR6schsmTXEfsTHd+1Fh
// SIG // AlOmqvVJLAV4RaUvic7nmef+jOJXPz3GktxK+Hsz5HkK
// SIG // +/B1iEGc/8UDUZmq12yfk2mHZSmDhcJgFMTIyTsU2sCB
// SIG // 8B8NdN6SIqvK9/t0fCfm90obf6fDni2uiuqm5qonFn1h
// SIG // 95hxEbziUKFL5V365Q6nLJ+qZSDT2JboyHylTkhE/xni
// SIG // RAeSC9dohIBdanhkRc1gRn5UwRN8xXnxycFxAgMBAAGj
// SIG // gfowgfcwHQYDVR0OBBYEFF+a9W5czMx0mtTdfe8/2+xM
// SIG // gC7dMDIGCCsGAQUFBwEBBCYwJDAiBggrBgEFBQcwAYYW
// SIG // aHR0cDovL29jc3AudGhhd3RlLmNvbTASBgNVHRMBAf8E
// SIG // CDAGAQH/AgEAMD8GA1UdHwQ4MDYwNKAyoDCGLmh0dHA6
// SIG // Ly9jcmwudGhhd3RlLmNvbS9UaGF3dGVUaW1lc3RhbXBp
// SIG // bmdDQS5jcmwwEwYDVR0lBAwwCgYIKwYBBQUHAwgwDgYD
// SIG // VR0PAQH/BAQDAgEGMCgGA1UdEQQhMB+kHTAbMRkwFwYD
// SIG // VQQDExBUaW1lU3RhbXAtMjA0OC0xMA0GCSqGSIb3DQEB
// SIG // BQUAA4GBAAMJm495739ZMKrvaLX64wkdu0+CBl03X6ZS
// SIG // nxaN6hySCURu9W3rWHww6PlpjSNzCxJvR6muORH4KrGb
// SIG // sBrDjutZlgCtzgxNstAxpghcKnr84nodV0yoZRjpeUBi
// SIG // JZZux8c3aoMhCI5B6t3ZVz8dd0mHKhYGXqY4aiISo1EZ
// SIG // g362MIIEhDCCA2ygAwIBAgIQQhrylAmEGR9SCkvGJCan
// SIG // SzANBgkqhkiG9w0BAQUFADBvMQswCQYDVQQGEwJTRTEU
// SIG // MBIGA1UEChMLQWRkVHJ1c3QgQUIxJjAkBgNVBAsTHUFk
// SIG // ZFRydXN0IEV4dGVybmFsIFRUUCBOZXR3b3JrMSIwIAYD
// SIG // VQQDExlBZGRUcnVzdCBFeHRlcm5hbCBDQSBSb290MB4X
// SIG // DTA1MDYwNzA4MDkxMFoXDTIwMDUzMDEwNDgzOFowgZUx
// SIG // CzAJBgNVBAYTAlVTMQswCQYDVQQIEwJVVDEXMBUGA1UE
// SIG // BxMOU2FsdCBMYWtlIENpdHkxHjAcBgNVBAoTFVRoZSBV
// SIG // U0VSVFJVU1QgTmV0d29yazEhMB8GA1UECxMYaHR0cDov
// SIG // L3d3dy51c2VydHJ1c3QuY29tMR0wGwYDVQQDExRVVE4t
// SIG // VVNFUkZpcnN0LU9iamVjdDCCASIwDQYJKoZIhvcNAQEB
// SIG // BQADggEPADCCAQoCggEBAM6qgT+jo2F4qjEAVZURnicP
// SIG // HxzfOpuCaDDASmEd8S8O+r5596Uj71VRloTN2+O5bj4x
// SIG // 2AogZ8f02b+U60cEPgLOKqJdhwQJ9jCdGIqXsqoc/EHS
// SIG // oTbL+z2RuufZcDX65OeQw5ujm9M89RKZd7G3CeBo5hy4
// SIG // 85RjiGpq/gt2yb70IuRnuasaXnfBhQfdDWy/7gbHd2pB
// SIG // nqcP1/vulBe3/IW+pKvEHDHd17bR5PDv3xaPslKT16HU
// SIG // iaEHLr/hARJCHhrh2JU022R5KP+6LhHC5ehbkkj7RwvC
// SIG // bNqtMoNB86XlQXD9ZZBt+vpRxPm9lisZBCzTbafc8H9v
// SIG // g2XiaquHhnUCAwEAAaOB9DCB8TAfBgNVHSMEGDAWgBSt
// SIG // vZh6NLQm9/rEJlTvA73gJMtUGjAdBgNVHQ4EFgQU2u1k
// SIG // dBScFDyr3ZmpvVsoTYs8ydgwDgYDVR0PAQH/BAQDAgEG
// SIG // MA8GA1UdEwEB/wQFMAMBAf8wEQYDVR0gBAowCDAGBgRV
// SIG // HSAAMEQGA1UdHwQ9MDswOaA3oDWGM2h0dHA6Ly9jcmwu
// SIG // dXNlcnRydXN0LmNvbS9BZGRUcnVzdEV4dGVybmFsQ0FS
// SIG // b290LmNybDA1BggrBgEFBQcBAQQpMCcwJQYIKwYBBQUH
// SIG // MAGGGWh0dHA6Ly9vY3NwLnVzZXJ0cnVzdC5jb20wDQYJ
// SIG // KoZIhvcNAQEFBQADggEBAE1CL6bBiusHgJBYRoz4GTlm
// SIG // KjxaLG3P1NmHVY15CxKIe0CP1cf4S41VFmOtt1fcOyu9
// SIG // 08FPHgOHS0Sb4+JARSbzJkkraoTxVHrUQtr802q7Zn7K
// SIG // nurpu9wHx8OSToM8gUmfktUyCepJLqERcZo20sVOaLbL
// SIG // DhslFq9s3l122B9ysZMmhhfbGN6vRenf+5ivFBjtpF72
// SIG // iZRF8FUESt3/J90GSkD2tLzx5A+ZArv9XQ4uKMG+O18a
// SIG // P5cQhLwWPtijnGMdZstcX9o+8w8KCTUi29vAPwD55g1d
// SIG // Z9H9oB4DK9lA977Mh2ZUgKajuPUZYtXSJrGYJu6ay0Sn
// SIG // RVqBlRUa9VEwggSjMIIDi6ADAgECAhAOz/Q4yP6/NW4E
// SIG // 2GqYGxpQMA0GCSqGSIb3DQEBBQUAMF4xCzAJBgNVBAYT
// SIG // AlVTMR0wGwYDVQQKExRTeW1hbnRlYyBDb3Jwb3JhdGlv
// SIG // bjEwMC4GA1UEAxMnU3ltYW50ZWMgVGltZSBTdGFtcGlu
// SIG // ZyBTZXJ2aWNlcyBDQSAtIEcyMB4XDTEyMTAxODAwMDAw
// SIG // MFoXDTIwMTIyOTIzNTk1OVowYjELMAkGA1UEBhMCVVMx
// SIG // HTAbBgNVBAoTFFN5bWFudGVjIENvcnBvcmF0aW9uMTQw
// SIG // MgYDVQQDEytTeW1hbnRlYyBUaW1lIFN0YW1waW5nIFNl
// SIG // cnZpY2VzIFNpZ25lciAtIEc0MIIBIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAQ8AMIIBCgKCAQEAomMLOUS4uyOnREm7Dv+h
// SIG // 8GEKU5OwmNutLA9KxW7/hjxTVQ8VzgQ/K/2plpbZvmF5
// SIG // C1vJTIZ25eBDSyKV7sIrQ8Gf2Gi0jkBP7oU4uRHFI/Jk
// SIG // WPAVMm9OV6GuiKQC1yoezUvh3WPVF4kyW7BemVqonShQ
// SIG // DhfultthO0VRHc8SVguSR/yrrvZmPUescHLnkudfzRC5
// SIG // xINklBm9JYDh6NIipdC6Anqhd5NbZcPuF3S8QYYq3AhM
// SIG // jJKMkS2ed0QfaNaodHfbDlsyi1aLM73ZY8hJnTrFxeoz
// SIG // C9Lxoxv0i77Zs1eLO94Ep3oisiSuLsdwxb5OgyYI+wu9
// SIG // qU+ZCOEQKHKqzQIDAQABo4IBVzCCAVMwDAYDVR0TAQH/
// SIG // BAIwADAWBgNVHSUBAf8EDDAKBggrBgEFBQcDCDAOBgNV
// SIG // HQ8BAf8EBAMCB4AwcwYIKwYBBQUHAQEEZzBlMCoGCCsG
// SIG // AQUFBzABhh5odHRwOi8vdHMtb2NzcC53cy5zeW1hbnRl
// SIG // Yy5jb20wNwYIKwYBBQUHMAKGK2h0dHA6Ly90cy1haWEu
// SIG // d3Muc3ltYW50ZWMuY29tL3Rzcy1jYS1nMi5jZXIwPAYD
// SIG // VR0fBDUwMzAxoC+gLYYraHR0cDovL3RzLWNybC53cy5z
// SIG // eW1hbnRlYy5jb20vdHNzLWNhLWcyLmNybDAoBgNVHREE
// SIG // ITAfpB0wGzEZMBcGA1UEAxMQVGltZVN0YW1wLTIwNDgt
// SIG // MjAdBgNVHQ4EFgQURsZpow5KFB7VTNpSYxc/Xja8DeYw
// SIG // HwYDVR0jBBgwFoAUX5r1blzMzHSa1N197z/b7EyALt0w
// SIG // DQYJKoZIhvcNAQEFBQADggEBAHg7tJEqAEzwj2IwN3ij
// SIG // hCcHbxiy3iXcoNSUA6qGTiWfmkADHN3O43nLIWgG2rYy
// SIG // tG2/9CwmYzPkSWRtDebDZw73BaQ1bHyJFsbpst+y6d0g
// SIG // xnEPzZV03LZc3r03H0N45ni1zSgEIKOq8UvEiCmRDoDR
// SIG // EfzdXHZuT14ORUZBbg2w6jiasTraCXEQ/Bx5tIB7rGn0
// SIG // /Zy2DBYr8X9bCT2bW+IWyhOBbQAuOA2oKY8s4bL0WqkB
// SIG // rxWcLC9JG9siu8P+eJRRw4axgohd8D20UaF5Mysue7nc
// SIG // IAkTcetqGVvP6KUwVyyJST+5z3/Jvz4iaGNTmr1pdKzF
// SIG // HTx/kuDDvBzYBHUwggTnMIIDz6ADAgECAhAQcJ1P9VQI
// SIG // 1zBgAdjqkXW7MA0GCSqGSIb3DQEBBQUAMIGVMQswCQYD
// SIG // VQQGEwJVUzELMAkGA1UECBMCVVQxFzAVBgNVBAcTDlNh
// SIG // bHQgTGFrZSBDaXR5MR4wHAYDVQQKExVUaGUgVVNFUlRS
// SIG // VVNUIE5ldHdvcmsxITAfBgNVBAsTGGh0dHA6Ly93d3cu
// SIG // dXNlcnRydXN0LmNvbTEdMBsGA1UEAxMUVVROLVVTRVJG
// SIG // aXJzdC1PYmplY3QwHhcNMTEwODI0MDAwMDAwWhcNMjAw
// SIG // NTMwMTA0ODM4WjB7MQswCQYDVQQGEwJHQjEbMBkGA1UE
// SIG // CBMSR3JlYXRlciBNYW5jaGVzdGVyMRAwDgYDVQQHEwdT
// SIG // YWxmb3JkMRowGAYDVQQKExFDT01PRE8gQ0EgTGltaXRl
// SIG // ZDEhMB8GA1UEAxMYQ09NT0RPIENvZGUgU2lnbmluZyBD
// SIG // QSAyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
// SIG // AQEAy/jnp+jxlyhAaIA30sg/jpKKkjeHR4DqTJnPbvkV
// SIG // R73udfRErNDD1E33GcDTPE3BR7lZZRaTjNkKhJuf6PZq
// SIG // Y1j+X9zRf0tRnwAcAIdUIAdXoILJL5ivM4q7e4AiJWps
// SIG // r8IsbHkTvaMqSNa1jmFV6WvoPYC/FAOFGI5+TOnCGYhz
// SIG // knLN+v9QTcsspnsac7EAkCzZMuL7/ayVQjbsNMUTU2iy
// SIG // wZ9An9p7yJ1ibJOiQtd5n5dPMVtQIaGrr9kcss51vlss
// SIG // VgAkjRHBdR/w/tKV/vDhMSMYZ8BbE/1amJSU//9ZAh8A
// SIG // rObx8vo6c7MdQvxUdc9RMS/j24HZdyMqT1nOIwIDAQAB
// SIG // o4IBSjCCAUYwHwYDVR0jBBgwFoAU2u1kdBScFDyr3Zmp
// SIG // vVsoTYs8ydgwHQYDVR0OBBYEFB7FsSx9h9oCaHwlvAwH
// SIG // hD+2z97xMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8E
// SIG // CDAGAQH/AgEAMBMGA1UdJQQMMAoGCCsGAQUFBwMDMBEG
// SIG // A1UdIAQKMAgwBgYEVR0gADBCBgNVHR8EOzA5MDegNaAz
// SIG // hjFodHRwOi8vY3JsLnVzZXJ0cnVzdC5jb20vVVROLVVT
// SIG // RVJGaXJzdC1PYmplY3QuY3JsMHQGCCsGAQUFBwEBBGgw
// SIG // ZjA9BggrBgEFBQcwAoYxaHR0cDovL2NydC51c2VydHJ1
// SIG // c3QuY29tL1VUTkFkZFRydXN0T2JqZWN0X0NBLmNydDAl
// SIG // BggrBgEFBQcwAYYZaHR0cDovL29jc3AudXNlcnRydXN0
// SIG // LmNvbTANBgkqhkiG9w0BAQUFAAOCAQEAlYl3k2gBXnzZ
// SIG // LTcHkF1aQl4MZLQ2tQ/2q9U5J94iRqRJHGZLRhlZLnlJ
// SIG // A/ackt9tUDVcDJEuYANZ0PFk92kJ9n7+6zSzbbG/Zpyj
// SIG // ujF4uYc1YT2SMRvv9Oie1qxF+gw2PIBnu73vLsKQ4T1x
// SIG // LzvBsFh+RcNScQMH9vM5TYs2IRsB39naXivrDpeAHkQc
// SIG // UIj1xhIzSqhNpY0vlAx7xr+aLMMyzb2MJybw4TADUAaC
// SIG // vPQ7s4N1Bsbvuu7TgPhSxqzLefI4nnuwklhCkQXIliGt
// SIG // uUsWgRRp8Tew/jT33LDfl/VDEJt2j7Rl9eifE7cerG/E
// SIG // aYpfujxhfl5JhiMTLq8VSDCCBUYwggQuoAMCAQICEQDj
// SIG // AJ/NmWgFY2p3puS2NJLUMA0GCSqGSIb3DQEBBQUAMHsx
// SIG // CzAJBgNVBAYTAkdCMRswGQYDVQQIExJHcmVhdGVyIE1h
// SIG // bmNoZXN0ZXIxEDAOBgNVBAcTB1NhbGZvcmQxGjAYBgNV
// SIG // BAoTEUNPTU9ETyBDQSBMaW1pdGVkMSEwHwYDVQQDExhD
// SIG // T01PRE8gQ29kZSBTaWduaW5nIENBIDIwHhcNMTMwODE2
// SIG // MDAwMDAwWhcNMTgwODE2MjM1OTU5WjCBmTELMAkGA1UE
// SIG // BhMCQVUxDTALBgNVBBEMBDUwNjMxCzAJBgNVBAgMAlNB
// SIG // MRIwEAYDVQQHDAlGdWxsYXJ0b24xEzARBgNVBAkMClBP
// SIG // IEJPWCA1NjgxEzARBgNVBBIMClBPIEJPWCA1NjgxFzAV
// SIG // BgNVBAoMDlRHUk1OIFNvZnR3YXJlMRcwFQYDVQQDDA5U
// SIG // R1JNTiBTb2Z0d2FyZTCCASIwDQYJKoZIhvcNAQEBBQAD
// SIG // ggEPADCCAQoCggEBANIkKDcjJF0H8lbqKzlbqBmt49nj
// SIG // JfS1i5jJ3V1+XSZDm50wgYnfywIiw8jiBnb+oSfEAtvI
// SIG // TTjam1bI6iPhFlnOlllsiWTOshIHpwxVO4g1lglTxtlr
// SIG // EfPMbQ2oy7KAXbI88rM1ChN50rQ0Xa+5SgDfXDSGMdZL
// SIG // RD462EvweBBYhG4wJNgO5KT5QAr816sMDGmsOLm6VUVl
// SIG // 2/8Dd0rvHnx+0P+YiMIMLJ5wFyCs11/nfk2jSKDmtux0
// SIG // yqiFkAFbj/u3guxBYIlkrzZm1OSgr0SSXMXzypTleSeL
// SIG // 3IflMB7PTL/Dx3dY+f/xaR8E3lD+u8VYf87HYuabNjnj
// SIG // e7FHyYMCAwEAAaOCAaQwggGgMB8GA1UdIwQYMBaAFB7F
// SIG // sSx9h9oCaHwlvAwHhD+2z97xMB0GA1UdDgQWBBTCD8i+
// SIG // qfoOnC9v184r7G7XNhUNyjAOBgNVHQ8BAf8EBAMCB4Aw
// SIG // DAYDVR0TAQH/BAIwADATBgNVHSUEDDAKBggrBgEFBQcD
// SIG // AzARBglghkgBhvhCAQEEBAMCBBAwRgYDVR0gBD8wPTA7
// SIG // BgwrBgEEAbIxAQIBAwIwKzApBggrBgEFBQcCARYdaHR0
// SIG // cHM6Ly9zZWN1cmUuY29tb2RvLm5ldC9DUFMwQQYDVR0f
// SIG // BDowODA2oDSgMoYwaHR0cDovL2NybC5jb21vZG9jYS5j
// SIG // b20vQ09NT0RPQ29kZVNpZ25pbmdDQTIuY3JsMHIGCCsG
// SIG // AQUFBwEBBGYwZDA8BggrBgEFBQcwAoYwaHR0cDovL2Ny
// SIG // dC5jb21vZG9jYS5jb20vQ09NT0RPQ29kZVNpZ25pbmdD
// SIG // QTIuY3J0MCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5j
// SIG // b21vZG9jYS5jb20wGQYDVR0RBBIwEIEOaW5mb0B0Z3Jt
// SIG // bi5jb20wDQYJKoZIhvcNAQEFBQADggEBAKJSPaSFvm6D
// SIG // WEvRz09wy6dyETcRXA7tlyLpeFT58Sji9avUs3YZUbow
// SIG // viu50zZ+rLKIy8X8gaiZJR+OZHMEr0usNKfwhun2xYdD
// SIG // emyvRakdR69v5jDHLLfKGaZlIb+dkuxK20daK8uIi9AH
// SIG // KOAiomCyXpNb0RKuFa+iD9QtrwJ7TtIrvqzWOM2fsCYn
// SIG // vwJr1QpkDCp4LpYAh+QNhE6mNRz+DYxqz4T8DL6ih+Se
// SIG // OYCdPl3UivUoNoFrl1qJrNa/5RTvP8qGM0PIwj+Dx57t
// SIG // CRtDLeD87RQCRq9W+sWEeGrkEi5flmvuq4qS+2nOrBVb
// SIG // go7xDFUXVFtm1nSSs5bWp4cxggRgMIIEXAIBATCBkDB7
// SIG // MQswCQYDVQQGEwJHQjEbMBkGA1UECBMSR3JlYXRlciBN
// SIG // YW5jaGVzdGVyMRAwDgYDVQQHEwdTYWxmb3JkMRowGAYD
// SIG // VQQKExFDT01PRE8gQ0EgTGltaXRlZDEhMB8GA1UEAxMY
// SIG // Q09NT0RPIENvZGUgU2lnbmluZyBDQSAyAhEA4wCfzZlo
// SIG // BWNqd6bktjSS1DAJBgUrDgMCGgUAoIGWMBkGCSqGSIb3
// SIG // DQEJAzEMBgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsx
// SIG // DjAMBgorBgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRv
// SIG // XjOW1YN766A2Y5CknBn0PRD4qzA2BgorBgEEAYI3AgEM
// SIG // MSgwJqEkgCJodHRwOi8vd3d3LmJ1bGtyZW5hbWV1dGls
// SIG // aXR5LmNvLnVrMA0GCSqGSIb3DQEBAQUABIIBAEtXeHIG
// SIG // h4397IBtqsZBTmcFmyamKawcdXGGndHUmo3m+DHaM7HV
// SIG // zaCXW5rGVErZh+R+vuOMzqZTbazarK7/g4Khy4wSYg2c
// SIG // nsRdwLPj0cZHdi6KuxpHVDtogHbjErYJLLBuOEbDjvvH
// SIG // jIv8IhNIBtga4aaNoOpTHru9LLt/2U+m97Vt2Dcj8tTO
// SIG // 04xbwPVss+tEvRNLgCmcSLfKvRILT8MNZMm1YC21XUDM
// SIG // F51evSItHWNQWM92hyj2yT8PP//Y0IaIULNVT0abT6Cx
// SIG // H9FmOOvBB2PVIQBd7HudEGd9V3Fe1f447u/ETWF+rN/h
// SIG // RIxJO9Vi5EU5p8/iIm8IRVgqoAGhggILMIICBwYJKoZI
// SIG // hvcNAQkGMYIB+DCCAfQCAQEwcjBeMQswCQYDVQQGEwJV
// SIG // UzEdMBsGA1UEChMUU3ltYW50ZWMgQ29ycG9yYXRpb24x
// SIG // MDAuBgNVBAMTJ1N5bWFudGVjIFRpbWUgU3RhbXBpbmcg
// SIG // U2VydmljZXMgQ0EgLSBHMgIQDs/0OMj+vzVuBNhqmBsa
// SIG // UDAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTYwMTA2MDUz
// SIG // NTU5WjAjBgkqhkiG9w0BCQQxFgQUCVvjQXqIQS3XeSQl
// SIG // L0NCX4vpzU8wDQYJKoZIhvcNAQEBBQAEggEAjxrqNpvG
// SIG // atafcIRubyPOBz/lFiU71WiixxLKhzQRSQYlbLGlRmgo
// SIG // nQ5fSK7mTO/g2jYhY6x1+RwjzbSd4nUI9/muNtyQxU5I
// SIG // 4wONGh6spwd2a/vCRMv0T0NzZ+yxKDO6AEd2xvatEe2h
// SIG // 8UcvxLnw0qgn+0jSugoweU1DgQ522ewpCbwtIwN3/TXS
// SIG // 97szG2xJERE59RWY0Qqjou+uZNIW3mgCACiO1RjsSB0t
// SIG // pmrJIRaTqPalkNNAPhc8jlpHdm4LTP7Ivu4ibaeye8de
// SIG // FHIYGfNaA0ZiD91aTDRnQJMZIJtbqxMqOEDaw+f3TARr
// SIG // BzbYm/rFYdvzRaQ47cgRIhFa+g==
// SIG // End signature block
