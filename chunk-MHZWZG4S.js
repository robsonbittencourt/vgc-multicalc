import{Q as Xe,R as Qe,S as Ke,s as Ye}from"./chunk-CMCEMBK7.js";import{b as pe}from"./chunk-4L5UP7X5.js";import{i as wn,n as Vn,o as Sn,r as En,u as An,x as it,y as ot}from"./chunk-MZ5GR723.js";import{A as Tn,F as tt,H as nt,I as On,J as Pn,K as Rn,m as Se,n as et,o as In,p as Fn,q as Ee,w as Ot,y as oe}from"./chunk-JVL6E3DX.js";import{$ as K,$a as h,$b as B,Ab as te,Ac as Dn,Ba as ee,Cc as Ze,Ea as g,Fa as pn,Ga as gn,Gb as de,Gc as Je,H as Be,Ha as fn,Hb as I,Hc as Tt,I as Vt,Ib as ne,J as an,Ja as V,Jb as ie,Ka as z,Kb as N,La as C,Lb as me,M as Ge,Mb as he,Na as At,O as F,P as je,Pa as S,Pb as H,Q as W,Qb as O,R as D,Ra as _n,Sb as Mn,T as c,Ta as E,Va as P,Vb as kn,Wa as R,X as _,Y as b,Z as sn,Za as le,_a as ce,a as se,aa as ln,ab as a,ac as M,ba as cn,bb as l,ca as w,cb as f,d as U,da as un,db as It,eb as bn,ec as Ft,fa as y,ha as dn,hb as T,ib as vn,j as en,jb as m,jc as ze,k as wt,ka as He,kb as yn,lb as p,ma as we,mb as Ve,n as tn,na as Z,nb as ue,nc as $e,oa as St,ob as Le,pa as j,pb as Ue,pc as xn,qa as mn,qb as $,r as nn,rb as q,sa as J,t as Ne,v as on,vb as We,wa as u,xb as A,ya as Et,yb as Cn,z as rn,za as hn,zb as d,zc as qe}from"./chunk-PWTNSDZZ.js";import{a as v,b as x}from"./chunk-C6Q5SG76.js";var Ae=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new U;constructor(t=!1,e,n=!0,o){this._multiple=t,this._emitChanges=n,this.compareWith=o,e&&e.length&&(t?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...t){this._verifyValueAssignment(t),t.forEach(n=>this._markSelected(n));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...t){this._verifyValueAssignment(t),t.forEach(n=>this._unmarkSelected(n));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...t){this._verifyValueAssignment(t);let e=this.selected,n=new Set(t.map(r=>this._getConcreteValue(r)));t.forEach(r=>this._markSelected(r)),e.filter(r=>!n.has(this._getConcreteValue(r,n))).forEach(r=>this._unmarkSelected(r));let o=this._hasQueuedChanges();return this._emitChangeEvent(),o}toggle(t){return this.isSelected(t)?this.deselect(t):this.select(t)}clear(t=!0){this._unmarkAll();let e=this._hasQueuedChanges();return t&&this._emitChangeEvent(),e}isSelected(t){return this._selection.has(this._getConcreteValue(t))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(t){this._multiple&&this.selected&&this._selected.sort(t)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(t){t=this._getConcreteValue(t),this.isSelected(t)||(this._multiple||this._unmarkAll(),this.isSelected(t)||this._selection.add(t),this._emitChanges&&this._selectedToEmit.push(t))}_unmarkSelected(t){t=this._getConcreteValue(t),this.isSelected(t)&&(this._selection.delete(t),this._emitChanges&&this._deselectedToEmit.push(t))}_unmarkAll(){this.isEmpty()||this._selection.forEach(t=>this._unmarkSelected(t))}_verifyValueAssignment(t){t.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(t,e){if(this.compareWith){e=e??this._selection;for(let n of e)if(this.compareWith(t,n))return n;return t}else return t}};var xi=(()=>{class i{_listeners=[];notify(e,n){for(let o of this._listeners)o(e,n)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(n=>e!==n)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(n){return new(n||i)};static \u0275prov=St({token:i,factory:i.\u0275fac})}return i})();var Un=(()=>{class i{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,n){this._renderer=e,this._elementRef=n}setProperty(e,n){this._renderer.setProperty(this._elementRef.nativeElement,e,n)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(n){return new(n||i)(g(ee),g(j))};static \u0275dir=C({type:i})}return i})(),Wn=(()=>{class i extends Un{static \u0275fac=(()=>{let e;return function(o){return(e||(e=Z(i)))(o||i)}})();static \u0275dir=C({type:i,features:[S]})}return i})(),be=new D("");var wi={provide:be,useExisting:F(()=>zn),multi:!0};function Vi(){let i=Ft()?Ft().getUserAgent():"";return/android (\d+)/.test(i.toLowerCase())}var Si=new D(""),zn=(()=>{class i extends Un{_compositionMode;_composing=!1;constructor(e,n,o){super(e,n),this._compositionMode=o,this._compositionMode==null&&(this._compositionMode=!Vi())}writeValue(e){let n=e??"";this.setProperty("value",n)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(n){return new(n||i)(g(ee),g(j),g(Si,8))};static \u0275dir=C({type:i,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(n,o){n&1&&m("input",function(s){return o._handleInput(s.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(s){return o._compositionEnd(s.target.value)})},standalone:!1,features:[I([wi]),S]})}return i})();function jt(i){return i==null||Ht(i)===0}function Ht(i){return i==null?null:Array.isArray(i)||typeof i=="string"?i.length:i instanceof Set?i.size:null}var ae=new D(""),ft=new D(""),Ei=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,Pt=class{static min(t){return $n(t)}static max(t){return qn(t)}static required(t){return Yn(t)}static requiredTrue(t){return Ai(t)}static email(t){return Ii(t)}static minLength(t){return Fi(t)}static maxLength(t){return Ti(t)}static pattern(t){return Oi(t)}static nullValidator(t){return at()}static compose(t){return ei(t)}static composeAsync(t){return ti(t)}};function $n(i){return t=>{if(t.value==null||i==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e<i?{min:{min:i,actual:t.value}}:null}}function qn(i){return t=>{if(t.value==null||i==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e>i?{max:{max:i,actual:t.value}}:null}}function Yn(i){return jt(i.value)?{required:!0}:null}function Ai(i){return i.value===!0?null:{required:!0}}function Ii(i){return jt(i.value)||Ei.test(i.value)?null:{email:!0}}function Fi(i){return t=>{let e=t.value?.length??Ht(t.value);return e===null||e===0?null:e<i?{minlength:{requiredLength:i,actualLength:e}}:null}}function Ti(i){return t=>{let e=t.value?.length??Ht(t.value);return e!==null&&e>i?{maxlength:{requiredLength:i,actualLength:e}}:null}}function Oi(i){if(!i)return at;let t,e;return typeof i=="string"?(e="",i.charAt(0)!=="^"&&(e+="^"),e+=i,i.charAt(i.length-1)!=="$"&&(e+="$"),t=new RegExp(e)):(e=i.toString(),t=i),n=>{if(jt(n.value))return null;let o=n.value;return t.test(o)?null:{pattern:{requiredPattern:e,actualValue:o}}}}function at(i){return null}function Xn(i){return i!=null}function Qn(i){return fn(i)?en(i):i}function Kn(i){let t={};return i.forEach(e=>{t=e!=null?v(v({},t),e):t}),Object.keys(t).length===0?null:t}function Zn(i,t){return t.map(e=>e(i))}function Pi(i){return!i.validate}function Jn(i){return i.map(t=>Pi(t)?t:e=>t.validate(e))}function ei(i){if(!i)return null;let t=i.filter(Xn);return t.length==0?null:function(e){return Kn(Zn(e,t))}}function Lt(i){return i!=null?ei(Jn(i)):null}function ti(i){if(!i)return null;let t=i.filter(Xn);return t.length==0?null:function(e){let n=Zn(e,t).map(Qn);return nn(n).pipe(tn(Kn))}}function Ut(i){return i!=null?ti(Jn(i)):null}function Nn(i,t){return i===null?[t]:Array.isArray(i)?[...i,t]:[i,t]}function ni(i){return i._rawValidators}function ii(i){return i._rawAsyncValidators}function Rt(i){return i?Array.isArray(i)?i:[i]:[]}function st(i,t){return Array.isArray(i)?i.includes(t):i===t}function Bn(i,t){let e=Rt(t);return Rt(i).forEach(o=>{st(e,o)||e.push(o)}),e}function Gn(i,t){return Rt(t).filter(e=>!st(i,e))}var lt=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=Lt(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=Ut(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t=void 0){this.control?.reset(t)}hasError(t,e){return this.control?this.control.hasError(t,e):!1}getError(t,e){return this.control?this.control.getError(t,e):null}},re=class extends lt{name;get formDirective(){return null}get path(){return null}};var Ie="VALID",rt="INVALID",ge="PENDING",Fe="DISABLED",Y=class{},ct=class extends Y{value;source;constructor(t,e){super(),this.value=t,this.source=e}},Oe=class extends Y{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e}},Pe=class extends Y{touched;source;constructor(t,e){super(),this.touched=t,this.source=e}},fe=class extends Y{status;source;constructor(t,e){super(),this.status=t,this.source=e}},ut=class extends Y{source;constructor(t){super(),this.source=t}},_e=class extends Y{source;constructor(t){super(),this.source=t}};function oi(i){return(_t(i)?i.validators:i)||null}function Ri(i){return Array.isArray(i)?Lt(i):i||null}function ri(i,t){return(_t(t)?t.asyncValidators:i)||null}function Ni(i){return Array.isArray(i)?Ut(i):i||null}function _t(i){return i!=null&&!Array.isArray(i)&&typeof i=="object"}function Bi(i,t,e){let n=i.controls;if(!(t?Object.keys(n):n).length)throw new Ge(1e3,"");if(!n[e])throw new Ge(1001,"")}function Gi(i,t,e){i._forEachChild((n,o)=>{if(e[o]===void 0)throw new Ge(-1002,"")})}var dt=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=y(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get status(){return O(this.statusReactive)}set status(t){O(()=>this.statusReactive.set(t))}_status=H(()=>this.statusReactive());statusReactive=y(void 0);get valid(){return this.status===Ie}get invalid(){return this.status===rt}get pending(){return this.status===ge}get disabled(){return this.status===Fe}get enabled(){return this.status!==Fe}errors;get pristine(){return O(this.pristineReactive)}set pristine(t){O(()=>this.pristineReactive.set(t))}_pristine=H(()=>this.pristineReactive());pristineReactive=y(!0);get dirty(){return!this.pristine}get touched(){return O(this.touchedReactive)}set touched(t){O(()=>this.touchedReactive.set(t))}_touched=H(()=>this.touchedReactive());touchedReactive=y(!1);get untouched(){return!this.touched}_events=new U;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(Bn(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(Bn(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(Gn(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(Gn(t,this._rawAsyncValidators))}hasValidator(t){return st(this._rawValidators,t)}hasAsyncValidator(t){return st(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){let e=this.touched===!1;this.touched=!0;let n=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(x(v({},t),{sourceControl:n})),e&&t.emitEvent!==!1&&this._events.next(new Pe(!0,n))}markAllAsDirty(t={}){this.markAsDirty({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t))}markAllAsTouched(t={}){this.markAsTouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t))}markAsUntouched(t={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=t.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:n})}),t.onlySelf||this._parent?._updateTouched(t,n),e&&t.emitEvent!==!1&&this._events.next(new Pe(!1,n))}markAsDirty(t={}){let e=this.pristine===!0;this.pristine=!1;let n=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(x(v({},t),{sourceControl:n})),e&&t.emitEvent!==!1&&this._events.next(new Oe(!1,n))}markAsPristine(t={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=t.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:t.emitEvent})}),t.onlySelf||this._parent?._updatePristine(t,n),e&&t.emitEvent!==!1&&this._events.next(new Oe(!0,n))}markAsPending(t={}){this.status=ge;let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new fe(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(x(v({},t),{sourceControl:e}))}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=Fe,this.errors=null,this._forEachChild(o=>{o.disable(x(v({},t),{onlySelf:!0}))}),this._updateValue();let n=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new ct(this.value,n)),this._events.next(new fe(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(x(v({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=Ie,this._forEachChild(n=>{n.enable(x(v({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(x(v({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Ie||this.status===ge)&&this._runAsyncValidator(n,t.emitEvent)}let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new ct(this.value,e)),this._events.next(new fe(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(x(v({},t),{sourceControl:e}))}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Fe:Ie}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=ge,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:t!==!1};let n=Qn(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:e,shouldHaveEmitted:t})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,t}return!1}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((n,o)=>n&&n._find(o),this)}getError(t,e){let n=e?this.get(e):this;return n?.errors?n.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,n){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||n)&&this._events.next(new fe(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,n)}_initObservables(){this.valueChanges=new w,this.statusChanges=new w}_calculateStatus(){return this._allControlsDisabled()?Fe:this.errors?rt:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(ge)?ge:this._anyControlsHaveStatus(rt)?rt:Ie}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let n=!this._anyControlsDirty(),o=this.pristine!==n;this.pristine=n,t.onlySelf||this._parent?._updatePristine(t,e),o&&this._events.next(new Oe(this.pristine,e))}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new Pe(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e)}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){_t(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=Ri(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=Ni(this._rawAsyncValidators)}_updateHasRequiredValidator(){O(()=>this._hasRequired.set(this.hasValidator(Pt.required)))}};function ji(i){return i.tagName==="INPUT"||i.tagName==="SELECT"||i.tagName==="TEXTAREA"}function Hi(i,t,e,n){switch(e){case"name":i.setAttribute(t,e,n);break;case"disabled":case"readonly":case"required":n?i.setAttribute(t,e,""):i.removeAttribute(t,e);break;case"max":case"min":case"minLength":case"maxLength":n!==void 0?i.setAttribute(t,e,n.toString()):i.removeAttribute(t,e);break}}var Nt=class{kind;context;control;message;constructor({kind:t,context:e,control:n}){this.kind=t,this.context=e,this.control=n}};function ai(i){return typeof i=="number"?i:parseFloat(i)}var Wt=(()=>{class i{_validator=at;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let n=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(n),this._validator=this._enabled?this.createValidator(n):at,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static \u0275fac=function(n){return new(n||i)};static \u0275dir=C({type:i,features:[we]})}return i})(),Li={provide:ae,useExisting:F(()=>Ui),multi:!0},Ui=(()=>{class i extends Wt{max;inputName="max";normalizeInput=e=>ai(e);createValidator=e=>qn(e);static \u0275fac=(()=>{let e;return function(o){return(e||(e=Z(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["input","type","number","max","","formControlName",""],["input","type","number","max","","formControl",""],["input","type","number","max","","ngModel",""]],hostVars:1,hostBindings:function(n,o){n&2&&E("max",o._enabled?o.max:null)},inputs:{max:"max"},standalone:!1,features:[I([Li]),S]})}return i})(),Wi={provide:ae,useExisting:F(()=>zi),multi:!0},zi=(()=>{class i extends Wt{min;inputName="min";normalizeInput=e=>ai(e);createValidator=e=>$n(e);static \u0275fac=(()=>{let e;return function(o){return(e||(e=Z(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["input","type","number","min","","formControlName",""],["input","type","number","min","","formControl",""],["input","type","number","min","","ngModel",""]],hostVars:1,hostBindings:function(n,o){n&2&&E("min",o._enabled?o.min:null)},inputs:{min:"min"},standalone:!1,features:[I([Wi]),S]})}return i})(),$i={provide:ae,useExisting:F(()=>si),multi:!0};var si=(()=>{class i extends Wt{required;inputName="required";normalizeInput=M;createValidator=e=>Yn;enabled(e){return e}static \u0275fac=(()=>{let e;return function(o){return(e||(e=Z(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(n,o){n&2&&E("required",o._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[I([$i]),S]})}return i})();var qi=new D(""),ve=new D("",{factory:()=>bt}),bt="always";function Yi(i,t){return[...t.path,i]}function Bt(i,t,e=bt){zt(i,t),t.valueAccessor.writeValue(i.value),(i.disabled||e==="always")&&t.valueAccessor.setDisabledState?.(i.disabled),Qi(i,t),Zi(i,t),Ki(i,t),Xi(i,t)}function mt(i,t,e=!0){let n=()=>{};t?.valueAccessor?.registerOnChange(n),t?.valueAccessor?.registerOnTouched(n),pt(i,t),i&&(t._invokeOnDestroyCallbacks(),i._registerOnCollectionChange(()=>{}))}function ht(i,t){i.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function Xi(i,t){if(t.valueAccessor.setDisabledState){let e=n=>{t.valueAccessor.setDisabledState(n)};i.registerOnDisabledChange(e),t._registerOnDestroy(()=>{i._unregisterOnDisabledChange(e)})}}function zt(i,t){let e=ni(i);t.validator!==null?i.setValidators(Nn(e,t.validator)):typeof e=="function"&&i.setValidators([e]);let n=ii(i);t.asyncValidator!==null?i.setAsyncValidators(Nn(n,t.asyncValidator)):typeof n=="function"&&i.setAsyncValidators([n]);let o=()=>i.updateValueAndValidity();ht(t._rawValidators,o),ht(t._rawAsyncValidators,o)}function pt(i,t){let e=!1;if(i!==null){if(t.validator!==null){let o=ni(i);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==t.validator);r.length!==o.length&&(e=!0,i.setValidators(r))}}if(t.asyncValidator!==null){let o=ii(i);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==t.asyncValidator);r.length!==o.length&&(e=!0,i.setAsyncValidators(r))}}}let n=()=>{};return ht(t._rawValidators,n),ht(t._rawAsyncValidators,n),e}function Qi(i,t){t.valueAccessor.registerOnChange(e=>{i._pendingValue=e,i._pendingChange=!0,i._pendingDirty=!0,i.updateOn==="change"&&li(i,t)})}function Ki(i,t){t.valueAccessor.registerOnTouched(()=>{i._pendingTouched=!0,i.updateOn==="blur"&&i._pendingChange&&li(i,t),i.updateOn!=="submit"&&i.markAsTouched()})}function li(i,t){i._pendingDirty&&i.markAsDirty(),i.setValue(i._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(i._pendingValue),i._pendingChange=!1}function Zi(i,t){let e=(n,o)=>{t.valueAccessor.writeValue(n),o&&t.viewToModelUpdate(n)};i.registerOnChange(e),t._registerOnDestroy(()=>{i._unregisterOnChange(e)})}function ci(i,t){i==null,zt(i,t)}function Ji(i,t){return pt(i,t)}function ui(i,t){if(!i.hasOwnProperty("model"))return!1;let e=i.model;return e.isFirstChange()?!0:!Object.is(t,e.currentValue)}function eo(i){return Object.getPrototypeOf(i.constructor)===Wn}function di(i,t){i._syncPendingControls(),t.forEach(e=>{let n=e.control;n.updateOn==="submit"&&n._pendingChange&&(e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1)})}function to(i,t){if(!t)return null;Array.isArray(t);let e,n,o;return t.forEach(r=>{r.constructor===zn?e=r:eo(r)?n=r:o=r}),o||n||e||null}function no(i,t){let e=i.indexOf(t);e>-1&&i.splice(e,1)}var mi={provide:qi,useFactory:()=>{let i=c(X,{self:!0});return{setParseErrors:t=>{i.setParseErrorSource(t)},set onReset(t){i.onReset=t}}}},X=class extends lt{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(t){this.userOnReset=t,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof _e&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=to(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(t,e,n){super(),this.injector=t,this.renderer=e,this.rawValueAccessors=n,this.injector?.get(cn)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let t=this.injector?.get(B);if(!this.control||!t)return;let e=t.markForCheck.bind(t);this.subscription=new se,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(n=>{n instanceof _e&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(t){!t.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!t.customControl||(this.isCustomControlBased=!0,t.listenToCustomControlModel(o=>{this.control?.setValue(o,{emitModelToViewChange:!1}),this.control?.markAsDirty(),this.viewToModelUpdate(o)}),t.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=ji(t.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(o=>o instanceof si))}ngControlUpdate(t,e){if(!this.isCustomControlBased)return;let n=this.control,o=this.customControlBindings;Object.is(o.value,n.value)||(o.value=n.value,t.setCustomControlModelInput(n.value)),this.bindControlProperty(t,o,"touched",n.touched),this.bindControlProperty(t,o,"dirty",n.dirty),this.bindControlProperty(t,o,"valid",n.valid),this.bindControlProperty(t,o,"invalid",n.invalid),this.bindControlProperty(t,o,"pending",n.pending),this.bindControlProperty(t,o,"disabled",n.disabled),this.shouldBindRequired&&this.bindControlProperty(t,o,"required",this.isRequired);let r=n.errors;if(o.errors!==r){o.errors=r;let s=this._convertErrors(r);t.setInputOnDirectives("errors",s)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(t,e,n,o){if(e[n]===o)return;e[n]=o;let r=t.setInputOnDirectives(n,o);this.isNativeFormElement&&!r&&(n==="disabled"||n==="required")&&this.renderer&&Hi(this.renderer,t.nativeElement,n,o)}_convertErrors(t){if(t===null)return[];let e=this.control;return Object.entries(t).map(([n,o])=>new Nt({context:o,kind:n,control:e}))}setParseErrorSource(t){if(t===void 0)return;let e=null,n=H(()=>{let o=t();return o.length===0?null:o.reduce((r,s)=>(r[s.kind]=s,r),{})});this.parseErrorsValidator=(()=>e).bind(this),He(()=>{e=n(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(t){this.parseErrorsValidator&&(t?.removeValidators(this.parseErrorsValidator),t?.updateValueAndValidity({emitEvent:!1}))}},Gt=class{_cd;constructor(t){this._cd=t}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var pr=(()=>{class i extends Gt{constructor(e){super(e)}static \u0275fac=function(n){return new(n||i)(g(X,2))};static \u0275dir=C({type:i,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,o){n&2&&A("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},standalone:!1,features:[S]})}return i})();var gt=class extends dt{constructor(t,e,n){super(oi(e),ri(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,n={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,n={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){O(()=>{Gi(this,!0,t),Object.keys(t).forEach(n=>{Bi(this,!0,n),this.controls[n].setValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)})}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(n=>{let o=this.controls[n];o&&o.patchValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((n,o)=>{n.reset(t?t[o]:null,x(v({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new _e(this))}getRawValue(){return this._reduceChildren({},(t,e,n)=>(t[n]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(e,n)=>n._syncPendingControls()?!0:e);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let n=this.controls[e];n&&t(n,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(let[e,n]of Object.entries(this.controls))if(this.contains(e)&&t(n))return!0;return!1}_reduceValue(){let t={};return this._reduceChildren(t,(e,n,o)=>((n.enabled||this.disabled)&&(e[o]=n.value),e))}_reduceChildren(t,e){let n=t;return this._forEachChild((o,r)=>{n=e(n,o,r)}),n}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(t){return this.controls.hasOwnProperty(t)?this.controls[t]:null}};var io={provide:re,useExisting:F(()=>oo)},Te=Promise.resolve(),oo=(()=>{class i extends re{callSetDisabledState;get submitted(){return O(this.submittedReactive)}_submitted=H(()=>this.submittedReactive());submittedReactive=y(!1);_directives=new Set;form;ngSubmit=new w;options;constructor(e,n,o){super(),this.callSetDisabledState=o,this.form=new gt({},Lt(e),Ut(n))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Te.then(()=>{let n=this._findContainer(e.path);e.control=n.registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Te.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Te.then(()=>{let n=this._findContainer(e.path),o=new gt({});ci(o,e),n.registerControl(e.name,o),o.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Te.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,n){Te.then(()=>{this.form.get(e.path).setValue(n)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),di(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new ut(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(n){return new(n||i)(g(ae,10),g(ft,10),g(ve,8))};static \u0275dir=C({type:i,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(n,o){n&1&&m("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[I([io]),S]})}return i})();function jn(i,t){let e=i.indexOf(t);e>-1&&i.splice(e,1)}function Hn(i){return typeof i=="object"&&i!==null&&Object.keys(i).length===2&&"value"in i&&"disabled"in i}var hi=class extends dt{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(t=null,e,n){super(oi(e),ri(n,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),_t(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Hn(t)?this.defaultValue=t.value:this.defaultValue=t)}setValue(t,e={}){O(()=>{this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)})}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new _e(this))}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){jn(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){jn(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(t){Hn(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}};var ro=i=>i instanceof hi;var ao={provide:X,useExisting:F(()=>so)},Ln=Promise.resolve(),so=(()=>{class i extends X{_changeDetectorRef;callSetDisabledState;control=new hi;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new w;constructor(e,n,o,r,s,k,Q,xe){super(Q,xe,r),this._changeDetectorRef=s,this.callSetDisabledState=k,this._parent=e,this._setValidators(n),this._setAsyncValidators(o)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let n=e.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),ui(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}\u0275ngControlCreate(e){super.ngControlCreate(e)}\u0275ngControlUpdate(e){super.ngControlUpdate(e,!1)}get shouldBindRequired(){return!1}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Bt(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:!1})}_setupWithForm(e){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Bt(this.control,this,e))}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){Ln.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let n=e.isDisabled.currentValue,o=n!==0&&M(n);Ln.then(()=>{o&&!this.control.disabled?this.control.disable():!o&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?Yi(e,this._parent):[e]}static \u0275fac=function(n){return new(n||i)(g(re,9),g(ae,10),g(ft,10),g(be,10),g(B,8),g(ve,8),g(K,8),g(ee,8))};static \u0275dir=C({type:i,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[I([ao,mi]),S,we,At(null)]})}return i})();var lo={provide:be,useExisting:F(()=>co),multi:!0},co=(()=>{class i extends Wn{writeValue(e){let n=e??"";this.setProperty("value",n)}registerOnChange(e){this.onChange=n=>{e(n==""?null:parseFloat(n))}}static \u0275fac=(()=>{let e;return function(o){return(e||(e=Z(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["input","type","number","formControlName","",3,"ngNoCva",""],["input","type","number","formControl","",3,"ngNoCva",""],["input","type","number","ngModel","",3,"ngNoCva",""]],hostBindings:function(n,o){n&1&&m("input",function(s){return o.onChange(s.target.value)})("blur",function(){return o.onTouched()})},standalone:!1,features:[I([lo]),S]})}return i})();var uo=(()=>{class i extends re{callSetDisabledState;get submitted(){return O(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=H(()=>this._submittedReactive());_submittedReactive=y(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,n,o){super(),this.callSetDisabledState=o,this._setValidators(e),this._setAsyncValidators(n)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(pt(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let n=this.form.get(e.path);return e._setupWithForm(n,this.callSetDisabledState),n.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),n}getControl(e){return this.form.get(e.path)}removeControl(e){mt(e.control||null,e,!1),no(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,n){this.form.get(e.path).setValue(n)}onReset(){this.resetForm()}resetForm(e=void 0,n={}){this.form.reset(e,n),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,di(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new ut(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let n=e.control,o=this.form.get(e.path);n!==o&&(mt(n||null,e),ro(o)&&e._setupWithForm(o,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let n=this.form.get(e.path);ci(n,e),n.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let n=this.form?.get(e.path);n&&Ji(n,e)&&n.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){zt(this.form,this),this._oldForm&&pt(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(n){return new(n||i)(g(ae,10),g(ft,10),g(ve,8))};static \u0275dir=C({type:i,features:[S,we]})}return i})();var pi=new D(""),mo={provide:X,useExisting:F(()=>ho)},ho=(()=>{class i extends X{_ngModelWarningConfig;callSetDisabledState;viewModel;form;set isDisabled(e){}model;update=new w;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,n,o,r,s,k,Q){super(Q,k,o),this._ngModelWarningConfig=r,this.callSetDisabledState=s,this._setValidators(e),this._setAsyncValidators(n)}ngOnChanges(e){if(this._isControlChanged(e)){let n=e.form.previousValue;n&&(mt(n,this,!1),this.removeParseErrorsValidator(n)),this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Bt(this.form,this,this.callSetDisabledState)),this.form.updateValueAndValidity({emitEvent:!1})}ui(e,this.viewModel)&&(this.form.setValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.form&&mt(this.form,this,!1)}get path(){return[]}get control(){return this.form}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_isControlChanged(e){return e.hasOwnProperty("form")}\u0275ngControlCreate(e){super.ngControlCreate(e)}\u0275ngControlUpdate(e){super.ngControlUpdate(e,!0)}static \u0275fac=function(n){return new(n||i)(g(ae,10),g(ft,10),g(be,10),g(pi,8),g(ve,8),g(ee,8),g(K,8))};static \u0275dir=C({type:i,selectors:[["","formControl",""]],inputs:{form:[0,"formControl","form"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},exportAs:["ngForm"],standalone:!1,features:[I([mo,mi]),S,we,At(null)]})}return i})();var po={provide:re,useExisting:F(()=>go)},go=(()=>{class i extends uo{form=null;ngSubmit=new w;get control(){return this.form}static \u0275fac=(()=>{let e;return function(o){return(e||(e=Z(i)))(o||i)}})();static \u0275dir=C({type:i,selectors:[["","formGroup",""]],hostBindings:function(n,o){n&1&&m("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[I([po]),S]})}return i})();var gi=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=z({type:i});static \u0275inj=W({})}return i})();var fr=(()=>{class i{static withConfig(e){return{ngModule:i,providers:[{provide:ve,useValue:e.callSetDisabledState??bt}]}}static \u0275fac=function(n){return new(n||i)};static \u0275mod=z({type:i});static \u0275inj=W({imports:[gi]})}return i})(),_r=(()=>{class i{static withConfig(e){return{ngModule:i,providers:[{provide:pi,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:ve,useValue:e.callSetDisabledState??bt}]}}static \u0275fac=function(n){return new(n||i)};static \u0275mod=z({type:i});static \u0275inj=W({imports:[gi]})}return i})();var fi=(()=>{class i{_animationsDisabled=oe();state="unchecked";disabled=!1;appearance="full";static \u0275fac=function(n){return new(n||i)};static \u0275cmp=V({type:i,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(n,o){n&2&&A("mat-pseudo-checkbox-indeterminate",o.state==="indeterminate")("mat-pseudo-checkbox-checked",o.state==="checked")("mat-pseudo-checkbox-disabled",o.disabled)("mat-pseudo-checkbox-minimal",o.appearance==="minimal")("mat-pseudo-checkbox-full",o.appearance==="full")("_mat-animation-noopable",o._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(n,o){},styles:[`.mat-pseudo-checkbox {
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
`],encapsulation:2})}return i})();var fo=["button"],_o=["*"];function bo(i,t){if(i&1&&(a(0,"div",2),f(1,"mat-pseudo-checkbox",6),l()),i&2){let e=p();u(),h("disabled",e.disabled)}}var _i=new D("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),bi=new D("MatButtonToggleGroup"),vo={provide:be,useExisting:F(()=>Re),multi:!0},vt=class{source;value;constructor(t,e){this.source=t,this.value=e}},Re=(()=>{class i{_changeDetector=c(B);_dir=c(Je,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=c(Se).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(n=>n.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new w;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new w;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=c(_i,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new Ae(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||et(e))return;let o=e.target.id,r=this._buttonToggles.toArray().findIndex(k=>k.buttonId===o),s=null;switch(e.keyCode){case 32:case 13:s=this._buttonToggles.get(r)||null;break;case 38:s=this._getNextButton(r,-1);break;case 37:s=this._getNextButton(r,this.dir==="ltr"?-1:1);break;case 40:s=this._getNextButton(r,1);break;case 39:s=this._getNextButton(r,this.dir==="ltr"?1:-1);break;default:return}s&&(e.preventDefault(),s._onButtonClick(),s.focus())}_emitChangeEvent(e){let n=new vt(e,this.value);this._rawValue=n.value,this._controlValueAccessorChangeFn(n.value),this.change.emit(n)}_syncButtonToggle(e,n,o=!1,r=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?n?this._selectionModel.select(e):this._selectionModel.deselect(e):r=!0,r?Promise.resolve().then(()=>this._updateModelValue(e,o)):this._updateModelValue(e,o)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(n=>e.value!=null&&n===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let n=this._buttonToggles.get(e);if(!n.disabled){n.tabIndex=0;break}}}_getNextButton(e,n){let o=this._buttonToggles;for(let r=1;r<=o.length;r++){let s=(e+n*r+o.length)%o.length,k=o.get(s);if(k&&!k.disabled)return k}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let n=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(o=>this._selectValue(o,n))):(this._clearSelection(),this._selectValue(e,n)),!this.multiple&&n.every(o=>o.tabIndex===-1)){for(let o of n)if(!o.disabled){o.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,n){for(let o of n)if(o.value===e){o.checked=!0,this._selectionModel.select(o),this.multiple||(o.tabIndex=0);break}}_updateModelValue(e,n){n&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(n){return new(n||i)};static \u0275dir=C({type:i,selectors:[["mat-button-toggle-group"]],contentQueries:function(n,o,r){if(n&1&&Le(r,ye,5),n&2){let s;$(s=q())&&(o._buttonToggles=s)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(n,o){n&1&&m("keydown",function(s){return o._keydown(s)}),n&2&&(E("role",o.multiple?"group":"radiogroup")("aria-disabled",o.disabled),A("mat-button-toggle-vertical",o.vertical)("mat-button-toggle-group-appearance-standard",o.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",M],value:"value",multiple:[2,"multiple","multiple",M],disabled:[2,"disabled","disabled",M],disabledInteractive:[2,"disabledInteractive","disabledInteractive",M],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",M],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",M]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[I([vo,{provide:bi,useExisting:i}])]})}return i})(),ye=(()=>{class i{_changeDetectorRef=c(B);_elementRef=c(j);_focusMonitor=c(Ee);_idGenerator=c(Se);_animationDisabled=oe();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new w;constructor(){c(Ze).load(nt);let e=c(bi,{optional:!0}),n=c(new Mn("tabindex"),{optional:!0})||"",o=c(_i,{optional:!0});this._tabIndex=y(parseInt(n)||0),this.buttonToggleGroup=e,this._appearance=o&&o.appearance?o.appearance:"standard",this._disabledInteractive=o?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let n=this.buttonToggleGroup._buttonToggles.find(o=>o.tabIndex===0);n&&(n.tabIndex=-1),this.tabIndex=0}this.change.emit(new vt(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=V({type:i,selectors:[["mat-button-toggle"]],viewQuery:function(n,o){if(n&1&&Ue(fo,5),n&2){let r;$(r=q())&&(o._buttonElement=r.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(n,o){n&1&&m("focus",function(){return o.focus()}),n&2&&(E("aria-label",null)("aria-labelledby",null)("id",o.id)("name",null),A("mat-button-toggle-standalone",!o.buttonToggleGroup)("mat-button-toggle-checked",o.checked)("mat-button-toggle-disabled",o.disabled)("mat-button-toggle-disabled-interactive",o.disabledInteractive)("mat-button-toggle-appearance-standard",o.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",M],appearance:"appearance",checked:[2,"checked","checked",M],disabled:[2,"disabled","disabled",M],disabledInteractive:[2,"disabledInteractive","disabledInteractive",M]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:_o,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(n,o){if(n&1&&(Ve(),a(0,"button",1,0),m("click",function(){return o._onButtonClick()}),P(2,bo,2,1,"div",2),a(3,"span",3),ue(4),l()(),f(5,"span",4)(6,"span",5)),n&2){let r=We(1);h("id",o.buttonId)("disabled",o.disabled&&!o.disabledInteractive||null),E("role",o.isSingleSelector()?"radio":"button")("tabindex",o.disabled&&!o.disabledInteractive?-1:o.tabIndex)("aria-pressed",o.isSingleSelector()?null:o.checked)("aria-checked",o.isSingleSelector()?o.checked:null)("name",o._getButtonName())("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledby)("aria-disabled",o.disabled&&o.disabledInteractive?"true":null),u(2),R(o.buttonToggleGroup&&(!o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideSingleSelectionIndicator||o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),u(4),h("matRippleTrigger",r)("matRippleDisabled",o.disableRipple||o.disabled)}},dependencies:[tt,fi],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2})}return i})(),Lr=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=z({type:i});static \u0275inj=W({imports:[Pn,ye,Tt]})}return i})();var Mt=(()=>{class i{get vertical(){return this._vertical}set vertical(e){this._vertical=Ot(e)}_vertical=!1;get inset(){return this._inset}set inset(e){this._inset=Ot(e)}_inset=!1;static \u0275fac=function(n){return new(n||i)};static \u0275cmp=V({type:i,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(n,o){n&2&&(E("aria-orientation",o.vertical?"vertical":"horizontal"),A("mat-divider-vertical",o.vertical)("mat-divider-horizontal",!o.vertical)("mat-divider-inset",o.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(n,o){},styles:[`.mat-divider {
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
`],encapsulation:2})}return i})();var vi=(()=>{class i{constructor(){this.platformId=c(dn),this.canInstall=y(!1),this.promptEvent=null,xn(this.platformId)&&(window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),this.promptEvent=e,this.canInstall.set(!0)}),window.addEventListener("appinstalled",()=>{this.promptEvent=null,this.canInstall.set(!1)}))}async install(){if(!this.promptEvent)return;this.promptEvent.prompt();let{outcome:e}=await this.promptEvent.userChoice;e==="accepted"&&(this.promptEvent=null,this.canInstall.set(!1))}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275prov=je({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var L=(i,t)=>({"active-menu-option":i,pressed:t}),yi=(i,t)=>t.name;function yo(i,t){if(i&1){let e=T();a(0,"button",16),m("click",function(){_(e);let o=p(2);return b(o.pwaInstall.install())}),d(1,"Install app"),l(),f(2,"mat-divider")}}function Co(i,t){if(i&1){let e=T();a(0,"div",19),m("click",function(){let o=_(e).$implicit,r=p(2);return b(r.setTheme(o.name))}),a(1,"div",20),f(2,"img",21),l(),a(3,"span"),d(4),me(5,"titlecase"),l()()}if(i&2){let e=t.$implicit,n=p(2);h("ngClass",N(6,L,n.themeService.selectedTheme().name===e.name,n.pressedItemId()==="theme-"+e.name)),u(2),h("src",de("assets/sprites/menu/",e.pokemon,".webp"),J),u(2),te(he(5,4,e.name))}}function Mo(i,t){if(i&1){let e=T();a(0,"div",19),m("click",function(){let o=_(e).$implicit,r=p(2);return b(r.setColor(o.name))}),a(1,"div",20),f(2,"img",21),l(),a(3,"span"),d(4),me(5,"titlecase"),l()()}if(i&2){let e=t.$implicit,n=p(2);h("ngClass",N(6,L,n.themeService.selectedColor().name===e.name,n.pressedItemId()==="color-"+e.name)),u(2),h("src",de("assets/sprites/menu/",e.pokemon,".webp"),J),u(2),te(he(5,4,e.name))}}function ko(i,t){if(i&1){let e=T();a(0,"div",7),m("click",function(){_(e);let o=p();return b(o.closeMenu())}),l(),a(1,"div",8)(2,"div",9),P(3,yo,3,0),a(4,"span",10),d(5,"Pages"),l(),a(6,"button",11),m("click",function(){_(e);let o=p();return b(o.enableOneVsOne())}),a(7,"span"),d(8,"One vs One"),l()(),a(9,"button",11),m("click",function(){_(e);let o=p();return b(o.enableOneVsMany())}),a(10,"span"),d(11,"Team vs Many"),l()(),a(12,"button",11),m("click",function(){_(e);let o=p();return b(o.enableManyVsOne())}),a(13,"span"),d(14,"Many vs Team"),l()(),a(15,"button",11),m("click",function(){_(e);let o=p();return b(o.enableSpeedCalculator())}),a(16,"span"),d(17,"Speed Calc"),l()(),a(18,"button",11),m("click",function(){_(e);let o=p();return b(o.enableProbabilityCalc())}),a(19,"span"),d(20,"Probability Calc"),l()(),a(21,"button",11),m("click",function(){_(e);let o=p();return b(o.enableTypeCalculator())}),a(22,"span"),d(23,"Type Calc"),l()(),a(24,"button",11),m("click",function(){_(e);let o=p();return b(o.enableHowToUse())}),a(25,"span"),d(26,"How to use"),l()(),f(27,"mat-divider"),a(28,"span",10),d(29,"Game"),l(),a(30,"mat-button-toggle-group",12),m("change",function(o){_(e);let r=p();return b(r.onGameChange(o))}),a(31,"mat-button-toggle",13),d(32,"SV"),l(),a(33,"mat-button-toggle",14),d(34,"Champions"),l()(),f(35,"mat-divider"),a(36,"span",10),d(37,"Themes"),l(),le(38,Co,6,9,"div",15,yi),f(40,"mat-divider"),a(41,"span",10),d(42,"Colors"),l(),le(43,Mo,6,9,"div",15,yi),f(45,"mat-divider"),a(46,"button",16),m("click",function(){_(e);let o=p();return b(o.shareCalcs())}),d(47,"Share your calcs"),l(),a(48,"a",17),f(49,"img",18),l()()()}if(i&2){let e=p();u(),A("no-footer",!e.hasFooter()),u(2),R(e.pwaInstall.canInstall()?3:-1),u(3),h("ngClass",N(11,L,e.menuStore.oneVsOneActivated(),e.pressedItemId()==="1v1")),u(3),h("ngClass",N(14,L,e.menuStore.oneVsManyActivated(),e.pressedItemId()==="1vMany")),u(3),h("ngClass",N(17,L,e.menuStore.manyVsOneActivated(),e.pressedItemId()==="Manyv1")),u(3),h("ngClass",N(20,L,e.menuStore.speedCalculatorActivated(),e.pressedItemId()==="speed")),u(3),h("ngClass",N(23,L,e.menuStore.probabilityCalcActivated(),e.pressedItemId()==="probability")),u(3),h("ngClass",N(26,L,e.menuStore.typeCalcActivated(),e.pressedItemId()==="type")),u(3),h("ngClass",N(29,L,e.menuStore.howToUseActivated(),e.pressedItemId()==="howToUse")),u(6),h("value",e.store.game()),u(8),ce(e.themeService.getThemes()),u(5),ce(e.themeService.getColors())}}var da=(()=>{class i{constructor(){this.store=c(Qe),this.menuStore=c(Xe),this.themeService=c(ot),this.activeFieldService=c(Ke),this.pwaInstall=c(vi),this.snackBar=c(it),this.router=c(qe),this.menuOpen=y(!1),this.pressedItemId=y(null),this.hasFooter=H(()=>this.menuStore.oneVsManyActivated()||this.menuStore.manyVsOneActivated()||this.menuStore.probabilityCalcActivated()||this.menuStore.typeCalcActivated()),He(()=>{typeof document>"u"||(this.menuOpen()?document.body.classList.add("menu-open"):document.body.classList.remove("menu-open"))})}ngOnDestroy(){typeof document>"u"||document.body.classList.remove("menu-open")}toggleMenu(){this.menuOpen.set(!this.menuOpen())}closeMenu(){this.menuOpen.set(!1)}updateMenuWithFeedback(e,n,o=!0){this.pressedItemId.set(e),setTimeout(()=>{n(),o&&this.closeMenu(),this.pressedItemId.set(null)},0)}enableOneVsOne(){this.updateMenuWithFeedback("1v1",()=>{this.router.navigate(["one-vs-one"]),this.store.updateSecondAttacker("")})}enableOneVsMany(){this.updateMenuWithFeedback("1vMany",()=>this.router.navigate(["team-vs-many"]))}enableManyVsOne(){this.updateMenuWithFeedback("Manyv1",()=>{this.router.navigate(["many-vs-team"]),this.store.updateSecondAttacker("")})}enableSpeedCalculator(){this.updateMenuWithFeedback("speed",()=>this.router.navigate(["speed-calc"]))}enableProbabilityCalc(){this.updateMenuWithFeedback("probability",()=>this.router.navigate(["probability-calc"]))}enableTypeCalculator(){this.updateMenuWithFeedback("type",()=>this.router.navigate(["type-calc"]))}enableHowToUse(){this.updateMenuWithFeedback("howToUse",()=>this.router.navigate(["how-to-use"]))}setTheme(e){this.updateMenuWithFeedback(`theme-${e}`,()=>this.themeService.setTheme(e),!1)}setColor(e){this.updateMenuWithFeedback(`color-${e}`,()=>this.themeService.setColor(e),!1)}async shareCalcs(){let e=Ye(),n=this.activeFieldService.activeStore(),o=typeof n?.field=="function"?n.field():null,r=x(v({},this.store.buildUserData()),{field:o?v({},o):null});fetch(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${e}`,{method:"PUT",body:JSON.stringify(r)});let s=`https://vgcmulticalc.com/data/${e}`;if(navigator.share)try{await navigator.share({title:"VGC Multi Calc",url:s});return}catch{}try{await navigator.clipboard.writeText(s),this.snackBar.open("Link copied to clipboard!")}catch{this.snackBar.open(s)}}onGameChange(e){this.store.updateGame(e.value)}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275cmp=V({type:i,selectors:[["app-header-mobile"]],decls:11,vars:1,consts:[[1,"header"],[1,"left-header"],["src","assets/icons/slowking.png","width","96","height","96",1,"slowking-icon"],["src","assets/icons/calc-72x72.png","width","72","height","72",1,"icon"],[1,"title"],[1,"right-header"],["mat-icon-button","",1,"menu-icon",3,"click"],[1,"menu-overlay",3,"click"],[1,"menu-panel"],[1,"menu-content"],[1,"menu-title"],[1,"menu-item-button",3,"click","ngClass"],[1,"game-toggle",3,"change","value"],["value","sv"],["value","champions"],[1,"menu-item",3,"ngClass"],[1,"share-button",3,"click"],["href","https://ko-fi.com/B0B2VFTC3","target","_blank",1,"kofi-link"],["src","assets/icons/kofi.png","alt","Buy Me a Coffee at ko-fi.com","width","580","height","146","loading","lazy"],[1,"menu-item",3,"click","ngClass"],[1,"pokemon-image-container"],["width","192","height","200","loading","lazy",1,"pokemon-image",3,"src"]],template:function(n,o){n&1&&(a(0,"div",0)(1,"div",1),f(2,"img",2)(3,"img",3),a(4,"h1",4),d(5,"VGC Multi Calc"),l()(),a(6,"div",5)(7,"button",6),m("click",function(){return o.toggleMenu()}),a(8,"mat-icon"),d(9,"menu"),l()()()(),P(10,ko,50,32)),n&2&&(u(10),R(o.menuOpen()?10:-1))},dependencies:[ze,On,pe,Re,ye,Mt,$e],styles:[".header[_ngcontent-%COMP%]{height:4em;position:sticky;top:0;z-index:110;background-color:var(--background);transition:background-color .3s ease,color .3s ease,border-color .3s ease;display:flex;justify-content:space-between;border-bottom:1px;border-color:var(--background);border-width:1px;border-style:solid;padding-left:2.5em;padding-right:0;margin-bottom:0;margin-left:-2.5em}.left-header[_ngcontent-%COMP%]{display:flex;align-items:center}.right-header[_ngcontent-%COMP%]{display:flex;align-items:center;column-gap:1em;margin-right:1.5em}.slowking-icon[_ngcontent-%COMP%]{height:4em;width:auto}.icon[_ngcontent-%COMP%]{height:2.5em;width:auto}.title[_ngcontent-%COMP%]{font-size:clamp(12px,2vh,18px);font-weight:500;margin:0 0 0 1em}.menu-icon[_ngcontent-%COMP%]{height:1.5em;font-size:1em;vertical-align:middle;background:none;border:0}.menu-panel[_ngcontent-%COMP%]{position:fixed;inset:4em 0 0 auto;width:15em;background-color:var(--background);z-index:100;overflow-y:auto;border-left:1px solid var(--widget-border);border-bottom:1px solid var(--widget-border);animation:_ngcontent-%COMP%_slideRight .2s ease}.menu-panel.no-footer[_ngcontent-%COMP%]{bottom:0}.menu-panel[_ngcontent-%COMP%]:not(.no-footer){bottom:4em}.menu-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background-color:#0006;z-index:95;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);animation:_ngcontent-%COMP%_fadeIn .2s ease}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}@keyframes _ngcontent-%COMP%_slideRight{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}.menu-content[_ngcontent-%COMP%]{padding:1em 1.5em;display:flex;flex-direction:column}.menu-title[_ngcontent-%COMP%]{display:block;font-size:clamp(12px,2vh,18px);font-weight:600;margin-top:1em;margin-bottom:.5em;opacity:.6;text-transform:uppercase;letter-spacing:.05em;font-size:.75em}.menu-title[_ngcontent-%COMP%]:first-child{margin-top:0}mat-divider[_ngcontent-%COMP%]{margin:.75em 0}.menu-item-button[_ngcontent-%COMP%]{display:flex;align-items:center;width:100%;padding:.85em 1em;background:none;border:none;border-radius:8px;cursor:pointer;font-size:1em;color:var(--text);text-align:left;transition:background-color .15s ease,color .15s ease}.menu-item-button[_ngcontent-%COMP%]:hover{background-color:var(--highlight);color:var(--highlight-contrast)}.active-menu-option[_ngcontent-%COMP%], .menu-item-button.pressed[_ngcontent-%COMP%], .menu-item-button[_ngcontent-%COMP%]:active{background-color:var(--highlight)!important;color:var(--highlight-contrast)!important;font-weight:500}.menu-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1em;padding:.45em 1em;border-radius:8px;margin-bottom:.25em;cursor:pointer;transition:background-color .15s ease,color .15s ease}.menu-item[_ngcontent-%COMP%]:hover{background-color:var(--highlight);color:var(--highlight-contrast)}.game-toggle[_ngcontent-%COMP%]{width:100%}.game-toggle[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{flex:1}.pokemon-image-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:2.5em;padding:0}.pokemon-image[_ngcontent-%COMP%]{height:1.8em;width:auto}.share-button[_ngcontent-%COMP%]{width:100%;padding:.85em 1em;background-color:var(--primary);color:var(--primary-contrast);border:none;border-radius:8px;cursor:pointer;font-size:1em;font-weight:500;margin-top:.5em;transition:opacity .15s ease}.share-button[_ngcontent-%COMP%]:hover{opacity:.85}.kofi-link[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:1.5em}.kofi-link[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:2.2em;width:auto;border:0}.share-link[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75em;margin-top:.75em}"]})}}return i})();var Do=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],wo=["mat-icon, [matMenuItemIcon]","*"];function Vo(i,t){i&1&&(sn(),a(0,"svg",2),f(1,"polygon",3),l())}var So=["*"];function Eo(i,t){if(i&1){let e=T();It(0,"div",0),yn("click",function(){_(e);let o=p();return b(o.closed.emit("click"))})("animationstart",function(o){_(e);let r=p();return b(r._onAnimationStart(o.animationName))})("animationend",function(o){_(e);let r=p();return b(r._onAnimationDone(o.animationName))})("animationcancel",function(o){_(e);let r=p();return b(r._onAnimationDone(o.animationName))}),It(1,"div",1),ue(2),bn()()}if(i&2){let e=p();Cn(e._classList),A("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),vn("id",e.panelId),E("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var Zt=new D("MAT_MENU_PANEL"),Kt=(()=>{class i{_elementRef=c(j);_document=c(ln);_focusMonitor=c(Ee);_parentMenu=c(Zt,{optional:!0});_changeDetectorRef=c(B);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new U;_focused=new U;_highlighted=!1;_triggersSubmenu=!1;constructor(){c(Ze).load(nt),this._parentMenu?.addItem?.(this)}focus(e,n){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,n):this._getHostElement().focus(n),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),n=e.querySelectorAll("mat-icon, .material-icons");for(let o=0;o<n.length;o++)n[o].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=V({type:i,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(n,o){n&1&&m("click",function(s){return o._checkDisabled(s)})("mouseenter",function(){return o._handleMouseEnter()}),n&2&&(E("role",o.role)("tabindex",o._getTabIndex())("aria-disabled",o.disabled)("disabled",o.disabled||null),A("mat-mdc-menu-item-highlighted",o._highlighted)("mat-mdc-menu-item-submenu-trigger",o._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",M],disableRipple:[2,"disableRipple","disableRipple",M]},exportAs:["matMenuItem"],ngContentSelectors:wo,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(n,o){n&1&&(Ve(Do),ue(0),a(1,"span",0),ue(2,1),l(),f(3,"div",1),P(4,Vo,2,0,":svg:svg",2)),n&2&&(u(3),h("matRippleDisabled",o.disableRipple||o.disabled)("matRippleTrigger",o._getHostElement()),u(),R(o._triggersSubmenu?4:-1))},dependencies:[tt],encapsulation:2})}return i})();var Ao=new D("MatMenuContent");var Io=new D("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),Qt="_mat-menu-enter",kt="_mat-menu-exit",Me=(()=>{class i{_elementRef=c(j);_changeDetectorRef=c(B);_injector=c(K);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=oe();_allItems;_directDescendantItems=new mn;_classList={};_panelAnimationState="void";_animationDone=new U;_isAnimating=y(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;get panelClass(){return this._previousPanelClass}set panelClass(e){let n=this._previousPanelClass,o=v({},this._classList);n&&n.length&&n.split(" ").forEach(r=>{o[r]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(r=>{o[r]=!0}),this._elementRef.nativeElement.className=""),this._classList=o}_previousPanelClass="";get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new w;close=this.closed;panelId=c(Se).getId("mat-menu-panel-");constructor(){let e=c(Io);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Tn(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Be(this._directDescendantItems),Vt(e=>Ne(...e.map(n=>n._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let n=this._keyManager;if(this._panelAnimationState==="enter"&&n.activeItem?._hasFocus()){let o=e.toArray(),r=Math.max(0,Math.min(o.length-1,n.activeItemIndex||0));o[r]&&!o[r].disabled?n.setActiveItem(r):n.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(Be(this._directDescendantItems),Vt(n=>Ne(...n.map(o=>o._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let n=e.keyCode,o=this._keyManager;switch(n){case 27:et(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(n===38||n===40)&&o.setFocusOrigin("keyboard"),o.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Et(()=>{let n=this._resolvePanel();if(!n||!n.contains(document.activeElement)){let o=this._keyManager;o.setFocusOrigin(e).setFirstItemActive(),!o.activeItem&&n&&n.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,n=this.yPosition){this._classList=x(v({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":n==="above","mat-menu-below":n==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let n=e===kt;(n||e===Qt)&&(n&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(n?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===Qt||e===kt)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let n=this._resolvePanel();n&&(n.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(kt),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?Qt:kt)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(Be(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(n=>n._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=V({type:i,selectors:[["mat-menu"]],contentQueries:function(n,o,r){if(n&1&&Le(r,Ao,5)(r,Kt,5)(r,Kt,4),n&2){let s;$(s=q())&&(o.lazyContent=s.first),$(s=q())&&(o._allItems=s),$(s=q())&&(o.items=s)}},viewQuery:function(n,o){if(n&1&&Ue(hn,5),n&2){let r;$(r=q())&&(o.templateRef=r.first)}},hostVars:3,hostBindings:function(n,o){n&2&&E("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",M],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:M(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[I([{provide:Zt,useExisting:i}])],ngContentSelectors:So,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(n,o){n&1&&(Ve(),_n(0,Eo,3,12,"ng-template"))},styles:[`mat-menu {
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
`],encapsulation:2})}return i})(),Fo=new D("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let i=c(K);return()=>Vn(i)}});var Ce=new WeakMap,To=(()=>{class i{_canHaveBackdrop;_element=c(j);_viewContainerRef=c(gn);_menuItemInstance=c(Kt,{optional:!0,self:!0});_dir=c(Je,{optional:!0});_focusMonitor=c(Ee);_ngZone=c(un);_injector=c(K);_scrollStrategy=c(Fo);_changeDetectorRef=c(B);_animationsDisabled=oe();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=se.EMPTY;_menuCloseSubscription=se.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e?(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(n=>{this._destroyMenu(n),(n==="click"||n==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(n)})):this._destroyMenu(),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let n=c(Zt,{optional:!0});this._parentMaterialMenu=n instanceof Me?n:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Ce.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let n=this._menu;if(this._menuOpen||!n)return;this._pendingRemoval?.unsubscribe();let o=Ce.get(n);Ce.set(n,this),o&&o!==this&&o._closeMenu();let r=this._createOverlay(n),s=r.getConfig(),k=s.positionStrategy;this._setPosition(n,k),this._canHaveBackdrop?s.hasBackdrop=n.hasBackdrop==null?!this._triggersSubmenu():n.hasBackdrop:s.hasBackdrop=n.hasBackdrop??!1,r.hasAttached()||(r.attach(this._getPortal(n)),n.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),n.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,n.direction=this.dir,e&&n.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),n instanceof Me&&(n._setIsOpen(!0),n._directDescendantItems.changes.pipe(an(n.close)).subscribe(()=>{k.withLockedPosition(!1).reapplyLastPosition(),k.withLockedPosition(!0)}))}focus(e,n){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,n):this._element.nativeElement.focus(n)}_destroyMenu(e){let n=this._overlayRef,o=this._menu;!n||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),o instanceof Me&&this._ownsMenu(o)?(this._pendingRemoval=o._animationDone.pipe(rn(1)).subscribe(()=>{n.detach(),Ce.has(o)||o.lazyContent?.detach()}),o._setIsOpen(!1)):(n.detach(),o?.lazyContent?.detach()),o&&this._ownsMenu(o)&&Ce.delete(o),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let n=this._getOverlayConfig(e);this._subscribeToPositions(e,n.positionStrategy),this._overlayRef=An(this._injector,n),this._overlayRef.keydownEvents().subscribe(o=>{this._menu instanceof Me&&this._menu._handleKeydown(o)})}return this._overlayRef}_getOverlayConfig(e){return new Sn({positionStrategy:En(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,n){e.setPositionClasses&&n.positionChanges.subscribe(o=>{this._ngZone.run(()=>{let r=o.connectionPair.overlayX==="start"?"after":"before",s=o.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(r,s)})})}_setPosition(e,n){let[o,r]=e.xPosition==="before"?["end","start"]:["start","end"],[s,k]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[Q,xe]=[s,k],[xt,Dt]=[o,r],De=0;if(this._triggersSubmenu()){if(Dt=o=e.xPosition==="before"?"start":"end",r=xt=o==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let Jt=this._parentMaterialMenu.items.first;this._parentInnerPadding=Jt?Jt._getHostElement().offsetTop:0}De=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(Q=s==="top"?"bottom":"top",xe=k==="top"?"bottom":"top");n.withPositions([{originX:o,originY:Q,overlayX:xt,overlayY:s,offsetY:De},{originX:r,originY:Q,overlayX:Dt,overlayY:s,offsetY:De},{originX:o,originY:xe,overlayX:xt,overlayY:k,offsetY:-De},{originX:r,originY:xe,overlayX:Dt,overlayY:k,offsetY:-De}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),n=this._overlayRef.detachments(),o=this._parentMaterialMenu?this._parentMaterialMenu.closed:wt(),r=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(on(s=>this._menuOpen&&s!==this._menuItemInstance)):wt();return Ne(e,o,r,n)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new wn(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Ce.get(e)===this}_triggerIsAriaDisabled(){return M(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(n){pn()};static \u0275dir=C({type:i})}return i})(),Ci=(()=>{class i extends To{_cleanupTouchstart;_hoverSubscription=se.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new w;onMenuOpen=this.menuOpened;menuClosed=new w;onMenuClose=this.menuClosed;constructor(){super(!0);let e=c(ee);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",n=>{Fn(n)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){In(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let n=e.keyCode;(n===13||n===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(n===39&&this.dir==="ltr"||n===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(n){return new(n||i)};static \u0275dir=C({type:i,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(n,o){n&1&&m("click",function(s){return o._handleClick(s)})("mousedown",function(s){return o._handleMousedown(s)})("keydown",function(s){return o._handleKeydown(s)}),n&2&&E("aria-haspopup",o.menu?"menu":null)("aria-expanded",o.menuOpen)("aria-controls",o.menuOpen?o.menu?.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[S]})}return i})();function Oo(i,t){i&1&&(a(0,"mat-icon"),d(1,"check"),l())}function Po(i,t){if(i&1){let e=T();a(0,"mat-icon",1),m("click",function(){_(e);let o=p();return b(o.copyDamageResult())}),d(1,"content_copy"),l()}}var Mi=(()=>{class i{constructor(){this.value=kn.required(),this.copyMessageEnabled=y(!1)}copyDamageResult(){this.copyMessageEnabled.set(!0),navigator.clipboard.writeText(this.value()),setTimeout(()=>{this.copyMessageEnabled.set(!1)},2e3)}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275cmp=V({type:i,selectors:[["app-copy-button"]],inputs:{value:[1,"value"]},decls:2,vars:1,consts:[[1,"copy-button"],[1,"copy-button",3,"click"]],template:function(n,o){n&1&&P(0,Oo,2,0,"mat-icon")(1,Po,2,0,"mat-icon",0),n&2&&R(o.copyMessageEnabled()?0:1)},dependencies:[pe],styles:[".copy-button[_ngcontent-%COMP%]{cursor:pointer}"]})}}return i})();var Ro=()=>["/one-vs-one"],ke=i=>({"active-menu-option":i}),No=()=>["/team-vs-many"],Bo=()=>["/many-vs-team"],Go=()=>["/speed-calc"],jo=()=>["/probability-calc"],Ho=()=>["/type-calc"],ki=(i,t)=>t.name;function Lo(i,t){if(i&1&&(f(0,"app-copy-button",28),a(1,"a",29),d(2,"Link"),l()),i&2){let e=p();h("value",e.userDataLink),u(),h("href",e.userDataLink,J)}}function Uo(i,t){if(i&1){let e=T();a(0,"div",30),m("click",function(){let o=_(e).$implicit,r=p();return b(r.themeService.setTheme(o.name))}),a(1,"div",31),f(2,"img",32),l(),a(3,"span"),d(4),me(5,"titlecase"),l()()}if(i&2){let e=t.$implicit;u(2),h("src",de("assets/sprites/menu/",e.pokemon,".webp"),J),u(2),te(he(5,3,e.name))}}function Wo(i,t){if(i&1){let e=T();a(0,"div",30),m("click",function(){let o=_(e).$implicit,r=p();return b(r.themeService.setColor(o.name))}),a(1,"div",31),f(2,"img",32),l(),a(3,"span"),d(4),me(5,"titlecase"),l()()}if(i&2){let e=t.$implicit;u(2),h("src",de("assets/sprites/menu/",e.pokemon,".webp"),J),u(2),te(he(5,3,e.name))}}var cs=(()=>{class i{constructor(){this.store=c(Qe),this.activeFieldService=c(Ke),this.menuStore=c(Xe),this.themeService=c(ot),this.snackBar=c(it),this.router=c(qe)}uploadData(){let e=Ye(),n=this.activeFieldService.activeStore(),o=typeof n?.field=="function"?n.field():null,r=x(v({},this.store.buildUserData()),{field:o?v({},o):null});fetch(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${e}`,{method:"PUT",body:JSON.stringify(r)}),this.userDataLink=`https://vgcmulticalc.com/data/${e}`,this.snackBar.open("Your calc link has been created!")}copyUserDataLink(){navigator.clipboard.writeText(this.userDataLink)}onOneVsOneClick(){this.store.updateSecondAttacker("")}onManyVsTeamClick(){this.store.updateSecondAttacker("")}enableHowToUse(){this.router.navigate(["how-to-use"])}onGameChange(e){this.store.updateGame(e.value)}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275cmp=V({type:i,selectors:[["app-header"]],decls:56,vars:34,consts:[["themeMenu","matMenu"],[1,"header"],[1,"left-header"],["src","assets/icons/slowking.png","width","96","height","96",1,"slowking-icon"],["src","assets/icons/calc-72x72.png","width","72","height","72",1,"icon"],[1,"title"],[1,"menu"],["data-cy","one-vs-one",1,"menu-option",3,"click","routerLink","ngClass"],["data-cy","team-vs-many",1,"menu-option",3,"routerLink","ngClass"],["data-cy","many-vs-team",1,"menu-option",3,"click","routerLink","ngClass"],["data-cy","speed-calculator",1,"menu-option",3,"routerLink","ngClass"],["data-cy","probability-calc",1,"menu-option",3,"routerLink","ngClass"],["data-cy","type-calc",1,"menu-option",3,"routerLink","ngClass"],[1,"right-header"],[3,"change","value"],["value","sv"],["value","champions"],["mat-flat-button","","color","link",3,"click"],["target","_blank","href","https://twitter.com/rluizv"],["src","assets/icons/twitter.png","width","25","height","25",1,"icon"],["target","_blank","href","https://github.com/robsonbittencourt/vgc-multicalc"],["src","assets/icons/github.png","width","30","height","30",1,"icon"],["href","https://ko-fi.com/B0B2VFTC3","target","_blank"],["src","assets/icons/kofi.png","border","0","alt","Buy Me a Coffee at ko-fi.com",2,"border","0px","margin-top","0.2em","height","2.2em"],[3,"matMenuTriggerFor"],[1,"menu-content"],[1,"menu-title"],[1,"menu-item"],[3,"value"],["target","_blank",3,"href"],[1,"menu-item",3,"click"],[1,"pokemon-image-container"],["width","192","height","200","loading","lazy",1,"pokemon-image",3,"src"]],template:function(n,o){if(n&1&&(a(0,"div",1)(1,"div",2),f(2,"img",3)(3,"img",4),a(4,"h1",5),d(5,"VGC Multi Calc"),l(),a(6,"nav",6)(7,"a",7),m("click",function(){return o.onOneVsOneClick()}),a(8,"span"),d(9,"One vs One"),l()(),a(10,"a",8)(11,"span"),d(12,"Team vs Many"),l()(),a(13,"a",9),m("click",function(){return o.onManyVsTeamClick()}),a(14,"span"),d(15,"Many vs Team"),l()(),a(16,"a",10)(17,"span"),d(18,"Speed Calc"),l()(),a(19,"a",11)(20,"span"),d(21,"Probability Calc"),l()(),a(22,"a",12)(23,"span"),d(24,"Type Calc"),l()()()(),a(25,"div",13),P(26,Lo,3,2),a(27,"mat-button-toggle-group",14),m("change",function(s){return o.onGameChange(s)}),a(28,"mat-button-toggle",15),d(29,"SV"),l(),a(30,"mat-button-toggle",16),d(31,"Champions"),l()(),a(32,"button",17),m("click",function(){return o.uploadData()}),d(33,"Share your calcs"),l(),a(34,"button",17),m("click",function(){return o.enableHowToUse()}),d(35,"How to use"),l(),a(36,"a",18),f(37,"img",19),l(),a(38,"a",20),f(39,"img",21),l(),a(40,"a",22),f(41,"img",23),l(),a(42,"mat-icon",24),d(43),l(),a(44,"mat-menu",null,0)(46,"div",25)(47,"span",26),d(48,"Themes"),l(),le(49,Uo,6,5,"div",27,ki),f(51,"mat-divider"),a(52,"span",26),d(53,"Colors"),l(),le(54,Wo,6,5,"div",27,ki),l()()()()),n&2){let r=We(45);u(7),h("routerLink",ne(16,Ro))("ngClass",ie(17,ke,o.menuStore.oneVsOneActivated())),u(3),h("routerLink",ne(19,No))("ngClass",ie(20,ke,o.menuStore.oneVsManyActivated())),u(3),h("routerLink",ne(22,Bo))("ngClass",ie(23,ke,o.menuStore.manyVsOneActivated())),u(3),h("routerLink",ne(25,Go))("ngClass",ie(26,ke,o.menuStore.speedCalculatorActivated())),u(3),h("routerLink",ne(28,jo))("ngClass",ie(29,ke,o.menuStore.probabilityCalcActivated())),u(3),h("routerLink",ne(31,Ho))("ngClass",ie(32,ke,o.menuStore.typeCalcActivated())),u(4),R(o.userDataLink?26:-1),u(),h("value",o.store.game()),u(15),h("matMenuTriggerFor",r),u(),te(o.themeService.selectedTheme().icon),u(6),ce(o.themeService.getThemes()),u(5),ce(o.themeService.getColors())}},dependencies:[ze,pe,Rn,Re,ye,Me,Ci,Mt,Mi,Dn,$e],styles:[".header[_ngcontent-%COMP%]{background-color:var(--widget-background);transition:background-color .3s ease,color .3s ease,border-color .3s ease;display:flex;justify-content:space-between;border-bottom:1px;border-color:var(--widget-background);border-width:1px;border-style:solid;padding-left:2.5em;padding-right:2.5em;box-shadow:0 2px 4px #0000001a}.left-header[_ngcontent-%COMP%]{display:flex;align-items:center}.right-header[_ngcontent-%COMP%]{display:flex;align-items:center;column-gap:1em}.slowking-icon[_ngcontent-%COMP%]{width:3.5em;height:auto}.icon[_ngcontent-%COMP%]{width:2em;height:auto}.title[_ngcontent-%COMP%]{color:var(--text-strong);font-weight:500;font-size:1rem;margin:0 0 0 1em}.menu[_ngcontent-%COMP%]{display:flex;align-items:center;column-gap:2em;margin-left:2em;height:75%}.menu-content[_ngcontent-%COMP%]{width:50em}.menu-option[_ngcontent-%COMP%]{display:flex;padding:.5em;align-items:center;height:75%;color:inherit;text-decoration:none}.menu-option[_ngcontent-%COMP%]:hover{cursor:pointer;font-weight:500}.active-menu-option[_ngcontent-%COMP%]{color:var(--primary-contrast);background-color:var(--primary)}.menu-title[_ngcontent-%COMP%]{font-size:clamp(12px,2vh,18px);margin-left:1em}.menu-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1em;padding-left:1em}.menu-item[_ngcontent-%COMP%]:hover{background-color:var(--highlight);color:var(--highlight-contrast)}.pokemon-image-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:4em;padding:.5em}.pokemon-image[_ngcontent-%COMP%]{height:3em;width:auto}"]})}}return i})();var ps=(()=>{class i{constructor(){this.largeWidthResolution=1280,this.largeScreen=y(typeof window<"u"&&window.innerWidth>=this.largeWidthResolution),this.isDesktop=()=>this.largeScreen(),!(typeof window>"u")&&window.addEventListener("resize",()=>{this.largeScreen.set(window.innerWidth>=this.largeWidthResolution)})}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275prov=je({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{be as a,zn as b,ae as c,Pt as d,Ui as e,zi as f,X as g,pr as h,oo as i,hi as j,so as k,co as l,ho as m,go as n,fr as o,_r as p,Ae as q,xi as r,fi as s,Re as t,ye as u,Lr as v,Mi as w,da as x,cs as y,ps as z};
