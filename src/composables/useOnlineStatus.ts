import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useOnlineStatus() {
  const onlineState = ref<boolean>(navigator.onLine);

  // Update function
  const updateNetworkStatus = (): void => {
    onlineState.value = navigator.onLine;
  };

  // Event listeners
  onMounted(():void => {
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
  });

  onUnmounted(():void => {
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
  });

  // Computed property
  const isOnline = computed<boolean>(() => onlineState.value);

  return { isOnline };
}