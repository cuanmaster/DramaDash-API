# DramaDash API Wrapper (Unofficial)

Kelas JavaScript berbasis ESM untuk mengakses API aplikasi **DramaDash**. Wrapper ini menyediakan antarmuka sederhana untuk mengambil data dari API DramaDash seperti daftar drama, detail drama, pencarian, dan episode.

> Wrapper ini tidak resmi dan dapat berhenti bekerja jika API berubah sewaktu-waktu.

---

## Instalasi

```
npm install axios uuid
```

---

## Penggunaan

```
import DramaDash from "./api/dramaDash.js";

const dd = await new DramaDash().init();

const home = await dd.getHome();
const drama = await dd.getDrama(44);
const search = await dd.searchDrama("putri");
const episode = await dd.getEpisode(44, 1);

console.log(episode);
```

---

## API Reference

| Method | Parameter | Return | Deskripsi |
|--------|-----------|--------|-----------|
| `init()` | - | `this` | Mengambil token perangkat |
| `getHome()` | - | `{ status, data, tabs }` | Mengambil data halaman utama |
| `getTabs(tabId)` | `number` | `object` | Mengambil data tab tertentu |
| `getDrama(dramaId)` | `number` | `{ status, data, episodes }` | Mengambil detail drama |
| `searchDrama(query)` | `string` | `{ status, data }` | Pencarian drama |
| `getEpisode(dramaId, episodeNumber)` | `number, number` | `{ status, data }` | Mengambil data episode |

---

### getHome()

```
{
  "status": 200,
  "data": {
    "banner": [
      {
        "id": 101,
        "name": "Love in Seoul",
        "poster": "https://cdn.example/banner1.jpg",
        "desc": "A romantic comedy about...",
        "viewCount": 482130,
        "tags": ["Romance", "Comedy"],
        "gendres": ["Korean"]
      }
    ],
    "trending": [
      {
        "id": 202,
        "name": "Warrior's Oath",
        "poster": "https://cdn.example/trending1.jpg",
        "genres": ["Action", "Historical"]
      }
    ],
    "drama": [
      {
        "id": 303,
        "name": "Silent Whisper",
        "poster": "https://cdn.example/drama1.jpg",
        "desc": "Thriller mystery...",
        "viewCount": 193830,
        "tags": ["Thriller"],
        "gendres": ["Japanese"]
      }
    ]
  },
  "tabs": [
    { "id": 1, "name": "Popular" },
    { "id": 2, "name": "Latest" }
  ]
}
```

---

### getDrama(44)

```
{
  "status": 200,
  "data": {
    "name": "Love in Seoul",
    "poster": "https://cdn.example/poster.jpg",
    "description": "A romantic comedy between..."
  },
  "episodes": [
    {
      "episodeNumber": 1,
      "id": 5001,
      "name": "Episode 1",
      "videoUrl": "https://stream.example/ep1.m3u8"
    },
    {
      "episodeNumber": 2,
      "id": 5002,
      "name": "Episode 2",
      "videoUrl": "https://stream.example/ep2.m3u8"
    }
  ]
}
```

---

### searchDrama("putri")

```
{
  "status": 200,
  "data": [
    {
      "id": 605,
      "name": "Putri Mahkota",
      "poster": "https://cdn.example/putri1.jpg",
      "genres": ["Drama", "Historical"]
    },
    {
      "id": 606,
      "name": "Putri Salju",
      "poster": "https://cdn.example/putri2.jpg",
      "genres": ["Fantasy"]
    }
  ]
}
```

---

### getEpisode(44, 1)

```
{
  "status": 200,
  "data": {
    "episodeNumber": 1,
    "id": 5001,
    "name": "Episode 1",
    "videoUrl": "https://stream.example/ep1.m3u8",
    "isLocked": false,
    "duration": 0,
    "current": true,
    "isWatched": false
  }
}
```

---

## Lisensi

MIT License
