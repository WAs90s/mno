import { createFileRoute } from "@tanstack/react-router";
import type { MouseEvent } from "react";

import {
  Store,
  MapPin,
  MessageCircle,
  Bike,
  Search,
  HeartHandshake,
  Clock,
  IndianRupee,
} from "lucide-react";

import heroShops from "@/assets/hero-shops.jpg";
import { Nav } from "@/components/site/Nav";
import { Marquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
import { ScrollScene, Parallax, ScrollProgressBar } from "@/components/site/ScrollScene";
import { PinnedScene, ScrollZoom, ScrollWords } from "@/components/site/PinnedScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MNO" },
      {
        name: "description",
        content:
          "MNO connects you to the places on your own street. Search local stock, chat with the counter and pick up in minutes.",
      },
      { property: "og:title", content: "MNO — Shop your neighbourhood" },
      {
        property: "og:description",
        content:
          "Find what you need at the bakery, kirana, florist and tailor around the corner. Chat, reserve, pick up.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.wa.mno&pli=1";
const IOS_APP_URL = "https://apps.apple.com/app/id6754495909";
const PARTNER_URL = "/pqr/";

const WHATSAPP_URL = `https://wa.me/914116945?text=${encodeURIComponent(
  "Hi! I'd like to know when MNO launches in my area.",
)}`;

function openPartnerApp(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.location.assign(PARTNER_URL);
}

const categories = [
  "Temple",
  "Tailor",
  "Florist",
  "Kirana",
  "Bakery",
  "Chai stall",
  "Pharmacy",
  "Hardware",
  "Stationery",
  "Fruit cart",
  "Salon",
];

const steps = [
  {
    icon: Search,
    color: "bg-pink",
    kicker: "Step one",
    title: "Search your street",
    body: "Type what you need. MNO shows only places within a short walk of you.",
  },
  {
    icon: MessageCircle,
    color: "bg-grape",
    kicker: "Step two",
    title: "Chat with the place",
    body: "Ask if it's in stock, agree a price, reserve it. Real people, no call centre.",
  },
  {
    icon: Bike,
    color: "bg-leaf",
    kicker: "Step three",
    title: "Pick up or get it dropped",
    body: "Walk over in five minutes, or let them send it across the lane.",
  },
];

const stats = [
  { value: "500+", label: "places listed" },
  { value: "0%", label: "hidden fees" },
  { value: "100%", label: "transparent pricing" },
];
const perks = [
  { icon: MapPin, title: "Only what's near", body: "Nothing from a warehouse three cities away." },
  { icon: Clock, title: "Make Your Move", body: "Access great places and experiences across the city." },
  {
    icon: IndianRupee,
    title: "Keep More in Your Wallet",
    body: "Enjoy better prices without unnecessary platform markups.",
  },
  { icon: HeartHandshake, title: "Faces, not accounts", body: "Chat with the person at the counter." },
];

function Home() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <ScrollProgressBar />
      <Nav />

      <PinnedScene heightVh={340} className="relative">
        {(pinProgress) => (
          <div className="relative mx-auto w-full max-w-5xl px-4 pt-16 text-center sm:px-6">
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-4"
              style={{
                opacity: 1 - Math.min(Math.max(pinProgress / 0.28, 0), 1),
                transform: `translateY(-50%) scale(${1 - Math.min(Math.max(pinProgress / 0.28, 0), 1) * 0.12})`,
              }}
            >
              <p className="display text-4xl leading-[1.2] sm:text-6xl md:text-7xl">
                Hi there, <span className="text-blue">neighbour</span>.
              </p>
              <span className="mt-4 inline-block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Scroll to walk down your lane
              </span>
            </div>

            <div
              className="flex justify-center"
              style={{ opacity: Math.min(Math.max((pinProgress - 0.04) / 0.14, 0), 1) }}
            >
              <ScrollZoom
                src={heroShops}
                alt="A row of neighbourhood places: bakery, kirana store, florist, tailor and a chai stall"
                p={pinProgress}
                from={0.18}
                to={1}
                start={0.12}
                end={0.85}
              />
            </div>
            <h1
              className="mt-8 pb-3 text-4xl leading-[1.25] sm:text-5xl md:text-6xl"
              style={{ opacity: Math.min(Math.max((pinProgress - 0.26) / 0.1, 0), 1) }}
            >
              <ScrollWords
                p={pinProgress}
                start={0.32}
                end={0.85}
                words={[
                  { text: "Everything" },
                  { text: "you" },
                  { text: "need," },
                  { text: "already", color: "text-pink" },
                  { text: "on", color: "text-grape" },
                  { text: "your", color: "text-leaf" },
                  { text: "lane.", color: "text-sky" },
                ]}
              />
            </h1>
            <p
              className="mx-auto mt-4 max-w-md text-sm font-semibold tracking-widest text-muted-foreground uppercase sm:text-base"
              style={{
                opacity: Math.min(Math.max((pinProgress - 0.7) / 0.25, 0), 1),
                transform: `translateY(${(1 - Math.min(Math.max((pinProgress - 0.7) / 0.25, 0), 1)) * 16}px)`,
              }}
            >
             
            </p>
          </div>
        )}
      </PinnedScene>

      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <p className="text-base text-muted-foreground sm:text-lg">
              MNO connects you to the bakery, kirana, florist and tailor around the corner. Search
              what they have, chat, and pick it up before your tea goes cold.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-col items-center gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={ANDROID_APP_URL}
                className="display rounded-full border-2 border-ink bg-primary px-8 py-4 text-lg shadow-pop transition-transform hover:-translate-y-1 active:translate-y-0"
              >
                Get the app
              </a>
              <a
                href="#join"
                className="display rounded-full border-2 border-ink bg-card px-8 py-4 text-lg shadow-pop-sm transition-transform hover:-translate-y-1 active:translate-y-0"
              >
                Notify me
              </a>
            </div>
            <span className="flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              <span className="animate-blink inline-block h-2 w-2 rounded-full bg-leaf" />
              Live in neighbourhoods
            </span>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 border-y-2 border-ink bg-secondary py-5">
        <Parallax speed={26}>
          <Marquee items={categories} />
          <div className="mt-3">
            <Marquee items={categories} reverse fast />
          </div>
        </Parallax>
      </section>

      <section id="how" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal direction="right">
            <p className="display text-sm tracking-[0.2em] text-muted-foreground">Inside</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 max-w-2xl text-4xl sm:text-5xl">
              Three taps between you and the counter
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <ScrollScene key={s.title} className="h-full" lift={90} tilt={i % 2 === 0 ? -2 : 2}>
                <article
                  className={`pop-card h-full p-6 transition-transform duration-300 hover:-translate-y-2 ${
                    i % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1"
                  }`}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full border-2 border-ink ${s.color}`}
                  >
                    <s.icon className="h-6 w-6 text-ink" strokeWidth={2.4} />
                  </span>
                  <p className="mt-5 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    {s.kicker}
                  </p>
                  <h3 className="mt-2 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                </article>
              </ScrollScene>
            ))}
          </div>
        </div>
      </section>

      <section id="places" className="border-y-2 border-ink bg-sun px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <ScrollScene key={s.label} className="text-center" lift={60} scale={0.75}>
              <p className="display text-5xl sm:text-6xl">{s.value}</p>
              <p className="mt-2 text-sm font-semibold tracking-widest uppercase">{s.label}</p>
            </ScrollScene>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="max-w-2xl text-4xl sm:text-5xl">
              Big-app convenience, <span className="text-sky">corner-shop</span> soul
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {perks.map((perk, i) => (
              <Reveal
                key={perk.title}
                delay={(i % 2) * 0.12}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div className="flex h-full items-start gap-4 rounded-2xl border-2 border-dashed border-ink/30 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink bg-card shadow-pop-sm">
                    <perk.icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <div>
                    <h3 className="text-xl">{perk.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{perk.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="owners" className="px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-5xl">
          <ScrollScene lift={110} scale={0.9} tilt={-2}>
            <div className="pop-card grid items-center gap-8 bg-secondary p-8 sm:p-12 md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="display text-sm tracking-[0.2em] text-muted-foreground">
                  For You
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl">
                  Your place, online in ten minutes. No commission.
                </h2>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                 Connect with your customers.
                </p>
                <a
                  href={PARTNER_URL}
                  onClick={openPartnerApp}
                  className="display mt-7 inline-block rounded-full border-2 border-ink bg-accent px-6 py-3 shadow-pop-sm transition-transform hover:-translate-y-1"
                >
                  List my place
                </a>
              </div>
              <div className="flex justify-center">
                <span
                  style={{ ["--tilt" as string]: "-4deg" }}
                  className="animate-float grid h-40 w-40 place-items-center rounded-3xl border-2 border-ink bg-card shadow-pop"
                >
                  <Store className="h-16 w-16" strokeWidth={2} />
                </span>
              </div>
            </div>
          </ScrollScene>
        </div>
      </section>

      <section id="join" className="border-t-2 border-ink bg-ink px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-4xl text-background sm:text-5xl">
              Get MNO in your <span className="text-primary">neighbourhood</span>
            </h2>
            <p className="mt-4 text-sm text-background/70 sm:text-base">
              Message us on WhatsApp and we'll tell you the day your street goes live.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="display inline-flex items-center gap-2 rounded-full border-2 border-ink bg-primary px-8 py-4 text-lg shadow-pop transition-transform hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
                Chat on WhatsApp
              </a>
              <p className="text-xs text-background/50">
                Or download:{" "}
                <a href={ANDROID_APP_URL} className="underline hover:text-background">
                  Android
                </a>
                {" · "}
                <a href={IOS_APP_URL} className="underline hover:text-background">
                  iOS
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-ink px-4 pb-10 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 border-t border-background/15 pt-6 text-xs text-background/60 sm:flex-row">
          <span className="display text-base text-background">MNO</span>
          <span>Built for the places around the corner.</span>
        </div>
      </footer>
    </div>
  );
}
