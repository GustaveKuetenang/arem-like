"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Locale, locales } from "@/i18n/locale-settings";
import { setLocaleAction } from "@app/actions/locale-actions";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LocaleSelect({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const onSelect = (locale: string) => {
    if (locale === currentLocale.code) return;
    startTransition(async () => {
      await setLocaleAction(locale);
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={pending}
        className={buttonVariants({
          size: "sm",
          variant: "outline",
          className: "gap-2 flex items-center",
        })}
      >
        <span>{currentLocale.emoji}</span>
        <span>{currentLocale.nativeName}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onSelect={() => onSelect(locale.code)}
            disabled={pending}
            className="gap-2 flex items-center"
          >
            <span>{locale.emoji}</span>
            <span>{locale.nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
