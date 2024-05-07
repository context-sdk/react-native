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
  setup = function (licenseKey) {};

  sdkVersion = function () {};
}

module.exports = new ContextManager();
