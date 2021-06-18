import {
  Module,
  Action,
  Mutation,
  VuexModule,
  getModule
} from "vuex-module-decorators";
import store from "..";
import localServer from "../../utils/localServer";

@Module({
  namespaced: true,
  name: "app",
  store,
  dynamic: true
})
export class AppStoreModule extends VuexModule {
  private sysNo: string = localServer.get("sysNo");
  private sysInfo: SysInfo = localServer.get("sysInfo");

  get getSysNo() {
    return this.sysNo;
  }

  get getSysInfo() {
    return this.sysInfo;
  }

  @Mutation
  commitSysNo(sysNo: string) {
    this.sysNo = sysNo;
  }

  @Mutation
  commitSysInfo(sysInfo: SysInfo) {
    this.sysInfo = sysInfo;
  }

  @Mutation
  commitReloadData() {
    this.sysNo = localServer.get("sysNo");
    this.sysInfo = localServer.get("sysInfo");
  }
}

export const AppStore = getModule<AppStoreModule>(AppStoreModule);
