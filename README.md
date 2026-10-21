# A Little Universe Called Sowmi 💙
### An Interactive Birthday Surprise Website

A cinematic, emotional, and interactive birthday website built for **Sowmiya** (Sowmi). Designed with a dreamy sky-blue to midnight-blue celestial theme, smooth Framer Motion transitions, interactive birthday cake & candles, vertical chaptered story timeline, photo gallery with lightbox, and a heartfelt birthday letter.

---

## ✨ Features & Stages

1. **Stage 1: The Opening**
   - Full-screen dreamy blue sky with stars, moonlight, and floating particles.
   - Animated typography: *"Hey, Sowmi 💙"*
   - Gentle reveal trigger: *"Open Your Surprise ✨"*

2. **Stage 2: The Birthday Celebration**
   - Interactive SVG birthday cake with flickering candles.
   - Click candles or the *"Make a Wish ✨"* button to blow them out.
   - Gentle celestial confetti burst (sky blue, ice blue, soft gold).
   - Warm wish reveal and navigation.

3. **Stage 3: Our Unexpected Story**
   - Scroll-triggered vertical timeline detailing the journey from school days to long late-night calls.
   - Chapters 1 through 5 with meaningful timestamps, badges, and glowing timeline trails.

4. **Stage 4: Our Memories**
   - **Section A (Her Moments):** Responsive photo cards showcasing Sowmi's photos with tap-to-expand lightbox.
   - **Section B (An Unexpected Memory):** Framed reveal for the wedding photograph with a glowing unlock interaction.
   - **Graceful Fallbacks:** If photos have not been placed yet, celestial placeholder cards show exact filenames without broken image icons.

5. **Stage 5: A Letter for Sowmi**
   - Deep midnight blue celestial card with an interactive sealed envelope.
   - Click *"Open Your Letter 💌"* to slide up and reveal the full birthday letter with authentic sentiments.

6. **Stage 6: The Final Secret**
   - Midnight-blue starry sky with sequential emotional thoughts.
   - A subtle hint of affection: *"Some people become our favourites without even trying. You just happen to be one of mine. 🌙"*
   - *"Replay This Little Universe ↺"* to reset the experience.

---

## 📸 How to Add Photographs

All photographs should be saved directly in the `public/images/` folder.

| Image Type | File Path | Description |
|---|---|---|
| **Sowmi Solo 1** | `public/images/sowmi-01.jpg` | First solo photograph of Sowmi |
| **Sowmi Solo 2** | `public/images/sowmi-02.jpg` | Second solo photograph of Sowmi |
| **Sowmi Solo 3** | `public/images/sowmi-03.jpg` | Third solo photograph of Sowmi |
| **Together** | `public/images/our-memory.jpg` | Photo of Sowmi and you at the wedding |

### Editing Gallery Data (Adding / Modifying Photos)
The gallery is 100% data-driven. To add more photographs, edit titles, or change captions, open:
`src/data/galleryData.js`

```javascript
export const soloMemories = [
  {
    id: 1,
    title: "Her Radiance",
    subtitle: "A smile that lights up any room",
    src: "/images/sowmi-01.jpg",
    alt: "Sowmiya's photograph 1",
    tag: "Radiance",
    note: "Some smiles carry a warmth that stays with you long after the conversation ends."
  },
  // Add more entries here...
];
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Vercel (Free & Instant)

You can deploy this website to Vercel in just 2 minutes:

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push this project to your GitHub repository (e.g. `github.com/your-username/fav-girl`).
2. Log in to [vercel.com](https://vercel.com).
3. Click **"Add New..."** → **"Project"**.
4. Import your GitHub repository.
5. Framework preset will automatically detect **Vite**.
6. Click **Deploy**. Your custom URL (e.g. `https://a-little-universe-called-sowmi.vercel.app`) will be live instantly!

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 💌 Suggested Sharing Messages

### 📲 WhatsApp Message (Ready to send):
> *"Happy Birthday, Sowmi! 💙🎂*  
> *I made a little something for you.*  
> *Open it whenever you're free. ✨*  
> *https://your-vercel-domain.vercel.app"*

### 📸 Instagram Story Caption:
> *"Some people make ordinary days a little more special. 💙🌙*  
> *A little something for someone's special day... ✨"*

---

## 🛠️ Tech Stack
- **Framework:** React 18 with Vite
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS with custom glow shadows & keyframe animations
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Confetti:** Canvas Confetti
- **Audio:** Web Audio API ambient chime synthesizer (Starts muted, strictly NO autoplay)
