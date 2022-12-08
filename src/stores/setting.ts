import { store } from "@/stores";
import { defineStore } from "pinia";

interface settingState {
  loading: boolean;
  loadingSec: number;
}

export const useSettingStore = defineStore({
  id: "setting",
  state: (): settingState => ({
    loading: false,
    loadingSec: 500,
  }),
  getters: {
    getLoadingState(): boolean {
      return this.loading;
    },
  },
  actions: {
    setLoading(loading: boolean): void {
      this.loading = loading;
    },
  },
});

export const useSettingStoreState = () => {
  return useSettingStore(store);
};
