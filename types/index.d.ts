export class ContextManager {
    /**
     * Setup ContextSDK
     * @method setup
     * @memberof ContextManager
     * @param { string | null } [licenseKey]
     * @returns { Promise<boolean> }
     * @example
     * ContextManager.setup('YOUR_LICENSE_KEY');
     */
    setup: (licenseKey?: string | null) => Promise<boolean>;
    sdkVersion: () => void;
}
//# sourceMappingURL=index.d.ts.map

//@ts-ignore
declare module 'react-native' {
  export interface NativeModulesStatic {
      //@ts-ignore
      ContextManager: ContextManager;
   }
}
