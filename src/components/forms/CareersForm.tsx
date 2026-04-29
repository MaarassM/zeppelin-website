"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Wine,
  ChefHat,
  Waves,
  IceCream,
  Briefcase,
  Compass,
} from "lucide-react";
import { useT } from "@/lib/i18n";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  bar: <Wine size={28} />,
  kuhinja: <ChefHat size={28} />,
  vodeni_sportovi: <Waves size={28} />,
  sladoled: <IceCream size={28} />,
  ostale: <Briefcase size={28} />,
  adventures: <Compass size={28} />,
};

const schema = z.object({
  name: z.string().min(2, "Obavezno"),
  phone: z.string().min(6, "Obavezno"),
  email: z.string().email("Neispravan email"),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full h-12 px-4 bg-white border border-border rounded-lg text-sm text-dark focus:outline-none focus:ring-2 focus:ring-red/30";
const labelCls = "text-xs font-semibold text-muted tracking-wide uppercase";

interface CareersFormProps {
  category: string | null;
  position: string | null;
  onCategorySelect: (key: string | null) => void;
  onPositionSelect: (p: string | null) => void;
}

export function CareersForm({
  category,
  position,
  onCategorySelect,
  onPositionSelect,
}: CareersFormProps) {
  const { t } = useT();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const cvRef = useState<FileList | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    setServerError(false);

    const formData = new window.FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    if (!position) return;
    formData.append("position", position);
    if (data.notes) formData.append("notes", data.notes);
    if (cvRef[0]?.[0]) formData.append("cv", cvRef[0][0]);

    const res = await fetch("/api/careers", { method: "POST", body: formData });

    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setServerError(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <CheckCircle size={48} className="text-red" />
        <p className="font-display text-dark text-2xl text-center">
          {t.careers.success_msg}
        </p>
      </div>
    );
  }

  // Step 1: Category grid
  if (!category && !position) {
    const cats = t.careers.position_categories;
    return (
      <div className="flex flex-col gap-6">
        <p className="text-xs font-semibold text-muted tracking-wide uppercase text-center">
          {t.careers.position_select_heading}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {cats.map((cat, i) => {
            const isLast = i === cats.length - 1;
            const isOdd = cats.length % 2 !== 0;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  if (cat.sub_roles.length === 0) {
                    onPositionSelect(cat.label);
                  } else {
                    onCategorySelect(cat.key);
                  }
                }}
                className={`group flex flex-col items-center justify-center gap-3 bg-white border border-border rounded-2xl px-4 py-8 hover:border-red hover:shadow-md transition-all duration-200 cursor-pointer ${isLast && isOdd ? "col-span-2" : ""}`}
              >
                <span className="text-muted group-hover:text-red transition-colors">
                  {CATEGORY_ICONS[cat.key] ?? <Wine size={28} />}
                </span>
                <span className="font-display text-dark text-base tracking-wide group-hover:text-red transition-colors leading-tight text-center">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Step 2: Sub-role screen
  if (category && !position) {
    const cat = t.careers.position_categories.find((c) => c.key === category)!;
    return (
      <div className="flex flex-col gap-6">
        <button
          type="button"
          onClick={() => onCategorySelect(null)}
          className="flex items-center gap-2 text-xs font-semibold text-muted tracking-wide uppercase hover:text-red transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft size={14} />
          {t.careers.back_btn}
        </button>

        <p className="text-xs font-semibold text-muted tracking-wide uppercase text-center">
          {cat.label}
        </p>

        {cat.notice && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
            <p className="text-sm text-amber-800">{cat.notice}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {cat.sub_roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => onPositionSelect(role)}
              className="group flex items-center justify-between bg-white border border-border rounded-2xl px-6 py-5 hover:border-red hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <span className="font-display text-dark text-base tracking-wide group-hover:text-red transition-colors">
                {role}
              </span>
              <ArrowRight size={16} className="text-muted group-hover:text-red transition-colors" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 3: Application form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <button
        type="button"
        onClick={() => onPositionSelect(null)}
        className="flex items-center gap-2 text-xs font-semibold text-muted tracking-wide uppercase hover:text-red transition-colors cursor-pointer w-fit"
      >
        <ArrowLeft size={14} />
        {t.careers.back_btn}
      </button>

      <div className="bg-red/8 border border-red/20 rounded-xl px-5 py-4">
        <p className="text-xs font-semibold text-muted tracking-wide uppercase mb-1">
          {t.careers.position_label}
        </p>
        <p className="font-display text-dark text-xl">{position}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>{t.careers.name_label}</label>
        <input {...register("name")} className={inputCls} />
        {errors.name && (
          <p className="text-red text-xs">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>{t.careers.phone_label}</label>
          <input {...register("phone")} type="tel" className={inputCls} />
          {errors.phone && (
            <p className="text-red text-xs">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>{t.careers.email_label}</label>
          <input {...register("email")} type="email" className={inputCls} />
          {errors.email && (
            <p className="text-red text-xs">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>{t.careers.cv_label}</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => cvRef[1](e.target.files)}
          className="text-sm text-dark file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red file:text-white file:text-xs file:font-display file:cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>{t.careers.notes_label}</label>
        <textarea
          {...register("notes")}
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 bg-white border border-border rounded-lg text-sm text-dark resize-none focus:outline-none focus:ring-2 focus:ring-red/30"
        />
      </div>

      {serverError && (
        <p className="text-red text-sm text-center">
          Nešto je pošlo po krivu. Pokušaj ponovno.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="h-14 bg-red text-white font-display text-sm tracking-widest rounded-lg hover:bg-red-dark transition-colors cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "..." : t.careers.submit_btn.toLocaleUpperCase()}
      </button>
    </form>
  );
}
