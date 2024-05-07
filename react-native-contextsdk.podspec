# frozen_string_literal: true

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name              = "react-native-contextsdk"
  s.version           = package["version"]
  s.summary           = package["description"]
  s.documentation_url = "https://docs.contextsdk.com/"
  s.license           = package["license"]
  s.description       = package["description"]
  s.authors           = { "ContextSDK" => "support@contextsdk.com" }
  s.homepage          = "https://contextsdk.com/"
  s.platform          = :ios, "15.0"
  s.module_name       = "ContextSDKReactNativeiOS"
  s.source            = { git: "https://github.com/context-sdk/react-native" }
  s.source_files      = "ios/*.{xcodeproj}", "ios/RCTContextSDK/*.{h,m,swift}", "ios/RCTContextSDK/Converters/*.{h,m,swift}", "ios/RCTContextSDK/Helpers/*.{h,m,swift}"
  s.dependency("React")
  s.dependency("ContextSDK", package["version"])
end
