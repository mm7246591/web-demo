import { useSettingStoreState } from "@/stores/setting";
import { computed } from "vue";

export function useSettingState() {
  const settingStore = useSettingStoreState();
  const getSettingLoding = computed(() => settingStore.loading);
  const getSettingLodingSec = computed(() => settingStore.loadingSec);
  return {
    getSettingLoding,
    getSettingLodingSec,
  };
}
