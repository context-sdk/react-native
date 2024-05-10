#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ContextSDKBridge, NSObject)

RCT_EXTERN_METHOD(setup:(NSString*)licenseKey
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setGlobalCustomSignals:(NSDictionary*)value
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(trackEvent:(NSString*)eventName
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(trackPageView:(NSString*)pageName
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(trackUserAction:(NSString*)userActionName
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(calibrate:(NSString*)flowName
                  maxDelay:(int)maxDelay
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(optimize:(NSString*)flowName
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(fetchContext:(NSString*)flowName
                  duration:(int)duration
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(instantContext:(NSString*)flowName
                  duration:(int)duration
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(releaseContext:(int)contextID
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_shouldUpsell:(int)contextID
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_validate:(int)contextID
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_log:(int)contextID
                  outcome:(int)outcome
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_logIfNotLoggedYet:(int)contextID
                  outcome:(int)outcome
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_appendOutcomeMetadata:(int)contextID
                  values:(NSDictionary*)values
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@end
