/** Web Wallet configuration */
export interface WebWalletConfig {
  /** Provider name */
  name: string;
  /** Provider description */
  description: string;
  /**
   * Provider color scheme
   * (This should be in RGB, for e.g.: "0, 255, 0")
   */
  theme?: string;
  /**
   * The ID of the transaction that holds the
   * custom logo on the permaweb (Arweave)
   */
  logo?: string;
  /**
   * Provider URL (without protocol)
   * (e.g.: "arweave.app")
   * https://github.com/jfbeats/ArweaveWalletConnector#how-to-use
   */
  url: string;
  /**
   * URL of the wallet interface / app
   */
  customInterfaceURL?: string;
}
