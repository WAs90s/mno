import { createFileRoute } from "@tanstack/react-router";
import heroStreet from "@/assets/hero-street.png";
import { Store, MapPin, Clock, Heart, Search, ShoppingBag, Users, Smartphone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MNO — Shop your neighbourhood, straight from your street" },
      {
        name: "description",
        content:
          "MNO is hyperlocal shopping from the shops on your street — kirana, bakery, flowers, tailors. Real shops, real people, right around the corner.",
      },
      { property: "og:title", content: "MNO — Shop your neighbourhood" },
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
const ANDROID_APP_URL = "";
const IOS_APP_URL = "";
const PARTNER_URL = "";

const chips = [
  { icon: MapPin, label: "Within 2 km" },
  { icon: Clock, label: "Live shop timings" },
  { icon: Store, label: "Real local shops" },
  { icon: Heart, label: "Zero markup" },
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
    title: "Set your street",
    body: "Drop a pin. We only show shops you can actually walk to.",
    color: "bg-yellow",
  },
  {
    n: "02",
    icon: ShoppingBag,
    title: "Browse and reserve",
    body: "See what's in stock across shops and hold it in your name.",
    color: "bg-cyan",
  },
  {
    n: "03",
    icon: Store,
    title: "Pick it up",
    body: "Walk in, say your name, pay at the counter. That's the whole thing.",
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
              For shops
            </a>
          </div>
          <a
            href="#join"
            className="brutal brutal-hover rounded-full bg-cyan px-5 py-2 text-sm font-bold uppercase tracking-wide"
          >
            Get the app
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-14 pb-8 text-center">
        <h1 className="font-display text-4xl leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
          Shopping from
          <br />
          <span className="text-pink">your street</span>,{" "}
          <span className="text-purple">your shops</span>,
          <br />
          <span className="text-cerulean">your people</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base font-medium text-muted-foreground sm:text-lg">
          MNO puts every shop within 2 km of you in one place — see what's in stock, reserve
          it, and pick it up on your way home.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.wa.mno&pli=1"
            className="brutal-lg brutal-hover flex items-center gap-2 rounded-full bg-cyan px-8 py-4 font-display text-xl uppercase"
          >
            <Smartphone className="size-5" strokeWidth={2.5} />
            Start shopping — Android
          </a>
          <a
            href="https://apps.apple.com/app/id6754495909"
            className="brutal-lg brutal-hover flex items-center gap-2 rounded-full bg-yellow px-8 py-4 font-display text-xl uppercase"
          >
            <Smartphone className="size-5" strokeWidth={2.5} />
            Start shopping — iOS
          </a>
          <a
            href={PARTNER_URL}
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
      </section>

      <section id="shops" className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
          What's around you
        </p>
        <h2 className="mt-3 text-center font-display text-4xl uppercase sm:text-5xl">
          More shops, one app
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <article
              key={c.title}
              className={`brutal brutal-hover rounded-3xl ${c.color} p-6 text-left`}
            >
              <p className="font-display text-4xl">{c.count}</p>
              <h3 className="mt-1 text-2xl uppercase">{c.title}</h3>
              <p className="mt-2 text-sm font-semibold">{c.tag}</p>
              <ul className="mt-5 space-y-2 border-t-[3px] border-border pt-4 text-sm font-bold uppercase tracking-wide">
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center font-display text-4xl uppercase sm:text-5xl">
          Three steps. That's it.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.n} className="brutal rounded-3xl bg-card p-7">
              <div
                className={`brutal flex size-14 items-center justify-center rounded-2xl ${s.color}`}
              >
                <s.icon className="size-7" strokeWidth={2.5} />
              </div>
              <p className="mt-5 font-display text-sm tracking-[0.3em] text-muted-foreground">
                {s.n}
              </p>
              <h3 className="mt-1 text-2xl uppercase">{s.title}</h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="partner" className="mx-auto max-w-6xl px-4 py-16">
        <div className="brutal-lg grid gap-8 rounded-3xl bg-purple p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em]">For shop owners</p>
            <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
              Your shop, online by evening
            </h2>
            <p className="mt-4 max-w-md font-semibold">
              No commission for the first six months. No warehouse, no app to learn — a
              WhatsApp message is enough to get your first customer walking in.
            </p>
            <a
              href={PARTNER_URL}
              className="brutal brutal-hover mt-7 inline-block rounded-full bg-card px-7 py-3 font-display text-lg uppercase"
            >
              Partner with us
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { k: "0%", v: "commission for 6 months" },
              { k: "2 km", v: "average shopper distance" },
              { k: "2,400+", v: "orders every week" },
              { k: "4.8★", v: "average shop rating" },
            ].map((s) => (
              <div key={s.k} className="brutal rounded-2xl bg-card p-5">
                <p className="font-display text-3xl">{s.k}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="brutal-lg rounded-3xl bg-cyan p-8 sm:p-12">
          <Users className="mx-auto size-9" strokeWidth={2.5} />
          <h2 className="mt-4 font-display text-4xl uppercase sm:text-5xl">
            Be first in your area
          </h2>
          <p className="mt-3 font-semibold">
            We open one neighbourhood at a time. Leave your number and we'll ping you the
            day MNO lands on your street.
          </p>
          <form
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="tel"
              required
              placeholder="Your phone number"
              className="brutal w-full rounded-full bg-card px-5 py-3 font-semibold outline-none focus:shadow-[2px_2px_0_0_var(--color-border)]"
            />
            <button
              type="submit"
              className="brutal brutal-hover rounded-full bg-pink px-7 py-3 font-display text-lg uppercase"
            >
              Notify me
            </button>
          </form>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest">
            2,000+ people already on the list
          </p>
        </div>
      </section>

      <footer className="border-t-[3px] border-border px-4 py-10 text-center">
        <p className="font-display text-3xl uppercase text-cerulean">MNO</p>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          Copyright © {new Date().getFullYear()} MNO. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
