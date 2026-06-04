import{Q as $e,R as qe,S as Ye,s as We}from"./chunk-7G5YVDFG.js";import{b as ue}from"./chunk-HYIVATZF.js";import{i as yn,n as Cn,o as Mn,r as kn,u as xn,x as et,y as tt}from"./chunk-XPT7MODG.js";import{A as Vn,H as Ze,J as Je,K as Sn,L as An,M as En,m as De,n as Ke,o as Dn,p as wn,q as we,w as Ft,y as ee}from"./chunk-6VV7UJWL.js";import{$ as Ce,$a as At,Aa as b,Ba as ln,Ca as cn,Cb as se,Cc as Qe,Db as I,Dc as It,Ea as V,Eb as Z,Fa as z,Fb as J,Ga as C,Gb as R,H as Ne,Hb as le,I as Vt,Ia as S,Ib as ce,J as Jt,Ka as un,Lb as G,M as Be,Ma as dn,Mb as q,O as T,Ob as fn,P as X,Pa as A,Q as U,R as D,Ra as O,Rb as _n,Sa as P,T as c,Va as oe,Wa as re,Wb as H,X as f,Xa as h,Y as _,Ya as a,Yb as M,Z as en,Za as l,_a as g,a as Pe,aa as tn,ab as mn,ac as Et,ca as w,d as L,da as nn,db as F,eb as hn,fa as y,fb as m,fc as Le,ga as on,gb as pn,ha as Me,hb as p,ia as ie,ib as xe,j as Yt,ja as B,jb as ae,jc as Ue,k as wt,ka as rn,kb as Ge,lb as He,lc as bn,ma as an,mb as W,n as Xt,nb as $,qa as Q,r as Qt,rb as je,t as Re,tb as E,ua as u,ub as gn,v as Kt,vb as d,vc as ze,wa as St,wb as K,wc as vn,xa as sn,yc as Xe,z as Zt,za as ke}from"./chunk-W5X4D3FG.js";import{a as v,b as x}from"./chunk-C6Q5SG76.js";var Ve=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new L;constructor(n=!1,e,t=!0,o){this._multiple=n,this._emitChanges=t,this.compareWith=o,e&&e.length&&(n?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,t=new Set(n.map(r=>this._getConcreteValue(r)));n.forEach(r=>this._markSelected(r)),e.filter(r=>!t.has(this._getConcreteValue(r,t))).forEach(r=>this._unmarkSelected(r));let o=this._hasQueuedChanges();return this._emitChangeEvent(),o}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(n,t))return t;return n}else return n}};var bi=(()=>{class i{_listeners=[];notify(e,t){for(let o of this._listeners)o(e,t)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>e!==t)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(t){return new(t||i)};static \u0275prov=X({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var Bn=(()=>{class i{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,t){this._renderer=e,this._elementRef=t}setProperty(e,t){this._renderer.setProperty(this._elementRef.nativeElement,e,t)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(t){return new(t||i)(b(ke),b(B))};static \u0275dir=C({type:i})}return i})(),Gn=(()=>{class i extends Bn{static \u0275fac=(()=>{let e;return function(o){return(e||(e=ie(i)))(o||i)}})();static \u0275dir=C({type:i,features:[S]})}return i})(),he=new D("");var yi={provide:he,useExisting:T(()=>Hn),multi:!0};function Ci(){let i=Et()?Et().getUserAgent():"";return/android (\d+)/.test(i.toLowerCase())}var Mi=new D(""),Hn=(()=>{class i extends Bn{_compositionMode;_composing=!1;constructor(e,t,o){super(e,t),this._compositionMode=o,this._compositionMode==null&&(this._compositionMode=!Ci())}writeValue(e){let t=e??"";this.setProperty("value",t)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(t){return new(t||i)(b(ke),b(B),b(Mi,8))};static \u0275dir=C({type:i,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(t,o){t&1&&m("input",function(s){return o._handleInput(s.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(s){return o._compositionEnd(s.target.value)})},standalone:!1,features:[I([yi]),S]})}return i})();function Pt(i){return i==null||Rt(i)===0}function Rt(i){return i==null?null:Array.isArray(i)||typeof i=="string"?i.length:i instanceof Set?i.size:null}var pe=new D(""),pt=new D(""),ki=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,In=class{static min(n){return jn(n)}static max(n){return Ln(n)}static required(n){return xi(n)}static requiredTrue(n){return Di(n)}static email(n){return wi(n)}static minLength(n){return Vi(n)}static maxLength(n){return Si(n)}static pattern(n){return Ai(n)}static nullValidator(n){return it()}static compose(n){return Yn(n)}static composeAsync(n){return Xn(n)}};function jn(i){return n=>{if(n.value==null||i==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<i?{min:{min:i,actual:n.value}}:null}}function Ln(i){return n=>{if(n.value==null||i==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>i?{max:{max:i,actual:n.value}}:null}}function xi(i){return Pt(i.value)?{required:!0}:null}function Di(i){return i.value===!0?null:{required:!0}}function wi(i){return Pt(i.value)||ki.test(i.value)?null:{email:!0}}function Vi(i){return n=>{let e=n.value?.length??Rt(n.value);return e===null||e===0?null:e<i?{minlength:{requiredLength:i,actualLength:e}}:null}}function Si(i){return n=>{let e=n.value?.length??Rt(n.value);return e!==null&&e>i?{maxlength:{requiredLength:i,actualLength:e}}:null}}function Ai(i){if(!i)return it;let n,e;return typeof i=="string"?(e="",i.charAt(0)!=="^"&&(e+="^"),e+=i,i.charAt(i.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=i.toString(),n=i),t=>{if(Pt(t.value))return null;let o=t.value;return n.test(o)?null:{pattern:{requiredPattern:e,actualValue:o}}}}function it(i){return null}function Un(i){return i!=null}function zn(i){return dn(i)?Yt(i):i}function Wn(i){let n={};return i.forEach(e=>{n=e!=null?v(v({},n),e):n}),Object.keys(n).length===0?null:n}function $n(i,n){return n.map(e=>e(i))}function Ei(i){return!i.validate}function qn(i){return i.map(n=>Ei(n)?n:e=>n.validate(e))}function Yn(i){if(!i)return null;let n=i.filter(Un);return n.length==0?null:function(e){return Wn($n(e,n))}}function Nt(i){return i!=null?Yn(qn(i)):null}function Xn(i){if(!i)return null;let n=i.filter(Un);return n.length==0?null:function(e){let t=$n(e,n).map(zn);return Qt(t).pipe(Xt(Wn))}}function Bt(i){return i!=null?Xn(qn(i)):null}function Fn(i,n){return i===null?[n]:Array.isArray(i)?[...i,n]:[i,n]}function Qn(i){return i._rawValidators}function Kn(i){return i._rawAsyncValidators}function Tt(i){return i?Array.isArray(i)?i:[i]:[]}function ot(i,n){return Array.isArray(i)?i.includes(n):i===n}function Tn(i,n){let e=Tt(n);return Tt(i).forEach(o=>{ot(e,o)||e.push(o)}),e}function On(i,n){return Tt(n).filter(e=>!ot(i,e))}var rt=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=Nt(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Bt(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},te=class extends rt{name;get formDirective(){return null}get path(){return null}},ne=class extends rt{_parent=null;name=null;valueAccessor=null},Ot=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var ar=(()=>{class i extends Ot{constructor(e){super(e)}static \u0275fac=function(t){return new(t||i)(b(ne,2))};static \u0275dir=C({type:i,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(t,o){t&2&&E("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},standalone:!1,features:[S]})}return i})();var Se="VALID",nt="INVALID",de="PENDING",Ae="DISABLED",Y=class{},at=class extends Y{value;source;constructor(n,e){super(),this.value=n,this.source=e}},Ie=class extends Y{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},Fe=class extends Y{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},me=class extends Y{status;source;constructor(n,e){super(),this.status=n,this.source=e}},st=class extends Y{source;constructor(n){super(),this.source=n}},lt=class extends Y{source;constructor(n){super(),this.source=n}};function Zn(i){return(gt(i)?i.validators:i)||null}function Ii(i){return Array.isArray(i)?Nt(i):i||null}function Jn(i,n){return(gt(n)?n.asyncValidators:i)||null}function Fi(i){return Array.isArray(i)?Bt(i):i||null}function gt(i){return i!=null&&!Array.isArray(i)&&typeof i=="object"}function Ti(i,n,e){let t=i.controls;if(!(n?Object.keys(t):t).length)throw new Be(1e3,"");if(!t[e])throw new Be(1001,"")}function Oi(i,n,e){i._forEachChild((t,o)=>{if(e[o]===void 0)throw new Be(-1002,"")})}var ct=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return G(this.statusReactive)}set status(n){G(()=>this.statusReactive.set(n))}_status=q(()=>this.statusReactive());statusReactive=y(void 0);get valid(){return this.status===Se}get invalid(){return this.status===nt}get pending(){return this.status===de}get disabled(){return this.status===Ae}get enabled(){return this.status!==Ae}errors;get pristine(){return G(this.pristineReactive)}set pristine(n){G(()=>this.pristineReactive.set(n))}_pristine=q(()=>this.pristineReactive());pristineReactive=y(!0);get dirty(){return!this.pristine}get touched(){return G(this.touchedReactive)}set touched(n){G(()=>this.touchedReactive.set(n))}_touched=q(()=>this.touchedReactive());touchedReactive=y(!1);get untouched(){return!this.touched}_events=new L;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Tn(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Tn(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(On(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(On(n,this._rawAsyncValidators))}hasValidator(n){return ot(this._rawValidators,n)}hasAsyncValidator(n){return ot(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let t=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(x(v({},n),{sourceControl:t})),e&&n.emitEvent!==!1&&this._events.next(new Fe(!0,t))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let t=n.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:t})}),n.onlySelf||this._parent?._updateTouched(n,t),e&&n.emitEvent!==!1&&this._events.next(new Fe(!1,t))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let t=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(x(v({},n),{sourceControl:t})),e&&n.emitEvent!==!1&&this._events.next(new Ie(!1,t))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let t=n.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,t),e&&n.emitEvent!==!1&&this._events.next(new Ie(!0,t))}markAsPending(n={}){this.status=de;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new me(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(x(v({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Ae,this.errors=null,this._forEachChild(o=>{o.disable(x(v({},n),{onlySelf:!0}))}),this._updateValue();let t=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new at(this.value,t)),this._events.next(new me(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(x(v({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Se,this._forEachChild(t=>{t.enable(x(v({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(x(v({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(t=>t(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let t=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Se||this.status===de)&&this._runAsyncValidator(t,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new at(this.value,e)),this._events.next(new me(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(x(v({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Ae:Se}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=de,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let t=zn(this.asyncValidator(this));this._asyncValidationSubscription=t.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((t,o)=>t&&t._find(o),this)}getError(n,e){let t=e?this.get(e):this;return t?.errors?t.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,t){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||t)&&this._events.next(new me(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,t)}_initObservables(){this.valueChanges=new w,this.statusChanges=new w}_calculateStatus(){return this._allControlsDisabled()?Ae:this.errors?nt:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(de)?de:this._anyControlsHaveStatus(nt)?nt:Se}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let t=!this._anyControlsDirty(),o=this.pristine!==t;this.pristine=t,n.onlySelf||this._parent?._updatePristine(n,e),o&&this._events.next(new Ie(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new Fe(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){gt(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=Ii(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=Fi(this._rawAsyncValidators)}},ut=class extends ct{constructor(n,e,t){super(Zn(e),Jn(t,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,t={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,t={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){Oi(this,!0,n),Object.keys(n).forEach(t=>{Ti(this,!0,t),this.controls[t].setValue(n[t],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(t=>{let o=this.controls[t];o&&o.patchValue(n[t],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((t,o)=>{t.reset(n?n[o]:null,x(v({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new lt(this))}getRawValue(){return this._reduceChildren({},(n,e,t)=>(n[t]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,t)=>t._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let t=this.controls[e];t&&n(t,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,t]of Object.entries(this.controls))if(this.contains(e)&&n(t))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,t,o)=>((t.enabled||this.disabled)&&(e[o]=t.value),e))}_reduceChildren(n,e){let t=n;return this._forEachChild((o,r)=>{t=e(t,o,r)}),t}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var ge=new D("",{factory:()=>ft}),ft="always";function Pi(i,n){return[...n.path,i]}function Te(i,n,e=ft){Gt(i,n),n.valueAccessor.writeValue(i.value),(i.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(i.disabled),Ni(i,n),Gi(i,n),Bi(i,n),Ri(i,n)}function dt(i,n,e=!0){let t=()=>{};n?.valueAccessor?.registerOnChange(t),n?.valueAccessor?.registerOnTouched(t),ht(i,n),i&&(n._invokeOnDestroyCallbacks(),i._registerOnCollectionChange(()=>{}))}function mt(i,n){i.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function Ri(i,n){if(n.valueAccessor.setDisabledState){let e=t=>{n.valueAccessor.setDisabledState(t)};i.registerOnDisabledChange(e),n._registerOnDestroy(()=>{i._unregisterOnDisabledChange(e)})}}function Gt(i,n){let e=Qn(i);n.validator!==null?i.setValidators(Fn(e,n.validator)):typeof e=="function"&&i.setValidators([e]);let t=Kn(i);n.asyncValidator!==null?i.setAsyncValidators(Fn(t,n.asyncValidator)):typeof t=="function"&&i.setAsyncValidators([t]);let o=()=>i.updateValueAndValidity();mt(n._rawValidators,o),mt(n._rawAsyncValidators,o)}function ht(i,n){let e=!1;if(i!==null){if(n.validator!==null){let o=Qn(i);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==n.validator);r.length!==o.length&&(e=!0,i.setValidators(r))}}if(n.asyncValidator!==null){let o=Kn(i);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==n.asyncValidator);r.length!==o.length&&(e=!0,i.setAsyncValidators(r))}}}let t=()=>{};return mt(n._rawValidators,t),mt(n._rawAsyncValidators,t),e}function Ni(i,n){n.valueAccessor.registerOnChange(e=>{i._pendingValue=e,i._pendingChange=!0,i._pendingDirty=!0,i.updateOn==="change"&&ei(i,n)})}function Bi(i,n){n.valueAccessor.registerOnTouched(()=>{i._pendingTouched=!0,i.updateOn==="blur"&&i._pendingChange&&ei(i,n),i.updateOn!=="submit"&&i.markAsTouched()})}function ei(i,n){i._pendingDirty&&i.markAsDirty(),i.setValue(i._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(i._pendingValue),i._pendingChange=!1}function Gi(i,n){let e=(t,o)=>{n.valueAccessor.writeValue(t),o&&n.viewToModelUpdate(t)};i.registerOnChange(e),n._registerOnDestroy(()=>{i._unregisterOnChange(e)})}function ti(i,n){i==null,Gt(i,n)}function Hi(i,n){return ht(i,n)}function ni(i,n){if(!i.hasOwnProperty("model"))return!1;let e=i.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function ji(i){return Object.getPrototypeOf(i.constructor)===Gn}function ii(i,n){i._syncPendingControls(),n.forEach(e=>{let t=e.control;t.updateOn==="submit"&&t._pendingChange&&(e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1)})}function oi(i,n){if(!n)return null;Array.isArray(n);let e,t,o;return n.forEach(r=>{r.constructor===Hn?e=r:ji(r)?t=r:o=r}),o||t||e||null}function Li(i,n){let e=i.indexOf(n);e>-1&&i.splice(e,1)}var Ui={provide:te,useExisting:T(()=>zi)},Ee=Promise.resolve(),zi=(()=>{class i extends te{callSetDisabledState;get submitted(){return G(this.submittedReactive)}_submitted=q(()=>this.submittedReactive());submittedReactive=y(!1);_directives=new Set;form;ngSubmit=new w;options;constructor(e,t,o){super(),this.callSetDisabledState=o,this.form=new ut({},Nt(e),Bt(t))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Ee.then(()=>{let t=this._findContainer(e.path);e.control=t.registerControl(e.name,e.control),Te(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Ee.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Ee.then(()=>{let t=this._findContainer(e.path),o=new ut({});ti(o,e),t.registerControl(e.name,o),o.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Ee.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,t){Ee.then(()=>{this.form.get(e.path).setValue(t)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),ii(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new st(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(t){return new(t||i)(b(pe,10),b(pt,10),b(ge,8))};static \u0275dir=C({type:i,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(t,o){t&1&&m("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[I([Ui]),S]})}return i})();function Pn(i,n){let e=i.indexOf(n);e>-1&&i.splice(e,1)}function Rn(i){return typeof i=="object"&&i!==null&&Object.keys(i).length===2&&"value"in i&&"disabled"in i}var ri=class extends ct{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,t){super(Zn(e),Jn(t,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),gt(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Rn(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(t=>t(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new lt(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){Pn(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){Pn(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){Rn(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var Wi=i=>i instanceof ri;var $i={provide:ne,useExisting:T(()=>qi)},Nn=Promise.resolve(),qi=(()=>{class i extends ne{_changeDetectorRef;callSetDisabledState;control=new ri;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new w;constructor(e,t,o,r,s,k){super(),this._changeDetectorRef=s,this.callSetDisabledState=k,this._parent=e,this._setValidators(t),this._setAsyncValidators(o),this.valueAccessor=oi(this,r)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let t=e.name.previousValue;this.formDirective.removeControl({name:t,path:this._getPath(t)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),ni(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){Te(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){Nn.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let t=e.isDisabled.currentValue,o=t!==0&&M(t);Nn.then(()=>{o&&!this.control.disabled?this.control.disable():!o&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?Pi(e,this._parent):[e]}static \u0275fac=function(t){return new(t||i)(b(te,9),b(pe,10),b(pt,10),b(he,10),b(H,8),b(ge,8))};static \u0275dir=C({type:i,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[I([$i]),S,Me]})}return i})();var Yi={provide:he,useExisting:T(()=>Xi),multi:!0},Xi=(()=>{class i extends Gn{writeValue(e){let t=e??"";this.setProperty("value",t)}registerOnChange(e){this.onChange=t=>{e(t==""?null:parseFloat(t))}}static \u0275fac=(()=>{let e;return function(o){return(e||(e=ie(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(t,o){t&1&&m("input",function(s){return o.onChange(s.target.value)})("blur",function(){return o.onTouched()})},standalone:!1,features:[I([Yi]),S]})}return i})();var Qi=(()=>{class i extends te{callSetDisabledState;get submitted(){return G(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=q(()=>this._submittedReactive());_submittedReactive=y(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,t,o){super(),this.callSetDisabledState=o,this._setValidators(e),this._setAsyncValidators(t)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(ht(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let t=this.form.get(e.path);return Te(t,e,this.callSetDisabledState),t.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),t}getControl(e){return this.form.get(e.path)}removeControl(e){dt(e.control||null,e,!1),Li(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,t){this.form.get(e.path).setValue(t)}onReset(){this.resetForm()}resetForm(e=void 0,t={}){this.form.reset(e,t),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,ii(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new st(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let t=e.control,o=this.form.get(e.path);t!==o&&(dt(t||null,e),Wi(o)&&(Te(o,e,this.callSetDisabledState),e.control=o))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let t=this.form.get(e.path);ti(t,e),t.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let t=this.form?.get(e.path);t&&Hi(t,e)&&t.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){Gt(this.form,this),this._oldForm&&ht(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(t){return new(t||i)(b(pe,10),b(pt,10),b(ge,8))};static \u0275dir=C({type:i,features:[S,Me]})}return i})();var ai=new D(""),Ki={provide:ne,useExisting:T(()=>Zi)},Zi=(()=>{class i extends ne{_ngModelWarningConfig;callSetDisabledState;viewModel;form;set isDisabled(e){}model;update=new w;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,t,o,r,s){super(),this._ngModelWarningConfig=r,this.callSetDisabledState=s,this._setValidators(e),this._setAsyncValidators(t),this.valueAccessor=oi(this,o)}ngOnChanges(e){if(this._isControlChanged(e)){let t=e.form.previousValue;t&&dt(t,this,!1),Te(this.form,this,this.callSetDisabledState),this.form.updateValueAndValidity({emitEvent:!1})}ni(e,this.viewModel)&&(this.form.setValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.form&&dt(this.form,this,!1)}get path(){return[]}get control(){return this.form}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_isControlChanged(e){return e.hasOwnProperty("form")}static \u0275fac=function(t){return new(t||i)(b(pe,10),b(pt,10),b(he,10),b(ai,8),b(ge,8))};static \u0275dir=C({type:i,selectors:[["","formControl",""]],inputs:{form:[0,"formControl","form"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},exportAs:["ngForm"],standalone:!1,features:[I([Ki]),S,Me]})}return i})();var Ji={provide:te,useExisting:T(()=>eo)},eo=(()=>{class i extends Qi{form=null;ngSubmit=new w;get control(){return this.form}static \u0275fac=(()=>{let e;return function(o){return(e||(e=ie(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["","formGroup",""]],hostBindings:function(t,o){t&1&&m("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[I([Ji]),S]})}return i})();function si(i){return typeof i=="number"?i:parseFloat(i)}var li=(()=>{class i{_validator=it;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let t=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(t),this._validator=this._enabled?this.createValidator(t):it,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static \u0275fac=function(t){return new(t||i)};static \u0275dir=C({type:i,features:[Me]})}return i})(),to={provide:pe,useExisting:T(()=>no),multi:!0},no=(()=>{class i extends li{max;inputName="max";normalizeInput=e=>si(e);createValidator=e=>Ln(e);static \u0275fac=(()=>{let e;return function(o){return(e||(e=ie(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["input","type","number","max","","formControlName",""],["input","type","number","max","","formControl",""],["input","type","number","max","","ngModel",""]],hostVars:1,hostBindings:function(t,o){t&2&&A("max",o._enabled?o.max:null)},inputs:{max:"max"},standalone:!1,features:[I([to]),S]})}return i})(),io={provide:pe,useExisting:T(()=>oo),multi:!0},oo=(()=>{class i extends li{min;inputName="min";normalizeInput=e=>si(e);createValidator=e=>jn(e);static \u0275fac=(()=>{let e;return function(o){return(e||(e=ie(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["input","type","number","min","","formControlName",""],["input","type","number","min","","formControl",""],["input","type","number","min","","ngModel",""]],hostVars:1,hostBindings:function(t,o){t&2&&A("min",o._enabled?o.min:null)},inputs:{min:"min"},standalone:!1,features:[I([io]),S]})}return i})();var ci=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=z({type:i});static \u0275inj=U({})}return i})();var lr=(()=>{class i{static withConfig(e){return{ngModule:i,providers:[{provide:ge,useValue:e.callSetDisabledState??ft}]}}static \u0275fac=function(t){return new(t||i)};static \u0275mod=z({type:i});static \u0275inj=U({imports:[ci]})}return i})(),cr=(()=>{class i{static withConfig(e){return{ngModule:i,providers:[{provide:ai,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:ge,useValue:e.callSetDisabledState??ft}]}}static \u0275fac=function(t){return new(t||i)};static \u0275mod=z({type:i});static \u0275inj=U({imports:[ci]})}return i})();var ui=(()=>{class i{_animationsDisabled=ee();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=V({type:i,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,o){t&2&&E("mat-pseudo-checkbox-indeterminate",o.state==="indeterminate")("mat-pseudo-checkbox-checked",o.state==="checked")("mat-pseudo-checkbox-disabled",o.disabled)("mat-pseudo-checkbox-minimal",o.appearance==="minimal")("mat-pseudo-checkbox-full",o.appearance==="full")("_mat-animation-noopable",o._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,o){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return i})();var ro=["button"],ao=["*"];function so(i,n){if(i&1&&(a(0,"div",2),g(1,"mat-pseudo-checkbox",6),l()),i&2){let e=p();u(),h("disabled",e.disabled)}}var di=new D("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),mi=new D("MatButtonToggleGroup"),lo={provide:he,useExisting:T(()=>Oe),multi:!0},_t=class{source;value;constructor(n,e){this.source=n,this.value=e}},Oe=(()=>{class i{_changeDetector=c(H);_dir=c(Qe,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=c(De).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(t=>t.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new w;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new w;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=c(di,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new Ve(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||Ke(e))return;let o=e.target.id,r=this._buttonToggles.toArray().findIndex(k=>k.buttonId===o),s=null;switch(e.keyCode){case 32:case 13:s=this._buttonToggles.get(r)||null;break;case 38:s=this._getNextButton(r,-1);break;case 37:s=this._getNextButton(r,this.dir==="ltr"?-1:1);break;case 40:s=this._getNextButton(r,1);break;case 39:s=this._getNextButton(r,this.dir==="ltr"?1:-1);break;default:return}s&&(e.preventDefault(),s._onButtonClick(),s.focus())}_emitChangeEvent(e){let t=new _t(e,this.value);this._rawValue=t.value,this._controlValueAccessorChangeFn(t.value),this.change.emit(t)}_syncButtonToggle(e,t,o=!1,r=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?t?this._selectionModel.select(e):this._selectionModel.deselect(e):r=!0,r?Promise.resolve().then(()=>this._updateModelValue(e,o)):this._updateModelValue(e,o)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(t=>e.value!=null&&t===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let t=this._buttonToggles.get(e);if(!t.disabled){t.tabIndex=0;break}}}_getNextButton(e,t){let o=this._buttonToggles;for(let r=1;r<=o.length;r++){let s=(e+t*r+o.length)%o.length,k=o.get(s);if(k&&!k.disabled)return k}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let t=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(o=>this._selectValue(o,t))):(this._clearSelection(),this._selectValue(e,t)),!this.multiple&&t.every(o=>o.tabIndex===-1)){for(let o of t)if(!o.disabled){o.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,t){for(let o of t)if(o.value===e){o.checked=!0,this._selectionModel.select(o),this.multiple||(o.tabIndex=0);break}}_updateModelValue(e,t){t&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(t){return new(t||i)};static \u0275dir=C({type:i,selectors:[["mat-button-toggle-group"]],contentQueries:function(t,o,r){if(t&1&&Ge(r,fe,5),t&2){let s;W(s=$())&&(o._buttonToggles=s)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(t,o){t&1&&m("keydown",function(s){return o._keydown(s)}),t&2&&(A("role",o.multiple?"group":"radiogroup")("aria-disabled",o.disabled),E("mat-button-toggle-vertical",o.vertical)("mat-button-toggle-group-appearance-standard",o.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",M],value:"value",multiple:[2,"multiple","multiple",M],disabled:[2,"disabled","disabled",M],disabledInteractive:[2,"disabledInteractive","disabledInteractive",M],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",M],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",M]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[I([lo,{provide:mi,useExisting:i}])]})}return i})(),fe=(()=>{class i{_changeDetectorRef=c(H);_elementRef=c(B);_focusMonitor=c(we);_idGenerator=c(De);_animationDisabled=ee();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new w;constructor(){c(Xe).load(Je);let e=c(mi,{optional:!0}),t=c(new fn("tabindex"),{optional:!0})||"",o=c(di,{optional:!0});this._tabIndex=y(parseInt(t)||0),this.buttonToggleGroup=e,this._appearance=o&&o.appearance?o.appearance:"standard",this._disabledInteractive=o?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let t=this.buttonToggleGroup._buttonToggles.find(o=>o.tabIndex===0);t&&(t.tabIndex=-1),this.tabIndex=0}this.change.emit(new _t(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=V({type:i,selectors:[["mat-button-toggle"]],viewQuery:function(t,o){if(t&1&&He(ro,5),t&2){let r;W(r=$())&&(o._buttonElement=r.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(t,o){t&1&&m("focus",function(){return o.focus()}),t&2&&(A("aria-label",null)("aria-labelledby",null)("id",o.id)("name",null),E("mat-button-toggle-standalone",!o.buttonToggleGroup)("mat-button-toggle-checked",o.checked)("mat-button-toggle-disabled",o.disabled)("mat-button-toggle-disabled-interactive",o.disabledInteractive)("mat-button-toggle-appearance-standard",o.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",M],appearance:"appearance",checked:[2,"checked","checked",M],disabled:[2,"disabled","disabled",M],disabledInteractive:[2,"disabledInteractive","disabledInteractive",M]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:ao,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(t,o){if(t&1&&(xe(),a(0,"button",1,0),m("click",function(){return o._onButtonClick()}),O(2,so,2,1,"div",2),a(3,"span",3),ae(4),l()(),g(5,"span",4)(6,"span",5)),t&2){let r=je(1);h("id",o.buttonId)("disabled",o.disabled&&!o.disabledInteractive||null),A("role",o.isSingleSelector()?"radio":"button")("tabindex",o.disabled&&!o.disabledInteractive?-1:o.tabIndex)("aria-pressed",o.isSingleSelector()?null:o.checked)("aria-checked",o.isSingleSelector()?o.checked:null)("name",o._getButtonName())("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledby)("aria-disabled",o.disabled&&o.disabledInteractive?"true":null),u(2),P(o.buttonToggleGroup&&(!o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideSingleSelectionIndicator||o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),u(4),h("matRippleTrigger",r)("matRippleDisabled",o.disableRipple||o.disabled)}},dependencies:[Ze,ui],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`],encapsulation:2,changeDetection:0})}return i})(),Pr=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=z({type:i});static \u0275inj=U({imports:[An,fe,It]})}return i})();var yt=(()=>{class i{get vertical(){return this._vertical}set vertical(e){this._vertical=Ft(e)}_vertical=!1;get inset(){return this._inset}set inset(e){this._inset=Ft(e)}_inset=!1;static \u0275fac=function(t){return new(t||i)};static \u0275cmp=V({type:i,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(t,o){t&2&&(A("aria-orientation",o.vertical?"vertical":"horizontal"),E("mat-divider-vertical",o.vertical)("mat-divider-horizontal",!o.vertical)("mat-divider-inset",o.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(t,o){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-top-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-right-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2,changeDetection:0})}return i})();var hi=(()=>{class i{constructor(){this.platformId=c(an),this.canInstall=y(!1),this.promptEvent=null,bn(this.platformId)&&(window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),this.promptEvent=e,this.canInstall.set(!0)}),window.addEventListener("appinstalled",()=>{this.promptEvent=null,this.canInstall.set(!1)}))}async install(){if(!this.promptEvent)return;this.promptEvent.prompt();let{outcome:e}=await this.promptEvent.userChoice;e==="accepted"&&(this.promptEvent=null,this.canInstall.set(!1))}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275prov=X({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var j=(i,n)=>({"active-menu-option":i,pressed:n}),pi=(i,n)=>n.name;function co(i,n){if(i&1){let e=F();a(0,"button",16),m("click",function(){f(e);let o=p(2);return _(o.pwaInstall.install())}),d(1,"Install app"),l(),g(2,"mat-divider")}}function uo(i,n){if(i&1){let e=F();a(0,"div",19),m("click",function(){let o=f(e).$implicit,r=p(2);return _(r.setTheme(o.name))}),a(1,"div",20),g(2,"img",21),l(),a(3,"span"),d(4),le(5,"titlecase"),l()()}if(i&2){let e=n.$implicit,t=p(2);h("ngClass",R(6,j,t.themeService.selectedTheme().name===e.name,t.pressedItemId()==="theme-"+e.name)),u(2),h("src",se("assets/sprites/menu/",e.pokemon,".webp"),Q),u(2),K(ce(5,4,e.name))}}function mo(i,n){if(i&1){let e=F();a(0,"div",19),m("click",function(){let o=f(e).$implicit,r=p(2);return _(r.setColor(o.name))}),a(1,"div",20),g(2,"img",21),l(),a(3,"span"),d(4),le(5,"titlecase"),l()()}if(i&2){let e=n.$implicit,t=p(2);h("ngClass",R(6,j,t.themeService.selectedColor().name===e.name,t.pressedItemId()==="color-"+e.name)),u(2),h("src",se("assets/sprites/menu/",e.pokemon,".webp"),Q),u(2),K(ce(5,4,e.name))}}function ho(i,n){if(i&1){let e=F();a(0,"div",7),m("click",function(){f(e);let o=p();return _(o.closeMenu())}),l(),a(1,"div",8)(2,"div",9),O(3,co,3,0),a(4,"span",10),d(5,"Pages"),l(),a(6,"button",11),m("click",function(){f(e);let o=p();return _(o.enableOneVsOne())}),a(7,"span"),d(8,"One vs One"),l()(),a(9,"button",11),m("click",function(){f(e);let o=p();return _(o.enableOneVsMany())}),a(10,"span"),d(11,"Team vs Many"),l()(),a(12,"button",11),m("click",function(){f(e);let o=p();return _(o.enableManyVsOne())}),a(13,"span"),d(14,"Many vs Team"),l()(),a(15,"button",11),m("click",function(){f(e);let o=p();return _(o.enableSpeedCalculator())}),a(16,"span"),d(17,"Speed Calc"),l()(),a(18,"button",11),m("click",function(){f(e);let o=p();return _(o.enableProbabilityCalc())}),a(19,"span"),d(20,"Probability Calc"),l()(),a(21,"button",11),m("click",function(){f(e);let o=p();return _(o.enableTypeCalculator())}),a(22,"span"),d(23,"Type Calc"),l()(),a(24,"button",11),m("click",function(){f(e);let o=p();return _(o.enableHowToUse())}),a(25,"span"),d(26,"How to use"),l()(),g(27,"mat-divider"),a(28,"span",10),d(29,"Game"),l(),a(30,"mat-button-toggle-group",12),m("change",function(o){f(e);let r=p();return _(r.onGameChange(o))}),a(31,"mat-button-toggle",13),d(32,"SV"),l(),a(33,"mat-button-toggle",14),d(34,"Champions"),l()(),g(35,"mat-divider"),a(36,"span",10),d(37,"Themes"),l(),oe(38,uo,6,9,"div",15,pi),g(40,"mat-divider"),a(41,"span",10),d(42,"Colors"),l(),oe(43,mo,6,9,"div",15,pi),g(45,"mat-divider"),a(46,"button",16),m("click",function(){f(e);let o=p();return _(o.shareCalcs())}),d(47,"Share your calcs"),l(),a(48,"a",17),g(49,"img",18),l()()()}if(i&2){let e=p();u(),E("no-footer",!e.hasFooter()),u(2),P(e.pwaInstall.canInstall()?3:-1),u(3),h("ngClass",R(11,j,e.menuStore.oneVsOneActivated(),e.pressedItemId()==="1v1")),u(3),h("ngClass",R(14,j,e.menuStore.oneVsManyActivated(),e.pressedItemId()==="1vMany")),u(3),h("ngClass",R(17,j,e.menuStore.manyVsOneActivated(),e.pressedItemId()==="Manyv1")),u(3),h("ngClass",R(20,j,e.menuStore.speedCalculatorActivated(),e.pressedItemId()==="speed")),u(3),h("ngClass",R(23,j,e.menuStore.probabilityCalcActivated(),e.pressedItemId()==="probability")),u(3),h("ngClass",R(26,j,e.menuStore.typeCalcActivated(),e.pressedItemId()==="type")),u(3),h("ngClass",R(29,j,e.menuStore.howToUseActivated(),e.pressedItemId()==="howToUse")),u(6),h("value",e.store.game()),u(8),re(e.themeService.getThemes()),u(5),re(e.themeService.getColors())}}var oa=(()=>{class i{constructor(){this.store=c(qe),this.menuStore=c($e),this.themeService=c(tt),this.activeFieldService=c(Ye),this.pwaInstall=c(hi),this.snackBar=c(et),this.router=c(ze),this.menuOpen=y(!1),this.pressedItemId=y(null),this.hasFooter=q(()=>this.menuStore.oneVsManyActivated()||this.menuStore.manyVsOneActivated()||this.menuStore.probabilityCalcActivated()||this.menuStore.typeCalcActivated()),on(()=>{typeof document>"u"||(this.menuOpen()?document.body.classList.add("menu-open"):document.body.classList.remove("menu-open"))})}ngOnDestroy(){typeof document>"u"||document.body.classList.remove("menu-open")}toggleMenu(){this.menuOpen.set(!this.menuOpen())}closeMenu(){this.menuOpen.set(!1)}updateMenuWithFeedback(e,t,o=!0){this.pressedItemId.set(e),setTimeout(()=>{t(),o&&this.closeMenu(),this.pressedItemId.set(null)},0)}enableOneVsOne(){this.updateMenuWithFeedback("1v1",()=>{this.router.navigate(["one-vs-one"]),this.store.updateSecondAttacker("")})}enableOneVsMany(){this.updateMenuWithFeedback("1vMany",()=>this.router.navigate(["team-vs-many"]))}enableManyVsOne(){this.updateMenuWithFeedback("Manyv1",()=>{this.router.navigate(["many-vs-team"]),this.store.updateSecondAttacker("")})}enableSpeedCalculator(){this.updateMenuWithFeedback("speed",()=>this.router.navigate(["speed-calc"]))}enableProbabilityCalc(){this.updateMenuWithFeedback("probability",()=>this.router.navigate(["probability-calc"]))}enableTypeCalculator(){this.updateMenuWithFeedback("type",()=>this.router.navigate(["type-calc"]))}enableHowToUse(){this.updateMenuWithFeedback("howToUse",()=>this.router.navigate(["how-to-use"]))}setTheme(e){this.updateMenuWithFeedback(`theme-${e}`,()=>this.themeService.setTheme(e),!1)}setColor(e){this.updateMenuWithFeedback(`color-${e}`,()=>this.themeService.setColor(e),!1)}async shareCalcs(){let e=We(),t=this.activeFieldService.activeStore(),o=typeof t?.field=="function"?t.field():null,r=x(v({},this.store.buildUserData()),{field:o?v({},o):null});fetch(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${e}`,{method:"PUT",body:JSON.stringify(r)});let s=`https://vgcmulticalc.com/data/${e}`;if(navigator.share)try{await navigator.share({title:"VGC Multi Calc",url:s});return}catch{}try{await navigator.clipboard.writeText(s),this.snackBar.open("Link copied to clipboard!")}catch{this.snackBar.open(s)}}onGameChange(e){this.store.updateGame(e.value)}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=V({type:i,selectors:[["app-header-mobile"]],decls:11,vars:1,consts:[[1,"header"],[1,"left-header"],["src","assets/icons/slowking.png","width","96","height","96",1,"slowking-icon"],["src","assets/icons/calc-72x72.png","width","72","height","72",1,"icon"],[1,"title"],[1,"right-header"],["mat-icon-button","",1,"menu-icon",3,"click"],[1,"menu-overlay",3,"click"],[1,"menu-panel"],[1,"menu-content"],[1,"menu-title"],[1,"menu-item-button",3,"click","ngClass"],[1,"game-toggle",3,"change","value"],["value","sv"],["value","champions"],[1,"menu-item",3,"ngClass"],[1,"share-button",3,"click"],["href","https://ko-fi.com/B0B2VFTC3","target","_blank",1,"kofi-link"],["src","assets/icons/kofi.png","alt","Buy Me a Coffee at ko-fi.com","width","580","height","146","loading","lazy"],[1,"menu-item",3,"click","ngClass"],[1,"pokemon-image-container"],["width","192","height","200","loading","lazy",1,"pokemon-image",3,"src"]],template:function(t,o){t&1&&(a(0,"div",0)(1,"div",1),g(2,"img",2)(3,"img",3),a(4,"h1",4),d(5,"VGC Multi Calc"),l()(),a(6,"div",5)(7,"button",6),m("click",function(){return o.toggleMenu()}),a(8,"mat-icon"),d(9,"menu"),l()()()(),O(10,ho,50,32)),t&2&&(u(10),P(o.menuOpen()?10:-1))},dependencies:[Le,Sn,ue,Oe,fe,yt,Ue],styles:[".header[_ngcontent-%COMP%]{height:4em;position:sticky;top:0;z-index:110;background-color:var(--background);transition:background-color .3s ease,color .3s ease,border-color .3s ease;display:flex;justify-content:space-between;border-bottom:1px;border-color:var(--background);border-width:1px;border-style:solid;padding-left:2.5em;padding-right:0;margin-bottom:0;margin-left:-2.5em}.left-header[_ngcontent-%COMP%]{display:flex;align-items:center}.right-header[_ngcontent-%COMP%]{display:flex;align-items:center;column-gap:1em;margin-right:1.5em}.slowking-icon[_ngcontent-%COMP%]{height:4em;width:auto}.icon[_ngcontent-%COMP%]{height:2.5em;width:auto}.title[_ngcontent-%COMP%]{font-size:clamp(12px,2vh,18px);font-weight:500;margin:0 0 0 1em}.menu-icon[_ngcontent-%COMP%]{height:1.5em;font-size:1em;vertical-align:middle;background:none;border:0}.menu-panel[_ngcontent-%COMP%]{position:fixed;inset:4em 0 0 auto;width:15em;background-color:var(--background);z-index:100;overflow-y:auto;border-left:1px solid var(--widget-border);border-bottom:1px solid var(--widget-border);animation:_ngcontent-%COMP%_slideRight .2s ease}.menu-panel.no-footer[_ngcontent-%COMP%]{bottom:0}.menu-panel[_ngcontent-%COMP%]:not(.no-footer){bottom:4em}.menu-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background-color:#0006;z-index:95;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);animation:_ngcontent-%COMP%_fadeIn .2s ease}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_slideRight{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}.menu-content[_ngcontent-%COMP%]{padding:1em 1.5em;display:flex;flex-direction:column}.menu-title[_ngcontent-%COMP%]{display:block;font-size:clamp(12px,2vh,18px);font-weight:600;margin-top:1em;margin-bottom:.5em;opacity:.6;text-transform:uppercase;letter-spacing:.05em;font-size:.75em}.menu-title[_ngcontent-%COMP%]:first-child{margin-top:0}mat-divider[_ngcontent-%COMP%]{margin:.75em 0}.menu-item-button[_ngcontent-%COMP%]{display:flex;align-items:center;width:100%;padding:.85em 1em;background:none;border:none;border-radius:8px;cursor:pointer;font-size:1em;color:var(--text);text-align:left;transition:background-color .15s ease,color .15s ease}.menu-item-button[_ngcontent-%COMP%]:hover{background-color:var(--highlight);color:var(--highlight-contrast)}.active-menu-option[_ngcontent-%COMP%], .menu-item-button.pressed[_ngcontent-%COMP%], .menu-item-button[_ngcontent-%COMP%]:active{background-color:var(--highlight)!important;color:var(--highlight-contrast)!important;font-weight:500}.menu-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1em;padding:.45em 1em;border-radius:8px;margin-bottom:.25em;cursor:pointer;transition:background-color .15s ease,color .15s ease}.menu-item[_ngcontent-%COMP%]:hover{background-color:var(--highlight);color:var(--highlight-contrast)}.game-toggle[_ngcontent-%COMP%]{width:100%}.game-toggle[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{flex:1}.pokemon-image-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:2.5em;padding:0}.pokemon-image[_ngcontent-%COMP%]{height:1.8em;width:auto}.share-button[_ngcontent-%COMP%]{width:100%;padding:.85em 1em;background-color:var(--primary);color:var(--primary-contrast);border:none;border-radius:8px;cursor:pointer;font-size:1em;font-weight:500;margin-top:.5em;transition:opacity .15s ease}.share-button[_ngcontent-%COMP%]:hover{opacity:.85}.kofi-link[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:1.5em}.kofi-link[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:2.2em;width:auto;border:0}.share-link[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75em;margin-top:.75em}"]})}}return i})();var go=["mat-menu-item",""],fo=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],_o=["mat-icon, [matMenuItemIcon]","*"];function bo(i,n){i&1&&(en(),a(0,"svg",2),g(1,"polygon",3),l())}var vo=["*"];function yo(i,n){if(i&1){let e=F();At(0,"div",0),pn("click",function(){f(e);let o=p();return _(o.closed.emit("click"))})("animationstart",function(o){f(e);let r=p();return _(r._onAnimationStart(o.animationName))})("animationend",function(o){f(e);let r=p();return _(r._onAnimationDone(o.animationName))})("animationcancel",function(o){f(e);let r=p();return _(r._onAnimationDone(o.animationName))}),At(1,"div",1),ae(2),mn()()}if(i&2){let e=p();gn(e._classList),E("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),hn("id",e.panelId),A("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var $t=new D("MAT_MENU_PANEL"),Wt=(()=>{class i{_elementRef=c(B);_document=c(tn);_focusMonitor=c(we);_parentMenu=c($t,{optional:!0});_changeDetectorRef=c(H);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new L;_focused=new L;_highlighted=!1;_triggersSubmenu=!1;constructor(){c(Xe).load(Je),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let o=0;o<t.length;o++)t[o].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=V({type:i,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,o){t&1&&m("click",function(s){return o._checkDisabled(s)})("mouseenter",function(){return o._handleMouseEnter()}),t&2&&(A("role",o.role)("tabindex",o._getTabIndex())("aria-disabled",o.disabled)("disabled",o.disabled||null),E("mat-mdc-menu-item-highlighted",o._highlighted)("mat-mdc-menu-item-submenu-trigger",o._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",M],disableRipple:[2,"disableRipple","disableRipple",M]},exportAs:["matMenuItem"],attrs:go,ngContentSelectors:_o,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,o){t&1&&(xe(fo),ae(0),a(1,"span",0),ae(2,1),l(),g(3,"div",1),O(4,bo,2,0,":svg:svg",2)),t&2&&(u(3),h("matRippleDisabled",o.disableRipple||o.disabled)("matRippleTrigger",o._getHostElement()),u(),P(o._triggersSubmenu?4:-1))},dependencies:[Ze],encapsulation:2,changeDetection:0})}return i})();var Co=new D("MatMenuContent");var Mo=new D("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),zt="_mat-menu-enter",Ct="_mat-menu-exit",be=(()=>{class i{_elementRef=c(B);_changeDetectorRef=c(H);_injector=c(Ce);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=ee();_allItems;_directDescendantItems=new rn;_classList={};_panelAnimationState="void";_animationDone=new L;_isAnimating=y(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let t=this._previousPanelClass,o=v({},this._classList);t&&t.length&&t.split(" ").forEach(r=>{o[r]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(r=>{o[r]=!0}),this._elementRef.nativeElement.className=""),this._classList=o}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new w;close=this.closed;panelId=c(De).getId("mat-menu-panel-");constructor(){let e=c(Mo);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Vn(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Ne(this._directDescendantItems),Vt(e=>Re(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let o=e.toArray(),r=Math.max(0,Math.min(o.length-1,t.activeItemIndex||0));o[r]&&!o[r].disabled?t.setActiveItem(r):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(Ne(this._directDescendantItems),Vt(t=>Re(...t.map(o=>o._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,o=this._keyManager;switch(t){case 27:Ke(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&o.setFocusOrigin("keyboard"),o.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=St(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let o=this._keyManager;o.setFocusOrigin(e).setFirstItemActive(),!o.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=x(v({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===Ct;(t||e===zt)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===zt||e===Ct)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(Ct),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?zt:Ct)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(Ne(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=V({type:i,selectors:[["mat-menu"]],contentQueries:function(t,o,r){if(t&1&&Ge(r,Co,5)(r,Wt,5)(r,Wt,4),t&2){let s;W(s=$())&&(o.lazyContent=s.first),W(s=$())&&(o._allItems=s),W(s=$())&&(o.items=s)}},viewQuery:function(t,o){if(t&1&&He(sn,5),t&2){let r;W(r=$())&&(o.templateRef=r.first)}},hostVars:3,hostBindings:function(t,o){t&2&&A("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",M],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:M(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[I([{provide:$t,useExisting:i}])],ngContentSelectors:vo,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,o){t&1&&(xe(),un(0,yo,3,12,"ng-template"))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2,changeDetection:0})}return i})(),ko=new D("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let i=c(Ce);return()=>Cn(i)}});var _e=new WeakMap,xo=(()=>{class i{_canHaveBackdrop;_element=c(B);_viewContainerRef=c(cn);_menuItemInstance=c(Wt,{optional:!0,self:!0});_dir=c(Qe,{optional:!0});_focusMonitor=c(we);_ngZone=c(nn);_injector=c(Ce);_scrollStrategy=c(ko);_changeDetectorRef=c(H);_animationsDisabled=ee();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=Pe.EMPTY;_menuCloseSubscription=Pe.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=c($t,{optional:!0});this._parentMaterialMenu=t instanceof be?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&_e.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let o=_e.get(t);_e.set(t,this),o&&o!==this&&o._closeMenu();let r=this._createOverlay(t),s=r.getConfig(),k=s.positionStrategy;this._setPosition(t,k),this._canHaveBackdrop?s.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:s.hasBackdrop=t.hasBackdrop??!1,r.hasAttached()||(r.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),t instanceof be&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(Jt(t.close)).subscribe(()=>{k.withLockedPosition(!1).reapplyLastPosition(),k.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,o=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),o instanceof be&&this._ownsMenu(o)?(this._pendingRemoval=o._animationDone.pipe(Zt(1)).subscribe(()=>{t.detach(),_e.has(o)||o.lazyContent?.detach()}),o._setIsOpen(!1)):(t.detach(),o?.lazyContent?.detach()),o&&this._ownsMenu(o)&&_e.delete(o),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=xn(this._injector,t),this._overlayRef.keydownEvents().subscribe(o=>{this._menu instanceof be&&this._menu._handleKeydown(o)})}return this._overlayRef}_getOverlayConfig(e){return new Mn({positionStrategy:kn(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(o=>{this._ngZone.run(()=>{let r=o.connectionPair.overlayX==="start"?"after":"before",s=o.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(r,s)})})}_setPosition(e,t){let[o,r]=e.xPosition==="before"?["end","start"]:["start","end"],[s,k]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[Mt,kt]=[s,k],[xt,Dt]=[o,r],ye=0;if(this._triggersSubmenu()){if(Dt=o=e.xPosition==="before"?"start":"end",r=xt=o==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let qt=this._parentMaterialMenu.items.first;this._parentInnerPadding=qt?qt._getHostElement().offsetTop:0}ye=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(Mt=s==="top"?"bottom":"top",kt=k==="top"?"bottom":"top");t.withPositions([{originX:o,originY:Mt,overlayX:xt,overlayY:s,offsetY:ye},{originX:r,originY:Mt,overlayX:Dt,overlayY:s,offsetY:ye},{originX:o,originY:kt,overlayX:xt,overlayY:k,offsetY:-ye},{originX:r,originY:kt,overlayX:Dt,overlayY:k,offsetY:-ye}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),o=this._parentMaterialMenu?this._parentMaterialMenu.closed:wt(),r=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Kt(s=>this._menuOpen&&s!==this._menuItemInstance)):wt();return Re(e,o,r,t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new yn(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return _e.get(e)===this}_triggerIsAriaDisabled(){return M(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){ln()};static \u0275dir=C({type:i})}return i})(),gi=(()=>{class i extends xo{_cleanupTouchstart;_hoverSubscription=Pe.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new w;onMenuOpen=this.menuOpened;menuClosed=new w;onMenuClose=this.menuClosed;constructor(){super(!0);let e=c(ke);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{wn(t)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Dn(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(t){return new(t||i)};static \u0275dir=C({type:i,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,o){t&1&&m("click",function(s){return o._handleClick(s)})("mousedown",function(s){return o._handleMousedown(s)})("keydown",function(s){return o._handleKeydown(s)}),t&2&&A("aria-haspopup",o.menu?"menu":null)("aria-expanded",o.menuOpen)("aria-controls",o.menuOpen?o.menu==null?null:o.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[S]})}return i})();function Do(i,n){i&1&&(a(0,"mat-icon"),d(1,"check"),l())}function wo(i,n){if(i&1){let e=F();a(0,"mat-icon",1),m("click",function(){f(e);let o=p();return _(o.copyDamageResult())}),d(1,"content_copy"),l()}}var fi=(()=>{class i{constructor(){this.value=_n.required(),this.copyMessageEnabled=y(!1)}copyDamageResult(){this.copyMessageEnabled.set(!0),navigator.clipboard.writeText(this.value()),setTimeout(()=>{this.copyMessageEnabled.set(!1)},2e3)}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=V({type:i,selectors:[["app-copy-button"]],inputs:{value:[1,"value"]},decls:2,vars:1,consts:[[1,"copy-button"],[1,"copy-button",3,"click"]],template:function(t,o){t&1&&O(0,Do,2,0,"mat-icon")(1,wo,2,0,"mat-icon",0),t&2&&P(o.copyMessageEnabled()?0:1)},dependencies:[ue],styles:[".copy-button[_ngcontent-%COMP%]{cursor:pointer}"]})}}return i})();var Vo=()=>["/one-vs-one"],ve=i=>({"active-menu-option":i}),So=()=>["/team-vs-many"],Ao=()=>["/many-vs-team"],Eo=()=>["/speed-calc"],Io=()=>["/probability-calc"],Fo=()=>["/type-calc"],_i=(i,n)=>n.name;function To(i,n){if(i&1&&(g(0,"app-copy-button",28),a(1,"a",29),d(2,"Link"),l()),i&2){let e=p();h("value",e.userDataLink),u(),h("href",e.userDataLink,Q)}}function Oo(i,n){if(i&1){let e=F();a(0,"div",30),m("click",function(){let o=f(e).$implicit,r=p();return _(r.themeService.setTheme(o.name))}),a(1,"div",31),g(2,"img",32),l(),a(3,"span"),d(4),le(5,"titlecase"),l()()}if(i&2){let e=n.$implicit;u(2),h("src",se("assets/sprites/menu/",e.pokemon,".webp"),Q),u(2),K(ce(5,3,e.name))}}function Po(i,n){if(i&1){let e=F();a(0,"div",30),m("click",function(){let o=f(e).$implicit,r=p();return _(r.themeService.setColor(o.name))}),a(1,"div",31),g(2,"img",32),l(),a(3,"span"),d(4),le(5,"titlecase"),l()()}if(i&2){let e=n.$implicit;u(2),h("src",se("assets/sprites/menu/",e.pokemon,".webp"),Q),u(2),K(ce(5,3,e.name))}}var is=(()=>{class i{constructor(){this.store=c(qe),this.activeFieldService=c(Ye),this.menuStore=c($e),this.themeService=c(tt),this.snackBar=c(et),this.router=c(ze)}uploadData(){let e=We(),t=this.activeFieldService.activeStore(),o=typeof t?.field=="function"?t.field():null,r=x(v({},this.store.buildUserData()),{field:o?v({},o):null});fetch(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${e}`,{method:"PUT",body:JSON.stringify(r)}),this.userDataLink=`https://vgcmulticalc.com/data/${e}`,this.snackBar.open("Your calc link has been created!")}copyUserDataLink(){navigator.clipboard.writeText(this.userDataLink)}onOneVsOneClick(){this.store.updateSecondAttacker("")}onManyVsTeamClick(){this.store.updateSecondAttacker("")}enableHowToUse(){this.router.navigate(["how-to-use"])}onGameChange(e){this.store.updateGame(e.value)}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=V({type:i,selectors:[["app-header"]],decls:56,vars:34,consts:[["themeMenu","matMenu"],[1,"header"],[1,"left-header"],["src","assets/icons/slowking.png","width","96","height","96",1,"slowking-icon"],["src","assets/icons/calc-72x72.png","width","72","height","72",1,"icon"],[1,"title"],[1,"menu"],["data-cy","one-vs-one",1,"menu-option",3,"click","routerLink","ngClass"],["data-cy","team-vs-many",1,"menu-option",3,"routerLink","ngClass"],["data-cy","many-vs-team",1,"menu-option",3,"click","routerLink","ngClass"],["data-cy","speed-calculator",1,"menu-option",3,"routerLink","ngClass"],["data-cy","probability-calc",1,"menu-option",3,"routerLink","ngClass"],["data-cy","type-calc",1,"menu-option",3,"routerLink","ngClass"],[1,"right-header"],[3,"change","value"],["value","sv"],["value","champions"],["mat-flat-button","","color","link",3,"click"],["target","_blank","href","https://twitter.com/rluizv"],["src","assets/icons/twitter.png","width","25","height","25",1,"icon"],["target","_blank","href","https://github.com/robsonbittencourt/vgc-multicalc"],["src","assets/icons/github.png","width","30","height","30",1,"icon"],["href","https://ko-fi.com/B0B2VFTC3","target","_blank"],["src","assets/icons/kofi.png","border","0","alt","Buy Me a Coffee at ko-fi.com",2,"border","0px","margin-top","0.2em","height","2.2em"],[3,"matMenuTriggerFor"],[1,"menu-content"],[1,"menu-title"],[1,"menu-item"],[3,"value"],["target","_blank",3,"href"],[1,"menu-item",3,"click"],[1,"pokemon-image-container"],["width","192","height","200","loading","lazy",1,"pokemon-image",3,"src"]],template:function(t,o){if(t&1&&(a(0,"div",1)(1,"div",2),g(2,"img",3)(3,"img",4),a(4,"h1",5),d(5,"VGC Multi Calc"),l(),a(6,"nav",6)(7,"a",7),m("click",function(){return o.onOneVsOneClick()}),a(8,"span"),d(9,"One vs One"),l()(),a(10,"a",8)(11,"span"),d(12,"Team vs Many"),l()(),a(13,"a",9),m("click",function(){return o.onManyVsTeamClick()}),a(14,"span"),d(15,"Many vs Team"),l()(),a(16,"a",10)(17,"span"),d(18,"Speed Calc"),l()(),a(19,"a",11)(20,"span"),d(21,"Probability Calc"),l()(),a(22,"a",12)(23,"span"),d(24,"Type Calc"),l()()()(),a(25,"div",13),O(26,To,3,2),a(27,"mat-button-toggle-group",14),m("change",function(s){return o.onGameChange(s)}),a(28,"mat-button-toggle",15),d(29,"SV"),l(),a(30,"mat-button-toggle",16),d(31,"Champions"),l()(),a(32,"button",17),m("click",function(){return o.uploadData()}),d(33,"Share your calcs"),l(),a(34,"button",17),m("click",function(){return o.enableHowToUse()}),d(35,"How to use"),l(),a(36,"a",18),g(37,"img",19),l(),a(38,"a",20),g(39,"img",21),l(),a(40,"a",22),g(41,"img",23),l(),a(42,"mat-icon",24),d(43),l(),a(44,"mat-menu",null,0)(46,"div",25)(47,"span",26),d(48,"Themes"),l(),oe(49,Oo,6,5,"div",27,_i),g(51,"mat-divider"),a(52,"span",26),d(53,"Colors"),l(),oe(54,Po,6,5,"div",27,_i),l()()()()),t&2){let r=je(45);u(7),h("routerLink",Z(16,Vo))("ngClass",J(17,ve,o.menuStore.oneVsOneActivated())),u(3),h("routerLink",Z(19,So))("ngClass",J(20,ve,o.menuStore.oneVsManyActivated())),u(3),h("routerLink",Z(22,Ao))("ngClass",J(23,ve,o.menuStore.manyVsOneActivated())),u(3),h("routerLink",Z(25,Eo))("ngClass",J(26,ve,o.menuStore.speedCalculatorActivated())),u(3),h("routerLink",Z(28,Io))("ngClass",J(29,ve,o.menuStore.probabilityCalcActivated())),u(3),h("routerLink",Z(31,Fo))("ngClass",J(32,ve,o.menuStore.typeCalcActivated())),u(4),P(o.userDataLink?26:-1),u(),h("value",o.store.game()),u(15),h("matMenuTriggerFor",r),u(),K(o.themeService.selectedTheme().icon),u(6),re(o.themeService.getThemes()),u(5),re(o.themeService.getColors())}},dependencies:[Le,ue,En,Oe,fe,be,gi,yt,fi,vn,Ue],styles:[".header[_ngcontent-%COMP%]{background-color:var(--widget-background);transition:background-color .3s ease,color .3s ease,border-color .3s ease;display:flex;justify-content:space-between;border-bottom:1px;border-color:var(--widget-background);border-width:1px;border-style:solid;padding-left:2.5em;padding-right:2.5em;box-shadow:0 2px 4px #0000001a}.left-header[_ngcontent-%COMP%]{display:flex;align-items:center}.right-header[_ngcontent-%COMP%]{display:flex;align-items:center;column-gap:1em}.slowking-icon[_ngcontent-%COMP%]{width:3.5em;height:auto}.icon[_ngcontent-%COMP%]{width:2em;height:auto}.title[_ngcontent-%COMP%]{color:var(--text-strong);font-weight:500;font-size:1rem;margin:0 0 0 1em}.menu[_ngcontent-%COMP%]{display:flex;align-items:center;column-gap:2em;margin-left:2em;height:75%}.menu-content[_ngcontent-%COMP%]{width:50em}.menu-option[_ngcontent-%COMP%]{display:flex;padding:.5em;align-items:center;height:75%;color:inherit;text-decoration:none}.menu-option[_ngcontent-%COMP%]:hover{cursor:pointer;font-weight:500}.active-menu-option[_ngcontent-%COMP%]{color:var(--primary-contrast);background-color:var(--primary)}.menu-title[_ngcontent-%COMP%]{font-size:clamp(12px,2vh,18px);margin-left:1em}.menu-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1em;padding-left:1em}.menu-item[_ngcontent-%COMP%]:hover{background-color:var(--highlight);color:var(--highlight-contrast)}.pokemon-image-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:4em;padding:.5em}.pokemon-image[_ngcontent-%COMP%]{height:3em;width:auto}"]})}}return i})();var ls=(()=>{class i{constructor(){this.largeWidthResolution=1280,this.largeScreen=y(typeof window<"u"&&window.innerWidth>=this.largeWidthResolution),this.isDesktop=()=>this.largeScreen(),!(typeof window>"u")&&window.addEventListener("resize",()=>{this.largeScreen.set(window.innerWidth>=this.largeWidthResolution)})}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275prov=X({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{he as a,Hn as b,pe as c,In as d,ne as e,ar as f,zi as g,ri as h,qi as i,Xi as j,Zi as k,eo as l,no as m,oo as n,lr as o,cr as p,Ve as q,bi as r,ui as s,Oe as t,fe as u,Pr as v,fi as w,oa as x,is as y,ls as z};
