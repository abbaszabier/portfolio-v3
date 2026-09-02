import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    project: string;
    about: string;
    contact: string;
    language: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
  home: {
    badge: string;
    greeting: string;
    name: string;
    subtitle: string;
    ctaProject: string;
    ctaContact: string;
    sectionLabel: string;
    sectionTitle: string;
    viewAll: string;
  };
  dashboard: {
    label: string;
    title: string;
    subtitle: string;
    statTotal: string;
    statTech: string;
    statActive: string;
  };
  project: {
    whatIDid: string;
    techStack: string;
    visitProject: string;
    imageFallback: string;
  };
  about: {
    label: string;
    name: string;
    bio: string;
    downloadCv: string;
    photoFallback: string;
    cvFallback: string;
    skillLabel: string;
    skillTitle: string;
    categories: {
      Frontend: string;
      Backend: string;
      Tools: string;
    };
    experienceLabel: string;
    experienceTitle: string;
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    errorRequired: string;
    errorNoApiKey: string;
    errorGeneric: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  id: {
    meta: {
      title: "Abbas Zabier Mohammad — Portfolio",
      description:
        "Portfolio software engineer yang dibangun dengan Next.js, Tailwind CSS, dan shadcn/ui.",
    },
    nav: {
      home: "Home",
      project: "Project",
      about: "Tentang",
      contact: "Kontak",
      language: "Bahasa",
    },
    footer: {
      rights: "Seluruh hak cipta dilindungi.",
      builtWith: "Dibuat dengan ❤️ oleh Abbas Zabier Mohammad",
    },
    home: {
      badge: "Terbuka untuk peluang baru",
      greeting: "Halo, saya",
      name: "Abbas Zabier.",
      subtitle:
        "Software engineer yang membangun aplikasi web modern dengan Next.js, TypeScript, dan Tailwind CSS.",
      ctaProject: "Lihat Project",
      ctaContact: "Hubungi Saya",
      sectionLabel: "Project",
      sectionTitle: "Beberapa project terbaru",
      viewAll: "Lihat semua",
    },
    dashboard: {
      label: "Dashboard",
      title: "Project",
      subtitle: "Daftar project yang pernah saya kerjakan.",
      statTotal: "Total Project",
      statTech: "Tech Stack Dipakai",
      statActive: "Project Aktif",
    },
    project: {
      whatIDid: "Apa yang saya lakukan",
      techStack: "Teknologi yang digunakan",
      visitProject: "Kunjungi Project",
      imageFallback: "Gambar belum tersedia",
    },
    about: {
      label: "Tentang Saya",
      name: "Abbas Zabier Mohammad",
      bio: "Software engineer yang fokus membangun aplikasi web modern dan antarmuka yang rapi menggunakan Next.js, TypeScript, dan Tailwind CSS. Senang berkolaborasi lintas tim untuk mengubah ide jadi produk yang enak dipakai.",
      downloadCv: "Download CV",
      photoFallback: "Taruh foto di public/profile.jpg",
      cvFallback: "Taruh file di public/cv.pdf",
      skillLabel: "Skill",
      skillTitle: "Teknologi yang saya kuasai",
      categories: { Frontend: "Frontend", Backend: "Backend", Tools: "Tools" },
      experienceLabel: "Pengalaman",
      experienceTitle: "Perjalanan karier",
    },
    contact: {
      label: "Contact",
      title: "Mari terhubung",
      subtitle:
        "Ada project, peluang kerja, atau sekadar mau ngobrol? Kirim pesan lewat form di bawah, saya akan balas ke email kamu.",
      formName: "Nama",
      formNamePlaceholder: "Nama kamu",
      formEmail: "Email",
      formEmailPlaceholder: "kamu@email.com",
      formMessage: "Pesan",
      formMessagePlaceholder: "Tulis pesan kamu di sini...",
      submit: "Kirim Pesan",
      submitting: "Mengirim...",
      success:
        "Pesan kamu berhasil terkirim. Terima kasih, saya akan balas secepatnya.",
      errorRequired: "Semua field wajib diisi.",
      errorNoApiKey:
        "RESEND_API_KEY belum diset di .env.local. Daftar gratis di resend.com untuk dapat API key.",
      errorGeneric: "Gagal mengirim pesan.",
    },
  },
  en: {
    meta: {
      title: "Abbas Zabier Mohammad — Portfolio",
      description:
        "Software engineer portfolio built with Next.js, Tailwind CSS, and shadcn/ui.",
    },
    nav: {
      home: "Home",
      project: "Projects",
      about: "About",
      contact: "Contact",
      language: "Language",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with ❤️ by Abbas Zabier Mohammad",
    },
    home: {
      badge: "Open to new opportunities",
      greeting: "Hi, I'm",
      name: "Abbas Zabier.",
      subtitle:
        "Software engineer building modern web apps with Next.js, TypeScript, and Tailwind CSS.",
      ctaProject: "View Projects",
      ctaContact: "Contact Me",
      sectionLabel: "Projects",
      sectionTitle: "Latest projects",
      viewAll: "View all",
    },
    dashboard: {
      label: "Dashboard",
      title: "Projects",
      subtitle: "A list of projects I've worked on.",
      statTotal: "Total Projects",
      statTech: "Tech Stacks Used",
      statActive: "Active Projects",
    },
    project: {
      whatIDid: "What I did",
      techStack: "Technologies used",
      visitProject: "Visit Project",
      imageFallback: "Image not available yet",
    },
    about: {
      label: "About Me",
      name: "Abbas Zabier Mohammad",
      bio: "Software engineer focused on building modern web apps and clean interfaces using Next.js, TypeScript, and Tailwind CSS. I enjoy collaborating across teams to turn ideas into products people love using.",
      downloadCv: "Download CV",
      photoFallback: "Add a photo at public/profile.jpg",
      cvFallback: "Add a file at public/cv.pdf",
      skillLabel: "Skills",
      skillTitle: "Technologies I work with",
      categories: { Frontend: "Frontend", Backend: "Backend", Tools: "Tools" },
      experienceLabel: "Experience",
      experienceTitle: "Career journey",
    },
    contact: {
      label: "Contact",
      title: "Let's connect",
      subtitle:
        "Have a project, job opportunity, or just want to chat? Send a message via the form below and I'll reply to your email.",
      formName: "Name",
      formNamePlaceholder: "Your name",
      formEmail: "Email",
      formEmailPlaceholder: "you@email.com",
      formMessage: "Message",
      formMessagePlaceholder: "Write your message here...",
      submit: "Send Message",
      submitting: "Sending...",
      success: "Your message has been sent. Thanks, I'll get back to you soon.",
      errorRequired: "All fields are required.",
      errorNoApiKey:
        "RESEND_API_KEY isn't set in .env.local. Sign up for free at resend.com to get an API key.",
      errorGeneric: "Failed to send message.",
    },
  },
  zh: {
    meta: {
      title: "Abbas Zabier Mohammad — 作品集",
      description:
        "使用 Next.js、Tailwind CSS 和 shadcn/ui 构建的软件工程师作品集。",
    },
    nav: {
      home: "首页",
      project: "项目",
      about: "关于",
      contact: "联系",
      language: "语言",
    },
    footer: {
      rights: "版权所有。",
      builtWith: "由 Abbas Zabier Mohammad 使用 ❤️ 构建",
    },
    home: {
      badge: "欢迎新的合作机会",
      greeting: "你好，我是",
      name: "Abbas Zabier。",
      subtitle:
        "软件工程师，使用 Next.js、TypeScript 和 Tailwind CSS 构建现代网页应用。",
      ctaProject: "查看项目",
      ctaContact: "联系我",
      sectionLabel: "项目",
      sectionTitle: "近期项目",
      viewAll: "查看全部",
    },
    dashboard: {
      label: "仪表盘",
      title: "项目",
      subtitle: "我曾参与开发的项目列表。",
      statTotal: "项目总数",
      statTech: "使用的技术栈",
      statActive: "进行中的项目",
    },
    project: {
      whatIDid: "我做了什么",
      techStack: "使用的技术",
      visitProject: "查看项目",
      imageFallback: "图片暂未提供",
    },
    about: {
      label: "关于我",
      name: "Abbas Zabier Mohammad",
      bio: "软件工程师，专注于使用 Next.js、TypeScript 和 Tailwind CSS 构建现代网页应用与简洁的界面。喜欢跨团队协作，把想法变成好用的产品。",
      downloadCv: "下载简历",
      photoFallback: "请将照片放在 public/profile.jpg",
      cvFallback: "请将文件放在 public/cv.pdf",
      skillLabel: "技能",
      skillTitle: "我掌握的技术",
      categories: { Frontend: "前端", Backend: "后端", Tools: "工具" },
      experienceLabel: "工作经历",
      experienceTitle: "职业历程",
    },
    contact: {
      label: "联系",
      title: "一起聊聊",
      subtitle:
        "有项目、工作机会，或只是想聊聊？在下方表单留言，我会回复到你的邮箱。",
      formName: "姓名",
      formNamePlaceholder: "你的姓名",
      formEmail: "邮箱",
      formEmailPlaceholder: "you@email.com",
      formMessage: "留言",
      formMessagePlaceholder: "在这里写下你的留言...",
      submit: "发送留言",
      submitting: "发送中...",
      success: "留言已发送，谢谢，我会尽快回复你。",
      errorRequired: "请填写所有字段。",
      errorNoApiKey:
        "尚未在 .env.local 中设置 RESEND_API_KEY。前往 resend.com 免费注册获取 API key。",
      errorGeneric: "留言发送失败。",
    },
  },
  ja: {
    meta: {
      title: "Abbas Zabier Mohammad — ポートフォリオ",
      description:
        "Next.js、Tailwind CSS、shadcn/ui で構築したソフトウェアエンジニアのポートフォリオ。",
    },
    nav: {
      home: "ホーム",
      project: "プロジェクト",
      about: "概要",
      contact: "お問い合わせ",
      language: "言語",
    },
    footer: {
      rights: "全著作権所有。",
      builtWith: "Abbas Zabier Mohammad による ❤️ で構築",
    },
    home: {
      badge: "新しい機会を歓迎しています",
      greeting: "こんにちは、",
      name: "Abbasです。",
      subtitle:
        "Next.js、TypeScript、Tailwind CSSでモダンなWebアプリを開発するソフトウェアエンジニア。",
      ctaProject: "プロジェクトを見る",
      ctaContact: "お問い合わせ",
      sectionLabel: "プロジェクト",
      sectionTitle: "最近のプロジェクト",
      viewAll: "すべて見る",
    },
    dashboard: {
      label: "ダッシュボード",
      title: "プロジェクト",
      subtitle: "これまで手がけたプロジェクトの一覧です。",
      statTotal: "プロジェクト総数",
      statTech: "使用した技術スタック",
      statActive: "進行中のプロジェクト",
    },
    project: {
      whatIDid: "取り組んだこと",
      techStack: "使用技術",
      visitProject: "プロジェクトを見る",
      imageFallback: "画像は準備中です",
    },
    about: {
      label: "自己紹介",
      name: "Abbas Zabier Mohammad",
      bio: "Next.js、TypeScript、Tailwind CSSを用いたモダンなWebアプリとシンプルなUI構築を得意とするソフトウェアエンジニア。チームを超えて協業し、アイデアを使いやすいプロダクトへと形にすることにやりがいを感じています。",
      downloadCv: "履歴書をダウンロード",
      photoFallback: "public/profile.jpg に写真を配置してください",
      cvFallback: "public/cv.pdf にファイルを配置してください",
      skillLabel: "スキル",
      skillTitle: "得意な技術",
      categories: {
        Frontend: "フロントエンド",
        Backend: "バックエンド",
        Tools: "ツール",
      },
      experienceLabel: "経歴",
      experienceTitle: "キャリアの歩み",
    },
    contact: {
      label: "お問い合わせ",
      title: "気軽にご連絡ください",
      subtitle:
        "プロジェクトのご相談、お仕事のオファー、ちょっとした雑談でも構いません。下のフォームからメッセージを送ってください。メールで返信します。",
      formName: "お名前",
      formNamePlaceholder: "お名前を入力",
      formEmail: "メールアドレス",
      formEmailPlaceholder: "you@email.com",
      formMessage: "メッセージ",
      formMessagePlaceholder: "ここにメッセージを入力してください...",
      submit: "送信する",
      submitting: "送信中...",
      success:
        "メッセージを送信しました。ありがとうございます、追ってご連絡します。",
      errorRequired: "すべての項目を入力してください。",
      errorNoApiKey:
        ".env.local に RESEND_API_KEY が設定されていません。resend.com で無料登録してAPIキーを取得してください。",
      errorGeneric: "メッセージの送信に失敗しました。",
    },
  },
  hi: {
    meta: {
      title: "Abbas Zabier Mohammad — पोर्टफोलियो",
      description:
        "Next.js, Tailwind CSS और shadcn/ui से बना सॉफ्टवेयर इंजीनियर पोर्टफोलियो।",
    },
    nav: {
      home: "होम",
      project: "प्रोजेक्ट",
      about: "परिचय",
      contact: "संपर्क",
      language: "भाषा",
    },
    footer: {
      rights: "सर्वाधिकार सुरक्षित।",
      builtWith: "Abbas Zabier Mohammad द्वारा ❤️ के साथ बनाया गया",
    },
    home: {
      badge: "नए अवसरों के लिए उपलब्ध",
      greeting: "नमस्ते, मैं हूँ",
      name: "Abbas Zabier.",
      subtitle:
        "एक सॉफ्टवेयर इंजीनियर जो Next.js, TypeScript और Tailwind CSS से आधुनिक वेब ऐप बनाता है।",
      ctaProject: "प्रोजेक्ट देखें",
      ctaContact: "मुझसे संपर्क करें",
      sectionLabel: "प्रोजेक्ट",
      sectionTitle: "हाल के प्रोजेक्ट",
      viewAll: "सभी देखें",
    },
    dashboard: {
      label: "डैशबोर्ड",
      title: "प्रोजेक्ट",
      subtitle: "मेरे द्वारा किए गए प्रोजेक्ट्स की सूची।",
      statTotal: "कुल प्रोजेक्ट",
      statTech: "इस्तेमाल की गई टेक स्टैक",
      statActive: "सक्रिय प्रोजेक्ट",
    },
    project: {
      whatIDid: "मैंने क्या किया",
      techStack: "इस्तेमाल की गई तकनीकें",
      visitProject: "प्रोजेक्ट देखें",
      imageFallback: "छवि अभी उपलब्ध नहीं है",
    },
    about: {
      label: "मेरे बारे में",
      name: "Abbas Zabier Mohammad",
      bio: "एक सॉफ्टवेयर इंजीनियर जो Next.js, TypeScript और Tailwind CSS का उपयोग करके आधुनिक वेब ऐप और सुव्यवस्थित इंटरफ़ेस बनाने पर केंद्रित है। विचारों को उपयोग में आसान प्रोडक्ट में बदलने के लिए टीमों के साथ मिलकर काम करना पसंद है।",
      downloadCv: "सीवी डाउनलोड करें",
      photoFallback: "फ़ोटो public/profile.jpg में रखें",
      cvFallback: "फ़ाइल public/cv.pdf में रखें",
      skillLabel: "स्किल",
      skillTitle: "मेरी तकनीकी दक्षता",
      categories: { Frontend: "फ्रंटएंड", Backend: "बैकएंड", Tools: "टूल्स" },
      experienceLabel: "अनुभव",
      experienceTitle: "करियर की यात्रा",
    },
    contact: {
      label: "संपर्क",
      title: "आइए जुड़ें",
      subtitle:
        "कोई प्रोजेक्ट, जॉब का अवसर, या बस बात करना चाहते हैं? नीचे दिए फॉर्म से मैसेज भेजें, मैं आपके ईमेल पर जवाब दूँगा।",
      formName: "नाम",
      formNamePlaceholder: "आपका नाम",
      formEmail: "ईमेल",
      formEmailPlaceholder: "you@email.com",
      formMessage: "संदेश",
      formMessagePlaceholder: "अपना संदेश यहाँ लिखें...",
      submit: "संदेश भेजें",
      submitting: "भेजा जा रहा है...",
      success: "आपका संदेश भेज दिया गया है। धन्यवाद, मैं जल्द ही जवाब दूँगा।",
      errorRequired: "सभी फ़ील्ड भरना ज़रूरी है।",
      errorNoApiKey:
        "RESEND_API_KEY .env.local में सेट नहीं है। API key पाने के लिए resend.com पर मुफ़्त में साइन अप करें।",
      errorGeneric: "संदेश भेजने में विफल।",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
