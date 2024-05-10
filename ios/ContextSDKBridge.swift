import ContextSDK

@objc(ContextSDKBridge)
class ContextSDKBridge: NSObject {

    @objc(setup:withResolver:withRejecter:)
    func setup(licenseKey: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let result = contextSDK_setupContextManagerWithAPIBackend_rn(licenseKey)
        resolve(result)
    }

    @objc(setGlobalCustomSignals:withResolver:withRejecter:)
    func setGlobalCustomSignals(customSignals: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) {
        for (key, value) in customSignals {
            guard let stringKey = key as? String else  { continue }
            if let intValue = value as? Int {
                contextSDK_setGlobalCustomSignalInt(idC: stringKey, value: Int32(intValue))
            } else if let doubleValue = value as? Double {
                contextSDK_setGlobalCustomSignalFloat(idC: stringKey, value: Float(doubleValue))
            } else if let stringValue = value as? String {
                contextSDK_setGlobalCustomSignalString(idC: stringKey, valueC: stringValue)
            } else if let boolValue = value as? Bool { // TODO: Bools fall into the Int clause - we should fix this
                contextSDK_setGlobalCustomSignalBool(idC: stringKey, value: boolValue)
            } else if value is NSNull {
                ContextManager.setGlobalCustomSignal(id: stringKey, value: nil)
            }
        }
        resolve(true)
    }

    @objc(trackEvent:customSignals:withResolver:withRejecter:)
    func trackEvent(eventName: String, customSignals: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let customSignalsID = createCustomSignals(customSignals: customSignals)
        contextSDK_trackEvent(eventName, customSignalsID)
        contextSDK_releaseCustomSignals(customSignalsID)
        resolve(true)
    }

    @objc(trackPageView:customSignals:withResolver:withRejecter:)
    func trackPageView(pageName: String, customSignals: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let customSignalsID = createCustomSignals(customSignals: customSignals)
        contextSDK_trackPageView(pageName, customSignalsID)
        contextSDK_releaseCustomSignals(customSignalsID)
        resolve(true)
    }

    @objc(trackUserAction:customSignals:withResolver:withRejecter:)
    func trackUserAction(actionName: String, customSignals: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let customSignalsID = createCustomSignals(customSignals: customSignals)
        contextSDK_trackUserAction(actionName, customSignalsID)
        contextSDK_releaseCustomSignals(customSignalsID)
        resolve(true)
    }

    @objc(calibrate:maxDelay:customSignals:withResolver:withRejecter:)
    func calibrate(flowName: String, maxDelay: Int, customSignals: NSDictionary, resolve: @escaping RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let customSignalsID = createCustomSignals(customSignals: customSignals)
        contextSDK_calibrate_rn(flowName: flowName, customSignalsID: customSignalsID, maxDelay: Int32(maxDelay)) { contextID in
            resolve(contextID)
        }
    }

    @objc(optimize:customSignals:withResolver:withRejecter:)
    func optimize(flowName: String, customSignals: NSDictionary, resolve: @escaping RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let customSignalsID = createCustomSignals(customSignals: customSignals)
        contextSDK_optimize_rn(flowName: flowName, customSignalsID: customSignalsID) { contextID in
            resolve(contextID)
        }
    }

    @objc(fetchContext:duration:customSignals:withResolver:withRejecter:)
    func fetchContext(flowName: String, duration: Int, customSignals: NSDictionary, resolve: @escaping RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let customSignalsID = createCustomSignals(customSignals: customSignals)
        contextSDK_fetchContext_rn(flowName: flowName, customSignalsID: customSignalsID, duration: Int32(duration)) { contextID in
            resolve(contextID)
        }
    }

    @objc(instantContext:duration:customSignals:withResolver:withRejecter:)
    func instantContext(flowName: String, duration: Int, customSignals: NSDictionary, resolve: @escaping RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let customSignalsID = createCustomSignals(customSignals: customSignals)
        let contextID = contextSDK_instantContext(flowNameC: flowName, customSignalsID: customSignalsID, duration: Int32(duration))
        contextSDK_releaseCustomSignals(contextID: customSignalsID)
        resolve(contextID)
    }

    @objc(releaseContext:withResolver:withRejecter:)
    func releaseContext(contextID: Int,resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) {
        contextSDK_releaseContext(contextID: Int32(contextID))
        resolve(true)
    }

    @objc(context_shouldUpsell:withResolver:withRejecter:)
    func context_shouldUpsell(contextID: Int, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) {
        let shouldUpsell = contextSDK_context_shouldUpsell(contextID: Int32(contextID))
        resolve(shouldUpsell)
    }

    @objc(context_validate:withResolver:withRejecter:)
    func context_validate(contextID: Int, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) {
        let output = String(cString: contextSDK_context_validate(contextID: Int32(contextID)))
        resolve(output)
    }

    @objc(context_log:outcome:withResolver:withRejecter:)
    func context_log(contextID: Int, outcome: Int, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) {
        contextSDK_context_log(Int32(contextID), Int32(outcome))
        resolve(true)
    }

    @objc(context_logIfNotLoggedYet:outcome:withResolver:withRejecter:)
    func context_logIfNotLoggedYet(contextID: Int, outcome: Int, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) {
        contextSDK_context_logIfNotLoggedYet(Int32(contextID), Int32(outcome))
        resolve(true)
    }

    @objc(context_appendOutcomeMetadata:values:withResolver:withRejecter:)
    func context_appendOutcomeMetadata(contextID: Int, values: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) {
        for (key, value) in values {
            guard let stringKey = key as? String else  { continue }
            if let intValue = value as? Int {
                contextSDK_context_appendOutcomeMetadataInt(contextID: Int32(contextID), idC: stringKey, value: Int32(intValue))
            } else if let doubleValue = value as? Double {
                contextSDK_context_appendOutcomeMetadataFloat(contextID: Int32(contextID), idC: stringKey, value: Float(doubleValue))
            } else if let stringValue = value as? String {
                contextSDK_context_appendOutcomeMetadataString(contextID: Int32(contextID), idC: stringKey, valueC: stringValue)
            } else if let boolValue = value as? Bool { // TODO: Bools fall into the Int clause - we should fix this
                contextSDK_context_appendOutcomeMetadataBool(contextID: Int32(contextID), idC: stringKey, value: boolValue)
            }
        }
        resolve(true)
    }

    private func createCustomSignals(customSignals: NSDictionary) -> Int32 {
        let customSignalsID = contextSDK_getNextContextID()
        for (key, value) in customSignals {
            guard let stringKey = key as? String else  { continue }
            if let intValue = value as? Int {
                contextSDK_context_addCustomSignalInt(contextID: customSignalsID, idC: stringKey, value: Int32(intValue))
            } else if let doubleValue = value as? Double {
                contextSDK_context_addCustomSignalFloat(contextID: customSignalsID, idC: stringKey, value: Float(doubleValue))
            } else if let stringValue = value as? String {
                contextSDK_context_addCustomSignalString(contextID: customSignalsID, idC: stringKey, valueC: stringValue)
            } else if let boolValue = value as? Bool { // TODO: Bools fall into the Int clause - we should fix this
                contextSDK_context_addCustomSignalBool(contextID: customSignalsID, idC: stringKey, value: boolValue)
            }
        }
        return customSignalsID
    }
}
