#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNContextManager, NSObject)

RCT_EXTERN_METHOD(setup:(NSString *)licenseKey resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(sdkVersionWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
