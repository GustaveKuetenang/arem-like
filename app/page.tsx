import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("homePage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function Home() {
  const t = useTranslations("homePage");
  return <div>{t("welcome")}</div>;
}
