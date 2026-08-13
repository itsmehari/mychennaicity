"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  archetypeById,
  scoreWhichChennai,
  WHICH_CHENNAI_ARCHETYPES,
  WHICH_CHENNAI_QUESTIONS,
  type ChennaiArchetype,
  type ChennaiArchetypeId,
} from "@/content/compulsive/which-chennai";
import {
  WHICH_CHENNAI_ARCHETYPES_TA,
  WHICH_CHENNAI_QUESTIONS_TA,
  WHICH_CHENNAI_TA_PATH,
  WHICH_CHENNAI_UI_TA,
} from "@/content/compulsive/which-chennai-ta";
import { compulsivePath } from "@/content/compulsive/index";
import { trackCompulsiveEvent } from "@/lib/analytics/compulsive-events";
import { getSiteUrl } from "@/lib/env";

type Phase = "quiz" | "result";
type QuizLocale = "en" | "ta";

function ResultCard({
  archetype,
  scores,
  onRetake,
  locale,
}: {
  archetype: ChennaiArchetype;
  scores?: Record<ChennaiArchetypeId, number>;
  onRetake: () => void;
  locale: QuizLocale;
}) {
  const path = locale === "ta" ? WHICH_CHENNAI_TA_PATH : compulsivePath("which-chennai");
  const shareUrl = `${getSiteUrl()}${path}?r=${archetype.id}`;
  const archetypes = locale === "ta" ? WHICH_CHENNAI_ARCHETYPES_TA : WHICH_CHENNAI_ARCHETYPES;
  const ui =
    locale === "ta"
      ? WHICH_CHENNAI_UI_TA
      : { energy: "Your Chennai energy", share: "Share result", retake: "Retake quiz" };

  return (
    <div className="space-y-4 rounded-xl border border-[var(--border)] p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
        {ui.energy}
      </p>
      <h3 className="text-xl font-bold text-[var(--foreground)]">{archetype.label}</h3>
      <p className="text-sm font-semibold text-[var(--foreground)]">{archetype.tagline}</p>
      <p className="text-sm text-[var(--muted)]">{archetype.blurb}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
        {archetype.vibe.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
      {scores ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {archetypes.map((a) => (
            <div
              key={a.id}
              className={`rounded-lg border px-2 py-2 text-center text-xs ${
                a.id === archetype.id
                  ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]"
                  : "border-[var(--border)]"
              }`}
            >
              <p className="font-bold text-[var(--foreground)]">{scores[a.id]}</p>
              <p className="mt-0.5 text-[10px] text-[var(--muted)]">{a.label.split(" / ")[0]}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <CopyShareButton
          hubId="which-chennai"
          label={ui.share}
          buildText={() =>
            `${archetype.shareLine} ${archetype.tagline} Take the quiz: ${shareUrl}`
          }
        />
        <button
          type="button"
          onClick={onRetake}
          className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-bold text-[var(--foreground)] hover:border-[var(--accent)]"
        >
          {ui.retake}
        </button>
      </div>
    </div>
  );
}

function WhichChennaiQuizInner({ locale }: { locale: QuizLocale }) {
  const searchParams = useSearchParams();
  const questions = locale === "ta" ? WHICH_CHENNAI_QUESTIONS_TA : WHICH_CHENNAI_QUESTIONS;
  const archetypes = locale === "ta" ? WHICH_CHENNAI_ARCHETYPES_TA : WHICH_CHENNAI_ARCHETYPES;
  const ui =
    locale === "ta"
      ? WHICH_CHENNAI_UI_TA
      : { question: "Question", back: "Back", loading: "Loading quiz…" };
  const rawDeep = archetypeById(searchParams.get("r"));
  const deepLink = rawDeep
    ? (archetypes.find((a) => a.id === rawDeep.id) ?? rawDeep)
    : undefined;

  const [phase, setPhase] = useState<Phase>(deepLink ? "result" : "quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ChennaiArchetype | null>(deepLink ?? null);
  const [scores, setScores] = useState<Record<ChennaiArchetypeId, number> | undefined>();

  useEffect(() => {
    const fromQuery = archetypeById(searchParams.get("r"));
    if (fromQuery) {
      setResult(archetypes.find((a) => a.id === fromQuery.id) ?? fromQuery);
      setPhase("result");
      setScores(undefined);
    }
  }, [searchParams, archetypes]);

  const question = questions[step];
  const progress = useMemo(
    () => Math.round(((step + (phase === "result" ? 1 : 0)) / questions.length) * 100),
    [step, phase, questions.length],
  );

  function selectOption(optionId: string) {
    if (!question) return;
    const nextAnswers = { ...answers, [question.id]: optionId };
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    const scored = scoreWhichChennai(nextAnswers);
    setScores(scored.scores);
    setResult(archetypes.find((a) => a.id === scored.winner.id) ?? scored.winner);
    setPhase("result");
    trackCompulsiveEvent("compulsive_quiz_complete", {
      hub_id: "which-chennai",
      archetype: scored.winner.id,
    });

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("r", scored.winner.id);
      window.history.replaceState({}, "", url.toString());
    }
  }

  function retake() {
    setPhase("quiz");
    setStep(0);
    setAnswers({});
    setResult(null);
    setScores(undefined);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("r");
      window.history.replaceState({}, "", url.toString());
    }
  }

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      {phase === "quiz" && question ? (
        <>
          <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)]">
            <span>
              {ui.question} {step + 1} / {questions.length}
            </span>
            <span>{Math.min(progress, 99)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>
          <h3 className="text-base font-bold text-[var(--foreground)]">{question.prompt}</h3>
          <div className="grid gap-2">
            {question.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => selectOption(opt.id)}
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-left text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)]"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="text-xs font-bold text-[var(--accent)] hover:underline"
            >
              {ui.back}
            </button>
          ) : null}
        </>
      ) : null}

      {phase === "result" && result ? (
        <ResultCard archetype={result} scores={scores} onRetake={retake} locale={locale} />
      ) : null}
    </div>
  );
}

export function WhichChennaiQuiz({ locale = "en" }: { locale?: QuizLocale }) {
  const loading = locale === "ta" ? WHICH_CHENNAI_UI_TA.loading : "Loading quiz…";
  return (
    <Suspense
      fallback={
        <div className="not-prose rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)] sm:p-5">
          {loading}
        </div>
      }
    >
      <WhichChennaiQuizInner locale={locale} />
    </Suspense>
  );
}
