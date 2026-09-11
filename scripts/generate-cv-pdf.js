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
  page.drawText('BELLO JAMIU ISHOLA', {
    x: leftMargin,
    y: y,
    size: 20,
    font: fontBold,
    color: colorPrimary,
  });
  y -= 16;

  page.drawText('Senior UI/UX Designer & Full-Stack Developer (Web, Mobile, IoT)', {
    x: leftMargin,
    y: y,
    size: 10.5,
    font: fontBold,
    color: colorOrange,
  });
  y -= 14;

  const contactLine = 'Lagos, Nigeria (Open to Remote Worldwide)   •   jamibelbhello0104@gmail.com   •   +234 905 095 5981   •   isholabello.space';
  page.drawText(contactLine, {
    x: leftMargin,
    y: y,
    size: 8,
    font: fontRegular,
    color: colorMuted,
  });
  y -= 10;
  drawDivider(y, colorPrimary, 1.5);
  y -= 12;

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeading('Professional Summary');
  const summaryLines = [
    'Versatile UI/UX Designer and Full-Stack Developer with 6+ years of engineering experience crafting modern, glassmorphic interfaces,',
    'high-performance cross-platform mobile apps (Flutter, React Native, native Android), and scalable cloud-native web platforms (React, Next.js,',
    'Firebase, Supabase, Node). Specialist in bridging human-centered design systems with robust offline-first sync architectures, real-time community',
    'chat platforms, and enterprise IoT/network automation infrastructures.',
  ];
  for (const line of summaryLines) {
    page.drawText(line, { x: leftMargin, y, size: 8.2, font: fontRegular, color: colorText });
    y -= 11;
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
  page.drawText('A substantial portion of my design and production engineering work has been built under strict Non-Disclosure Agreements (NDAs) for enterprise', {
    x: leftMargin + 8,
    y: y - 11.5,
    size: 7.5,
    font: fontRegular,
    color: colorNdaText,
  });
  page.drawText('clients, fintech platforms, and private organizations. The systems detailed below represent an authorized selection of public projects.', {
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
    { label: 'UI/UX & Design Systems:', text: 'Figma, Adobe XD, Wireframing, Glassmorphism, Micro-interactions, Design Tokens, User Journey Mapping' },
    { label: '3D & Creative Web:', text: 'Three.js, WebGL, GLSL Shaders, Draco / GLTF 3D Optimization, Canvas API, Framer Motion, Anime.js, Tailwind' },
    { label: 'Mobile Engineering:', text: 'Flutter, Dart, React Native, Expo, Android Studio (Java & Kotlin), SQLite, Isar, Offline-First Sync, FCM' },
    { label: 'Frontend & Web Platforms:', text: 'React 19, Next.js 15 (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, shadcn/ui, Recharts, Vite' },
    { label: 'Backend, Cloud & IoT:', text: 'Supabase (PostgreSQL, RLS, Edge Functions), Firebase (Firestore, Auth), Node.js, Network / IoT Automation' },
  ];

  for (const sg of skillGroups) {
    page.drawText(sg.label, { x: leftMargin, y, size: 8, font: fontBold, color: colorPrimary });
    const labelWidth = fontBold.widthOfTextAtSize(sg.label, 8);
    page.drawText(sg.text, { x: leftMargin + labelWidth + 4, y, size: 8, font: fontRegular, color: colorText });
    y -= 11;
  }
  y -= 4;

  // --- PRODUCTION PROJECTS ---
  drawSectionHeading('Selected Experience & Production Systems');

  const projects = [
    {
      title: 'ForteSoft NIIT — UI/UX Design & Mobile Engineering Lead',
      role: 'UI/UX Designer & Mobile App Developer',
      dates: '2023 – Present',
      url: 'fortesoft.com  |  isholabello.space',
      tech: 'Figma, React Native, Java, Android Studio, Firebase, WebSockets',
      bullets: [
        'Spearheaded user research and produced design systems, interactive prototypes, and glassmorphic UI components in Figma.',
        'Engineered real-time chat architectures and student community feeds with low-latency messaging, active state sync, and file sharing.',
        'Streamlined mobile onboarding flows, increasing overall user conversion by 45% and slashing drop-off rates.',
      ],
    },
    {
      title: 'V2D Convergence — Network Infrastructure & Systems Specialist',
      role: 'Network Engineer',
      dates: '2022 – 2023',
      url: 'v2dconvergence.com',
      tech: 'VLANs, Cisco Routing, IoT Sensors, CCTV Telemetry, Network Security',
      bullets: [
        'Designed, deployed, and maintained enterprise networking, smart IoT automation systems, and surveillance telemetries.',
        'Optimized routing protocols, network security policies, and fault-tolerant hardware architectures achieving 99.9% uptime.',
      ],
    },
    {
      title: 'NutriCare — AI Senior Nutrition & Health Platform',
      role: 'Lead Full-Stack & Mobile Developer',
      dates: 'Jan 2024 – Present',
      url: 'nutricareelderly1.vercel.app',
      tech: 'Flutter, Dart, React, Tailwind CSS, Next.js, Kotlin, Supabase',
      bullets: [
        'Engineered cross-platform mobile and web application in Flutter, Dart, and Supabase, serving 1,000+ active seniors with a 4.9/5 rating.',
        'Developed dietary algorithm calculating glycemic impact across 50+ dishes for elderly users managing diabetes and hypertension.',
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
      title: 'Ops4Ease & Depeace Travel — SaaS & Global Booking Platforms',
      role: 'Full-Stack Web & SaaS Developer',
      dates: '2022',
      url: 'ops4ease.com  |  depeacetravels.com',
      tech: 'React, TypeScript, Vite, Supabase, Firebase, Tailwind CSS, shadcn/ui',
      bullets: [
        'Engineered all-in-one SME business operations SaaS platform with task tracking, attendance, HR, and analytics (Ops4Ease).',
        'Delivered travel and pilgrimage booking platform with dynamic Supabase CMS, increasing inquiry conversions by 45% (Depeace).',
      ],
    },
  ];

  for (const proj of projects) {
    if (y < 85) {
      page = pdfDoc.addPage([612, 792]);
      y = 750;
    }

    // Title line
    page.drawText(proj.title, { x: leftMargin, y, size: 8.8, font: fontBold, color: colorPrimary });
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

  page.drawText('Certifications: Certified UI/UX Design Specialist (Figma)  •  Advanced Flutter Mobile Architecture  •  Enterprise Cloud & Database Engineering', {
    x: leftMargin,
    y,
    size: 7.5,
    font: fontRegular,
    color: colorText,
  });
  y -= 11;

  page.drawText('Languages: English (Native / Full Professional Proficiency), Yoruba', {
    x: leftMargin,
    y,
    size: 7.5,
    font: fontRegular,
    color: colorText,
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public', 'Bello_Jamiu_Ishola_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  // Also write to Shamsideen_Tairu_CV.pdf as fallback
  const fallbackPath = path.resolve('public', 'Shamsideen_Tairu_CV.pdf');
  fs.writeFileSync(fallbackPath, pdfBytes);
  console.log(`Generated PDF CV successfully at: ${outputPath} and ${fallbackPath}`);
}

generateCV().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
