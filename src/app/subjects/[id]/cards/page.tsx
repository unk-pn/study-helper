"use client"

import { CardsPage } from "@/features/cards/components/CardsPage/CardsPage";
import { useParams } from "next/navigation";

const TestPage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div>
      <CardsPage id={id as string} />
    </div>
  )
}

export default TestPage