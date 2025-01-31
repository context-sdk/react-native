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
                  maxDelay:(nonnull NSNumber*)maxDelay
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(optimize:(NSString*)flowName
                  maxDelay:(nonnull NSNumber*)maxDelay
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(fetchContext:(NSString*)flowName
                  duration:(nonnull NSNumber*)duration
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(instantContext:(NSString*)flowName
                  duration:(nonnull NSNumber*)duration
                  customSignals:(NSDictionary*)customSignals
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(releaseContext:(nonnull NSNumber*)contextID
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_shouldUpsell:(nonnull NSNumber*)contextID
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_validate:(nonnull NSNumber*)contextID
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_log:(nonnull NSNumber*)contextID
                  outcome:(nonnull NSNumber*)outcome
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_logIfNotLoggedYet:(nonnull NSNumber*)contextID
                  outcome:(nonnull NSNumber*)outcome
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(context_appendOutcomeMetadata:(nonnull NSNumber*)contextID
                  values:(NSDictionary*)values
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@end
