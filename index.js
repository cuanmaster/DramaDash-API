import fs from "fs/promises";
import DramaDash from "./api/dramaDash.js";

const dd = await new DramaDash().init();

async function saveAsFile(filename, data) {
    await fs.writeFile(filename, JSON.stringify(data, null, 2), "utf-8");
}

await saveAsFile("device.json", { id: dd.deviceId, token: dd.deviceToken });

await saveAsFile("home.json", await dd.getHome());
await saveAsFile("drama_44.json", await dd.getDrama(44));
await saveAsFile("search_putri.json", await dd.searchDrama("putri"));
await saveAsFile("episode_44_1.json", await dd.getEpisode(44, 1));

console.log("✅ Semua file berhasil dibuat.");
