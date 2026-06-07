"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Pencil,
  Eraser,
  Trash2,
  X,
  Palette,
  Minus,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
  { name: "Marker Red", value: "#E53935" },
  { name: "Ink Black", value: "#111111" },
  { name: "Sticky Yellow", value: "#F9B233" },
  { name: "Blue", value: "#1E88E5" },
  { name: "Green", value: "#2E7D32" },
];

const BRUSH_MIN = 2;
const BRUSH_MAX = 28;

type Point = { x: number; y: number };

export function DrawingLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<Point | null>(null);
  const dprRef = useRef(1);

  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState(COLORS[0].value);
  const [size, setSize] = useState(6);
  const [hasDrawing, setHasDrawing] = useState(false);

  // keep refs in sync for use inside event handlers
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const sizeRef = useRef(size);
  toolRef.current = tool;
  colorRef.current = color;
  sizeRef.current = size;

  const setupContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
  }, []);

  // size the canvas to the viewport, preserving any existing drawing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    // snapshot existing pixels
    const prev = document.createElement("canvas");
    prev.width = canvas.width;
    prev.height = canvas.height;
    const prevCtx = prev.getContext("2d");
    if (prevCtx && canvas.width > 0) prevCtx.drawImage(canvas, 0, 0);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    setupContext();

    // restore previous drawing scaled to the new backing store
    const ctx = ctxRef.current;
    if (ctx && prev.width > 0) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(prev, 0, 0);
      ctx.restore();
    }
  }, [setupContext]);

  useEffect(() => {
    resizeCanvas();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(resizeCanvas);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [resizeCanvas]);

  const getPoint = (e: PointerEvent): Point => ({
    x: e.clientX,
    y: e.clientY,
  });

  const applyStroke = useCallback((from: Point, to: Point) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (toolRef.current === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = sizeRef.current * 2.4;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth = sizeRef.current;
    }
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }, []);

  const dot = useCallback((p: Point) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (toolRef.current === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(p.x, p.y, sizeRef.current * 1.2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = colorRef.current;
      ctx.beginPath();
      ctx.arc(p.x, p.y, sizeRef.current / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // pointer handlers, only active when `enabled`
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const onDown = (e: PointerEvent) => {
      if (e.button !== undefined && e.button !== 0 && e.pointerType === "mouse")
        return;
      drawingRef.current = true;
      const p = getPoint(e);
      lastRef.current = p;
      dot(p);
      setHasDrawing(true);
      canvas.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      if (!drawingRef.current || !lastRef.current) return;
      // coalesced events => smoother lines
      const events =
        "getCoalescedEvents" in e
          ? (e.getCoalescedEvents() as PointerEvent[])
          : [e];
      let prev = lastRef.current;
      for (const ev of events.length ? events : [e]) {
        const p = getPoint(ev);
        applyStroke(prev, p);
        prev = p;
      }
      lastRef.current = prev;
      e.preventDefault();
    };

    const onUp = (e: PointerEvent) => {
      drawingRef.current = false;
      lastRef.current = null;
      try {
        canvas.releasePointerCapture?.(e.pointerId);
      } catch {
        /* noop */
      }
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [enabled, applyStroke, dot]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setHasDrawing(false);
  }, []);

  const toggleEnabled = () => {
    setEnabled((v) => {
      const next = !v;
      if (next) setOpen(true);
      return next;
    });
  };

  return (
    <>
      {/* The drawing surface. pointer-events toggles with `enabled` so the
          site stays fully clickable when not drawing. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[60] h-full w-full",
          enabled
            ? "pointer-events-auto cursor-crosshair touch-none"
            : "pointer-events-none"
        )}
      />

      {/* Floating toolbar */}
      <div className="pointer-events-none fixed bottom-20 right-4 z-[70] flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
        {/* expanded controls */}
        <div
          className={cn(
            "pointer-events-auto origin-bottom-right transition-all duration-300",
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-95 opacity-0"
          )}
        >
          <div className="paper-card w-[15.5rem] -rotate-1 p-3 shadow-paper-lift">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-hand text-lg font-bold text-ink">
                Sketch pad
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Collapse drawing controls"
                className="rounded-full p-1 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* tool toggle */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setTool("pen");
                  setEnabled(true);
                }}
                aria-pressed={enabled && tool === "pen"}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-md border-2 px-2 py-2 text-sm font-semibold transition-all",
                  enabled && tool === "pen"
                    ? "border-marker bg-marker text-paper"
                    : "border-ink/15 bg-paper text-ink hover:border-ink/30"
                )}
              >
                <Pencil className="h-4 w-4" /> Pen
              </button>
              <button
                onClick={() => {
                  setTool("eraser");
                  setEnabled(true);
                }}
                aria-pressed={enabled && tool === "eraser"}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-md border-2 px-2 py-2 text-sm font-semibold transition-all",
                  enabled && tool === "eraser"
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 bg-paper text-ink hover:border-ink/30"
                )}
              >
                <Eraser className="h-4 w-4" /> Eraser
              </button>
            </div>

            {/* colors */}
            <div className="mb-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink/50">
                <Palette className="h-3.5 w-3.5" /> Colour
              </div>
              <div className="flex items-center gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      setColor(c.value);
                      setTool("pen");
                      setEnabled(true);
                    }}
                    aria-label={c.name}
                    style={{ backgroundColor: c.value }}
                    className={cn(
                      "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
                      color === c.value && tool === "pen"
                        ? "border-ink ring-2 ring-ink/20 ring-offset-1 ring-offset-paper"
                        : "border-white/70"
                    )}
                  />
                ))}
                <label
                  className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-ink/30"
                  title="Custom colour"
                  style={{
                    background:
                      "conic-gradient(red, orange, yellow, green, cyan, blue, magenta, red)",
                  }}
                >
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                      setTool("pen");
                      setEnabled(true);
                    }}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    aria-label="Pick a custom colour"
                  />
                </label>
              </div>
            </div>

            {/* brush size */}
            <div className="mb-3">
              <div className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink/50">
                <span>Brush</span>
                <span className="tabular-nums text-ink/70">{size}px</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSize((s) => Math.max(BRUSH_MIN, s - 2))}
                  aria-label="Smaller brush"
                  className="rounded-md border-2 border-ink/15 p-1 text-ink hover:border-ink/30"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <input
                  type="range"
                  min={BRUSH_MIN}
                  max={BRUSH_MAX}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  aria-label="Brush size"
                  className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-ink/15 accent-marker"
                />
                <button
                  onClick={() => setSize((s) => Math.min(BRUSH_MAX, s + 2))}
                  aria-label="Bigger brush"
                  className="rounded-md border-2 border-ink/15 p-1 text-ink hover:border-ink/30"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* clear */}
            <button
              onClick={clearCanvas}
              disabled={!hasDrawing}
              className="flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-ink/15 bg-paper py-2 text-sm font-semibold text-ink transition-colors enabled:hover:border-marker enabled:hover:text-marker disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" /> Clear canvas
            </button>

            <p className="mt-2 text-center font-hand text-sm leading-tight text-ink/45">
              Doodle anywhere — it clears on refresh.
            </p>
          </div>
        </div>

        {/* main FAB */}
        <button
          onClick={open ? toggleEnabled : () => setOpen(true)}
          aria-label={
            enabled ? "Drawing mode on — tap to stop" : "Open sketch pad"
          }
          aria-pressed={enabled}
          className={cn(
            "pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full shadow-paper-lift transition-all duration-300 hover:scale-105 active:scale-95",
            enabled
              ? "bg-marker text-paper ring-4 ring-marker/25"
              : "bg-ink text-paper"
          )}
        >
          {enabled ? (
            <Pencil className="h-6 w-6" />
          ) : (
            <Palette className="h-6 w-6" />
          )}
        </button>
      </div>
    </>
  );
}
