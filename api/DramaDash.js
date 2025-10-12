import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";

export default class DramaDash {
    constructor() {
        this.apiUrl = `https://www.dramadash.app/api/`;
        this.deviceId = this.generateDeviceId();
        this.deviceToken = null;
    }

    async init() {
        this.deviceToken = await this.getToken();
        return this;
    }

    generateDeviceId() {
        return uuidv4().replace(/-/g, "").substring(0, 16);
    }

    getDefaultHeaders() {
        return {
            "app-version": 70,
            lang: "id",
            platform: "android",
            tz: "Asia/Bangkok",
            "device-type": "phone",
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "okhttp/5.1.0",
            ...(this.deviceToken && { authorization: `Bearer ${this.deviceToken}` })
        };
    }

    async request(endpoint, method = "GET", data = null) {
        const config = {
            url: `${this.apiUrl}${endpoint}`,
            method,
            headers: this.getDefaultHeaders(),
            ...(data && { data })
        };

        try {
            const res = await axios(config);
            return res.data;
        } catch (err) {
            console.error(`Request failed [${method} ${endpoint}]:`, err?.response?.data || err.message);
            throw err;
        }
    }

    async getToken() {
        const payload = { android_id: this.deviceId };
        const res = await this.request("landing", "POST", payload);
        return res?.token || null;
    }

    async getHome() {
        const res = await this.request('home', "GET");
        const {dramaList, bannerDramaList, trendingSearches, tabs} = res;
        const dramaListFIlee = dramaList.filter(item => Array.isArray(item.list)).flatMap(item => item.list);
        const trending = trendingSearches.map(item => ({id: item.id,name: item.name,poster: item.poster,genres: item.genres.map(g => g.displayName)}));
        const banner = bannerDramaList.list.map(item => ({id: item.id,name: item.name,poster: item.poster,desc: item.desc || "",viewCount: item.viewCount || 0,tags: item.tags ? item.tags.map(t => t.displayName) : [],gendres: item.genres ? item.genres.map(g => g.displayName) : []}));
        const drama = dramaListFIlee.map(item => ({id: item.id,name: item.name,poster: item.poster,desc: item.desc || "",viewCount: item.viewCount || 0,tags: item.tags ? item.tags.map(t => t.displayName) : [],gendres: item.genres ? item.genres.map(g => g.displayName) : []}));
        return {
            status: 200,
            data:{
                banner,
                trending,
                drama
            },
            tabs
        };
    }

    async getTabs(tab) {
        try {
            const res = await this.request(`home?tab_id=${tab}`, "GET");
            await writeFile(
                `home_tab_${tab}.json`,
                JSON.stringify(res, null, 2),
                "utf-8"
            );
            return res || {};
        } catch (err) {
            console.error("❌ Failed to fetch or save home data:", err.message);
            return {};
        }
    }

    async getDrama(dramaId) { 
        try {
            const {drama} = await this.request(`drama/${dramaId}`, "GET");
            return {
                status:200,
                data: {
                    name: drama.name,
                    poster: drama.poster,
                    description: drama.description,
                },
                episodes: drama.episodes,
            };
        } catch (err) {
            console.error("❌ Failed to fetch or save home data:", err.message);
            return {};
        }
    }

    async searchDrama(search){
        try {
            const {result} = await this.request(`search/text`, "POST", {search});
            await writeFile(
                `search_${search}.json`,
                JSON.stringify(result.map(item => ({id: item.id,name: item.name,poster: item.poster,genres: item.genres.map(g => g.displayName)})), null, 2),
                "utf-8"
            );
            return {
                status: 200,
                data: result.map(item => ({id: item.id,name: item.name,poster: item.poster,genres: item.genres.map(g => g.displayName)})),
            };
        } catch (err) {
            console.error("❌ Failed to fetch or save home data:", err.message);
            return {};
        }
    }

    async getEpisode(dramaId, eps) {
        try{
            const {episodes} = await this.getDrama(dramaId);
            return{
                status:200,
                data: episodes.find(e => e.episodeNumber === eps)
            }
        }catch(err){
            console.error("❌ Failed to fetch or save home data:", err.message);
            return {};
        }
    }
}