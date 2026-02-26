"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@gravity-ui/uikit";
import c from "./page.module.css";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const features = [
    {
      title: t("about.feature1Title"),
      description: t("about.feature1Description"),
    },
    {
      title: t("about.feature2Title"),
      description: t("about.feature2Description"),
    },
    {
      title: t("about.feature3Title"),
      description: t("about.feature3Description"),
    },
    {
      title: t("about.feature4Title"),
      description: t("about.feature4Description"),
    },
    {
      title: t("about.feature5Title"),
      description: t("about.feature5Description"),
    },
    {
      title: t("about.feature6Title"),
      description: t("about.feature6Description"),
    },
  ];

  return (
    <div className={c.container}>
      <header className={c.header}>
        <h1 className={c.title}>{t("about.title")}</h1>
        <p className={c.mission}>{t("about.mission")}</p>
        <p className={c.whyCreated}>{t("about.whyCreated")}</p>
      </header>

      <section className={c.section}>
        <h2 className={c.sectionTitle}>{t("about.featuresTitle")}</h2>
        <div className={c.features}>
          {features.map((feature) => (
            <div key={feature.title} className={c.featureCard}>
              <h3 className={c.featureTitle}>{feature.title}</h3>
              <p className={c.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={c.section}>
        <h2 className={c.sectionTitle}>{t("about.techStackTitle")}</h2>
        <p className={c.techStack}>{t("about.techStack")}</p>
      </section>

      <section className={c.section} onClick={() => router.push("https://github.com/unk-pn")}>
        <h2 className={c.sectionTitle}>{t("about.teamTitle")}</h2>
        <div className={c.team}>
          <div className={c.teamMember}>
            <div className={c.teamRole}>{t("about.developer")}</div>
            <div className={c.teamName}>
                <span className={c.placeholder}>unk</span>
            </div>
          </div>

          <div
            className={c.teamMember}
            onClick={() => router.push("https://t.me/oki_6")}
          >
            <div className={c.teamRole}>{t("about.designer")}</div>
            <div className={c.teamName}>
              <span className={c.placeholder}>oki_6</span>
            </div>
          </div>
        </div>
      </section>

      <section className={c.section}>
        <div className={c.openSource}>
          <h2 className={c.sectionTitle}>{t("about.openSourceTitle")}</h2>
          <p className={c.openSourceDescription}>
            {t("about.openSourceDescription")}
          </p>
          <Button
            view="outlined"
            size="l"
            href="https://github.com/unk-pn/study-helper"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
