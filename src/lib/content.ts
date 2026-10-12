// Весь контент сайта в одном месте. Тексты, контакты и картинки меняются здесь.
// Картинки с picsum.photos временные, заменить на свои в /public/img.

export const clinic = {
  name: "Sculpt Clinic",
  nameRu: "Скульпт Клиник",
  tagline: "клиника современной стоматологии",
  city: "Рязань",
  phone: "+7 (4912) 77-05-05",
  phoneHref: "tel:+74912770505",
  phoneAlt: "+7 (4912) 20-58-22",
  phoneAltHref: "tel:+74912205822",
  email: "info@sculptclinic.ru",
  vk: "https://vk.com/sculptrzn",
  license: "Л041-01183-62/02895448",
};

export const nav = [
  { label: "О клинике", href: "#about" },
  { label: "Направления", href: "#services" },
  { label: "Технологии", href: "#technology" },
  { label: "Команда", href: "#team" },
  { label: "Контакты", href: "#contact" },
];

export const locations = [
  {
    id: "ryazan",
    name: "Рязань",
    address: "Касимовское шоссе, 8, корп. 2, вход справа, 2-й этаж",
    hours: [{ days: "Ежедневно", time: "09:00 - 21:00" }],
    phone: "+7 (4912) 77-05-05",
  },
];

export const services = [
  {
    id: "esthetic",
    title: "Эстетическая",
    titleAccent: "стоматология",
    description:
      "От отбеливания и виниров до полного преображения улыбки. Проектируем результат в цифре до начала лечения.",
    image: "/img/service-esthetic.jpg",
    items: [
      "Smile design и 3D-мокап",
      "Керамические виниры",
      "Эстетическая реставрация",
      "Профессиональное отбеливание",
    ],
  },
  {
    id: "restorative",
    title: "Имплантация",
    titleAccent: "и ортопедия",
    description:
      "Возвращаем зубам функцию и внешний вид: от одной коронки до полной реабилитации челюсти.",
    image: "/img/service-restorative.jpg",
    items: [
      "Имплантация по шаблону",
      "Коронки и мосты из циркония",
      "All-on-4 и All-on-6",
      "Полная реабилитация полости рта",
    ],
  },
  {
    id: "preventive",
    title: "Профилактика",
    titleAccent: "и гигиена",
    description:
      "Регулярные осмотры и бережная гигиена, чтобы проблемы не появлялись, а результат лечения сохранялся годами.",
    image: "/img/service-preventive.jpg",
    items: [
      "Комплексная диагностика",
      "Профессиональная гигиена",
      "Лечение под микроскопом",
      "Скрининг здоровья полости рта",
    ],
  },
  {
    id: "beyond",
    title: "Больше,",
    titleAccent: "чем улыбка",
    description:
      "Эстетика лица, работа с ВНЧС и сном. Деликатные процедуры, которые дополняют новую улыбку.",
    image: "/img/service-beyond.jpg",
    items: [
      "Ботулинотерапия и работа с ВНЧС",
      "Контурная пластика губ",
      "Индивидуальные капы",
      "Терапия апноэ сна",
    ],
  },
];

export const technologies = [
  {
    title: "Интраоральный 3D-сканер",
    text: "Цифровой слепок за несколько минут без слепочной массы. Точность до 10 микрон и комфорт для пациента.",
    image: "https://picsum.photos/seed/sculpt-scanner/1200/900",
  },
  {
    title: "Операционный микроскоп",
    text: "Увеличение до 25 крат позволяет лечить каналы и ставить реставрации с ювелирной точностью.",
    image: "https://picsum.photos/seed/sculpt-microscope/1200/900",
  },
  {
    title: "Конусно-лучевая КТ",
    text: "Трёхмерный снимок челюсти за 15 секунд. Планируем имплантацию без неожиданностей.",
    image: "https://picsum.photos/seed/sculpt-ct/1200/900",
  },
  {
    title: "Собственная CAD/CAM лаборатория",
    text: "Коронки и виниры фрезеруются в клинике. Контролируем каждый этап и сокращаем сроки до одного визита.",
    image: "https://picsum.photos/seed/sculpt-cadcam/1200/900",
  },
  {
    title: "Лазерная стоматология",
    text: "Работа с мягкими тканями без скальпеля: меньше анестезии, быстрее заживление.",
    image: "https://picsum.photos/seed/sculpt-laser/1200/900",
  },
  {
    title: "Цифровой Smile Design",
    text: "Показываем будущую улыбку на вашем лице до начала лечения и примеряем её временными накладками.",
    image: "https://picsum.photos/seed/sculpt-design/1200/900",
  },
];

export const team = [
  {
    name: "Огнева Анастасия Николаевна",
    role: "Стоматолог-терапевт, эндодонтист, основатель клиники",
    photo: "/img/doctors/ogneva.jpg",
  },
  {
    name: "Ерёмина Жанна Владиславовна",
    role: "Стоматолог-терапевт, эндодонтист",
    photo: "/img/doctors/eryomina.jpg",
  },
  {
    name: "Симонова Анастасия Валерьевна",
    role: "Стоматолог-ортодонт, детский ортодонт",
    photo: "/img/doctors/simonova.jpg",
  },
  {
    name: "Малькова Анастасия Михайловна",
    role: "Стоматолог-терапевт",
    photo: "/img/doctors/malkova.jpg",
  },
  {
    name: "Аврина Ольга Викторовна",
    role: "Стоматолог-хирург",
    photo: "/img/doctors/avrina.jpg",
  },
  {
    name: "Корсаков Никита Сергеевич",
    role: "Стоматолог общей практики",
    photo: "/img/doctors/korsakov.jpg",
  },
  {
    name: "Харланова Евгения Александровна",
    role: "Врач-стоматолог",
    photo: "/img/doctors/kharlanova.jpg",
  },
];

export const stats = [
  { value: "7", label: "врачей" },
  { value: "09-21", label: "ежедневно, без выходных" },
  { value: "КТ", label: "диагностика в клинике" },
];

export const testimonials = [
  {
    tag: "Виниры",
    quote:
      "Боялась, что улыбка будет выглядеть «сделанной». В итоге никто не замечает виниры, все замечают, что я стала чаще улыбаться.",
    name: "Ксения Р.",
    detail: "Виниры",
  },
  {
    tag: "Имплантация",
    quote:
      "Полная реабилитация за три визита. Операцию почти не почувствовал, а временные зубы поставили в тот же день.",
    name: "Игорь Т.",
    detail: "Имплантация",
  },
  {
    tag: "Гигиена",
    quote:
      "Первый раз в жизни гигиена без боли и ощущения, что тебя отчитывают. Теперь хожу каждые полгода без напоминаний.",
    name: "Алина Ш.",
    detail: "Гигиена",
  },
  {
    tag: "Smile design",
    quote:
      "Мне показали будущую улыбку на моём лице ещё до первого укола. Это сняло все вопросы и страхи.",
    name: "Виктор М.",
    detail: "Smile design и реставрация",
  },
];

export const footerLinks = {
  services: services.map((s) => ({
    label: `${s.title} ${s.titleAccent}`,
    href: "#services",
  })),
  clinic: [
    { label: "О клинике", href: "#about" },
    { label: "Технологии", href: "#technology" },
    { label: "Команда", href: "#team" },
    { label: "Контакты", href: "#contact" },
  ],
  legal: [
    { label: "Политика конфиденциальности", href: "#" },
    { label: "Лицензии", href: "#" },
    { label: "Условия", href: "#" },
  ],
};
