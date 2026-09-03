import { createFileRoute } from "@tanstack/react-router";
import heroStreet from "@/assets/hero-street.png";
import { ScrollSection } from "@/components/scroll-section";
import {
  Store,
  MapPin,
  Clock,
  Heart,
  Search,
  ShoppingBag,
  Users,
  Smartphone,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MNO — Discover  your neighbourhood, straight from your street" },
      {
        name: "description",
        content:
          "MNO is hyperlocal application that provides discovery of your place — kirana, bakery, flowers, tailors.and connects you to the community",
      },
      { property: "og:title", content: "MNO — Discover your neighbourhood" },
      {
        property: "og:description",
        content:
          "Discover and buy from the shops around the corner. Hyperlocal shopping with real neighbourhood stores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// TODO: add real links
const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.wa.mno&pli=1";
const IOS_APP_URL = "https://apps.apple.com/app/id6754495909";
const PARTNER_URL = "";
const WHATSAPP_NUMBER = "";
const WHATSAPP_URL = `https://wa.me/${914116945}?text=${encodeURIComponent(
  "Hi Neighbour! I'd like to know when you launch in my area.",
)}`;

const chips = [
  { icon: MapPin, label: "Within Walking Distance" },
  { icon: Clock, label: "Live shop timings" },
  { icon: Store, label: "Local shops" },
  { icon: Heart, label: "Loved locally" },
];

const categories = [
  {
    count: "500+",
    title: "Kirana",
    tag: "Atta, dal, chai — the daily stuff.",
    color: "bg-cyan",
    items: ["Groceries", "Snacks", "Household"],
  },
  {
    count: "120+",
    title: "Fresh",
    tag: "Picked this morning, not last week.",
    color: "bg-green",
    items: ["Fruits & veg", "Dairy", "Bakery"],
  },
  {
    count: "80+",
    title: "Services",
    tag: "The uncle who actually fixes it.",
    color: "bg-pink",
    items: ["Tailors", "Repairs", "Laundry"],
  },
  {
    count: "60+",
    title: "Gifting",
    tag: "Flowers before the shop shuts.",
    color: "bg-purple",
    items: ["Florists", "Cakes", "Stationery"],
  },
];

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Discover",
    body: "Drop a pin. We only show shops you can actually walk to.",
    color: "bg-yellow",
  },
  {
    n: "02",
    icon: ShoppingBag,
    title: "Explore",
    body: "Choose that is correct for you.",
    color: "bg-cyan",
  },
  {
    n: "03",
    icon: Store,
    title: "Connect",
    body: "Get connected to the community.",
    color: "bg-green",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 px-4 pt-4">
        <nav className="brutal mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full bg-card px-5 py-3">
          <span className="font-display text-4xl leading-none tracking-wide text-cerulean">
            MNO
          </span>
          <div className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide md:flex">
            <a href="#shops" className="hover:text-cerulean">
              Shops
            </a>
            <a href="#how" className="hover:text-cerulean">
              How it works
            </a>
            <a href="#partner" className="hover:text-cerulean">
              Your Place
            </a>
          </div>
          <a
            href="#join"
            className="brutal brutal-hover rounded-full bg-cyan px-5 py-2 text-sm font-bold uppercase tracking-wide"
          >
            Contact Us
          </a>
        </nav>
      </header>

      <ScrollSection initialVisible className="mx-auto max-w-6xl px-4 pt-14 pb-8 text-center">
        <h1 className="font-display text-4xl leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
        Near
          <br />
          <span className="text-pink">Your Place </span>,{" "} <br />
          <span className="text-purple">at your pace</span>,
          <br />
          <span className="text-cerulean">close to home</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base font-medium text-muted-foreground sm:text-lg">
          MNO puts every the neighbourhood within walking distance of you in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.wa.mno&pli=1"
            className="brutal-lg brutal-hover flex items-center gap-2 rounded-full bg-cyan px-8 py-4 font-display text-xl uppercase"
          >
            <Smartphone className="size-5" strokeWidth={2.5} />
            Android
          </a>
          <a
            href="https://apps.apple.com/app/id6754495909"
            className="brutal-lg brutal-hover flex items-center gap-2 rounded-full bg-yellow px-8 py-4 font-display text-xl uppercase"
          >
            <Smartphone className="size-5" strokeWidth={2.5} />
            iOS
          </a>
          <a
            href="https://mno.co.in/pqr"
            className="brutal brutal-hover rounded-full bg-card px-8 py-4 font-display text-xl uppercase"
          >
            List my shop
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-bold uppercase tracking-widest sm:text-sm">
          {chips.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <c.icon className="size-4" strokeWidth={2.5} />
              {c.label}
            </span>
          ))}
        </div>

        <div className="brutal-lg mt-12 overflow-hidden rounded-3xl bg-card p-3">
          <img
            src={heroStreet}
            alt="Illustrated neighbourhood street with bilingual Kannada and English shop signs for a kirana store, bakery, flower shop and tailor"
            width={1408}
            height={912}
            className="w-full rounded-2xl"
          />
        </div>
      </ScrollSection>

      <ScrollSection id="shops" className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
          What's around you
        </p>
        <h2 className="mt-3 text-center font-display text-4xl uppercase sm:text-5xl">
          More choices, one app
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <article
              key={c.title}
              className={`brutal brutal-hover rounded-card flex min-w-0 flex-col overflow-hidden ${c.color} p-6 text-left`}
            >
              <p className="font-display text-4xl leading-none">{c.count}</p>
              <h3 className="mt-2 text-2xl uppercase leading-tight">{c.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-snug">{c.tag}</p>
              <ul className="mt-5 space-y-2 border-t-[3px] border-border pt-4 text-sm font-bold uppercase leading-snug tracking-wide">
                {c.items.map((i) => (
                  <li key={i} className="break-words">
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </ScrollSection>

      <ScrollSection id="how" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center font-display text-4xl uppercase sm:text-5xl">
          Three steps. That's it.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <article
              key={s.n}
              className="brutal rounded-card flex min-w-0 flex-col overflow-hidden bg-card p-7 pb-8"
            >
              <div
                className={`brutal flex size-14 shrink-0 items-center justify-center rounded-card-sm ${s.color}`}
              >
                <s.icon className="size-7" strokeWidth={2.5} />
              </div>
              <p className="mt-5 font-display text-sm tracking-[0.3em] text-muted-foreground">
                {s.n}
              </p>
              <h3 className="mt-1 text-2xl uppercase leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </ScrollSection>

      <ScrollSection id="partner" className="mx-auto max-w-6xl px-4 py-16">
        <div className="brutal-lg rounded-card-lg grid gap-8 overflow-hidden bg-purple p-8 sm:p-12 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.3em]">For Local places </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">
            Make Your Place Discoverable
            </h2>
            <p className="mt-4 max-w-md font-semibold leading-relaxed">
              One app to Manage all your requirements.
            </p>
            <a
              href="https://mno.co.in/pqr"
              className="brutal brutal-hover mt-7 inline-block rounded-full bg-card px-7 py-3 font-display text-lg uppercase"
            >
              Partner with us
            </a>
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            {[
              { k: "₹0", v: "Zero joining fee" },
              { k: "1 : 1 ", v: "Chat with Customers" },
              { k: "24/7", v: "Get discovered" },
              { k: "100%", v: "Your business" },
            ].map((s) => (
              <div
                key={s.k}
                className="brutal flex min-w-0 flex-col overflow-hidden rounded-[1.25rem] bg-card p-5"
              >
                <p className="font-display text-3xl leading-none">{s.k}</p>
                <p className="mt-2 text-xs font-bold uppercase leading-snug tracking-wide text-muted-foreground">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      <ScrollSection id="join" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="brutal-lg overflow-hidden rounded-[1.75rem] bg-cyan p-8 sm:p-12">
          <Users className="mx-auto size-9" strokeWidth={2.5} />
          <h2 className="mt-4 font-display text-4xl uppercase sm:text-5xl">
            Be first in your area
          </h2>
          <p className="mt-3 font-semibold">
            We open one neighbourhood at a time. Message us on WhatsApp and we'll ping you
            the day MNO lands on your street.
          </p>
          <a
            href="https://wa.me/914116945"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-lg brutal-hover mx-auto mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-pink px-8 py-4 font-display text-lg uppercase"
          >
            <MessageCircle className="size-5" strokeWidth={2.5} />
            Chat on WhatsApp
          </a>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest">
            
          </p>
        </div>
      </ScrollSection>

      <footer className="border-t-[3px] border-border px-4 py-10 text-center">
        <p className="font-display text-3xl uppercase text-cerulean">MNO</p>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          Copyright © {new Date().getFullYear()} MNO. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
