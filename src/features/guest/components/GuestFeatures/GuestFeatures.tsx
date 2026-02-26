"use client";

import { useTranslation } from "react-i18next";
import c from "./GuestFeatures.module.css";

interface ActionCardProps {
  icon: string;
  title: string;
  description: string;
}

const ActionCard = ({ icon, title, description }: ActionCardProps) => {
  return (
    <div className={c.card}>
      <div className={c.iconWrapper}>
        <span className={c.icon}>{icon}</span>
      </div>
      <h3 className={c.cardTitle}>{title}</h3>
      <p className={c.cardDescription}>{description}</p>
    </div>
  );
};

export const GuestFeatures = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: "📚",
      title: t("guest.feature1Title"),
      description: t("guest.feature1Description"),
    },
    {
      icon: "✍️",
      title: t("guest.feature2Title"),
      description: t("guest.feature2Description"),
    },
    {
      icon: "🎯",
      title: t("guest.feature3Title"),
      description: t("guest.feature3Description"),
    },
  ];

  return (
    <div className={c.container}>
      <div className={c.header}>
        <h2 className={c.title}>{t("guest.featuresTitle")}</h2>
        <p className={c.description}>{t("guest.featuresDescription")}</p>
      </div>
      <div className={c.features}>
        {features.map((feature) => (
          <ActionCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
