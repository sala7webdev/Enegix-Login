import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useOnlineStatus() {
  const onlineState = ref(navigator.onLine);

  // Update function
  const updateNetworkStatus = () => {
    onlineState.value = navigator.onLine;
  };

  // Event listeners
  onMounted(() => {
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
  });

  // Computed property
  const isOnline = computed(() => onlineState.value);

  return { isOnline };
}