import { getLocaleAction } from '@app/actions/locale-actions';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
	const storedLoacle = await getLocaleAction();

	const locale = storedLoacle.code;
	const messagesPath = `@/messages/${locale}.json`;

	return {
		locale,
		messages: (await import(messagesPath)).default
	};
});
