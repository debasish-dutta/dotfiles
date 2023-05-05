"use strict";exports.id=164,exports.ids=[164],exports.modules={67164:(e,n,t)=>{t.r(n),t.d(n,{AppInsightsCore:()=>V,BaseCore:()=>B,BaseTelemetryPlugin:()=>A.i,CoreUtils:()=>D.Tr,DiagnosticLogger:()=>v.AQ,ESPromise:()=>U,ESPromiseScheduler:()=>K,EventHelper:()=>X.zB,EventLatency:()=>s,EventPersistence:()=>f,EventPropertyType:()=>c,EventsDiscardedReason:()=>G.h,FullVersionString:()=>D.vs,InternalAppInsightsCore:()=>z,InternalBaseCore:()=>k,LoggingSeverity:()=>a,MinChannelPriorty:()=>q,NotificationManager:()=>N,PerfEvent:()=>m.zn,PerfManager:()=>m.Jk,ProcessTelemetryContext:()=>S.Vi,TraceLevel:()=>d,Undefined:()=>ee.jA,Utils:()=>D.cQ,ValueKind:()=>u,ValueSanitizer:()=>Z,Version:()=>D.Gf,_ExtendedInternalMessageId:()=>g,_InternalLogMessage:()=>v.lQ,_InternalMessageId:()=>l,__getRegisteredEvents:()=>Y.um,_throwInternal:()=>v.kP,addEventHandler:()=>Y.Ib,addEventListeners:()=>Y.yw,addPageHideEventListener:()=>Y.TJ,addPageShowEventListener:()=>Y.nD,addPageUnloadEventListener:()=>Y.c9,areCookiesSupported:()=>P.p7,arrForEach:()=>o.tO,arrIndexOf:()=>o.UA,arrMap:()=>o.Mr,arrReduce:()=>o.Xz,attachEvent:()=>Y.pZ,cookieAvailable:()=>P.p7,createCookieMgr:()=>P.Nz,createEnumStyle:()=>r.By,createGuid:()=>D.cm,createProcessTelemetryContext:()=>S.CD,createTraceParent:()=>ne.SU,createUniqueNamespace:()=>b.J,createUnloadHandlerContainer:()=>O.Y,dateNow:()=>o.m6,deleteCookie:()=>D.kT,detachEvent:()=>Y.pD,disableCookies:()=>D.oF,disallowsSameSiteNone:()=>P.UY,doPerf:()=>m.Lm,dumpObj:()=>p.eU,eventOff:()=>Y.QY,eventOn:()=>Y.XO,extend:()=>D.l7,findW3cTraceParent:()=>ne.lq,formatTraceParent:()=>ne.aR,generateW3CId:()=>X.DO,getCommonSchemaMetaData:()=>D.Vv,getConsole:()=>p.dr,getCookie:()=>D.ej,getCookieValue:()=>D.Do,getCrypto:()=>p.MX,getDocument:()=>p.Me,getExceptionName:()=>o.jj,getFieldValueType:()=>D.Sy,getGlobal:()=>h.Rd,getGlobalInst:()=>p.a8,getHistory:()=>p.s1,getIEVersion:()=>p.sA,getISOString:()=>o.Y6,getJSON:()=>p.xA,getLocation:()=>p.k$,getMsCrypto:()=>p.gz,getNavigator:()=>p.jW,getPerformance:()=>p.r,getSetValue:()=>o.qK,getTenantId:()=>D.jM,getTime:()=>D.hK,getWindow:()=>p.Jj,hasDocument:()=>p.Nv,hasHistory:()=>p.fE,hasJSON:()=>p.nS,hasNavigator:()=>p.d6,hasOwnProperty:()=>o.nr,hasWindow:()=>p.Ym,isArray:()=>o.kJ,isArrayValid:()=>D.JT,isBeaconsSupported:()=>p.MF,isBoolean:()=>o.jn,isChromium:()=>D.mJ,isDate:()=>o.J_,isDocumentObjectAvailable:()=>D.x9,isError:()=>o.VZ,isFetchSupported:()=>p.JO,isFunction:()=>o.mf,isIE:()=>p.w1,isLatency:()=>D.r7,isNotTruthy:()=>o.F,isNullOrUndefined:()=>o.le,isNumber:()=>o.hj,isObject:()=>o.Kn,isReactNative:()=>p.b$,isSampledFlag:()=>ne.Pn,isString:()=>o.HD,isTruthy:()=>o.fQ,isTypeof:()=>o.Ym,isUint8ArrayAvailable:()=>D.IZ,isUndefined:()=>o.o8,isValidSpanId:()=>ne.Lc,isValidTraceId:()=>ne.jN,isValidTraceParent:()=>ne.J6,isValueAssigned:()=>D.Sn,isValueKind:()=>D.oS,isWindowObjectAvailable:()=>D.dH,isXhrSupported:()=>p.Z3,mergeEvtNamespace:()=>Y.jU,newGuid:()=>X.GW,newId:()=>$.pZ,normalizeJsName:()=>o.Gf,objCreate:()=>h.pu,objDefineAccessors:()=>o.l_,objForEachKey:()=>o.rW,objFreeze:()=>o.FL,objKeys:()=>o.FY,objSeal:()=>o.Xi,openXhr:()=>D.ot,optimizeObject:()=>o.Ax,parseTraceParent:()=>ne.j_,perfNow:()=>X.Jj,proxyAssign:()=>o.cf,proxyFunctionAs:()=>o.Oi,proxyFunctions:()=>o.Vb,random32:()=>$._l,randomValue:()=>$.az,removeEventHandler:()=>Y.C1,removeEventListeners:()=>Y.nJ,removePageHideEventListener:()=>Y.C9,removePageShowEventListener:()=>Y.Yl,removePageUnloadEventListener:()=>Y.JA,safeGetCookieMgr:()=>P.JP,safeGetLogger:()=>v.vH,sanitizeProperty:()=>D.yj,setCookie:()=>D.d8,setEnableEnvMocks:()=>p.dI,setProcessTelemetryTimings:()=>D.if,setValue:()=>o.sO,strContains:()=>o._Q,strEndsWith:()=>o.Id,strFunction:()=>ee.cb,strObject:()=>ee.fK,strPrototype:()=>ee.hB,strStartsWith:()=>o.xe,strTrim:()=>o.nd,strUndefined:()=>ee.jA,throwError:()=>o._y,toISOString:()=>o.Y6,useXDomainRequest:()=>p.cp});var i=t(27421),r=t(50951),o=t(24869),a=(0,r.By)({CRITICAL:1,WARNING:2}),l=(0,r.By)({BrowserDoesNotSupportLocalStorage:0,BrowserCannotReadLocalStorage:1,BrowserCannotReadSessionStorage:2,BrowserCannotWriteLocalStorage:3,BrowserCannotWriteSessionStorage:4,BrowserFailedRemovalFromLocalStorage:5,BrowserFailedRemovalFromSessionStorage:6,CannotSendEmptyTelemetry:7,ClientPerformanceMathError:8,ErrorParsingAISessionCookie:9,ErrorPVCalc:10,ExceptionWhileLoggingError:11,FailedAddingTelemetryToBuffer:12,FailedMonitorAjaxAbort:13,FailedMonitorAjaxDur:14,FailedMonitorAjaxOpen:15,FailedMonitorAjaxRSC:16,FailedMonitorAjaxSend:17,FailedMonitorAjaxGetCorrelationHeader:18,FailedToAddHandlerForOnBeforeUnload:19,FailedToSendQueuedTelemetry:20,FailedToReportDataLoss:21,FlushFailed:22,MessageLimitPerPVExceeded:23,MissingRequiredFieldSpecification:24,NavigationTimingNotSupported:25,OnError:26,SessionRenewalDateIsZero:27,SenderNotInitialized:28,StartTrackEventFailed:29,StopTrackEventFailed:30,StartTrackFailed:31,StopTrackFailed:32,TelemetrySampledAndNotSent:33,TrackEventFailed:34,TrackExceptionFailed:35,TrackMetricFailed:36,TrackPVFailed:37,TrackPVFailedCalc:38,TrackTraceFailed:39,TransmissionFailed:40,FailedToSetStorageBuffer:41,FailedToRestoreStorageBuffer:42,InvalidBackendResponse:43,FailedToFixDepricatedValues:44,InvalidDurationValue:45,TelemetryEnvelopeInvalid:46,CreateEnvelopeError:47,CannotSerializeObject:48,CannotSerializeObjectNonSerializable:49,CircularReferenceDetected:50,ClearAuthContextFailed:51,ExceptionTruncated:52,IllegalCharsInName:53,ItemNotInArray:54,MaxAjaxPerPVExceeded:55,MessageTruncated:56,NameTooLong:57,SampleRateOutOfRange:58,SetAuthContextFailed:59,SetAuthContextFailedAccountName:60,StringValueTooLong:61,StartCalledMoreThanOnce:62,StopCalledWithoutStart:63,TelemetryInitializerFailed:64,TrackArgumentsNotSpecified:65,UrlTooLong:66,SessionStorageBufferFull:67,CannotAccessCookie:68,IdTooLong:69,InvalidEvent:70,FailedMonitorAjaxSetRequestHeader:71,SendBrowserInfoOnUserInit:72,PluginException:73,NotificationException:74,SnippetScriptLoadFailure:99,InvalidInstrumentationKey:100,CannotParseAiBlobValue:101,InvalidContentBlob:102,TrackPageActionEventFailed:103,FailedAddingCustomDefinedRequestContext:104,InMemoryStorageBufferFull:105,InstrumentationKeyDeprecation:106}),u=(0,r.By)({NotSet:0,Pii_DistinguishedName:1,Pii_GenericData:2,Pii_IPV4Address:3,Pii_IPv6Address:4,Pii_MailSubject:5,Pii_PhoneNumber:6,Pii_QueryString:7,Pii_SipAddress:8,Pii_SmtpAddress:9,Pii_Identity:10,Pii_Uri:11,Pii_Fqdn:12,Pii_IPV4AddressLegacy:13,CustomerContent_GenericContent:32}),s=(0,r.By)({Normal:1,CostDeferred:2,RealTime:3,Immediate:4}),c=(0,r.By)({Unspecified:0,String:1,Int32:2,UInt32:3,Int64:4,UInt64:5,Double:6,Bool:7,Guid:8,DateTime:9}),f=(0,r.By)({Normal:1,Critical:2}),d=(0,r.By)({NONE:0,ERROR:1,WARNING:2,INFORMATION:3}),g=(0,o.FL)((0,i.uc)((0,i.uc)({},l),(0,r.By)({AuthHandShakeError:501,AuthRedirectFail:502,BrowserCannotReadLocalStorage:503,BrowserCannotWriteLocalStorage:504,BrowserDoesNotSupportLocalStorage:505,CannotParseBiBlobValue:506,CannotParseDataAttribute:507,CVPluginNotAvailable:508,DroppedEvent:509,ErrorParsingAISessionCookie:510,ErrorProvidedChannels:511,FailedToGetCookies:512,FailedToInitializeCorrelationVector:513,FailedToInitializeSDK:514,InvalidContentBlob:515,InvalidCorrelationValue:516,SessionRenewalDateIsZero:517,SendPostOnCompleteFailure:518,PostResponseHandler:519,SDKNotInitialized:520}))),v=t(29339),m=t(81782),p=t(49251),h=t(30175),_=t(29141),S=t(31030),C=t(69031),P=t(88140),y=t(61733),E=t(28341),T=t(96335),I=500;function _addChannelQueue(e,n,t,i){n&&(0,o.kJ)(n)&&n.length>0&&(n=n.sort((function(e,n){return e.priority-n.priority})),(0,o.tO)(n,(function(e){e.priority<I&&(0,o._y)("Channel has invalid priority - "+e.identifier)})),e.push({queue:(0,o.FL)(n),chain:(0,S.jV)(n,t,i)}))}var A=t(87951),F=function(e){function TelemetryInitializerPlugin(){var n,t,i=e.call(this)||this;function _initDefaults(){n=0,t=[]}return i.identifier="TelemetryInitializerPlugin",i.priority=199,_initDefaults(),(0,_.Z)(TelemetryInitializerPlugin,i,(function(e,i){e.addTelemetryInitializer=function(e){var i={id:n++,fn:e};return t.push(i),{remove:function(){(0,o.tO)(t,(function(e,n){if(e.id===i.id)return t.splice(n,1),-1}))}}},e.processTelemetry=function(n,i){for(var r=!1,a=t.length,l=0;l<a;++l){var u=t[l];if(u)try{if(!1===u.fn.apply(null,[n])){r=!0;break}}catch(e){(0,v.kP)(i.diagLog(),1,64,"One of telemetry initializers failed, telemetry item will not be sent: "+(0,o.jj)(e),{exception:(0,p.eU)(e)},!0)}}r||e.processNext(n,i)},e[T.Ho]=function(){_initDefaults()}})),i}return(0,i.ne)(TelemetryInitializerPlugin,e),TelemetryInitializerPlugin}(A.i),b=t(87624),O=t(38593),w="Plugins must provide initialize method",x="SDK is still unloading...",L={loggingLevelConsole:1};function _createPerfManager(e,n){return new m.Jk(n)}function _isPluginPresent(e,n){var t=!1;return(0,o.tO)(n,(function(n){if(n===e)return t=!0,-1})),t}var k=function BaseCore(){var e,n,t,r,a,l,u,s,c,f,d,g,p,A,k,N,z,D,M,V=0;(0,_.Z)(BaseCore,this,(function(_){function _initDefaults(){e=!1,_.config=(0,o.mm)(!0,{},L),_.logger=new v.AQ(_.config),_._extensions=[],A=new F,n=[],t=null,r=null,a=null,l=null,u=null,c=null,s=[],f=null,d=null,g=null,p=!1,k=null,N=(0,b.J)("AIBaseCore",!0),z=(0,O.Y)(),M=null}function _createTelCtx(){return(0,S.CD)(_getPluginChain(),_.config,_)}function _initPluginChain(e,n){var t=function _validateExtensions(e,n,t){var i=[],r={};return(0,o.tO)(t,(function(t){((0,o.le)(t)||(0,o.le)(t.initialize))&&(0,o._y)(w);var a=t.priority,l=t.identifier;t&&a&&((0,o.le)(r[a])?r[a]=l:(0,v.jV)(e,"Two extensions have same priority #"+a+" - "+r[a]+", "+l)),(!a||a<n)&&i.push(t)})),{all:t,core:i}}(_.logger,I,s);c=t.core,u=null;var i=t.all;if(g=(0,o.FL)(function createChannelQueues(e,n,t,i){var r=[];if(e&&(0,o.tO)(e,(function(e){return _addChannelQueue(r,e,t,i)})),n){var a=[];(0,o.tO)(n,(function(e){e.priority>I&&a.push(e)})),_addChannelQueue(r,a,t,i)}return r}(d,i,e,_)),f){var r=(0,o.UA)(i,f);-1!==r&&i.splice(r,1),-1!==(r=(0,o.UA)(c,f))&&c.splice(r,1),f._setQueue(g)}else f=function createChannelControllerPlugin(e,n){var t;function _getTelCtx(){return(0,S.CD)(null,n.config,n,null)}function _processChannelQueue(e,n,t,i){var r=e?e.length+1:1;function _runChainOnComplete(){0==--r&&(i&&i(),i=null)}r>0&&(0,o.tO)(e,(function(e){if(e&&e.queue.length>0){var i=e.chain,o=n.createNew(i);o.onComplete(_runChainOnComplete),t(o)}else r--})),_runChainOnComplete()}var i=!1,r=(t={identifier:"ChannelControllerPlugin",priority:I,initialize:function(n,t,r,a){i=!0,(0,o.tO)(e,(function(e){e&&e.queue.length>0&&(0,C.bP)((0,S.CD)(e.chain,n,t),r)}))},isInitialized:function(){return i},processTelemetry:function(n,t){_processChannelQueue(e,t||_getTelCtx(),(function(e){e[T.Z_](n)}),(function(){t[T.Z_](n)}))},update:function _doUpdate(n,t){var i=t||{reason:0};return _processChannelQueue(e,n,(function(e){e[T.Z_](i)}),(function(){n[T.Z_](i)})),!0}},t[T.nE]=function(){_processChannelQueue(e,_getTelCtx(),(function(e){e.iterate((function(e){e[T.nE]&&e[T.nE]()}))}),null)},t[T.Mf]=function(){_processChannelQueue(e,_getTelCtx(),(function(e){e.iterate((function(e){e[T.Mf]&&e[T.Mf]()}))}),null)},t[T.vE]=function _doTeardown(n,t){var r=t||{reason:0,isAsync:!1};return _processChannelQueue(e,n,(function(e){e[T.Z_](r)}),(function(){n[T.Z_](r),i=!1})),!0},t.getChannel=function _getChannel(n){var t=null;return e&&e.length>0&&(0,o.tO)(e,(function(e){if(e&&e.queue.length>0&&((0,o.tO)(e.queue,(function(e){if(e.identifier===n)return t=e,-1})),t))return-1})),t},t.flush=function(n,t,i,r){var o=1,a=!1,l=null;function doCallback(){o--,a&&0===o&&(l&&(clearTimeout(l),l=null),t&&t(a),t=null)}return r=r||5e3,_processChannelQueue(e,_getTelCtx(),(function(e){e.iterate((function(e){if(e.flush){o++;var t=!1;e.flush(n,(function(){t=!0,doCallback()}),i)||t||(n&&null==l?l=setTimeout((function(){l=null,doCallback()}),r):doCallback())}}))}),(function(){a=!0,doCallback()})),!0},t._setQueue=function(n){e=n},t);return r}(g,_);i.push(f),c.push(f),_._extensions=(0,C.AA)(i),f.initialize(e,_,i),(0,C.bP)(_createTelCtx(),i),_._extensions=(0,o.FL)((0,C.AA)(c||[])).slice(),n&&function _doUpdate(e){var n=(0,S.xy)(_getPluginChain(),_);_._updateHook&&!0===_._updateHook(n,e)||n.processNext(e)}(n)}function _getPlugin(e){var n=null,t=null;return(0,o.tO)(_._extensions,(function(n){if(n.identifier===e&&n!==f&&n!==A)return t=n,-1})),!t&&f&&(t=f.getChannel(e)),t&&(n={plugin:t,setEnabled:function(e){(0,C.OY)(t)[T.C0]=!e},isEnabled:function(){var e=(0,C.OY)(t);return!e[T.vE]&&!e[T.C0]},remove:function(e,n){void 0===e&&(e=!0);var i=[t];_removePlugins(i,{reason:1,isAsync:e},(function(e){e&&_initPluginChain(_.config,{reason:32,removed:i}),n&&n(e)}))}}),n}function _getPluginChain(){if(!u){var e=(c||[]).slice();-1===(0,o.UA)(e,A)&&e.push(A),u=(0,S.jV)((0,C.AA)(e),_.config,_)}return u}function _removePlugins(e,n,t){if(e&&e.length>0){var i=(0,S.jV)(e,_.config,_),r=(0,S.Bt)(i,_);r.onComplete((function(){var n=!1,i=[];(0,o.tO)(s,(function(t,r){_isPluginPresent(t,e)?n=!0:i.push(t)})),s=i;var r=[];d&&((0,o.tO)(d,(function(t,i){var a=[];(0,o.tO)(t,(function(t){_isPluginPresent(t,e)?n=!0:a.push(t)})),r.push(a)})),d=r),t&&t(n)})),r.processNext(n)}else t(!1)}function _flushInternalLogs(){var e=_.logger?_.logger.queue:[];e&&((0,o.tO)(e,(function(e){var n={name:k||"InternalMessageId: "+e.messageId,iKey:_.config.instrumentationKey,time:(0,o.Y6)(new Date),baseType:v.lQ.dataType,baseData:{message:e.message}};_.track(n)})),e.length=0)}function _flushChannels(e,n,t,i){return f?f.flush(e,n,t||6,i):(n&&n(!1),!0)}function _logOrThrowError(e){var n=_.logger;n?(0,v.kP)(n,2,73,e):(0,o._y)(e)}_initDefaults(),_.isInitialized=function(){return e},_.initialize=function(n,r,l,u){p&&(0,o._y)(x),_.isInitialized()&&(0,o._y)("Core should not be initialized more than once"),n&&!(0,o.le)(n.instrumentationKey)||(0,o._y)("Please provide instrumentation key"),t=u,_._notificationManager=u,_.config=n||{},function _initDebugListener(e){!0===e.disableDbgExt&&D&&(t[T.XP](D),D=null),t&&!D&&!0!==e.disableDbgExt&&(D=(0,E.p)(e),t[T.dV](D))}(n),function _initPerfManager(e){!e.enablePerfMgr&&a&&(a=null),e.enablePerfMgr&&(0,o.sO)(_.config,"createPerfMgr",_createPerfManager)}(n),n.extensions=(0,o.le)(n.extensions)?[]:n.extensions,function _initExtConfig(e){(0,o.qK)(e,y.F).NotificationManager=t}(n),l&&(_.logger=l),(s=[]).push.apply(s,(0,i.$h)((0,i.$h)([],r,!1),n.extensions,!1)),d=(n||{}).channels,_initPluginChain(n,null),g&&0!==g.length||(0,o._y)("No channels available"),e=!0,_.releaseQueue()},_.getTransmissionControls=function(){var e=[];return g&&(0,o.tO)(g,(function(n){e.push(n.queue)})),(0,o.FL)(e)},_.track=function(e){(0,o.sO)(e,y.z,_.config.instrumentationKey,null,o.F),(0,o.sO)(e,"time",(0,o.Y6)(new Date),null,o.F),(0,o.sO)(e,"ver","4.0",null,o.le),!p&&_.isInitialized()?_createTelCtx().processNext(e):n.push(e)},_.getProcessTelContext=_createTelCtx,_.getNotifyMgr=function(){return t||(t=function _createDummyNotificationManager(){var e;return(0,h.pu)(((e={})[T.dV]=function(e){},e[T.XP]=function(e){},e[T.eO]=function(e){},e[T.H4]=function(e,n){},e[T.rX]=function(e,n){},e))}(),_._notificationManager=t),t},_[T.dV]=function(e){t&&t[T.dV](e)},_[T.XP]=function(e){t&&t[T.XP](e)},_.getCookieMgr=function(){return l||(l=(0,P.Nz)(_.config,_.logger)),l},_.setCookieMgr=function(e){l=e},_.getPerfMgr=function(){return r||a||_.config&&_.config.enablePerfMgr&&(0,o.mf)(_.config.createPerfMgr)&&(a=_.config.createPerfMgr(_,_.getNotifyMgr())),r||a||(0,m.j5)()},_.setPerfMgr=function(e){r=e},_.eventCnt=function(){return n.length},_.releaseQueue=function(){if(e&&n.length>0){var t=n;n=[],(0,o.tO)(t,(function(e){_createTelCtx().processNext(e)}))}},_.pollInternalLogs=function(e){k=e||null;var n=_.config.diagnosticLogInterval;return n&&n>0||(n=1e4),V&&clearInterval(V),V=setInterval((function(){_flushInternalLogs()}),n)},_.stopPollingInternalLogs=function(){V&&(clearInterval(V),V=0,_flushInternalLogs())},(0,o.Vb)(_,(function(){return A}),["addTelemetryInitializer"]),_.unload=function(n,t,i){void 0===n&&(n=!0),e||(0,o._y)("SDK is not initialized"),p&&(0,o._y)(x);var r={reason:50,isAsync:n,flushComplete:!1},a=(0,S.Bt)(_getPluginChain(),_);function _doUnload(e){r.flushComplete=e,p=!0,z.run(a,r),_.stopPollingInternalLogs(),a.processNext(r)}a.onComplete((function(){_initDefaults(),t&&t(r)}),_),_flushChannels(n,_doUnload,6,i)||_doUnload(!1)},_.getPlugin=_getPlugin,_.addPlugin=function(e,n,t,i){if(!e)return i&&i(!1),void _logOrThrowError(w);var r=_getPlugin(e.identifier);if(r&&!n)return i&&i(!1),void _logOrThrowError("Plugin ["+e.identifier+"] is already loaded!");var o={reason:16};function _addPlugin(n){s.push(e),o.added=[e],_initPluginChain(_.config,o),i&&i(!0)}if(r){var a=[r.plugin];_removePlugins(a,{reason:2,isAsync:!!t},(function(e){e?(o.removed=a,o.reason|=32,_addPlugin()):i&&i(!1)}))}else _addPlugin()},_.evtNamespace=function(){return N},_.flush=_flushChannels,_.getTraceCtx=function(e){return M||(M=(0,C.Yn)()),M},_.setTraceCtx=function(e){M=e||null},(0,o.Oi)(_,"addUnloadCb",(function(){return z}),"add")}))};function _runListeners(e,n,t,i){(0,o.tO)(e,(function(e){if(e&&e[n])if(t)setTimeout((function(){return i(e)}),0);else try{i(e)}catch(e){}}))}var N=function NotificationManager(e){this.listeners=[];var n=!!(e||{}).perfEvtsSendAll;(0,_.Z)(NotificationManager,this,(function(e){e[T.dV]=function(n){e.listeners.push(n)},e[T.XP]=function(n){for(var t=(0,o.UA)(e.listeners,n);t>-1;)e.listeners.splice(t,1),t=(0,o.UA)(e.listeners,n)},e[T.eO]=function(n){_runListeners(e.listeners,T.eO,!0,(function(e){e[T.eO](n)}))},e[T.H4]=function(n,t){_runListeners(e.listeners,T.H4,!0,(function(e){e[T.H4](n,t)}))},e[T.rX]=function(n,t){_runListeners(e.listeners,T.rX,t,(function(e){e[T.rX](n,t)}))},e[T.SN]=function(t){t&&(!n&&t.isChildEvt()||_runListeners(e.listeners,T.SN,!1,(function(e){t.isAsync?setTimeout((function(){return e[T.SN](t)}),0):e[T.SN](t)})))}}))},z=function(e){function AppInsightsCore(){var n=e.call(this)||this;return(0,_.Z)(AppInsightsCore,n,(function(e,n){function _notifyInvalidEvent(n){var t=e.getNotifyMgr();t&&t.eventsDiscarded([n],2)}e.initialize=function(e,t,i,r){n.initialize(e,t,i||new v.AQ(e),r||new N(e))},e.track=function(t){(0,m.Lm)(e.getPerfMgr(),(function(){return"AppInsightsCore:track"}),(function(){null===t&&(_notifyInvalidEvent(t),(0,o._y)("Invalid telemetry item")),function _validateTelemetryItem(e){(0,o.le)(e.name)&&(_notifyInvalidEvent(e),(0,o._y)("telemetry name required"))}(t),n.track(t)}),(function(){return{item:t}}),!t.sync)}})),n}return(0,i.ne)(AppInsightsCore,e),AppInsightsCore}(k),D=t(65705),M=function(e){function AppInsightsCore(){var n=e.call(this)||this;return n.pluginVersionStringArr=[],n.pluginVersionString="",(0,_.Z)(AppInsightsCore,n,(function(e,n){e.logger&&e.logger.queue||(e.logger=new v.AQ({loggingLevelConsole:1})),e.initialize=function(t,i,r,a){(0,m.Lm)(e,(function(){return"AppInsightsCore.initialize"}),(function(){if(t){t.endpointUrl||(t.endpointUrl="https://browser.events.data.microsoft.com/OneCollector/1.0/");var l=t.propertyStorageOverride;if(l&&(!l.getProperty||!l.setProperty))throw new Error("Invalid property storage override passed.");t.channels&&(0,o.tO)(t.channels,(function(n){n&&(0,o.tO)(n,(function(n){if(n.identifier&&n.version){var t=n.identifier+"="+n.version;e.pluginVersionStringArr.push(t)}}))}))}e.getWParam=function(){return"undefined"!=typeof document?0:-1},i&&(0,o.tO)(i,(function(n){if(n&&n.identifier&&n.version){var t=n.identifier+"="+n.version;e.pluginVersionStringArr.push(t)}})),e.pluginVersionString=e.pluginVersionStringArr.join(";");try{n.initialize(t,i,r,a),e.pollInternalLogs("InternalLog")}catch(n){var u=e.logger,s=(0,p.eU)(n);-1!==s.indexOf("channels")&&(s+="\n - Channels must be provided through config.channels only!"),u.throwInternal(1,514,"SDK Initialization Failed - no telemetry will be sent: "+s)}}),(function(){return{config:t,extensions:i,logger:r,notificationManager:a}}))},e.track=function(t){(0,m.Lm)(e,(function(){return"AppInsightsCore.track"}),(function(){var i=t;if(i){i.timings=i.timings||{},i.timings.trackStart=(0,D.hK)(),(0,D.r7)(i.latency)||(i.latency=1);var r=i.ext=i.ext||{};r.sdk=r.sdk||{},r.sdk.ver=D.vs;var o=i.baseData=i.baseData||{};o.properties||(o.properties={});var a=o.properties;a.version||(a.version=""),""!==e.pluginVersionString&&(a.version=e.pluginVersionString)}n.track(i)}),(function(){return{item:t}}),!t.sync)}})),n}return(0,i.ne)(AppInsightsCore,e),AppInsightsCore}(z);const V=M;var j=function(e){function BaseCore(){var n=e.call(this)||this;return(0,_.Z)(BaseCore,n,(function(e,n){e.initialize=function(t,i,r,o){t&&!t.endpointUrl&&(t.endpointUrl="https://browser.events.data.microsoft.com/OneCollector/1.0/"),e.getWParam=function(){return D.x9?0:-1};try{n.initialize(t,i,r,o)}catch(n){(0,v.kP)(e.logger,1,514,"Initialization Failed: "+(0,p.eU)(n)+"\n - Note: Channels must be provided through config.channels only")}},e.track=function(e){var t=e;if(t){var i=t.ext=t.ext||{};i.sdk=i.sdk||{},i.sdk.ver=D.vs}n.track(t)}})),n}return(0,i.ne)(BaseCore,e),BaseCore}(k);const B=j;var R=o.mf;function _createPromiseAllOnResolvedFunction(e,n,t){return function(i){e[n]=i,t()}}const U=function(){function ESPromise(e){var n=0,t=null,i=[];function _processQueue(){if(i.length>0){var e=i.slice();i=[],setTimeout((function(){for(var n=0,t=e.length;n<t;++n)try{e[n]()}catch(e){}}),0)}}function _resolve(e){0===n&&(t=e,n=1,_processQueue())}function _reject(e){0===n&&(t=e,n=2,_processQueue())}(0,_.Z)(ESPromise,this,(function(e){e.then=function(e,r){return new ESPromise((function(o,a){!function _enqueue(e,r,o,a){i.push((function(){var i;try{(i=1===n?R(e)?e(t):t:R(r)?r(t):t)instanceof ESPromise?i.then(o,a):2!==n||R(r)?o(i):a(i)}catch(e){return void a(e)}})),0!==n&&_processQueue()}(e,r,o,a)}))},e.catch=function(n){return e.then(null,n)}})),function _initialize(){if(!R(e))throw new TypeError("ESPromise: resolvedFunc argument is not a Function");try{e(_resolve,_reject)}catch(e){_reject(e)}}()}return ESPromise.resolve=function(e){return e instanceof ESPromise?e:e&&R(e.then)?new ESPromise((function(n,t){try{e.then(n,t)}catch(e){t(e)}})):new ESPromise((function(n){n(e)}))},ESPromise.reject=function(e){return new ESPromise((function(n,t){t(e)}))},ESPromise.all=function(e){if(e&&e.length)return new ESPromise((function(n,t){try{for(var i=[],r=0,o=0;o<e.length;o++){var a=e[o];a&&R(a.then)?(r++,a.then(_createPromiseAllOnResolvedFunction(i,o,(function(){0==--r&&n(i)})),t)):i[o]=a}0===r&&setTimeout((function(){n(i)}),0)}catch(e){t(e)}}))},ESPromise.race=function(e){return new ESPromise((function(n,t){if(e&&e.length)try{for(var _loop_1=function(i){var r=e[i];r&&R(r.then)?r.then(n,t):setTimeout((function(){n(r)}),0)},i=0;i<e.length;i++)_loop_1(i)}catch(e){t(e)}}))},ESPromise}();var Q=0,H=[],W=[],J=[];function _getTime(){return(new Date).getTime()}const K=function(){function ESPromiseScheduler(e,n){var t=0,i=(e||"<unnamed>")+"."+Q;function _debugLog(e){var n=(0,h.Rd)();n&&n.QUnit&&console&&console.log("ESPromiseScheduler["+i+"] "+e)}function _warnLog(e){n&&n.warnToConsole("ESPromiseScheduler["+i+"] "+e)}Q++,(0,_.Z)(ESPromiseScheduler,this,(function(e){var n=null,r=0;function _removeQueuedEvent(e,n){for(var t=0;t<e.length;t++)if(e[t].id===n)return e.splice(t,1)[0];return null}e.scheduleEvent=function(e,o,a){var l=i+"."+r;r++,o&&(l+="-("+o+")");var u=l+"{"+t+"}";t++;var s={evt:null,tm:_getTime(),id:u,isRunning:!1,isAborted:!1};return s.evt=n?function _waitForPreviousEvent(e,n){var t=new U((function(t,i){var r=_getTime()-n.tm,o=n.id;_debugLog("["+l+"] is waiting for ["+o+":"+r+" ms] to complete before starting -- ["+W.length+"] waiting and ["+H.length+"] running"),e.abort=function(n){e.abort=null,_removeQueuedEvent(W,l),e.isAborted=!0,i(new Error(n))},n.evt.then((function(n){_removeQueuedEvent(W,l),_startWaitingEvent(e).then(t,i)}),(function(n){_removeQueuedEvent(W,l),_startWaitingEvent(e).then(t,i)}))}));return W.push(e),t}(s,n):_startWaitingEvent(s),(n=s).evt._schId=u,s.evt;function _abortAndRemoveOldEvents(e){for(var n=_getTime(),t=n-6e5,i=e.length,r=0;r<i;){var o=e[r];if(o&&o.tm<t){var a=null;o.abort?(a="Aborting ["+o.id+"] due to Excessive runtime ("+(n-o.tm)+" ms)",o.abort(a)):a="Removing ["+o.id+"] due to Excessive runtime ("+(n-o.tm)+" ms)",_warnLog(a),e.splice(r,1),i--}else r++}}function _cleanup(e,t){var i=!1,r=_removeQueuedEvent(H,e);if(r||(r=_removeQueuedEvent(J,e),i=!0),r){r.to&&(clearTimeout(r.to),r.to=null);var o=_getTime()-r.tm;t?i?_warnLog("Timed out event ["+e+"] finally complete -- "+o+" ms"):_debugLog("Promise ["+e+"] Complete -- "+o+" ms"):(J.push(r),_warnLog("Event ["+e+"] Timed out and removed -- "+o+" ms"))}else _debugLog("Failed to remove ["+e+"] from running queue");n&&n.id===e&&(n=null),_abortAndRemoveOldEvents(H),_abortAndRemoveOldEvents(W),_abortAndRemoveOldEvents(J)}function _removeScheduledEvent(e,n){return function(t){return _cleanup(e,!0),n&&n(t),t}}function _waitForFinalResult(e,n,t,i){n.then((function(n){return n instanceof U?(_debugLog("Event ["+e+"] returned a promise -- waiting"),_waitForFinalResult(e,n,t,i),n):_removeScheduledEvent(e,t)(n)}),_removeScheduledEvent(e,i))}function _createScheduledEvent(e,n){var t=e.id;return new U((function(i,r){_debugLog("Event ["+t+"] Starting -- waited for "+(e.wTm||"--")+" ms"),e.isRunning=!0,e.abort=function(n){e.abort=null,e.isAborted=!0,_cleanup(t,!1),r(new Error(n))};var o=n(t);o instanceof U?(a&&(e.to=setTimeout((function(){_cleanup(t,!1),r(new Error("Timed out after ["+a+"] ms"))}),a)),_waitForFinalResult(t,o,(function(n){_debugLog("Event ["+t+"] Resolving after "+(_getTime()-e.tm)+" ms"),i(n)}),r)):(_debugLog("Promise ["+t+"] Auto completed as the start action did not return a promise"),i())}))}function _startWaitingEvent(n){var t=_getTime();return n.wTm=t-n.tm,n.tm=t,n.isAborted?U.reject(new Error("["+l+"] was aborted")):(H.push(n),_createScheduledEvent(n,e))}}}))}return ESPromiseScheduler.incomplete=function(){return H},ESPromiseScheduler.waitingToStart=function(){return W},ESPromiseScheduler}();var Z=function(){function ValueSanitizer(e){var n=this,t={},i=[],r=[];function _getFieldSanitizer(e,n){var a,l=t[e];if(l&&(a=l[n]),!a&&null!==a){if((0,o.HD)(e)&&(0,o.HD)(n))if(r.length>0){for(var u=0;u<r.length;u++)if(r[u].handleField(e,n)){a={canHandle:!0,fieldHandler:r[u]};break}}else 0===i.length&&(a={canHandle:!0});if(!a&&null!==a){a=null;for(u=0;u<i.length;u++)if(i[u].handleField(e,n)){a={canHandle:!0,handler:i[u],fieldHandler:null};break}}l||(l=t[e]={}),l[n]=a}return a}function _handleProperty(e,n,t,i,r,a){if(e.handler)return e.handler.property(n,t,r,a);if(!(0,o.le)(r.kind)){if(4096==(4096&i)||!(0,D.oS)(r.kind))return null;r.value=r.value.toString()}return _callFieldSanitizer(e.fieldHandler,n,t,i,r)}function _convertToProperty(e,n,t){return(0,D.Sn)(t)?{value:t}:null}function _callFieldSanitizer(e,t,i,r,a){if(a&&e){var l=e.getSanitizer(t,i,r,a.kind,a.propertyType);if(l)if(4===r){var u={},s=a.value;(0,o.rW)(s,(function(n,r){var o=t+"."+i;if((0,D.Sn)(r)){var a=_convertToProperty(0,0,r);(a=_callFieldSanitizer(e,o,n,(0,D.Sy)(r),a))&&(u[n]=a.value)}})),a.value=u}else{var c={path:t,name:i,type:r,prop:a,sanitizer:n};a=l.call(n,c)}}return a}e&&r.push(e),n.addSanitizer=function(e){e&&(i.push(e),t={})},n.addFieldSanitizer=function(e){e&&(r.push(e),t={})},n.handleField=function(e,n){var t=_getFieldSanitizer(e,n);return!!t&&t.canHandle},n.value=function(e,n,t,i){var r=_getFieldSanitizer(e,n);if(r&&r.canHandle){if(!r||!r.canHandle)return null;if(r.handler)return r.handler.value(e,n,t,i);if(!(0,o.HD)(n)||(0,o.le)(t)||""===t)return null;var a=null,l=(0,D.Sy)(t);if(8192==(8192&l)){var u=-8193&l;if(a=t,!(0,D.Sn)(a.value)||1!==u&&2!==u&&3!==u&&4096!=(4096&u))return null}else 1===l||2===l||3===l||4096==(4096&l)?a=_convertToProperty(e,n,t):4===l&&(a=_convertToProperty(e,n,i?JSON.stringify(t):t));if(a)return _handleProperty(r,e,n,l,a,i)}return null},n.property=function(e,n,t,i){var r=_getFieldSanitizer(e,n);if(!r||!r.canHandle)return null;if(!(0,o.HD)(n)||(0,o.le)(t)||!(0,D.Sn)(t.value))return null;var a=(0,D.Sy)(t.value);return 0===a?null:_handleProperty(r,e,n,a,t,i)}}return ValueSanitizer.getFieldType=D.Sy,ValueSanitizer}(),q=100,G=t(28452),X=t(28956),Y=t(47954),$=t(19406),ee=t(1550),ne=t(56207)}};
//# sourceMappingURL=164.js.map