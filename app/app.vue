<script setup lang="ts">
import { ArrowUpRight, Menu, Monitor, Moon, Sun, X, Zap } from '@lucide/vue'
import { computed, ref } from 'vue'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const colorMode = useColorMode()
const selectedTheme = computed({
  get: () => colorMode.preference,
  set: (value: string) => {
    colorMode.preference = value
  },
})
const menuOpen = ref(false)
const navigation = [
  { label: 'Platform', href: '#platform' },
  { label: 'Cara kerja', href: '#cara-kerja' },
  { label: 'Tentang', href: '#tentang' },
]
const pillars = [
  { number: '01', title: 'Terhubung', description: 'Satukan aset energi terdistribusi dalam satu ekosistem yang saling memahami.', icon: 'network' },
  { number: '02', title: 'Terukur', description: 'Ubah data operasional menjadi gambaran yang bisa dipercaya dan ditindaklanjuti.', icon: 'activity' },
  { number: '03', title: 'Terbuka', description: 'Bangun di atas standar terbuka agar inovasi energi dapat tumbuh bersama.', icon: 'open' },
]
</script>

<template>
  <div class="site-shell">
    <NuxtRouteAnnouncer />
    <header class="site-header">
      <a class="brand" href="#top" aria-label="OpenDER, beranda">
        <span class="brand-mark"><Zap :size="18" :stroke-width="2.5" /></span>
        <span>open<span class="brand-light">DER</span></span>
      </a>
      <nav class="desktop-nav" aria-label="Navigasi utama">
        <a v-for="item in navigation" :key="item.href" :href="item.href" class="nav-link">{{ item.label }}</a>
      </nav>
      <div class="header-actions">
        <ToggleGroup v-model="selectedTheme" type="single" variant="outline" size="sm" class="theme-switch" aria-label="Pilih tema">
          <ToggleGroupItem value="system" aria-label="Tema sistem" title="Ikuti sistem"><Monitor :size="15" /></ToggleGroupItem>
          <ToggleGroupItem value="light" aria-label="Tema terang" title="Tema terang"><Sun :size="15" /></ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Tema gelap" title="Tema gelap"><Moon :size="15" /></ToggleGroupItem>
        </ToggleGroup>
        <a class="header-cta" href="#platform">Jelajahi <ArrowUpRight :size="15" /></a>
        <button class="menu-button" type="button" :aria-expanded="menuOpen" aria-controls="mobile-navigation" :aria-label="menuOpen ? 'Tutup menu' : 'Buka menu'" @click="menuOpen = !menuOpen">
          <X v-if="menuOpen" :size="20" /><Menu v-else :size="20" />
        </button>
      </div>
      <nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="Navigasi utama">
        <a v-for="item in navigation" :key="item.href" :href="item.href" class="nav-link" @click="menuOpen = false">
          {{ item.label }} <ArrowUpRight :size="15" />
        </a>
        <a class="mobile-cta" href="#platform" @click="menuOpen = false">Jelajahi OpenDER <ArrowUpRight :size="15" /></a>
      </nav>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-shade" />
        <div class="hero-content">
          <p class="hero-eyebrow"><span />ENERGI TERDISTRIBUSI, DALAM SATU EKOSISTEM</p>
          <h1 id="hero-title">Masa depan energi<br>ada di <em>sekitar kita.</em></h1>
          <p class="hero-description">OpenDER menghubungkan sumber daya energi lokal menjadi jaringan yang lebih cerdas, tangguh, dan terbuka untuk semua.</p>
          <div class="hero-actions">
            <a class="button-primary" href="#platform">Kenali platform <ArrowUpRight :size="16" /></a>
            <a class="button-secondary" href="#cara-kerja">Cara kerja OpenDER</a>
          </div>
        </div>
        <div class="hero-caption"><span>ENERGI BERSIH, DEKAT DENGAN KITA</span><span>01 <i>/</i> 03</span></div>
      </section>

      <section id="platform" class="intro-section">
        <div class="intro-label"><span>01</span><span>TENTANG OPEN DER</span></div>
        <div class="intro-copy">
          <h2>Energi tidak lagi hanya datang dari jauh.</h2>
          <div class="intro-detail">
            <p>Panel surya, baterai, kendaraan listrik, dan berbagai sumber daya lokal sedang mengubah cara energi diproduksi dan digunakan.</p>
            <p>OpenDER menghadirkan fondasi digital agar semua bagian itu dapat bekerja bersama, memberi kendali lebih besar pada komunitas dan membuka jalan bagi sistem energi yang lebih berkelanjutan.</p>
            <a class="underlined-link" href="#cara-kerja">Temukan pendekatannya <ArrowUpRight :size="15" /></a>
          </div>
        </div>
      </section>

      <section id="cara-kerja" class="pillars-section">
        <div class="pillars-heading">
          <div><p class="section-kicker">CARA KERJA</p><h2>Satu jaringan.<br><span>Banyak kemungkinan.</span></h2></div>
          <p class="pillars-lede">Infrastruktur energi yang lebih baik dimulai dari cara kita terhubung.</p>
        </div>
        <div class="pillars-grid">
          <article v-for="pillar in pillars" :key="pillar.number" class="pillar">
            <div class="pillar-topline"><span>{{ pillar.number }}</span><ArrowUpRight :size="16" /></div>
            <div class="pillar-icon" :class="`icon-${pillar.icon}`" aria-hidden="true">
              <span v-if="pillar.icon === 'network'" class="network-glyph"><i /><i /><i /></span>
              <span v-else-if="pillar.icon === 'activity'" class="activity-glyph"><i /><i /><i /><i /></span>
              <span v-else class="open-glyph"><ArrowUpRight :size="19" /></span>
            </div>
            <h3>{{ pillar.title }}</h3><p>{{ pillar.description }}</p>
          </article>
        </div>
      </section>

      <section id="tentang" class="closing-section">
        <div class="closing-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div class="closing-content">
          <p class="section-kicker">LANGKAH BERIKUTNYA</p>
          <h2>Energi masa depan<br>dibangun <em>bersama.</em></h2>
          <a class="button-primary" href="mailto:hello@opender.org">Mari terhubung <ArrowUpRight :size="16" /></a>
        </div>
        <span class="closing-note">OPEN BY DESIGN <i>·</i> READY FOR WHAT'S NEXT</span>
      </section>
    </main>

    <footer class="site-footer">
      <a class="footer-brand" href="#top">open<span>DER</span></a>
      <span class="footer-note">Membangun sistem energi yang lebih terbuka.</span>
      <div class="footer-links"><a href="#platform">Platform</a><a href="#tentang">Tentang</a><span>© 2026 OpenDER</span></div>
    </footer>
  </div>
</template>

<style>
:root { color-scheme: light; }
:root.dark { color-scheme: dark; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; }
.site-shell {
  --page: #f6f8f3; --paper: #fff; --ink: #192b23; --muted: #75827a;
  --line: #e2e8df; --green: #16734e; --green-soft: #e6f2e9;
  min-height: 100vh; color: var(--ink); background: var(--page);
  font-family: 'Geist Variable', 'Geist', sans-serif;
  transition: color 180ms ease, background-color 180ms ease;
}
.dark .site-shell {
  --page: #111a16; --paper: #18231d; --ink: #e6eee8; --muted: #9aa99f;
  --line: #2d3b33; --green: #75c99a; --green-soft: #20372a;
}
.site-header {
  position: relative; z-index: 2; display: flex; width: min(1180px, calc(100% - 72px));
  height: 76px; align-items: center; justify-content: space-between; margin-inline: auto;
}
.brand, .footer-brand { display: inline-flex; align-items: center; gap: 9px; color: var(--ink); font-size: 19px; font-weight: 700; text-decoration: none; }
.brand-mark { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 8px; color: white; background: #19764f; }
.brand-light, .footer-brand span { color: var(--green); }
.desktop-nav { display: flex; height: 100%; align-items: center; gap: 34px; margin-left: 60px; }
.nav-link { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); font-size: 13px; font-weight: 500; text-decoration: none; transition: color 160ms ease; }
.nav-link:hover, .nav-link:focus-visible, .footer-links a:hover { color: var(--green); }
.header-actions { display: flex; align-items: center; gap: 17px; }
.theme-switch { padding: 3px; border: 1px solid var(--line); border-radius: 8px; background: var(--paper); }
.theme-switch [data-state='on'] { color: var(--green); background: var(--green-soft); }
.header-cta, .mobile-cta { display: inline-flex; align-items: center; gap: 8px; color: var(--ink); font-size: 12px; font-weight: 600; text-decoration: none; }
.menu-button { display: none; width: 36px; height: 36px; place-items: center; border: 1px solid var(--line); border-radius: 8px; color: var(--ink); background: var(--paper); }
.mobile-nav { display: none; }
.hero {
  position: relative; display: flex; min-height: 575px; align-items: center; overflow: hidden; color: #fff;
  background-color: #274538;
  background-image: url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=85');
  background-position: center 54%; background-size: cover; isolation: isolate; animation: hero-arrive 700ms ease-out both;
}
.hero-shade { position: absolute; z-index: -1; inset: 0; background: rgb(13 34 25 / 56%); }
.hero-content { width: min(1180px, calc(100% - 72px)); margin: -13px auto 0; }
.hero-eyebrow, .section-kicker, .intro-label, .hero-caption, .closing-note { font-size: 10px; font-weight: 650; letter-spacing: 1.35px; }
.hero-eyebrow { display: flex; align-items: center; gap: 11px; margin: 0 0 22px; color: rgb(255 255 255 / 82%); }
.hero-eyebrow > span { width: 22px; height: 1px; background: #a9e4bd; }
h1, h2, h3, p { overflow-wrap: break-word; }
h1 { max-width: 760px; margin: 0; font-size: 64px; font-weight: 520; line-height: 1.05; }
h1 em, .closing-content h2 em { color: #b8e5c6; font-style: normal; }
.hero-description { max-width: 475px; margin: 20px 0 0; color: rgb(255 255 255 / 83%); font-size: 15px; line-height: 1.75; }
.hero-actions { display: flex; align-items: center; gap: 22px; margin-top: 27px; }
.button-primary { display: inline-flex; min-height: 43px; align-items: center; justify-content: center; gap: 10px; padding: 0 16px; border-radius: 6px; color: #173526; background: #c1e9cc; font-size: 12px; font-weight: 650; text-decoration: none; transition: background-color 160ms ease, transform 160ms ease; }
.button-primary:hover { background: #d5f1dc; transform: translateY(-1px); }
.button-secondary { color: #fff; font-size: 12px; font-weight: 550; text-decoration-color: rgb(255 255 255 / 55%); text-underline-offset: 5px; }
.hero-caption { position: absolute; right: max(36px, calc((100vw - 1180px) / 2)); bottom: 25px; left: max(36px, calc((100vw - 1180px) / 2)); display: flex; justify-content: space-between; color: rgb(255 255 255 / 70%); font-size: 8px; }
.hero-caption i, .closing-note i { margin-inline: 4px; color: #b8e5c6; font-style: normal; }
.intro-section { display: grid; width: min(1180px, calc(100% - 72px)); grid-template-columns: .62fr 1.38fr; gap: 56px; margin-inline: auto; padding: 84px 0 94px; }
.intro-label { display: flex; align-items: center; gap: 13px; color: var(--muted); font-size: 9px; }
.intro-label span:first-child { color: var(--green); }
.intro-copy { display: grid; grid-template-columns: 1fr .8fr; align-items: start; gap: 48px; }
.intro-copy h2, .pillars-heading h2, .closing-content h2 { margin: 0; font-size: 32px; font-weight: 520; line-height: 1.2; }
.intro-detail p { margin: 0 0 14px; color: var(--muted); font-size: 12px; line-height: 1.8; }
.underlined-link { display: inline-flex; align-items: center; gap: 7px; margin-top: 4px; color: var(--green); font-size: 11px; font-weight: 650; text-decoration: none; }
.pillars-section { padding: 76px max(36px, calc((100vw - 1180px) / 2)) 85px; background: var(--paper); }
.pillars-heading { display: flex; align-items: end; justify-content: space-between; gap: 30px; margin-bottom: 43px; }
.section-kicker { margin: 0 0 15px; color: var(--green); font-size: 9px; }
.pillars-heading h2 span { color: var(--green); }
.pillars-lede { max-width: 260px; margin: 0 0 4px; color: var(--muted); font-size: 12px; line-height: 1.7; }
.pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
.pillar { min-width: 0; padding: 19px 27px 0 0; }
.pillar + .pillar { padding-left: 27px; border-left: 1px solid var(--line); }
.pillar-topline { display: flex; align-items: center; justify-content: space-between; color: var(--muted); font-size: 10px; }
.pillar-topline svg { color: var(--green); }
.pillar-icon { display: flex; height: 76px; align-items: center; color: var(--green); }
.network-glyph { position: relative; display: block; width: 39px; height: 34px; background: linear-gradient(30deg, transparent 48%, currentColor 49%, currentColor 51%, transparent 52%), linear-gradient(150deg, transparent 48%, currentColor 49%, currentColor 51%, transparent 52%); }
.network-glyph i { position: absolute; width: 9px; height: 9px; border: 2px solid var(--green); border-radius: 50%; background: var(--paper); }
.network-glyph i:nth-child(1) { top: 0; left: 15px; }
.network-glyph i:nth-child(2) { bottom: 0; left: 0; }
.network-glyph i:nth-child(3) { right: 0; bottom: 0; }
.activity-glyph { display: flex; height: 29px; align-items: center; gap: 5px; border-bottom: 1px solid currentColor; }
.activity-glyph i { display: block; width: 4px; border-radius: 3px 3px 0 0; background: currentColor; }
.activity-glyph i:nth-child(1) { height: 12px; }
.activity-glyph i:nth-child(2) { height: 22px; }
.activity-glyph i:nth-child(3) { height: 16px; }
.activity-glyph i:nth-child(4) { height: 27px; }
.open-glyph { display: grid; width: 32px; height: 32px; place-items: center; border: 1px solid color-mix(in srgb, var(--green) 45%, transparent); border-radius: 50%; }
.pillar h3 { margin: 0; font-size: 17px; font-weight: 570; }
.pillar > p { max-width: 290px; margin: 9px 0 0; color: var(--muted); font-size: 11px; line-height: 1.75; }
.closing-section { position: relative; display: flex; min-height: 340px; align-items: center; overflow: hidden; padding: 58px max(36px, calc((100vw - 1180px) / 2)); color: #f4f7f3; background: #173d2c; }
.closing-content { position: relative; z-index: 1; }
.closing-content .section-kicker { color: #a9dabb; }
.closing-content h2 { margin-bottom: 23px; font-size: 37px; }
.closing-orbit { position: absolute; top: 50%; right: 12%; width: 300px; height: 300px; border: 1px solid rgb(193 233 204 / 15%); border-radius: 50%; transform: translateY(-50%); }
.closing-orbit::before, .closing-orbit::after { position: absolute; inset: 28px; border: 1px solid rgb(193 233 204 / 18%); border-radius: 50%; content: ''; }
.closing-orbit::after { inset: 64px; }
.closing-orbit > span { position: absolute; z-index: 1; width: 9px; height: 9px; border-radius: 50%; background: #b8e5c6; }
.closing-orbit > span:nth-child(1) { top: 36px; left: 74px; }
.closing-orbit > span:nth-child(2) { top: 139px; right: 14px; }
.closing-orbit > span:nth-child(3) { bottom: 24px; left: 100px; }
.closing-note { position: absolute; right: max(36px, calc((100vw - 1180px) / 2)); bottom: 24px; color: rgb(255 255 255 / 55%); font-size: 8px; }
.site-footer { display: flex; width: min(1180px, calc(100% - 72px)); min-height: 78px; align-items: center; justify-content: space-between; gap: 16px; margin-inline: auto; }
.footer-brand { font-size: 15px; }
.footer-note, .footer-links { color: var(--muted); font-size: 10px; }
.footer-links { display: flex; align-items: center; gap: 18px; }
.footer-links a { color: inherit; text-decoration: none; }
@keyframes hero-arrive { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }
@media (max-width: 760px) {
  .site-header, .hero-content, .intro-section, .site-footer { width: calc(100% - 40px); }
  .site-header { height: 68px; }
  .desktop-nav, .header-cta { display: none; }
  .header-actions { gap: 10px; }
  .menu-button { display: grid; }
  .mobile-nav { position: absolute; top: 59px; right: 0; left: 0; display: grid; gap: 2px; padding: 9px; border: 1px solid var(--line); border-radius: 8px; background: var(--paper); box-shadow: 0 12px 30px rgb(25 43 35 / 10%); }
  .mobile-nav .nav-link, .mobile-cta { justify-content: space-between; padding: 11px 10px; }
  .mobile-cta { margin-top: 4px; border-top: 1px solid var(--line); color: var(--green); }
  .hero { min-height: 565px; background-position: 57% center; }
  .hero-content { margin-top: -5px; }
  h1 { font-size: 44px; }
  .hero-description { max-width: 420px; font-size: 13px; }
  .hero-caption { right: 20px; left: 20px; }
  .intro-section { grid-template-columns: 1fr; gap: 26px; padding: 55px 0 60px; }
  .intro-copy { grid-template-columns: 1fr; gap: 20px; }
  .intro-copy h2, .pillars-heading h2 { font-size: 29px; }
  .pillars-section { padding: 55px 20px 60px; }
  .pillars-heading { display: block; margin-bottom: 28px; }
  .pillars-lede { margin-top: 15px; }
  .pillars-grid { grid-template-columns: 1fr; }
  .pillar, .pillar + .pillar { display: grid; grid-template-columns: 1fr auto; padding: 17px 0 19px; border-left: 0; border-bottom: 1px solid var(--line); }
  .pillar-topline { grid-column: 1 / -1; }
  .pillar-icon { grid-row: 2 / span 2; grid-column: 2; height: 54px; justify-content: end; }
  .pillar h3, .pillar > p { grid-column: 1; }
  .pillar > p { max-width: 280px; margin-top: 5px; }
  .closing-section { min-height: 320px; padding: 48px 20px; }
  .closing-content h2 { font-size: 33px; }
  .closing-orbit { right: -190px; opacity: .55; }
  .closing-note { right: 20px; font-size: 7px; }
  .site-footer { min-height: 96px; flex-wrap: wrap; justify-content: space-between; gap: 8px 14px; padding-block: 15px; }
  .footer-note { order: 1; width: 100%; }
  .footer-links { gap: 10px; font-size: 9px; }
}
@media (max-width: 390px) {
  .site-header, .hero-content, .intro-section, .site-footer { width: calc(100% - 30px); }
  .header-actions { gap: 7px; }
  .theme-switch [data-slot='toggle-group-item'] { min-width: 27px; padding-inline: 5px; }
  h1 { font-size: 39px; }
  .hero-actions { align-items: flex-start; flex-direction: column; gap: 16px; }
  .footer-links { gap: 8px; }
}
</style>
