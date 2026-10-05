# Imkerei-TikTok — TikTok-Video für Imkerei Falman

Ein mit **Remotion** gerendertes vertikales Kurzvideo (TikTok/Reels/Shorts-Format).

| Parameter | Wert |
|---|---|
| Auflösung | 1080 × 1920 (9:16) |
| Länge | 21 s (630 Frames @ 30 fps) |
| Codec | H.264, ~3,6 Mbps, 9,4 MB |
| Sprache | Deutsch (Zielgruppe: Kunden in Frechen/Köln) |
| Audio | ohne — **im TikTok-App einen Trendingsound drüberlegen** (erhöht die Reichweite) |

**Fertiges Video:** [`out/tiktok.mp4`](out/tiktok.mp4)

## Dramaturgie (TikTok-Formel: Hook in Sekunde 1)

| Szene | Zeit | Inhalt |
|---|---|---|
| 1 · Hook | 0–2,4 s | „Diesen HONIG gibt's nicht im SUPERMARKT" — Kinetic Type, Biene fliegt durch |
| 2 · Imker | 2,4–6,5 s | „Direkt vom Imker. Aus Frechen." + Badge „100% naturbelassen" |
| 3 · Sorten | 6,5–13,5 s | 3 Produktkarten mit Count-up-Preisen: Blütenhonig 9,50 € · Akazienhonig 14,00 € · Wabenhonig 18,00 € |
| 4 · Service | 13,5–17 s | Selbstabholung in Frechen / Lieferung |
| 5 · CTA | 17–21 s | Logo + FALMAN + **imkerei-falman.de** (Pill mit Shine) + Adresse |

## Motion-Design (angewandte Skills)

- **Emil Kowalski** (Animations on the Web): Custom-Easing `cubic-bezier(.23,1,.32,1)`, keine Animation ab `scale(0)` (Start bei 0,9), Spring-Physics mit leichtem Overshoot, schnelle Exits — Motion mit Absicht, nicht dekorativ.
- **Impeccable** (pbakaus): Persuade-Modus (Marketing), „Design-Director ohne Kompromisse", Überprüfung in begrenzten Durchläufen (Rendern → Inspektion → ein Fix-Batch → fertig).
- **Taste**: bewusste Paletten-Reduktion: warmes Near-Black `#100D07`, Honig-Amber-Gradient `#FFD24A → #FF9E00`, Creme-Text; Archivo Black (Display) + Inter (Text); Filmkorn + Vignette + waben-SVG-Drift für Tiefe.
- **HyperFrames** (HeyGen): Short-Form-Standards — Hook in Sekunde 1, neuer Beat alle 2–3 s, Safe-Zones für TikTok-UI, Fortschrittsbalken oben.
- **Remotion**: Rahmen für kompositionsbasiertes Rendering (React → Frames → ffmpeg).

## Verwendung

```bash
npm install
npm run render    # → out/tiktok.mp4
npm run studio    # Remotion Studio zur Feinjustierung
```

Texte/Preise: `src/TikTok.tsx` (Szenen), Design-Tokens: `src/theme.ts`, Biene/Hintergrund: `src/components.tsx`.

## Rechtliches (bewusst geprüft)

Keine Heilversprechen, kein „Bio" (keine Zertifizierung), Preise = Katalog, nur sensorische Beschreibungen. Domain verweist auf die kanonische Seite https://imkerei-falman.de.

## Veröffentlichung auf TikTok

1. `out/tiktok.mp4` herunterladen
2. In der TikTok-App hochladen, **Trendingsound auswählen** (Audio-Stummfilm läuft, wenn Ton gewünscht ist, separat mischen)
3. Hashtags: #imkerei #honig #frechen #honigkaufen #imker #nlw? — lokal: #frechen #kerpen #köln
4. Bio: „Imkerei Falman · Frechen · imkerei-falman.de"
