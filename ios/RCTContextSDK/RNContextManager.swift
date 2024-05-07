// import ContextSDK

// struct RNContextManager {
//   static func setup(licenseKey: String) -> Bool {
//     return ContextManager.setup(licenseKey: licenseKey)
//   }

//   static func sdkVersion() -> String {
//     return ContextManager.sdkVersion()
//   }
// }


import Foundation
import ContextSDK
import React // this import is necessary


@objc(RNContextManager) // This annotation makes the class visible to React Native
class RNContextManager: NSObject {

  @objc(setup:resolver:rejecter:)
  func setup(licenseKey: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let success = ContextManager.setup(licenseKey: licenseKey)
    if success {
      resolve(true)
    } else {
      reject("E_SETUP_FAILED", "Setup failed with license key", nil)
    }
  }

  @objc(sdkVersionWithResolver:rejecter:)
  func sdkVersion(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let version = ContextManager.sdkVersion()
    if !version.isEmpty {
      resolve(version)
    } else {
      reject("E_NO_VERSION", "Could not retrieve SDK version", nil)
    }
  }

  // This is required by React Native for exporting methods
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
