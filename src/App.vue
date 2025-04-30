<script setup>
import { onMounted, watch, ref, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { updateDbUsers, getRecordsCount } from "./services/IDBService.js"
import { fetchUsersFromAPI, syncUsers } from "./services/userService.js"
import { MAX_RECORDS_COUNT, SYNC_DELAY } from "./utils/appConfigurations.js"
import { userAdaptor } from "./services/adaptorHandler.js"
import { useOnlineStatus } from './composables/useOnlineStatus';
import SyncModal from "./components/SyncModal.vue"
const { isOnline } = useOnlineStatus();

const isSyncing = ref(false)

const syncUsersFromAPI = async () => {
  const allUsers = await syncUsers()
  const adaptedUsers = allUsers.map(element => userAdaptor(element));
  updateDbUsers(adaptedUsers)
}

watch(isOnline, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    syncUsersFromAPI();
  }
});


let synUsersInterval = null
onMounted(async () => {
  const allUsers = await fetchUsersFromAPI()
  const adaptedUsers = allUsers.map(element => userAdaptor(element));
  updateDbUsers(adaptedUsers)

  synUsersInterval = setInterval(async () => {
    const totalRecords = await getRecordsCount()
    if (totalRecords >= MAX_RECORDS_COUNT) clearInterval(synUsersInterval)

    isSyncing.value = true
    await syncUsersFromAPI().then(() => {
      isSyncing.value = false
    })

  }, SYNC_DELAY);
})

onUnmounted(() => {
  if (synUsersInterval) clearInterval(synUsersInterval)
})
</script>

<template>
  <div class="page-container">
    <SyncModal v-if="isSyncing" />
    <RouterView />
  </div>
</template>
<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
</style>