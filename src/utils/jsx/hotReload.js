export function hotReload(token, config) {
    if (!config.naxt.dev) {
        return ""; // 本番環境
    }

    return `
<script>
    window.hotReloadToken = "${token}";
    setInterval(async () => {
        try {
            const res = await fetch("/_alive_check");
            const text = await res.text();
            
            if (window.hotReloadToken !== text) {
                console.log("Reload catched!");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, 250);
</script>
    `
}