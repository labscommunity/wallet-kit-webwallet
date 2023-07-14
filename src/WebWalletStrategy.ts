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
  public instanceURL = "arweave.app";

  constructor(config?: WebWalletConfig) {
    super();

    // setup with config
    if (config) {
      
    }

    this.instance.setUrl(this.instanceURL);
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
        "[Arweave Wallet Kit] Arweave.app does not support custom gateway connection yet."
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
