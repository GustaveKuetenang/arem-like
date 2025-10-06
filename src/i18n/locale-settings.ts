export const LOCALE_COOKIE_NAME = "locale" as const;
export const LOCALES = ["en", "fr"] as const;
export type LocaleType = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: LocaleType = "fr";

export interface Locale {
	code: LocaleType;
	nativeName: string;
	emoji: string;
}

const LOCALE_META: Readonly<Record<LocaleType, Locale>> = {
	en: { code: "en", nativeName: "English", emoji: "🇺🇸" },
	fr: { code: "fr", nativeName: "Français", emoji: "🇫🇷" },
};

export const locales: ReadonlyArray<Locale> = Object.values(LOCALE_META);

const LOCALE_SET = new Set<LocaleType>(LOCALES);
export function isValidLocale(locale: string): locale is LocaleType {
	return LOCALE_SET.has(locale as LocaleType);
}

export function getLocaleOrFallback(locale?: string): Locale {
	return isValidLocale(locale ?? "") ? LOCALE_META[locale as LocaleType] : LOCALE_META[DEFAULT_LOCALE];
}
