import { AppInfo, GatewayConfig, PermissionType } from "@arweave-wallet-kit/core/wallet";
import BrowserWalletStrategy from "@arweave-wallet-kit/browser-wallet-strategy";
import { Strategy } from "@arweave-wallet-kit/core/strategy";
import { ArweaveWebWallet } from "arweave-wallet-connector";
import { WebWalletConfig } from "./types";

const defaultConfig: Required<WebWalletConfig> = {
  name: "Arweave.app",
  description: "Web based wallet software",
  theme: "24, 24, 24",
  logo: "qVms-k8Ox-eKFJN5QFvrPQvT9ryqQXaFcYbr-fJbgLY",
  url: "arweave.app",
  customInterfaceURL: "https://arweave.app"
};

export default class WebWalletStrategy
  extends BrowserWalletStrategy
  implements Strategy
{
  public id = "webwallet";
  public name = defaultConfig.name;
  public description = defaultConfig.description;
  public theme = defaultConfig.theme;
  public logo = defaultConfig.logo;
  public url = defaultConfig.customInterfaceURL;

  public instance = new ArweaveWebWallet();
  public instanceURL = defaultConfig.url;

  constructor(config?: WebWalletConfig) {
    super();

    // setup with config
    if (config) {
      this.name = config.name;
      this.description = config.description;
      this.theme = config.theme || defaultConfig.theme;
      this.logo = config.logo || defaultConfig.logo;
      this.instanceURL = config.url;
      this.url = config.customInterfaceURL || "http://" + config.url;
    }

    // update connector instance
    this.instance.setUrl(this.instanceURL);

    // if it is not the default url, we need
    // a custom ID for the strategy to work
    if (this.instanceURL !== defaultConfig.url) {
      this.id = this.id + this.instanceURL;
    }
  }

  public async isAvailable() {
    return true;
  }

  public async resumeSession() {
    this.instance.setUrl(this.instanceURL);
    await this.instance.connect();
  }

  public async connect(
    permissions: PermissionType[],
    appInfo?: AppInfo,
    gateway?: GatewayConfig
  ): Promise<void> {
    if (gateway) {
      console.warn(
        "[Arweave Wallet Kit] The WebWallets API does not support custom gateway connection yet."
      );
    }

    // try connecting
    this.instance = new ArweaveWebWallet(appInfo);
    await this.resumeSession();
  }

  public addAddressEvent(listener: (address: string) => void) {
    this.instance.on("connect", listener);

    return listener as any;
  }

  public removeAddressEvent(listener: any) {
    this.instance.off("connect", listener);
  }
}
