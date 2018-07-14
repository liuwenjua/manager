<template>
    <div id="app" style="height: 100%;">
        <router-view :key="$route.fullpath"/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>
