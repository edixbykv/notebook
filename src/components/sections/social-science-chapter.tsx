"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Compass,
  Map,
  Clock,
  Download,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sun,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Quiz Data based on Chapter 1 Document
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the true shape of the Earth?",
    options: [
      "Perfect Sphere",
      "Oblate Spheroid (bulging at centre, flat at poles)",
      "Flat Circle",
      "Oval Ellipse",
    ],
    correct: 1,
    explanation:
      "Earth is an oblate spheroid. It bulges at the Equator (12,756 km) and is slightly flattened at the Poles (12,714 km).",
  },
  {
    id: 2,
    question: "At what angle is the Earth's axis tilted relative to its orbital plane?",
    options: ["23.5°", "66.5°", "90°", "45°"],
    correct: 1,
    explanation:
      "The Earth's axis is tilted at an angle of 66.5° (or 66.5 degrees) relative to its orbital plane.",
  },
  {
    id: 3,
    question: "How much time difference corresponds to 1 degree of longitude?",
    options: ["1 minute", "4 minutes", "15 minutes", "1 hour"],
    correct: 1,
    explanation:
      "Earth rotates 360° in 24 hours (15° per hour). Therefore, 1° of longitude equals 4 minutes of time difference.",
  },
  {
    id: 4,
    question: "Which line serves as the Standard Meridian for Indian Standard Time (IST)?",
    options: ["0° Prime Meridian", "82.5° E", "180° Date Line", "23.5° N"],
    correct: 1,
    explanation:
      "82.5° E longitude passing near Mirzapur (UP) is taken as the Standard Meridian of India, which is GMT +5:30.",
  },
];

export function SocialScienceChapter() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [calcDegrees, setCalcDegrees] = useState<number>(30); // for longitude time calculator

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  // Time difference in minutes = degrees * 4
  const timeDiffMinutes = calcDegrees * 4;
  const timeHours = Math.floor(timeDiffMinutes / 60);
  const timeMinsRemaining = timeDiffMinutes % 60;

  return (
    <div className="space-y-12 text-ink">
      {/* Chapter Introduction Banner */}
      <div className="rounded-2xl border border-ink/15 bg-paper-deep p-6 shadow-notebook sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-paper font-display text-xl font-bold">
              01
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-marker">
                Awareness Social Sciences &bull; Class VI
              </span>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Locating Places and Reading Maps
              </h2>
            </div>
          </div>

          <a
            href="/documents/social-science-chap-1.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-marker px-4 py-2.5 text-xs font-bold text-ink transition-transform hover:scale-105 shadow-md"
          >
            <Download className="h-4 w-4" />
            Download PDF Document (6 MB)
          </a>
        </div>

        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          Social Science helps us explore how we live as social beings, our interactions within society,
          and our relationship with the land and environment. Unlike physical sciences with single answers,
          social science develops critical spatial awareness.
        </p>

        {/* Section Quick Links */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-ink/10">
          <a href="#section-globe" className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink-soft border border-ink/10 hover:bg-ink hover:text-paper transition-colors">
            1. Globe &amp; Axis
          </a>
          <a href="#section-latitudes" className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink-soft border border-ink/10 hover:bg-ink hover:text-paper transition-colors">
            2. Latitudes &amp; Heat Zones
          </a>
          <a href="#section-longitudes" className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink-soft border border-ink/10 hover:bg-ink hover:text-paper transition-colors">
            3. Longitudes &amp; Time
          </a>
          <a href="#section-maps" className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink-soft border border-ink/10 hover:bg-ink hover:text-paper transition-colors">
            4. Maps &amp; Components
          </a>
          <a href="#section-quiz" className="rounded-full bg-marker/20 px-3 py-1 text-xs font-bold text-marker-deep border border-marker/30 hover:bg-marker transition-colors">
            5. Knowledge Quiz
          </a>
        </div>
      </div>

      {/* SECTION 1: SHAPE OF EARTH & GLOBE */}
      <section id="section-globe" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-marker text-ink">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            1. Shape of Earth and the Globe
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-ink/15 bg-paper p-6 shadow-paper">
            <h4 className="font-display text-lg font-bold text-ink">The Oblate Spheroid</h4>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              Earth is shaped like an <strong>oblate spheroid</strong> — bulging at the Equator and flat at the top and bottom.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-ink-soft font-semibold">
              <li className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                <span>Equatorial Diameter:</span>
                <span className="font-mono text-ink">12,756 km</span>
              </li>
              <li className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                <span>Polar Diameter:</span>
                <span className="font-mono text-ink">12,714 km</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Orbital Tilt Angle:</span>
                <span className="font-mono text-marker-deep font-bold">66.5° to orbital plane</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-ink/15 bg-paper-deep p-6 shadow-paper flex flex-col justify-center items-center text-center">
            {/* Interactive Visual Widget: Globe Diagram */}
            <div className="relative h-40 w-40 rounded-full border-4 border-ink/20 bg-gradient-to-tr from-blue-900 via-emerald-800 to-amber-200 shadow-inner flex items-center justify-center">
              {/* Tilted Axis Line */}
              <div className="absolute h-48 w-1 bg-marker rounded-full rotate-[23.5deg]" />
              <span className="absolute -top-6 text-xs font-bold text-ink">North Pole</span>
              <span className="absolute -bottom-6 text-xs font-bold text-ink">South Pole</span>
              {/* Equator Line */}
              <div className="absolute w-full h-0.5 bg-paper/80 border-t border-dashed border-ink" />
              <span className="text-xs font-bold text-paper bg-ink/70 px-2 py-0.5 rounded-full z-10">
                Equator 0°
              </span>
            </div>
            <p className="mt-8 font-hand text-base text-ink-soft">
              A globe is a 3D model showing landmasses, oceans, and the tilted axis of rotation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: LATITUDES & HEAT ZONES */}
      <section id="section-latitudes" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-paper">
            <Sun className="h-5 w-5 text-marker" />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            2. Latitudes &amp; Heat Zones of Earth
          </h3>
        </div>

        <div className="rounded-xl border border-ink/15 bg-paper p-6 shadow-paper space-y-6">
          <p className="text-sm leading-relaxed text-ink-soft">
            <strong>Latitudes</strong> are imaginary horizontal circles drawn parallel to the Equator. They measure distance North or South of the Equator in degrees (°).
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
              <span className="inline-block rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-paper">
                Torrid Zone
              </span>
              <h5 className="mt-2 font-display text-base font-bold text-ink">Direct Sunlight</h5>
              <p className="mt-1 text-xs text-ink-soft">
                Between Tropic of Cancer (23.5° N) &amp; Tropic of Capricorn (23.5° S). Receives maximum heat.
              </p>
            </div>

            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4">
              <span className="inline-block rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-paper">
                Temperate Zone
              </span>
              <h5 className="mt-2 font-display text-base font-bold text-ink">Moderate Climate</h5>
              <p className="mt-1 text-xs text-ink-soft">
                Between Tropics and Polar Circles (23.5° to 66.5° N/S). Sun rays strike at slanting angles.
              </p>
            </div>

            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
              <span className="inline-block rounded bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-paper">
                Frigid Zone
              </span>
              <h5 className="mt-2 font-display text-base font-bold text-ink">Extremely Cold</h5>
              <p className="mt-1 text-xs text-ink-soft">
                Beyond Arctic/Antarctic Circles (66.5° to 90° N/S). Sun never rises high above horizon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LONGITUDES & TIME CALCULATOR */}
      <section id="section-longitudes" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-marker text-ink">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            3. Longitudes &amp; Interactive Time Zone Calculator
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-ink/15 bg-paper p-6 shadow-paper space-y-3">
            <h4 className="font-display text-lg font-bold text-ink">Understanding Longitude &amp; Time</h4>
            <p className="text-sm leading-relaxed text-ink-soft">
              Longitudes run vertically from North to South Pole. The <strong>0° Prime Meridian</strong> passes through Greenwich, London.
            </p>
            <div className="rounded-lg bg-paper-deep p-4 text-xs font-mono space-y-1 text-ink">
              <p>• 360° Rotation = 24 Hours</p>
              <p>• 15° Longitude = 1 Hour (60 mins)</p>
              <p>• 1° Longitude = 4 Minutes</p>
              <p className="text-marker-deep font-bold mt-2">
                • Indian Standard Time (IST) = 82.5° E (GMT +5 hours 30 mins)
              </p>
            </div>
          </div>

          {/* Interactive Calculator Widget */}
          <div className="rounded-xl border border-ink/15 bg-paper-deep p-6 shadow-notebook space-y-4">
            <h4 className="font-display text-base font-bold text-ink flex items-center gap-2">
              <Clock className="h-4 w-4 text-marker" />
              Interactive Time Difference Calculator
            </h4>
            <p className="text-xs text-ink-soft">
              Slide to select degrees of longitude difference from GMT:
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-ink">
                <span>Longitude Offset:</span>
                <span className="font-mono text-marker-deep">{calcDegrees}° East</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="7.5"
                value={calcDegrees}
                onChange={(e) => setCalcDegrees(parseFloat(e.target.value))}
                className="w-full accent-marker cursor-pointer"
              />
            </div>

            <div className="rounded-lg bg-paper p-4 border border-ink/10 text-center">
              <span className="text-xs font-semibold text-ink-soft">Calculated Time Difference:</span>
              <div className="mt-1 font-display text-2xl font-bold text-ink">
                +{timeHours} hrs {timeMinsRemaining > 0 ? `${timeMinsRemaining} mins` : ""}
              </div>
              <p className="mt-1 font-hand text-sm text-marker-deep">
                ({calcDegrees} degrees &times; 4 mins/degree = {timeDiffMinutes} mins ahead of Greenwich)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MAPS AND COMPONENTS */}
      <section id="section-maps" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-paper">
            <Map className="h-5 w-5 text-marker" />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            4. Maps, Types &amp; Essential Components
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-ink/15 bg-paper p-5 shadow-paper">
            <span className="text-xs font-bold text-marker uppercase tracking-widest">Type 1</span>
            <h4 className="mt-1 font-display text-lg font-bold text-ink">Physical Maps</h4>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed">
              Show natural relief features of the Earth such as mountains, plateaus, plains, rivers, and oceans.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 bg-paper p-5 shadow-paper">
            <span className="text-xs font-bold text-marker uppercase tracking-widest">Type 2</span>
            <h4 className="mt-1 font-display text-lg font-bold text-ink">Political Maps</h4>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed">
              Show boundaries of countries, states, districts, towns, and cities with political administrative divisions.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 bg-paper p-5 shadow-paper">
            <span className="text-xs font-bold text-marker uppercase tracking-widest">Type 3</span>
            <h4 className="mt-1 font-display text-lg font-bold text-ink">Thematic Maps</h4>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed">
              Focus on specific information such as rainfall distribution, road maps, forests, industries, or population.
            </p>
          </div>
        </div>

        {/* 3 Key Components Card */}
        <div className="rounded-xl border border-ink/15 bg-paper-deep p-6 shadow-paper space-y-4">
          <h4 className="font-display text-lg font-bold text-ink">The 3 Key Components of a Map</h4>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-paper font-bold text-xs">
                1
              </div>
              <div>
                <h5 className="font-bold text-sm text-ink">Distance &amp; Scale</h5>
                <p className="text-xs text-ink-soft mt-0.5">
                  Ratio between map distance and real ground distance (e.g. 1 cm = 100 km).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-paper font-bold text-xs">
                2
              </div>
              <div>
                <h5 className="font-bold text-sm text-ink">Directions &amp; Compass</h5>
                <p className="text-xs text-ink-soft mt-0.5">
                  4 Cardinal directions (N, S, E, W) and 4 Intermediate points (NE, SE, NW, SW).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-paper font-bold text-xs">
                3
              </div>
              <div>
                <h5 className="font-bold text-sm text-ink">Symbols &amp; Legend</h5>
                <p className="text-xs text-ink-soft mt-0.5">
                  International conventional signs for roads, railways, rivers, bridges &amp; forests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: KNOWLEDGE QUIZ WIDGET */}
      <section id="section-quiz" className="space-y-6 scroll-mt-24">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-marker text-ink">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            5. Interactive Knowledge Quiz
          </h3>
        </div>

        <div className="rounded-2xl border border-ink/15 bg-paper p-6 shadow-notebook sm:p-8 space-y-6">
          <p className="text-sm text-ink-soft">
            Test your understanding of Chapter 1 concepts. Select your answers below:
          </p>

          <div className="space-y-8">
            {QUIZ_QUESTIONS.map((q, qIdx) => (
              <div key={q.id} className="rounded-xl border border-ink/10 bg-paper-deep p-5 space-y-3">
                <h4 className="font-display text-base font-bold text-ink">
                  Q{qIdx + 1}. {q.question}
                </h4>

                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    const isCorrect = q.correct === optIdx;
                    const showSuccess = submitted && isCorrect;
                    const showWrong = submitted && isSelected && !isCorrect;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={cn(
                          "flex items-center justify-between rounded-lg p-3 text-left text-xs font-semibold transition-all border",
                          isSelected
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/15 bg-paper text-ink-soft hover:bg-paper-deep hover:text-ink",
                          showSuccess && "border-green-600 bg-green-500/20 text-green-950 font-bold",
                          showWrong && "border-red-600 bg-red-500/20 text-red-950"
                        )}
                      >
                        <span>{opt}</span>
                        {showSuccess && <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />}
                        {showWrong && <XCircle className="h-4 w-4 text-red-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <p className="mt-2 text-xs font-medium text-ink-soft bg-paper p-3 rounded-md border border-ink/10">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Quiz Action / Results */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink/10">
            {!submitted ? (
              <Button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                variant="ink"
                size="lg"
              >
                Submit Quiz Answers
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-marker px-4 py-2 text-ink font-display text-lg font-bold shadow-sm">
                  Score: {calculateScore()} / {QUIZ_QUESTIONS.length}
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="text-xs font-bold text-ink underline hover:text-marker-deep"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
