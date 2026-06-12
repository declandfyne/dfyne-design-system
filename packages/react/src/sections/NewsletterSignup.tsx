"use client";

import { useRef } from "react";

export function NewsletterSignup({
  onSubmit,
  className = "",
}: {
  onSubmit: (email: string) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = inputRef.current?.value.trim();
    if (email) onSubmit(email);
  };

  return (
    <section className={`bg-[#f9f9f9] px-4 py-12 text-center md:px-6 ${className}`.trim()}>
      <h2 className="text-[14px] font-semibold uppercase tracking-[1.5px] text-black">
        Join the community
      </h2>
      <p className="mt-2 text-[11px] text-black/60">
        Sign up for exclusive drops, early access and training tips.
      </p>
      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-[400px] gap-2">
        <input
          ref={inputRef}
          type="email"
          placeholder="Your email address"
          className="h-[42px] flex-1 rounded-[4px] border border-[#e7e7e7] bg-white px-3 text-[12px] outline-none focus:border-black"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-[50px] bg-[#111111] px-[20px] py-[13px] text-[9px] font-semibold uppercase tracking-[2.7px] text-white transition-opacity hover:opacity-90"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
