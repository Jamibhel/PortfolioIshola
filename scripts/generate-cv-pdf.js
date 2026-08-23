import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();

  // Load standard fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const colorPrimary = rgb(0.06, 0.09, 0.16); // #0f172a
  const colorText = rgb(0.2, 0.25, 0.33);     // #334155
  const colorMuted = rgb(0.4, 0.45, 0.55);    // #64748b
  const colorOrange = rgb(0.97, 0.45, 0.08);  // #f97316
  const colorBorder = rgb(0.85, 0.88, 0.92);  // #dbeafe
  const colorNdaBg = rgb(0.99, 0.97, 0.91);   // #fefce8
  const colorNdaBorder = rgb(0.98, 0.85, 0.5); // #fde047
  const colorNdaText = rgb(0.45, 0.25, 0.05); // amber-900

  // Page 1
  let page = pdfDoc.addPage([612, 792]);
  let y = 750;
  const leftMargin = 40;
  const rightMargin = 572;
  const contentWidth = rightMargin - leftMargin;

  function drawDivider(yPos, color = colorBorder, thickness = 0.75) {
    page.drawLine({
      start: { x: leftMargin, y: yPos },
      end: { x: rightMargin, y: yPos },
      thickness: thickness,
      color: color,
    });
  }

  function drawSectionHeading(title) {
    if (y < 80) {
      page = pdfDoc.addPage([612, 792]);
      y = 750;
    }
    y -= 14;
    page.drawText(title.toUpperCase(), {
      x: leftMargin,
      y: y,
      size: 10,
      font: fontBold,
      color: colorOrange,
    });
    y -= 4;
    drawDivider(y, colorOrange, 1.2);
    y -= 10;
  }

  // --- HEADER ---
  page.drawText('SHAMSIDEEN TAIRU', {
    x: leftMargin,
    y: y,
    size: 20,
    font: fontBold,
    color: colorPrimary,
  });
  y -= 16;

  page.drawText('Full-Stack Developer (Web & Mobile)', {
    x: leftMargin,
    y: y,
    size: 11,
    font: fontBold,
    color: colorOrange,
  });
  y -= 14;

  const contactLine = 'Maryland, USA (Open to Remote)   •   devshamsideentairu@gmail.com';
  page.drawText(contactLine, {
    x: leftMargin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });
  y -= 10;
  drawDivider(y, colorPrimary, 1.5);
  y -= 12;

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeading('Professional Summary');
  const summaryLines = [
    'Full-Stack Developer with 8+ years of engineering experience architecting and shipping high-performance cross-platform mobile apps',
    '(Flutter, React Native, native Android) and scalable cloud-native web platforms (React, Next.js, Firebase, Supabase, Node). Specialist in',
    'resilient offline-first mobile sync architectures, real-time operational SaaS platforms, and secure multi-tier transactional fintech workflows.',
  ];
  for (const line of summaryLines) {
    page.drawText(line, { x: leftMargin, y, size: 8.5, font: fontRegular, color: colorText });
    y -= 11.5;
  }
  y -= 4;

  // --- NDA / CONFIDENTIALITY BANNER ---
  page.drawRectangle({
    x: leftMargin,
    y: y - 24,
    width: contentWidth,
    height: 32,
    color: colorNdaBg,
    borderColor: colorNdaBorder,
    borderWidth: 0.75,
  });
  page.drawText('CONFIDENTIALITY / NDA NOTICE:', {
    x: leftMargin + 8,
    y: y - 2,
    size: 7.5,
    font: fontBold,
    color: colorNdaText,
  });
  page.drawText('A substantial portion of my production engineering work has been built under strict Non-Disclosure Agreements (NDAs) for enterprise', {
    x: leftMargin + 8,
    y: y - 11.5,
    size: 7.5,
    font: fontRegular,
    color: colorNdaText,
  });
  page.drawText('clients, healthcare institutions, and fintech platforms. The systems detailed below represent an authorized selection of public projects.', {
    x: leftMargin + 8,
    y: y - 21,
    size: 7.5,
    font: fontRegular,
    color: colorNdaText,
  });
  y -= 36;

  // --- CORE TECHNICAL SKILLS ---
  drawSectionHeading('Core Technical Competencies');

  const skillGroups = [
    { label: '3D & Creative Web:', text: 'Three.js, WebGL, GLSL Shaders, Draco / GLTF 3D Optimization, Canvas API, Framer Motion, Anime.js' },
    { label: 'Mobile Engineering:', text: 'Flutter, Dart, React Native, Expo, Android Studio (Java & Kotlin), SQLite, Isar, Offline-First Sync, FCM' },
    { label: 'Frontend & Web:', text: 'React 19, Next.js 15 (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, shadcn/ui, Recharts, Vite' },
    { label: 'Backend & Cloud DB:', text: 'Supabase (PostgreSQL, Row-Level Security, Edge Functions), Firebase (Firestore, Auth, Functions), Node.js' },
    { label: 'DevOps & Tooling:', text: 'REST & GraphQL APIs, WebSockets, Git, GitHub Actions (CI/CD), Fastlane, Docker, Clean Architecture' },
  ];

  for (const sg of skillGroups) {
    page.drawText(sg.label, { x: leftMargin, y, size: 8, font: fontBold, color: colorPrimary });
    const labelWidth = fontBold.widthOfTextAtSize(sg.label, 8);
    page.drawText(sg.text, { x: leftMargin + labelWidth + 4, y, size: 8, font: fontRegular, color: colorText });
    y -= 11.5;
  }
  y -= 4;

  // --- PRODUCTION PROJECTS ---
  drawSectionHeading('Selected Production Projects & Systems Experience');

  const projects = [
    {
      title: 'NutriCare — AI Senior Nutrition Platform',
      role: 'Lead Full-Stack & Mobile Developer',
      dates: 'Jan 2024 – Present',
      url: 'nutricareelderly1.vercel.app',
      tech: 'Flutter, Dart, React, Tailwind CSS, Next.js, Kotlin, Supabase',
      bullets: [
        'Engineered cross-platform mobile and web application in Flutter, Dart, and Supabase, serving 1,000+ active seniors with a 4.9/5 satisfaction score.',
        'Developed dietary algorithm calculating glycemic impact across 50+ Nigerian dishes for elderly users managing diabetes and hypertension.',
        'Built background native medication alerts with drug-food interaction checks and encrypted Supabase cloud synchronization.',
      ],
    },
    {
      title: 'MoniePal — Fintech Savings & Digital Wallet Platform',
      role: 'Full-Stack Developer',
      dates: 'Jun 2023 – Dec 2023',
      url: 'mymoniepal.com',
      tech: 'React, TypeScript, Firebase, Tailwind CSS, Progressive Web App (PWA)',
      bullets: [
        'Architected group savings (Ajo/Esusu) and digital wallet platform handling real funds with atomic balance updates and bank-grade encryption.',
        'Built progressive web app offline sync and real-time transaction reconciliation with zero balance discrepancy.',
        'Optimized KYC verification and registration flows, reducing user drop-off rate by 35%.',
      ],
    },
    {
      title: 'BookUp — Student-Tutor Community & Learning App',
      role: 'Full-Stack Mobile & Web Developer',
      dates: 'Jan 2023 – May 2023',
      url: 'bit.ly/bookup-app-install  |  book-up-ten.vercel.app',
      tech: 'Android Studio, Java, Firebase Realtime Database, React, Vite, PWA',
      bullets: [
        'Developed dual-platform ecosystem: native Android mobile app (Java) and responsive React web platform (PWA).',
        'Built real-time community feed, instant messaging channels, and tutor matching workflows with offline resource caching.',
      ],
    },
    {
      title: 'Ops4Ease — African SME Operations SaaS',
      role: 'Full-Stack SaaS Developer',
      dates: 'Aug 2022 – Dec 2022',
      url: 'ops4ease.com',
      tech: 'React, TypeScript, Vite, Firebase, Tailwind CSS',
      bullets: [
        'Engineered all-in-one SME business operations SaaS platform replacing fragmented tools with task tracking, attendance, HR, and analytics.',
        'Built multi-tenant role-based access control (RBAC) ensuring data isolation; reduced weekly reporting overhead by 40%.',
      ],
    },
    {
      title: 'Depeace Global Travel — Travel Booking Hub & CMS',
      role: 'Full-Stack Web Developer',
      dates: 'Jan 2022 – Jul 2022',
      url: 'depeacetravels.com',
      tech: 'React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Supabase',
      bullets: [
        'Delivered travel and pilgrimage booking platform for Hajj/Umrah packages, international flights, and visa processing.',
        'Configured dynamic Supabase CMS allowing instant package updates; increased customer inquiry conversion by 45%.',
      ],
    },
    {
      title: 'Infinite Studio Space — Production Studio Platform',
      role: 'Full-Stack Developer',
      dates: 'Jul 2021 – Dec 2021',
      url: 'infinitestudio.space',
      tech: 'Next.js 14, React, TypeScript, Tailwind CSS, Lucide Icons',
      bullets: [
        'Created editorial web showcase and booking system for an 8-studio space handling 4,000+ booked studio hours.',
        'Optimized WebP multimedia pipeline, achieving a 98+ Google Lighthouse performance score.',
      ],
    },
    {
      title: 'Provenance School & Willow Health — Platform Consulting',
      role: 'Full-Stack Developer',
      dates: '2020 – 2021',
      url: 'provenancesch.com  |  campus-wellnes.web.app',
      tech: 'React, TypeScript, Firebase, Supabase, Recharts, Tailwind CSS',
      bullets: [
        'Built interactive webinar portal for Provenance Business School with dual student and tutor role-based portals.',
        'Engineered Willow Health campus wellness triage platform featuring interactive clinical analytics with Recharts.',
      ],
    },
  ];

  for (const proj of projects) {
    if (y < 85) {
      page = pdfDoc.addPage([612, 792]);
      y = 750;
    }

    // Title line
    page.drawText(proj.title, { x: leftMargin, y, size: 9, font: fontBold, color: colorPrimary });
    page.drawText(proj.dates, {
      x: rightMargin - fontBold.widthOfTextAtSize(proj.dates, 8),
      y,
      size: 8,
      font: fontBold,
      color: colorMuted,
    });
    y -= 11;

    // Role + Link
    page.drawText(`${proj.role}  •  ${proj.url}`, {
      x: leftMargin,
      y,
      size: 7.5,
      font: fontOblique,
      color: colorOrange,
    });
    y -= 10;

    // Tech stack
    page.drawText(`Tech: ${proj.tech}`, {
      x: leftMargin,
      y,
      size: 7.5,
      font: fontRegular,
      color: colorMuted,
    });
    y -= 10;

    // Bullets
    for (const bullet of proj.bullets) {
      page.drawText('•', { x: leftMargin + 4, y, size: 7.5, font: fontBold, color: colorOrange });
      page.drawText(bullet, { x: leftMargin + 12, y, size: 7.5, font: fontRegular, color: colorText });
      y -= 9.5;
    }
    y -= 4;
  }

  // --- CERTIFICATIONS & LANGUAGES ---
  if (y < 60) {
    page = pdfDoc.addPage([612, 792]);
    y = 750;
  }
  drawSectionHeading('Certifications & Languages');

  page.drawText('Certifications: Advanced Flutter & Dart Mobile Architecture  •  Enterprise Supabase Database Engineering  •  Firebase Cloud Architecture', {
    x: leftMargin,
    y,
    size: 7.5,
    font: fontRegular,
    color: colorText,
  });
  y -= 11;

  page.drawText('Languages: English (Native / Full Professional Proficiency)', {
    x: leftMargin,
    y,
    size: 7.5,
    font: fontRegular,
    color: colorText,
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public', 'Shamsideen_Tairu_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Generated PDF CV successfully at: ${outputPath} (${pdfBytes.length} bytes)`);
}

generateCV().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
