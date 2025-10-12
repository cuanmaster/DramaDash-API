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
        "id": 58,
        "name": "Balikan Cinta dengan Mantan Suami",
        "poster": "<url_poster>",
        "desc": "",
        "viewCount": "2.1m",
        "tags": [
          "Eksklusif"
        ],
        "gendres": [
          "Romansa Miliuner",
          "CEO",
          "Kawin Paksa",
          "Balas Dendam"
        ]
      },
      ...
    ],
    "trending": [
      {
        "id": 59,
        "name": "Aku Curiga Istriku Ingin Membunuhku Musim 2",
        "poster": "<url_poster>",
        "genres": [
          "Romansa Miliuner",
          "Hubungan Keluarga",
          "Balas Dendam",
          "Identitas Rahasia",
          "CEO"
        ]
      },
      ...
    ],
    "drama": [
      {
        "id": 58,
        "name": "Balikan Cinta dengan Mantan Suami",
        "poster": "<url_poster>",
        "desc": "",
        "viewCount": "2.1m",
        "tags": [
          "Eksklusif"
        ],
        "gendres": [
          "Romansa Miliuner",
          "CEO",
          "Kawin Paksa",
          "Balas Dendam"
        ]
      },
      ...
    ]
  },
  "tabs": [
    {
      "id": null,
      "name": "Populer"
    },
    {
      "id": 2,
      "name": "Baru"
    },
    {
      "id": 3,
      "name": "Trending"
    },
    {
      "id": 4,
      "name": "Romansa"
    },
    {
      "id": 5,
      "name": "CEO"
    }
  ]
}
```

---

### getDrama(44)

```
{
  "status": 200,
  "data": {
    "name": "Menikah dengan Orang Asing",
    "poster": "<url_poster>",
    "description": "Lily pura-pura menjadi tunangan Tristan demi merebut hati ibunya."
  },
  "episodes": [
    {
      "id": 2862,
      "episodeNumber": 1,
      "isLocked": false,
      "isLiked": false,
      "isWatched": false,
      "duration": 0,
      "current": true,
      "videoUrl": "<url_video>",
      "subtitles": [
        {
          "language": "id",
          "languageDisplayName": "Indonesian",
          "url": "<url_caption / url_subtitle>"
        },
        {
          "language": "pt",
          "languageDisplayName": "Portuguese",
          "url": "<url_caption / url_subtitle>"
        },
        ....
      ]
    },
    ...
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
    "id": 2862,
    "episodeNumber": 1,
    "isLocked": false,
    "isLiked": false,
    "isWatched": false,
    "duration": 0,
    "current": true,
    "videoUrl": "<url_video>",
    "subtitles": [
      {
        "language": "de",
        "languageDisplayName": "German",
        "url": "<url_track>"
      },
      ...
    ]
  }
}
```

---

## Lisensi

MIT License
