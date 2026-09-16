import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BellRing,
  Bluetooth,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  CloudSun,
  Heart,
  Menu,
  Minus,
  Phone,
  Radio,
  ShieldCheck,
  Smartphone,
  Thermometer,
  Wifi,
  X,
  Zap,
} from "lucide-react";

const productImage = "/manus-storage/product-hero_89796351.png";

const features = [
  {
    icon: Thermometer,
    accent: "orange",
    title: "قياس لحظي للحرارة",
    text: "راقب درجة حرارة السيارة بدقة من شاشة الجهاز أو التطبيق، وكن على اطلاع قبل أن يتغير الوضع.",
  },
  {
    icon: BellRing,
    accent: "pink",
    title: "تنبيهات عند الخطر",
    text: "إشعار فوري عند ارتفاع الحرارة أو اكتشاف وجود طفل، حتى تتصرف في الوقت المناسب.",
  },
  {
    icon: ShieldCheck,
    accent: "purple",
    title: "حساسات ذكية للحضور",
    text: "مصمم لمساعدتك على التأكد من خلو السيارة من الأطفال قبل المغادرة، دون خطوات معقدة.",
  },
  {
    icon: Smartphone,
    accent: "blue",
    title: "متابعة من هاتفك",
    text: "واجهة واضحة تضع حالة السيارة والتنبيهات المهمة أمامك أينما كنت.",
  },
];

const steps = [
  { number: "01", title: "ثبّت الجهاز", text: "ضعه في مكان مناسب داخل السيارة خلال دقائق." },
  { number: "02", title: "اربطه بالتطبيق", text: "اتصال ذكي يعرّفك بحالة السيارة بسرعة." },
  { number: "03", title: "اطمئن أكثر", text: "استقبل التنبيهات واتخذ القرار في الوقت المناسب." },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <main dir="rtl" className="site-shell">
      <div className="topline">
        <div className="container topline-inner">
          <span className="topline-dot" />
          <span>لأن سلامة أطفالك لا تحتمل التأجيل</span>
          <span className="topline-separator">•</span>
          <span className="topline-muted">حل ذكي لسيارة أكثر أمانًا</span>
        </div>
      </div>

      <header className="nav-wrap">
        <div className="container nav-inner">
          <button className="brand" onClick={() => navigate("hero")} aria-label="العودة للرئيسية">
            <span className="brand-mark"><ShieldCheck size={21} strokeWidth={2.4} /></span>
            <span className="brand-copy">
              <strong>لا تتركني</strong>
              <small>حماية أذكى لأطفالك</small>
            </span>
          </button>

          <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="التنقل الرئيسي">
            <button onClick={() => navigate("features")}>المزايا</button>
            <button onClick={() => navigate("how-it-works")}>كيف يعمل؟</button>
            <button onClick={() => navigate("faq")}>الأسئلة الشائعة</button>
          </nav>

          <div className="nav-actions">
            <a className="phone-link" href="tel:+966500000000"><Phone size={15} /> 050 000 0000</a>
            <button className="nav-cta" onClick={() => setShowOrder(true)}>اطلبه الآن <ArrowLeft size={17} /></button>
            <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="فتح القائمة">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <section id="hero" className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-copy reveal-up">
            <div className="eyebrow"><span className="eyebrow-line" /> أمان يبدأ من لحظة نزولك من السيارة</div>
            <h1>لا تترك القلق<br /><em>خارج السيارة.</em></h1>
            <p className="hero-lead">جهاز ذكي يراقب حرارة السيارة ويتحقق من عدم وجود أطفال بداخلها، ثم ينبهك فورًا عند الحاجة.</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => setShowOrder(true)}>احجز جهازك الآن <ArrowLeft size={18} /></button>
              <button className="text-btn" onClick={() => navigate("how-it-works")}>اكتشف كيف يعمل <ArrowUpLeft size={17} /></button>
            </div>
            <div className="trust-row">
              <div className="trust-avatars"><span>س</span><span>ن</span><span>م</span><span className="trust-plus">+</span></div>
              <div><strong>راحة بال تبدأ بخطوة</strong><small>صمّمته العائلة… للعائلة</small></div>
            </div>
          </div>

          <div className="hero-visual reveal-up delay-one">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="hero-image-card">
              <div className="card-sheen" />
              <img src={productImage} alt="جهاز لا تتركني لمراقبة حرارة السيارة وحماية الأطفال" />
            </div>
            <div className="floating-status status-temp">
              <span className="status-icon orange-icon"><Thermometer size={18} /></span>
              <span><small>حرارة السيارة</small><strong>32° <i>مستقرة</i></strong></span>
            </div>
            <div className="floating-status status-safe">
              <span className="status-icon green-icon"><CircleCheck size={18} /></span>
              <span><small>حالة المراقبة</small><strong>السيارة آمنة</strong></span>
            </div>
            <div className="visual-caption"><span className="caption-pulse" /> مراقبة ذكية، حتى وأنت بعيد</div>
          </div>
        </div>
        <div className="hero-bottom-line container"><span /> مصمم ليكون واضحًا عندما يهم الأمر <span /></div>
      </section>

      <section className="signal-strip" aria-label="أهم خصائص المنتج">
        <div className="container signal-grid">
          <div className="signal-item"><Thermometer size={22} /><span><strong>قياس دقيق</strong><small>لدرجة حرارة السيارة</small></span></div>
          <div className="signal-item"><BellRing size={22} /><span><strong>تنبيهات فورية</strong><small>عند ارتفاع الحرارة أو الخطر</small></span></div>
          <div className="signal-item"><Bluetooth size={22} /><span><strong>اتصال ذكي</strong><small>بلوتوث وواي فاي</small></span></div>
          <div className="signal-item"><CloudSun size={22} /><span><strong>مصمم للواقع</strong><small>يتحمل حرارة السيارة</small></span></div>
        </div>
      </section>

      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="section-kicker">لماذا لا تتركني؟ <span /></div><h2>لأن الطمأنينة<br /><span>تفاصيل صغيرة.</span></h2></div>
            <p>في اللحظات التي يزدحم فيها يومك، يمنحك «لا تتركني» طبقة إضافية من الحماية — بوضوح وهدوء، دون تعقيد.</p>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, text, accent }, index) => (
              <article className={`feature-card accent-${accent}`} key={title} style={{ animationDelay: `${index * 55}ms` }}>
                <div className="feature-top"><span className="feature-icon"><Icon size={22} /></span><span className="feature-index">0{index + 1}</span></div>
                <h3>{title}</h3><p>{text}</p><span className="card-arrow"><ArrowLeft size={17} /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container story-grid">
          <div className="story-visual">
            <div className="story-blob" />
            <div className="story-card-main"><img src={productImage} alt="تفاصيل منتج لا تتركني" /></div>
            <div className="story-note"><Heart size={16} fill="currentColor" /><span>مستقبل<br />أكثر أمانًا</span></div>
          </div>
          <div className="story-copy">
            <div className="section-kicker">صُنع ليحمي ما تحب <span /></div>
            <h2>أكثر من جهاز.<br /><span>حضورٌ يطمئنك.</span></h2>
            <p>نعرف أن ترك الطفل في السيارة قد يحدث في لحظة انشغال. لذلك صممنا «لا تتركني» ليكون عينًا إضافية تراقب، وتذكّرك، وتنبهك عندما تحتاج إلى الانتباه.</p>
            <div className="quote-box"><div className="quote-mark">“</div><p>أحيانًا، كل ما تحتاجه العائلة هو تنبيه واحد في الوقت المناسب.</p></div>
            <button className="outline-btn" onClick={() => navigate("how-it-works")}>تعرّف على التجربة <ArrowLeft size={17} /></button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section steps-section">
        <div className="container">
          <div className="section-heading centered-heading"><div className="section-kicker">بسيط من البداية <span /></div><h2>ثلاث خطوات،<br /><span>اطمئنان أكبر.</span></h2><p>تجربة صممت لتكون سهلة لكل أفراد العائلة.</p></div>
          <div className="steps-grid">
            {steps.map((step, index) => <div className="step-item" key={step.number}><div className="step-number">{step.number}</div><div className="step-line" /><h3>{step.title}</h3><p>{step.text}</p>{index === 0 && <div className="step-tech"><Wifi size={14} /> إعداد سريع</div>}{index === 1 && <div className="step-tech"><Radio size={14} /> اتصال موثوق</div>}{index === 2 && <div className="step-tech"><Zap size={14} /> تنبيه لحظي</div>}</div>)}
          </div>
        </div>
      </section>

      <section className="safety-banner">
        <div className="container safety-inner">
          <div className="safety-orb"><ShieldCheck size={36} /></div>
          <div><div className="section-kicker light-kicker">حين تغادر السيارة <span /></div><h2>اتركها… لكن لا تترك الاطمئنان.</h2><p>اجعل كل مشوار يبدأ وينتهي بثقة أكبر.</p></div>
          <button className="light-btn" onClick={() => setShowOrder(true)}>اطلب «لا تتركني» <ArrowLeft size={18} /></button>
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="container faq-grid">
          <div><div className="section-kicker">أسئلة تستحق إجابة <span /></div><h2>كل ما تحتاج<br /><span>معرفته.</span></h2><p>هل لديك استفسار قبل الطلب؟ هذه أبرز الإجابات.</p><a className="faq-contact" href="tel:+966500000000"><Phone size={16} /> تواصل مع فريقنا</a></div>
          <div className="faq-list">
            <details open><summary>هل يناسب جميع السيارات؟ <ChevronDown size={19} /></summary><p>صُمم الجهاز ليكون عمليًا داخل معظم السيارات، مع إعداد بسيط واتصال ذكي. تختلف طريقة التثبيت حسب تصميم السيارة.</p></details>
            <details><summary>كيف تصلني التنبيهات؟ <ChevronDown size={19} /></summary><p>تظهر التنبيهات في التطبيق عند ارتفاع الحرارة أو عند رصد حالة تستدعي انتباهك، وفق إعدادات جهازك واتصاله.</p></details>
            <details><summary>هل يحتاج إلى تركيب معقد؟ <ChevronDown size={19} /></summary><p>لا. الجهاز صغير وسهل الاستخدام، ويمر إعداد التطبيق في خطوات واضحة ومباشرة.</p></details>
            <details><summary>هل يقيس حرارة السيارة لحظيًا؟ <ChevronDown size={19} /></summary><p>نعم، يعرض الجهاز والتطبيق قراءة لحظية لحرارة السيارة للمساعدة على اتخاذ القرار المناسب.</p></details>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner"><div className="brand footer-brand"><span className="brand-mark"><ShieldCheck size={21} strokeWidth={2.4} /></span><span className="brand-copy"><strong>لا تتركني</strong><small>حماية أذكى لأطفالك</small></span></div><p>سلامة أطفالك أولًا، في كل طريق.</p><div className="footer-meta"><span>© 2026 لا تتركني</span><span>صنع بعناية للعائلات</span></div></div>
      </footer>

      {showOrder && <div className="modal-backdrop" role="presentation" onClick={() => setShowOrder(false)}><div className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowOrder(false)} aria-label="إغلاق"><X size={20} /></button>{submitted ? <div className="success-state"><span className="success-icon"><Check size={30} /></span><h2>وصلنا طلبك</h2><p>سيتواصل معك فريق «لا تتركني» قريبًا لتأكيد التفاصيل.</p><button className="primary-btn" onClick={() => { setSubmitted(false); setShowOrder(false); }}>حسنًا</button></div> : <><div className="section-kicker">خطوة نحو اطمئنان أكبر <span /></div><h2 id="order-title">احجز جهازك الآن</h2><p>اترك بياناتك وسنتواصل معك لتأكيد الطلب.</p><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>الاسم الكامل<input required placeholder="اكتب اسمك" /></label><label>رقم الجوال<input required type="tel" placeholder="05X XXX XXXX" /></label><label>المدينة<select defaultValue=""><option value="" disabled>اختر المدينة</option><option>الرياض</option><option>جدة</option><option>الدمام</option><option>أخرى</option></select></label><button className="primary-btn form-submit" type="submit">إرسال الطلب <ArrowLeft size={18} /></button></form></>}</div></div>}
    </main>
  );
}
