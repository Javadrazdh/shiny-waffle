"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckIcon } from "./icons";

type FormType = "contact" | "owner" | "buyer" | "collaboration";

type FieldKind = "text" | "tel" | "email" | "number" | "textarea" | "select" | "files";

interface FieldDef {
  name: string;
  labelKey: string;
  kind: FieldKind;
  required?: boolean;
  optionsKey?: string;
}

const fieldsByType: Record<FormType, FieldDef[]> = {
  contact: [
    { name: "name", labelKey: "name", kind: "text", required: true },
    { name: "phone", labelKey: "phone", kind: "tel", required: true },
    { name: "email", labelKey: "email", kind: "email" },
    { name: "message", labelKey: "message", kind: "textarea", required: true },
  ],
  owner: [
    { name: "name", labelKey: "name", kind: "text", required: true },
    { name: "phone", labelKey: "phone", kind: "tel", required: true },
    { name: "propertyType", labelKey: "propertyType", kind: "select", required: true, optionsKey: "owners.types" },
    { name: "cityRegion", labelKey: "cityRegion", kind: "text", required: true },
    { name: "area", labelKey: "area", kind: "number" },
    { name: "collaborationType", labelKey: "collaborationType", kind: "select", optionsKey: "form.collaborationOptions" },
    { name: "description", labelKey: "description", kind: "textarea" },
    { name: "uploads", labelKey: "uploads", kind: "files" },
  ],
  buyer: [
    { name: "name", labelKey: "name", kind: "text", required: true },
    { name: "phone", labelKey: "phone", kind: "tel", required: true },
    { name: "propertyType", labelKey: "propertyType", kind: "select", required: true, optionsKey: "owners.types" },
    { name: "cityRegion", labelKey: "cityRegion", kind: "text", required: true },
    { name: "budget", labelKey: "budget", kind: "text" },
    { name: "purpose", labelKey: "purpose", kind: "select", optionsKey: "form.purposeOptions" },
    { name: "needs", labelKey: "needs", kind: "textarea" },
  ],
  collaboration: [
    { name: "name", labelKey: "name", kind: "text", required: true },
    { name: "phone", labelKey: "phone", kind: "tel", required: true },
    { name: "propertyType", labelKey: "propertyType", kind: "select", required: true, optionsKey: "owners.types" },
    { name: "cityRegion", labelKey: "cityRegion", kind: "text" },
    { name: "description", labelKey: "description", kind: "textarea", required: true },
  ],
};

export function LeadForm({ formType }: { formType: FormType }) {
  const t = useTranslations("form");
  const troot = useTranslations();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const fields = fieldsByType[formType];

  function optionsFor(optionsKey?: string): string[] {
    if (!optionsKey) return [];
    const value = troot.raw(optionsKey);
    return Array.isArray(value) ? (value as string[]) : [];
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = new FormData(form);
      data.append("formType", formType);
      const res = await fetch("/api/lead", { method: "POST", body: data });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold/40 bg-ink-2 p-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon className="size-7" />
        </div>
        <p className="text-lg text-cream">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — hidden from users, bots fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => {
          const full = field.kind === "textarea" || field.kind === "files";
          return (
            <div
              key={field.name}
              className={`flex flex-col gap-2 ${full ? "md:col-span-2" : ""}`}
            >
              <label htmlFor={field.name} className="text-sm text-cream/80">
                {t(field.labelKey)}
                {field.required ? <span className="text-gold"> *</span> : null}
              </label>

              {field.kind === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  rows={4}
                  className="rounded-xl border border-line bg-ink px-4 py-3 text-cream outline-none transition-colors focus:border-gold"
                />
              ) : field.kind === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                  className="rounded-xl border border-line bg-ink px-4 py-3 text-cream outline-none transition-colors focus:border-gold"
                >
                  <option value="" disabled>
                    {t("selectOption")}
                  </option>
                  {optionsFor(field.optionsKey).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.kind === "files" ? (
                <>
                  <input
                    id={field.name}
                    name={field.name}
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    className="rounded-xl border border-line bg-ink px-4 py-3 text-sm text-muted outline-none transition-colors file:me-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-1.5 file:text-ink focus:border-gold"
                  />
                  <span className="text-xs text-muted">{t("uploadsHint")}</span>
                </>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.kind}
                  required={field.required}
                  dir={field.kind === "tel" || field.kind === "email" ? "ltr" : undefined}
                  className="rounded-xl border border-line bg-ink px-4 py-3 text-cream outline-none transition-colors focus:border-gold"
                />
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted">{t("requiredNote")}</p>

      {status === "error" ? (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {t("error")}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
