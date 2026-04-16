import { useState } from "react";
import Icon from "@/components/ui/icon";

const apartments = [
  {
    id: 1,
    name: "Prim Rooms AURA",
    area: "ЖК «AURA Apartments», 100‑летия Владивостоку",
    desc: "Современная студия в новой высотке с удобными развязками. Бесконтактное заселение, всё для работы и отдыха.",
    guests: "до 2 гостей",
    parking: "подземный паркинг по запросу",
    wifi: "Wi‑Fi 24/7",
    price: "от 4 500 ₽/сутки",
    note: "цены зависят от дат и сезона",
    badge: "для командировок",
    badgeColor: "business",
    tags: ["Для командировки"],
  },
  {
    id: 2,
    name: "Prim Rooms Bridge View",
    area: "Чуркин, вид на мост на Русский остров",
    desc: "Апартаменты с панорамным видом на мост и бухту. Для тех, кто хочет почувствовать Владивосток на 100%.",
    guests: "до 3 гостей",
    parking: "парковка во дворе / рядом",
    wifi: "идеально для пары",
    price: "от 5 200 ₽/сутки",
    note: "при раннем бронировании дешевле",
    badge: "вид на море",
    badgeColor: "sea",
    tags: ["С видом на море", "Для пары"],
  },
  {
    id: 3,
    name: "Prim Rooms Central",
    area: "Центр, рядом деловой и туристический кластер",
    desc: "Квартира в самом центре: кафе, набережная, бизнес‑встречи рядом. Отличный вариант для коротких поездок.",
    guests: "до 2 гостей",
    parking: "парковка — платные зоны и стоянки",
    wifi: "бесконтактное заселение",
    price: "от 4 800 ₽/сутки",
    note: "стоимость зависит от даты",
    badge: "",
    badgeColor: "",
    tags: ["Для командировки", "Для пары"],
  },
  {
    id: 4,
    name: "Prim Rooms Комарова",
    area: "Комарова, спокойный район",
    desc: "Уютные апартаменты, где можно остановиться с питомцем за небольшую доплату.",
    guests: "до 3 гостей",
    parking: "парковка во дворе",
    wifi: "питомцы +500 ₽/сутки",
    price: "от 4 000 ₽/сутки",
    note: "подходит для длительных поездок",
    badge: "можно с питомцами",
    badgeColor: "pet",
    tags: ["Можно с питомцами"],
  },
];

const TABS = ["Все апартаменты", "Для командировки", "Для пары", "С видом на море", "Можно с питомцами"];

const faqItems = [
  {
    q: "Как происходит бесконтактное заселение?",
    a: "После бронирования и оплаты вы получаете подробные инструкции и код на вход в квартиру. В назначенное время просто вводите код на двери и заходите — никого ждать не нужно.",
  },
  {
    q: "Можно ли заселиться ночью или рано утром?",
    a: "Да. Бесконтактное заселение позволяет приехать в удобное время. Главное — заранее согласовать время заезда при бронировании.",
  },
  {
    q: "Вы выдаёте документы для командировки?",
    a: "Да, по запросу предоставляем отчётные документы для бухгалтерии вашей компании. Сообщите об этом при бронировании или сразу после.",
  },
  {
    q: "Можно ли с питомцами?",
    a: "На части объектов размещение с питомцами возможно за доплату 500 ₽/сутки (например, Комарова 48 и Кирова 28). Уточняйте при бронировании.",
  },
  {
    q: "Как с парковкой?",
    a: "В центре — в основном платные парковочные зоны и стоянки. В AURA есть подземный паркинг, одно место доступно по запросу. В остальных районах — дворы и ближайшие стоянки, детали указаны в описании каждой квартиры.",
  },
];

const badgeStyles: Record<string, { bg: string; color: string }> = {
  business: { bg: "#e4f2f3", color: "#00696f" },
  sea: { bg: "#e8f0fe", color: "#1a56db" },
  pet: { bg: "#fef3e2", color: "#b45309" },
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("Все апартаменты");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [guests, setGuests] = useState("1 гость");
  const [formData, setFormData] = useState({ name: "", company: "", contact: "", comment: "" });
  const [formSent, setFormSent] = useState(false);

  const filtered =
    activeTab === "Все апартаменты"
      ? apartments
      : apartments.filter((a) => a.tags.includes(activeTab));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    ["Апартаменты", "catalog"],
    ["Для командировок", "business"],
    ["Как это работает", "how"],
    ["Локации", "locations"],
    ["Отзывы", "reviews"],
    ["Контакты", "contacts"],
  ];

  return (
    <div className="min-h-screen font-body" style={{ background: "#f7f6f2", color: "#222" }}>

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(247,246,242,0.96)", backdropFilter: "blur(10px)", borderColor: "#e0ded8" }}
      >
        <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between py-[10px] gap-3">
          <img
            src="https://cdn.poehali.dev/projects/1580d816-d482-4e90-88b0-1ec5c36b5987/bucket/d991fa50-6da7-4b3a-bdc3-d44f1fc24e02.png"
            alt="Prim Rooms Apartments"
            className="h-28 w-auto object-contain"
          />
          <nav className="hidden md:flex gap-4">
            {navLinks.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm transition-colors"
                style={{ color: "#777" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#222")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollTo("catalog")}
            className="hidden md:block rounded-full px-[18px] py-2 text-sm font-medium text-white transition-colors"
            style={{ background: "#00696f" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#005158")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#00696f")}
          >
            Найти апартаменты
          </button>
          <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden border-t px-4 pb-4 flex flex-col gap-2 animate-fade-in"
            style={{ borderColor: "#e0ded8", background: "#f7f6f2" }}
          >
            {navLinks.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-1.5 text-sm font-medium">
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("catalog")}
              className="mt-1 rounded-full px-4 py-2 text-sm font-medium text-white"
              style={{ background: "#00696f" }}
            >
              Найти апартаменты
            </button>
          </div>
        )}
      </header>

      <main>

        {/* HERO */}
        <section className="py-8 md:py-10">
          <div className="max-w-[1100px] mx-auto px-4">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div>
                <p className="text-[12px] uppercase tracking-[0.16em] mb-2" style={{ color: "#777" }}>
                  Владивосток • Апартаменты с бесконтактным заселением
                </p>
                <h1 className="font-display font-semibold leading-[1.15] mb-4" style={{ fontSize: "clamp(28px,5vw,42px)" }}>
                  Апартаменты во Владивостоке с&nbsp;заселением без ожидания
                </h1>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#777" }}>
                  Prim Rooms Apartments — сеть апартаментов в разных районах Владивостока.
                  Идеально для командировок и коротких поездок: выбираете квартиру, оплачиваете онлайн,
                  получаете код и сразу заходите в свой номер.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => scrollTo("catalog")}
                    className="rounded-full px-[18px] py-2 text-sm font-medium text-white transition-colors"
                    style={{ background: "#00696f" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#005158")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#00696f")}
                  >
                    Найти апартаменты
                  </button>
                  <button
                    onClick={() => scrollTo("business")}
                    className="rounded-full px-[18px] py-2 text-sm border transition-colors"
                    style={{ border: "1px solid #d0cec7" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#222")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d0cec7")}
                  >
                    Для командировок
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-[13px]" style={{ color: "#777" }}>
                  {["Код на вход сразу после оплаты", "Работаем с 2017 года", "Поддержка 24/7 в мессенджерах"].map((t) => (
                    <span key={t} className="flex items-center gap-1">
                      <span style={{ color: "#e53935" }}>•</span> {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* BOOKING WIDGET */}
              <div className="rounded-xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)]" style={{ background: "#fff" }}>
                <h3 className="font-display text-[18px] font-semibold mb-1">Забронировать апартаменты</h3>
                <p className="text-[13px] mb-3" style={{ color: "#777" }}>
                  Выберите даты и количество гостей — свободные варианты покажем ниже.
                </p>
                {[
                  { label: "Дата заезда", type: "date", value: dateIn, onChange: setDateIn },
                  { label: "Дата выезда", type: "date", value: dateOut, onChange: setDateOut },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 mb-3">
                    <label className="text-[13px]" style={{ color: "#777" }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={(e) => f.onChange(e.target.value)}
                      className="px-3 py-2 rounded-lg text-sm border outline-none"
                      style={{ border: "1px solid #d5d3cd" }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1 mb-3">
                  <label className="text-[13px]" style={{ color: "#777" }}>Гости</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="px-3 py-2 rounded-lg text-sm border outline-none"
                    style={{ border: "1px solid #d5d3cd" }}
                  >
                    <option>1 гость</option>
                    <option>2 гостя</option>
                    <option>3 гостя</option>
                    <option>4+ гостей</option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-2 mb-3 text-[13px]">
                  {["Бесконтактное заселение", "Для командировки", "Для пары"].map((chip, i) => (
                    <span
                      key={chip}
                      className="px-[10px] py-[5px] rounded-full border cursor-pointer"
                      style={
                        i === 0
                          ? { border: "1px solid #00696f", color: "#00696f", background: "#e4f2f3" }
                          : { border: "1px solid #d5d3cd", color: "#777" }
                      }
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => scrollTo("catalog")}
                  className="w-full rounded-full py-2 text-sm font-medium text-white"
                  style={{ background: "#00696f" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#005158")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#00696f")}
                >
                  Показать варианты
                </button>
                <p className="mt-2 text-[12px]" style={{ color: "#777" }}>
                  После запуска системы здесь будет форма онлайн-бронирования.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANTAGES */}
        <section id="why" className="py-10 scroll-mt-20">
          <div className="max-w-[1100px] mx-auto px-4">
            <h2 className="font-display text-[26px] font-semibold mb-1">Почему гости выбирают Prim Rooms</h2>
            <p className="text-sm mb-5" style={{ color: "#777" }}>Сделали апартаменты удобными для командированных, туристов и местных жителей.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { icon: "KeyRound", title: "Бесконтактное заселение 24/7", text: "Приезжаете в любое время, вводите код на двери — и сразу дома." },
                { icon: "MapPin", title: "Локации под разные задачи", text: "Центр, АУРА, Чуркин, 2‑я Речка — выбираете район под свои маршруты." },
                { icon: "Camera", title: "Честные фото и комплектация", text: "Реальные фотографии, Wi‑Fi, кухня, рабочее место." },
                { icon: "FileText", title: "Документы для командировок", text: "По запросу предоставляем отчётные документы для бухгалтерии." },
                { icon: "Award", title: "Опыт с 2017 года", text: "Работаем на рынке Владивостока, растём за счёт постоянных гостей." },
              ].map((c) => (
                <div key={c.title} className="rounded-xl p-4 border text-[14px]" style={{ background: "#fff", borderColor: "#e4e1db" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "#e4f2f3" }}>
                    <Icon name={c.icon} size={17} style={{ color: "#00696f" }} />
                  </div>
                  <div className="font-semibold text-[15px] mb-1">{c.title}</div>
                  <p style={{ color: "#777" }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATALOG */}
        <section id="catalog" className="py-10 scroll-mt-20" style={{ background: "#f0eee8" }}>
          <div className="max-w-[1100px] mx-auto px-4">
            <h2 className="font-display text-[26px] font-semibold mb-1">Апартаменты Prim Rooms во Владивостоке</h2>
            <p className="text-sm mb-5" style={{ color: "#777" }}>Выберите сценарий поездки и подходящий район, а затем оформите бронирование онлайн.</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-3 py-1.5 rounded-full border text-[13px] transition-colors"
                  style={
                    activeTab === tab
                      ? { border: "1px solid #00696f", color: "#00696f", background: "#e4f2f3" }
                      : { border: "1px solid transparent", color: "#777", background: "transparent" }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {filtered.map((apt) => (
                <article
                  key={apt.id}
                  className="rounded-xl p-4 border flex flex-col gap-3 text-[14px] hover:shadow-md transition-shadow"
                  style={{ background: "#fff", borderColor: "#e4e1db" }}
                >
                  <div className="flex justify-between gap-2 items-start">
                    <div>
                      <div className="font-semibold text-[15px]">{apt.name}</div>
                      <div className="text-[13px]" style={{ color: "#777" }}>{apt.area}</div>
                    </div>
                    {apt.badge && (
                      <span
                        className="text-[11px] uppercase tracking-[0.1em] px-2 py-1 rounded-full whitespace-nowrap font-medium"
                        style={badgeStyles[apt.badgeColor]
                          ? { background: badgeStyles[apt.badgeColor].bg, color: badgeStyles[apt.badgeColor].color }
                          : {}}
                      >
                        {apt.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ color: "#444" }}>{apt.desc}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px]" style={{ color: "#777" }}>
                    {[apt.guests, apt.parking, apt.wifi].map((m) => (
                      <span key={m} className="flex items-center gap-1">
                        <span style={{ color: "#e53935" }}>•</span>{m}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center gap-3 mt-1">
                    <div>
                      <div className="font-semibold text-[15px]">{apt.price}</div>
                      <div className="text-[12px]" style={{ color: "#777" }}>{apt.note}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="rounded-full px-3 py-1.5 text-[13px] border transition-colors"
                        style={{ border: "1px solid #d0cec7" }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#222")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d0cec7")}
                      >
                        Подробнее
                      </button>
                      <button
                        className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white transition-colors"
                        style={{ background: "#00696f" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#005158")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#00696f")}
                      >
                        Забронировать
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-4 text-[12px]" style={{ color: "#777" }}>
              На сайте показана часть фонда. Полный список апартаментов, актуальные цены и доступность дат вы увидите в форме бронирования.
            </p>
          </div>
        </section>

        {/* FOR BUSINESS */}
        <section id="business" className="py-10 scroll-mt-20">
          <div className="max-w-[1100px] mx-auto px-4 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div>
              <h2 className="font-display text-[26px] font-semibold mb-1">Для командировок и рабочих поездок</h2>
              <p className="text-sm mb-4" style={{ color: "#777" }}>Мы знаем, что командировка — это про задачи, а не про поиск жилья ночью по объявлениям.</p>
              <ul className="space-y-2 mb-4 text-[14px]">
                {[
                  "Отчётные документы для бухгалтерии по запросу.",
                  "Интернет, рабочее место, розетки у стола и кровати.",
                  "Самозаселение — не нужно ждать администратора или хозяина.",
                  "Локации рядом с офисами, портом, стройками и деловыми площадками.",
                  "Есть квартиры, где можно разместить небольшие бригады.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="mt-0.5 shrink-0" style={{ color: "#00696f" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[14px]" style={{ color: "#777" }}>
                Работаете с командировками регулярно? Мы можем подобрать пул апартаментов для вашей компании и назначить единый контакт для бронирований.
              </p>
            </div>

            <div className="rounded-xl p-5 border" style={{ background: "#fff", borderColor: "#e4e1db" }}>
              <h3 className="font-display text-[18px] font-semibold mb-1">Запросить проживание для сотрудников</h3>
              <p className="text-[13px] mb-4" style={{ color: "#777" }}>Оставьте контакты — свяжемся, обсудим задачи и предложим варианты.</p>
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "#e4f2f3" }}>
                    <Icon name="CheckCircle" size={24} style={{ color: "#00696f" }} />
                  </div>
                  <p className="font-semibold text-[16px] mb-1">Запрос отправлен!</p>
                  <p className="text-[13px]" style={{ color: "#777" }}>Свяжемся в течение рабочего дня.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="flex flex-col gap-3">
                  {[
                    { key: "name", label: "Имя", placeholder: "Как к вам обращаться" },
                    { key: "company", label: "Компания", placeholder: "Название компании" },
                    { key: "contact", label: "Телефон или e‑mail", placeholder: "+7... или name@company.ru" },
                  ].map((f) => (
                    <div key={f.key} className="flex flex-col gap-1">
                      <label className="text-[13px]" style={{ color: "#777" }}>{f.label}</label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={formData[f.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                        className="px-3 py-2 rounded-lg text-sm border outline-none"
                        style={{ border: "1px solid #d5d3cd" }}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px]" style={{ color: "#777" }}>Комментарий</label>
                    <textarea
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="px-3 py-2 rounded-lg text-sm border outline-none resize-y"
                      style={{ border: "1px solid #d5d3cd" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full py-2 text-sm font-medium text-white mt-1"
                    style={{ background: "#00696f" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#005158")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#00696f")}
                  >
                    Отправить запрос
                  </button>
                  <p className="text-[11px]" style={{ color: "#777" }}>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-10 scroll-mt-20" style={{ background: "#f0eee8" }}>
          <div className="max-w-[1100px] mx-auto px-4">
            <h2 className="font-display text-[26px] font-semibold mb-1">Как это работает</h2>
            <p className="text-sm mb-6" style={{ color: "#777" }}>Путь от выбора квартиры до заселения занимает несколько минут.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 text-[14px]">
              {[
                { n: "Шаг 1", title: "Выбираете апартаменты и даты", text: "На сайте или через форму бронирования." },
                { n: "Шаг 2", title: "Оформляете бронирование и оплачиваете онлайн", text: "Все данные приходят на e‑mail и в мессенджер." },
                { n: "Шаг 3", title: "Получаете инструкции и код на вход", text: "Код на двери и схема заселения приходят заранее." },
                { n: "Шаг 4", title: "Заходите в любое время", text: "Приехали ночью или рано утром — просто вводите код." },
                { n: "Шаг 5", title: "Выезжаете до указанного времени", text: "Оставляете ключ/код по инструкции, остальное — наша забота." },
              ].map((s) => (
                <div key={s.n} className="rounded-xl p-4 border" style={{ background: "#fff", borderColor: "#e4e1db" }}>
                  <div className="text-[13px] font-semibold mb-1.5" style={{ color: "#e53935" }}>{s.n}</div>
                  <div className="font-semibold mb-1">{s.title}</div>
                  <p style={{ color: "#777" }}>{s.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px]" style={{ color: "#777" }}>
              Коды меняются после каждого гостя. Уборка и контроль состояния квартиры — наша зона ответственности.
            </p>
          </div>
        </section>

        {/* LOCATIONS */}
        <section id="locations" className="py-10 scroll-mt-20">
          <div className="max-w-[1100px] mx-auto px-4">
            <h2 className="font-display text-[26px] font-semibold mb-1">Локации во Владивостоке</h2>
            <p className="text-sm mb-6" style={{ color: "#777" }}>Выбирайте район под свои маршруты — от деловых поездок до прогулок по набережной.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Центр", text: "Для тех, кто хочет быть в сердце города: кафе, набережная, деловые встречи рядом. Парковка — платные зоны и стоянки вдоль улиц." },
                { title: "AURA Apartments", text: "Новый жилой комплекс на 100‑летия Владивостоку. Удобные развязки, торговый центр, подземный паркинг." },
                { title: "Чуркин / вид на мост", text: "Район с видами на мост на Русский остров и бухту. Для тех, кто хочет чувствовать Владивосток из окна." },
                { title: "2‑я Речка / БАМ", text: "Практичная локация для рабочих поездок, с удобной логистикой и понятными ценами." },
              ].map((loc) => (
                <div key={loc.title} className="rounded-xl p-4 border text-[14px]" style={{ background: "#fff", borderColor: "#e4e1db" }}>
                  <h3 className="font-display text-[16px] font-semibold mb-1.5">{loc.title}</h3>
                  <p className="mb-3" style={{ color: "#777" }}>{loc.text}</p>
                  <button
                    onClick={() => scrollTo("catalog")}
                    className="rounded-full px-3 py-1.5 text-[13px] border transition-colors"
                    style={{ border: "1px solid #d0cec7" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#222")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d0cec7")}
                  >
                    Смотреть апартаменты
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="py-10 scroll-mt-20" style={{ background: "#f0eee8" }}>
          <div className="max-w-[1100px] mx-auto px-4">
            <h2 className="font-display text-[26px] font-semibold mb-1">Что говорят гости Prim Rooms</h2>
            <p className="text-sm mb-6" style={{ color: "#777" }}>Часть отзывов с площадок Avito, Суточно, Ostrovok и Яндекс.Путешествия.</p>
            <div className="grid sm:grid-cols-3 gap-4 text-[14px]">
              {[
                { meta: "Командировка • Ostrovok", text: "Приезжаю во Владивосток регулярно, теперь останавливаюсь только здесь. Заселение по коду — очень удобно, не нужно подстраиваться под кого‑то." },
                { meta: "Пара на выходные • Суточно.ру", text: "Квартира чистая, всё как на фото. Вид из окна на мост впечатлил. Заселились поздно вечером, проблем не было." },
                { meta: "Бригада • Avito", text: "Сняли апартаменты для рабочих. Кухня, стиралка, нормальные кровати — ребята отдохнули, утром поехали на объект. Спасибо за оперативность." },
              ].map((r) => (
                <div key={r.meta} className="rounded-xl p-4 border" style={{ background: "#fff", borderColor: "#e4e1db" }}>
                  <p className="text-[12px] mb-2" style={{ color: "#777" }}>{r.meta}</p>
                  <p style={{ color: "#333" }}>«{r.text}»</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px]" style={{ color: "#777" }}>
              На разных площадках размещено больше отзывов — со временем перенесём часть на сайт.
            </p>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-10 scroll-mt-20">
          <div className="max-w-[760px] mx-auto px-4">
            <h2 className="font-display text-[26px] font-semibold mb-3">Prim Rooms: пространство для жизни, а не просто ночлег</h2>
            <p className="text-[14px] mb-3" style={{ color: "#444" }}>
              Prim Rooms Apartments работает во Владивостоке с 2017 года. Мы строим апартаменты буквально из бетона — проектируем планировки, делаем ремонт, создаём пространство, в котором удобно жить, работать и отдыхать.
            </p>
            <p className="text-[14px] mb-5" style={{ color: "#444" }}>
              Нам важны уникальность, надёжность, качество и нестандартный стиль. Поэтому каждую квартиру мы готовим под реальные сценарии гостей, а не просто «сдаём площадь».
            </p>
            <h3 className="font-display text-[18px] font-semibold mb-2">Для собственников и инвесторов</h3>
            <p className="text-[14px]" style={{ color: "#777" }}>
              У нас есть отдельное направление по работе с собственниками и инвесторами: берём квартиры в управление, доводим их до формата апартаментов и обеспечиваем доходность. Отдельный сайт и материалы — в разработке.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-10 scroll-mt-20" style={{ background: "#f0eee8" }}>
          <div className="max-w-[760px] mx-auto px-4">
            <h2 className="font-display text-[26px] font-semibold mb-6">Частые вопросы</h2>
            <div style={{ borderTop: "1px solid #e0ded8" }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid #e0ded8" }}>
                  <button
                    className="w-full flex items-center justify-between text-left gap-4 py-3"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-[14px]">{item.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={15} style={{ color: "#777" }} className="shrink-0" />
                  </button>
                  {openFaq === i && (
                    <p className="pb-3 text-[14px] animate-fade-in" style={{ color: "#777" }}>{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER / CONTACTS */}
      <footer id="contacts" className="pt-6 pb-5 scroll-mt-20" style={{ background: "#222", color: "#f5f5f5" }}>
        <div className="max-w-[1100px] mx-auto px-4 grid md:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
          <div>
            <div className="font-bold tracking-[0.12em] uppercase text-sm mb-2">PRIM ROOMS APARTMENTS</div>
            <p className="text-[13px] mb-1.5" style={{ color: "#b8b6b0" }}>Сеть апартаментов во Владивостоке с бесконтактным заселением.</p>
            <p className="text-[13px] mb-1">Телефон: <a href="tel:+79502928900" className="hover:underline">+7 (950) 29‑28‑900</a></p>
            <p className="text-[13px] mb-1">E‑mail: <a href="mailto:info@primrooms.ru" className="hover:underline">info@primrooms.ru</a></p>
            <p className="text-[13px] mb-1" style={{ color: "#b8b6b0" }}>Мессенджеры: WhatsApp, Telegram</p>
            <p className="mt-3 text-[12px]" style={{ color: "#b8b6b0" }}>
              Юридическая информация, политика конфиденциальности и пользовательское соглашение размещаются здесь.
            </p>
          </div>
          <div>
            <div className="font-semibold text-[15px] mb-2">Быстрая навигация</div>
            <div className="flex flex-col gap-1.5 text-[13px]">
              {[["Найти апартаменты", "catalog"], ["Проживание для сотрудников", "business"], ["Частые вопросы", "faq"]].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left hover:underline" style={{ color: "#f5f5f5" }}>
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTo("catalog")}
              className="mt-4 rounded-full px-4 py-2 text-sm font-medium text-white"
              style={{ background: "#00696f" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#005158")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#00696f")}
            >
              Забронировать апартаменты
            </button>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto px-4 mt-5 text-center text-[11px]" style={{ color: "#b8b6b0" }}>
          © {new Date().getFullYear()} Prim Rooms Apartments. Все права защищены.
        </div>
      </footer>
    </div>
  );
}