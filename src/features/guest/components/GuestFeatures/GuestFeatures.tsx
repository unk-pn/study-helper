import c from "./GuestFeatures.module.css";

interface ActionCardProps {
  title: string;
  description: string;
}

const ActionCard = ({ title, description }: ActionCardProps) => {
  return (
    <div className={c.card}>
      <h3 className={c.cardTitle}>{title}</h3>
      <p className={c.cardDescription}>{description}</p>
    </div>
  );
};

const features = [
  {
    title: "Create Subjects",
    description: "Organize your learning material by creating custom subjects",
  },
  {
    title: "Add Questions",
    description: "Build your question bank with answers and explanations",
  },
  {
    title: "Study & Master",
    description: "Learn with interactive flashcards and track your progress",
  },
];

export const GuestFeatures = () => {
  return (
    <div className={c.container}>
      <h1 className={c.title}>Everything you need to ace your exams</h1>
      <div className={c.features}>
        {features.map((feature) => (
          <ActionCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
