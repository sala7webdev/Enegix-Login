<template>
    <div class="sync-modal">
        Syncing
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.sync-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 40px;
    font-weight: 600;
}

.loader {
    width: 50px;
    height: 50px;
    border: 3px solid #ddd;
    border-top-color: #444;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>