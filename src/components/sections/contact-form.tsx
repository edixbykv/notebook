"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { siteConfig, services } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "A few more words would help us help you.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    // No backend in this build: open the user's mail client with a
    // pre-filled enquiry, then show the success state.
    const subject = encodeURIComponent(
      `New enquiry from ${form.name}${form.service ? ` — ${form.service}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`
    );

    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = `${siteConfig.emailHref}?subject=${subject}&body=${body}`;
      }
      setStatus("success");
    }, 700);
  };

  const field =
    "w-full rounded-lg border-2 border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/40 transition-colors focus:border-marker focus:outline-none";

  return (
    <div className="relative rounded-2xl bg-paper-deep p-6 shadow-paper sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink">
              Thanks, {form.name.split(" ")[0] || "there"}!
            </h3>
            <p className="mt-2 max-w-sm text-ink-soft">
              Your enquiry is on its way. We&apos;ll get back to you within one
              business day. Prefer to talk now? Call{" "}
              <a
                href={siteConfig.phoneHref}
                className="font-bold text-marker"
              >
                {siteConfig.phoneDisplay}
              </a>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-bold text-ink"
                >
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className={cn(field, errors.name && "border-marker")}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-marker">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-bold text-ink"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className={cn(field, errors.email && "border-marker")}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-marker">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-bold text-ink"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className={field}
                  placeholder="+91 ..."
                />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="mb-1.5 block text-sm font-bold text-ink"
                >
                  Interested in
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className={field}
                >
                  <option value="">Choose a service…</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-bold text-ink"
              >
                How can we help? *
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className={cn(field, "resize-none", errors.message && "border-marker")}
                placeholder="Tell us a little about your business and goals…"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-marker">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-marker px-6 py-3.5 font-bold text-paper shadow-[0_4px_0_0_#9b2420] transition-all hover:bg-marker-deep active:translate-y-0.5 disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send enquiry <Send className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-ink/50">
              We&apos;ll never share your details. Free consultation, zero
              pressure.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
