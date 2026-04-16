import { useState } from "react";
import Icon from "@/components/ui/icon";

const apartments = [
  {
    id: 1,
    name: "Prim Rooms Центр",
    area: "Центр",
    desc: "Студия с панорамными окнами в историческом центре. Рядом набережная и деловые кварталы.",
    beds: 2,
    sqm: 32,
    parking: false,
    price: 3800,
    tags: ["Для командировки", "Для пары"],
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    id: 2,
    name: "Prim Rooms AURA",
    area: "AURA",
    desc: "Современные апартаменты рядом с ТЦ AURA. Рабочее место, скоростной интернет, парковка.",
    beds: 2,
    sqm: 40,
    parking: true,
    price: 4200,
    tags: ["Для командировки", "С видом на море"],
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  },
  {
    id: 3,
    name: "Prim Rooms Чуркин",
    area: "Чуркин",
    desc: "Просторная квартира с видом на бухту. Уютная кухня, две комнаты, можно с питомцами.",
    beds: 4,
    sqm: 58,
    parking: true,
    price: 5500,
    tags: ["Можно с питомцами", "Для пары"],
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    id: 4,
    name: "Prim Rooms 2-я Речка",
    area: "2-я Речка",
    desc: "Функциональная студия у остановки. Отличный вариант для длительных командировок.",
    beds: 2,
    sqm: 28,
    parking: false,
    price: 3200,
    tags: ["Для командировки"],
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    id: 5,
    name: "Prim Rooms Sea View",
    area: "Центр",
    desc: "Апартаменты с панорамным видом на Амурский залив. Романтика и деловой Владивосток в одном.",
    beds: 2,
    sqm: 45,
    parking: false,
    price: 6000,
    tags: ["С видом на море", "Для пары"],
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
  {
    id: 6,
    name: "Prim Rooms Бригада",
    area: "Чуркин",
    desc: "Трёхкомнатные апартаменты для небольших бригад. 3 раздельные кровати, большая кухня.",
    beds: 6,
    sqm: 75,
    parking: true,
    price: 7800,
    tags: ["Для командировки"],
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
  },
];

const tabs = ["Все апартаменты", "Для командировки", "Для пары", "С видом на море", "Можно с питомцами"];

const faqItems = [
  {
    q: "Как получить код на вход?",
    a: "После оплаты код и инструкции автоматически приходят в мессенджер и на e-mail. Код действует только на время вашего проживания.",
  },
  {
    q: "В какое время можно заселиться?",
    a: "Заезд с 14:00, выезд до 12:00. Благодаря бесконтактному заселению можно приехать в любое время суток — никого ждать не нужно.",
  },
  {
    q: "Предоставляете ли документы для командировочных?",
    a: "Да, по запросу оформляем все необходимые отчётные документы для бухгалтерии: договор, чек, акт.",
  },
  {
    q: "Есть ли Wi-Fi и рабочее место?",
    a: "Во всех апартаментах есть высокоскоростной Wi-Fi, рабочий стол и розетки у стола и кровати.",
  },
  {
    q: "Можно ли с питомцем?",
    a: "В некоторых апартаментах — да. Фильтруйте по метке «Можно с питомцами» в каталоге или уточните при бронировании.",
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("Все апартаменты");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", contact: "", comment: "" });
  const [formSent, setFormSent] = useState(false);

  const filtered = activeTab === "Все апартаменты"
    ? apartments
    : apartments.filter((a) => a.tags.includes(activeTab));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-display text-xl font-bold tracking-[0.15em] text-navy">
            PRIM ROOMS
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "Апартаменты", href: "#catalog" },
              { label: "Для командировок", href: "#business" },
              { label: "Как это работает", href: "#how" },
              { label: "FAQ", href: "#faq" },
              { label: "Контакты", href: "#contacts" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-navy transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a
              href="#catalog"
              className="bg-navy text-gold-light text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-navy/90 transition-colors"
            >
              Найти апартаменты
            </a>
          </div>
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 pb-4 flex flex-col gap-3 animate-fade-in">
            {[
              { label: "Апартаменты", href: "#catalog" },
              { label: "Для командировок", href: "#business" },
              { label: "Как это работает", href: "#how" },
              { label: "FAQ", href: "#faq" },
              { label: "Контакты", href: "#contacts" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-navy font-medium py-1"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#catalog"
              onClick={() => setMenuOpen(false)}
              className="bg-navy text-gold-light text-sm font-semibold px-5 py-2.5 rounded-lg text-center mt-1"
            >
              Найти апартаменты
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-16 overflow-hidden texture-overlay"
        style={{ background: "linear-gradient(135deg, hsl(218,55%,14%) 0%, hsl(220,40%,22%) 100%)" }}
      >
        <div
          className="absolute top-20 right-[-80px] w-[480px] h-[480px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(45,60%,55%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(200,50%,60%) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 text-gold text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Icon name="MapPin" size={12} />
              Владивосток • Апартаменты
            </div>
            <h1 className="animate-fade-up delay-100 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6">
              Апартаменты<br />
              <span style={{ color: "hsl(45,60%,65%)" }}>без ожидания</span>
            </h1>
            <p className="animate-fade-up delay-200 text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Сеть апартаментов в разных районах Владивостока. Выбрали — оплатили — получили код — заселились.
            </p>
            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#catalog"
                className="bg-gold text-navy font-bold px-7 py-3.5 rounded-lg text-base hover:bg-gold/90 transition-all hover:scale-105 text-center"
              >
                Найти апартаменты
              </a>
              <a
                href="#business"
                className="border border-white/30 text-white font-medium px-7 py-3.5 rounded-lg text-base hover:bg-white/10 transition-colors text-center"
              >
                Для командировок
              </a>
            </div>
            <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4">
              {[
                { icon: "KeyRound", text: "Код сразу после оплаты" },
                { icon: "Clock", text: "Заезд 24/7" },
                { icon: "Headphones", text: "Поддержка в мессенджерах" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon name={b.icon} size={15} className="text-gold shrink-0" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-slide-in-right delay-300 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-6 font-semibold">Prim Rooms — с 2017 года</p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { value: "6+", label: "локаций в городе" },
                  { value: "24/7", label: "самозаселение" },
                  { value: "7 лет", label: "на рынке" },
                  { value: "100%", label: "онлайн-оплата" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-4xl font-semibold text-gold mb-1">{s.value}</div>
                    <div className="text-white/60 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/15 pt-6">
                <p className="text-white/50 text-xs mb-3">Районы присутствия</p>
                <div className="flex flex-wrap gap-2">
                  {["Центр", "AURA", "Чуркин", "2-я Речка"].map((r) => (
                    <span key={r} className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">{r}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-3">Преимущества</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy">Почему выбирают Prim Rooms</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "KeyRound",
                title: "Бесконтактное заселение 24/7",
                text: "Приезжаете в любое время, вводите код на двери и сразу заходите в квартиру.",
              },
              {
                icon: "MapPin",
                title: "Локации под разные задачи",
                text: "Центр, AURA, Чуркин, 2‑я Речка — можно выбрать район под свои маршруты по городу.",
              },
              {
                icon: "Camera",
                title: "Честные фото и комплектация",
                text: "Реальные фотографии, Wi‑Fi, кухня, рабочее место и базовый набор для жизни.",
              },
              {
                icon: "FileText",
                title: "Документы для командировок",
                text: "По запросу предоставляются отчётные документы для бухгалтерии.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={20} className="text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-3">Каталог</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy mb-3">
              Апартаменты во Владивостоке
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Выберите подходящий вариант и забронируйте онлайн — код на вход придёт сразу после оплаты.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap justify-center mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-navy text-gold-light"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((apt) => (
              <div
                key={apt.id}
                className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={apt.img}
                    alt={apt.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-navy/90 text-gold text-xs font-semibold px-3 py-1 rounded-full">
                    {apt.area}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 text-navy text-xs font-bold px-3 py-1 rounded-full">
                    от {apt.price.toLocaleString()} ₽/сут
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-navy mb-1">{apt.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{apt.desc}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Users" size={14} />
                      До {apt.beds} гостей
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Maximize2" size={14} />
                      {apt.sqm} м²
                    </span>
                    {apt.parking && (
                      <span className="flex items-center gap-1.5">
                        <Icon name="Car" size={14} />
                        Парковка
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {apt.tags.map((tag) => (
                      <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-navy text-gold-light font-semibold py-2.5 rounded-xl hover:bg-navy/90 transition-colors text-sm">
                    Забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS */}
      <section id="business" className="py-20 bg-navy relative overflow-hidden texture-overlay">
        <div
          className="absolute right-[-120px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(45,60%,55%) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-4">Для бизнеса</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white leading-tight mb-6">
                Для командировок<br />и рабочих поездок
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Командировка — это про задачи, а не про поиск жилья в последний момент. Мы делаем апартаменты удобными для сотрудников и компаний.
              </p>
              <ul className="space-y-4">
                {[
                  "Отчётные документы для бухгалтерии по запросу.",
                  "Интернет, рабочее место, розетки у стола и кровати.",
                  "Самозаселение — не нужно ждать администратора или хозяина.",
                  "Локации рядом с офисами, портом, стройками и деловыми площадками.",
                  "Есть квартиры для размещения небольших бригад.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/75 text-sm">
                    <div className="w-5 h-5 bg-gold/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="Check" size={11} className="text-gold" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="font-display text-2xl font-semibold text-navy mb-1">Запросить проживание</h3>
              <p className="text-muted-foreground text-sm mb-6">Для сотрудников и бригад — напишите нам</p>
              {formSent ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={28} className="text-navy" />
                  </div>
                  <p className="font-display text-xl font-semibold text-navy mb-2">Запрос отправлен!</p>
                  <p className="text-muted-foreground text-sm">Свяжемся с вами в течение рабочего дня.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Имя", placeholder: "Иван Иванов" },
                    { key: "company", label: "Компания", placeholder: "ООО Ромашка" },
                    { key: "contact", label: "Телефон или e-mail", placeholder: "+7 900 000-00-00" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-sm font-medium text-navy mb-1.5">{f.label}</label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={formData[f.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Комментарий</label>
                    <textarea
                      placeholder="Даты, кол-во сотрудников, пожелания..."
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-navy text-gold-light font-bold py-3 rounded-xl hover:bg-navy/90 transition-colors"
                  >
                    Отправить запрос
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-3">Процесс</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy">Как это работает</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />
            <div className="space-y-8">
              {[
                { n: "01", text: "Выбираете апартаменты и даты на сайте или в форме бронирования." },
                { n: "02", text: "Оформляете бронирование и оплачиваете онлайн." },
                { n: "03", text: "Получаете инструкции и код на вход в мессенджер и на e-mail." },
                { n: "04", text: "Приезжаете в удобное время и вводите код на двери." },
                { n: "05", text: "Выезжаете до указанного времени, остальное берём на себя." },
              ].map((step) => (
                <div key={step.n} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center shrink-0 z-10">
                    <span className="font-display text-gold font-bold text-sm">{step.n}</span>
                  </div>
                  <div className="bg-white border border-border rounded-xl px-6 py-4 flex-1 shadow-sm">
                    <p className="text-navy text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-10">
            Коды меняются после каждого гостя. Уборка и контроль состояния квартиры — на стороне Prim Rooms.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-navy">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-navy text-sm">{item.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    className="text-muted-foreground shrink-0 ml-4"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-navy relative overflow-hidden texture-overlay">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, hsl(45,60%,55%) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-semibold text-xs uppercase tracking-widest mb-4">Контакты</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-3">Свяжитесь с нами</h2>
          <p className="text-white/60 mb-12">Поддержка 24/7 в мессенджерах</p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (423) 000-00-00" },
              { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@primrooms" },
              { icon: "Mail", label: "E-mail", value: "hello@primrooms.ru" },
            ].map((c) => (
              <div key={c.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-5">
                <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={c.icon} size={18} className="text-gold" />
                </div>
                <p className="text-white/50 text-xs mb-1">{c.label}</p>
                <p className="text-white font-medium text-sm">{c.value}</p>
              </div>
            ))}
          </div>
          <a
            href="#catalog"
            className="bg-gold text-navy font-bold px-8 py-4 rounded-xl text-base hover:bg-gold/90 transition-all hover:scale-105 inline-block"
          >
            Найти апартаменты
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(218,55%,10%)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-bold tracking-[0.15em] text-gold/80">PRIM ROOMS</span>
          <p className="text-white/30 text-xs">© 2017–2026 Prim Rooms Apartments, Владивосток</p>
          <p className="text-white/30 text-xs">primrooms.ru</p>
        </div>
      </footer>
    </div>
  );
}
