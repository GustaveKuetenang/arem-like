'use server';

import { DEFAULT_LOCALE, getLocaleOrFallback, isValidLocale, LOCALE_COOKIE_NAME } from '@/i18n/locale-settings';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function setLocaleAction(locale: string) {
	if (!isValidLocale(locale)) {
		return;
	}

	const cookieStore = await cookies();
	cookieStore.set(LOCALE_COOKIE_NAME, locale, { path: '/' });
	revalidatePath('/');
}

export async function getLocaleAction() {
	const cookieStore = await cookies();
	const locale = cookieStore.get(LOCALE_COOKIE_NAME)?.value || DEFAULT_LOCALE;
	return getLocaleOrFallback(locale);
}
