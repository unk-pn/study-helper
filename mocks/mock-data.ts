// mock-data.ts

export const mockSubjects = [
  {
    id: "clx3c4d5e6f7g8h9i0j1k2l3",
    name: "Алгоритмы и структуры данных",
    status: "IN_PROGRESS",
    examDate: new Date("2025-12-25"),
    createdAt: new Date("2025-12-13"),
    updatedAt: new Date("2025-12-15"),
  },
  {
    id: "clx4d5e6f7g8h9i0j1k2l3m4",
    name: "Базы данных",
    status: "PASSED",
    examDate: new Date("2025-12-20"),
    createdAt: new Date("2025-12-13"),
    updatedAt: new Date("2025-12-16"),
  },
  {
    id: "clx5e6f7g8h9i0j1k2l3m4n5",
    name: "Веб-разработка",
    status: "IN_PROGRESS",
    examDate: new Date("2025-12-28"),
    createdAt: new Date("2025-12-14"),
    updatedAt: new Date("2025-12-14"),
  },
  {
    id: "clx6f7g8h9i0j1k2l3m4n5o6",
    name: "Математический анализ",
    status: "IN_PROGRESS",
    examDate: new Date("2025-12-22"),
    createdAt: new Date("2025-12-12"),
    updatedAt: new Date("2025-12-12"),
  },
  {
    id: "clx7g8h9i0j1k2l3m4n5o6p7",
    name: "Операционные системы",
    status: "FAILED",
    examDate: new Date("2025-12-18"),
    createdAt: new Date("2025-12-10"),
    updatedAt: new Date("2025-12-17"),
  },
];

export const mockQuestions = [
  // Алгоритмы и структуры данных
  {
    id: "clxaq1k2l3m4n5o6p7q8r9s0",
    name: "Что такое временная сложность O(n)?",
    subjectId: "clx3c4d5e6f7g8h9i0j1k2l3",
    answer:
      "Линейная сложность означает, что время выполнения алгоритма растёт пропорционально размеру входных данных. Например, проход по массиву из n элементов.",
    createdAt: new Date("2025-12-13"),
    updatedAt: new Date("2025-12-13"),
  },
  {
    id: "clxbr2l3m4n5o6p7q8r9s0t1",
    name: "Объясните принцип работы бинарного поиска",
    subjectId: "clx3c4d5e6f7g8h9i0j1k2l3",
    answer:
      "Бинарный поиск работает на отсортированном массиве. Каждый раз делит область поиска пополам, сравнивая искомое значение со средним элементом. Сложность O(log n).",
    createdAt: new Date("2025-12-13"),
    updatedAt: new Date("2025-12-14"),
  },
  {
    id: "clxcs3m4n5o6p7q8r9s0t1u2",
    name: "Чем отличается стек от очереди?",
    subjectId: "clx3c4d5e6f7g8h9i0j1k2l3",
    answer: null,
    createdAt: new Date("2025-12-15"),
    updatedAt: new Date("2025-12-15"),
  },
  {
    id: "clxdt4n5o6p7q8r9s0t1u2v3",
    name: "Что такое хеш-таблица и зачем она нужна?",
    subjectId: "clx3c4d5e6f7g8h9i0j1k2l3",
    answer:
      "Структура данных для быстрого поиска по ключу. Использует хеш-функцию для преобразования ключа в индекс массива. Средняя сложность O(1).",
    createdAt: new Date("2025-12-15"),
    updatedAt: new Date("2025-12-15"),
  },

  // Базы данных
  {
    id: "clxeu5o6p7q8r9s0t1u2v3w4",
    name: "Что такое ACID в контексте транзакций?",
    subjectId: "clx4d5e6f7g8h9i0j1k2l3m4",
    answer:
      "ACID - Atomicity (атомарность), Consistency (согласованность), Isolation (изолированность), Durability (долговечность). Гарантирует надёжность транзакций в БД.",
    createdAt: new Date("2025-12-13"),
    updatedAt: new Date("2025-12-13"),
  },
  {
    id: "clxfv6p7q8r9s0t1u2v3w4x5",
    name: "Разница между LEFT JOIN и INNER JOIN",
    subjectId: "clx4d5e6f7g8h9i0j1k2l3m4",
    answer:
      "INNER JOIN возвращает только совпадающие записи из обеих таблиц. LEFT JOIN возвращает все записи из левой таблицы плюс совпадения из правой (или NULL).",
    createdAt: new Date("2025-12-14"),
    updatedAt: new Date("2025-12-14"),
  },
  {
    id: "clxgw7q8r9s0t1u2v3w4x5y6",
    name: "Для чего нужны индексы в базе данных?",
    subjectId: "clx4d5e6f7g8h9i0j1k2l3m4",
    answer: null,
    createdAt: new Date("2025-12-14"),
    updatedAt: new Date("2025-12-14"),
  },

  // Веб-разработка
  {
    id: "clxhx8r9s0t1u2v3w4x5y6z7",
    name: "Что такое Server Components в Next.js?",
    subjectId: "clx5e6f7g8h9i0j1k2l3m4n5",
    answer:
      "React компоненты, которые рендерятся только на сервере. Не отправляют JavaScript на клиент, имеют прямой доступ к БД и файловой системе.",
    createdAt: new Date("2025-12-14"),
    updatedAt: new Date("2025-12-15"),
  },
  {
    id: "clxiy9s0t1u2v3w4x5y6z7a8",
    name: "Как работает useState в React?",
    subjectId: "clx5e6f7g8h9i0j1k2l3m4n5",
    answer: null,
    createdAt: new Date("2025-12-14"),
    updatedAt: new Date("2025-12-14"),
  },
  {
    id: "clxjz0t1u2v3w4x5y6z7a8b9",
    name: "Объясните CSS Grid vs Flexbox",
    subjectId: "clx5e6f7g8h9i0j1k2l3m4n5",
    answer:
      "Grid - двумерная система компоновки (строки и столбцы одновременно). Flexbox - одномерная (либо строка, либо столбец). Grid для сложных layouts, Flex для простых.",
    createdAt: new Date("2025-12-14"),
    updatedAt: new Date("2025-12-14"),
  },
  {
    id: "clxk01u2v3w4x5y6z7a8b9c0",
    name: "Что такое Server Actions?",
    subjectId: "clx5e6f7g8h9i0j1k2l3m4n5",
    answer:
      "Функции, выполняющиеся на сервере, которые можно вызывать напрямую из клиентских компонентов. Упрощают работу с формами и мутациями данных.",
    createdAt: new Date("2025-12-15"),
    updatedAt: new Date("2025-12-15"),
  },

  // Математический анализ
  {
    id: "clxl12v3w4x5y6z7a8b9c0d1",
    name: "Что такое производная функции?",
    subjectId: "clx6f7g8h9i0j1k2l3m4n5o6",
    answer:
      "Скорость изменения функции в данной точке. Показывает, как быстро меняется значение функции при изменении аргумента.",
    createdAt: new Date("2025-12-12"),
    updatedAt: new Date("2025-12-12"),
  },
  {
    id: "clxm23w4x5y6z7a8b9c0d1e2",
    name: "Формула производной произведения функций",
    subjectId: "clx6f7g8h9i0j1k2l3m4n5o6",
    answer: null,
    createdAt: new Date("2025-12-12"),
    updatedAt: new Date("2025-12-12"),
  },
  {
    id: "clxn34x5y6z7a8b9c0d1e2f3",
    name: "Что такое интеграл?",
    subjectId: "clx6f7g8h9i0j1k2l3m4n5o6",
    answer:
      "Площадь под графиком функции. Обратная операция к дифференцированию. Используется для вычисления площадей, объёмов, работы.",
    createdAt: new Date("2025-12-13"),
    updatedAt: new Date("2025-12-13"),
  },

  // Операционные системы
  {
    id: "clxo45y6z7a8b9c0d1e2f3g4",
    name: "Что такое процесс и поток?",
    subjectId: "clx7g8h9i0j1k2l3m4n5o6p7",
    answer:
      "Процесс - изолированная программа с собственной памятью. Поток - единица выполнения внутри процесса, разделяющая память с другими потоками.",
    createdAt: new Date("2025-12-10"),
    updatedAt: new Date("2025-12-10"),
  },
  {
    id: "clxp56z7a8b9c0d1e2f3g4h5",
    name: "Объясните deadlock",
    subjectId: "clx7g8h9i0j1k2l3m4n5o6p7",
    answer: null,
    createdAt: new Date("2025-12-10"),
    updatedAt: new Date("2025-12-10"),
  },
];
