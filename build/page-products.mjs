import { SITE, liveScreen, cta, faq, ORG, icons } from './layout.mjs';

/* One template, four products. Each gets its own URL, its own schema and its
   own live demo — but the page rhythm stays consistent across the set. */

function build(p) {
  const F = faq(p.faq);
  return {
    meta: {
      path: p.path,
      title: p.title,
      desc: p.desc,
      keywords: p.keywords,
      schema: {
        '@context': 'https://schema.org',
        '@graph': [ORG, {
          '@type': 'SoftwareApplication',
          name: p.name,
          applicationCategory: p.category,
          operatingSystem: p.os,
          url: SITE.domain + '/' + p.path,
          description: p.desc,
          provider: { '@id': SITE.domain + '/#org' },
          featureList: p.features.map(([, h]) => h),
          offers: { '@type': 'Offer', priceCurrency: 'USD', price: '0',
                    description: 'Free live demo. Licensed per project — perpetual licence or subscription, priced to scope.' },
        }, F.schema],
      },
    },
    body: `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:900px;height:520px;top:-210px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,${p.tint},transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div class="sechead" style="max-width:800px;margin-bottom:clamp(28px,4vw,42px)">
      <a href="/software.html" class="muted rv" style="font-size:13.5px;font-weight:700">&larr; All software</a>
      <h1 class="h-display rv rv2" style="margin-top:16px;font-size:clamp(31px,5vw,58px)">${p.h1}</h1>
      <p class="lead rv rv3" style="margin-top:20px">${p.lead}</p>
      <div class="rv rv4" style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap">
        <a class="btn btn-em btn-big" href="${p.demoSrc}" target="_blank" rel="noopener">Open it full screen</a>
        <a class="btn btn-ghost btn-big" href="/contact.html">Ask for it, shaped to you</a>
      </div>
      <p class="faint rv rv5" style="margin-top:16px;font-size:13.5px">${p.who}</p>
    </div>

    <div class="rv rv5" style="position:relative;max-width:${p.demoWide ? '1080px' : '420px'};margin:0 auto">
      <div class="glow" style="width:80%;height:70%;top:10%;left:10%;background:radial-gradient(ellipse,rgba(18,185,129,.19),transparent 66%)"></div>
      <div style="position:relative">${p.demo}</div>
    </div>
    <p class="center faint rv rv6" style="margin-top:20px;font-size:13.5px">
      Real software with sample data. Nothing you type is sent anywhere.
    </p>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">What it does</span>
      <h2 class="h1 rv">${p.featuresHead}</h2>
    </div>
    <div class="grid g3">
      ${p.features.map(([ico, h, t], i) => `
      <div class="card rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}">
        <div class="ico">${ico}</div>
        <h3 class="h4">${h}</h3>
        <p class="muted" style="margin-top:8px;font-size:14.5px">${t}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

${p.gallery ? `
<section class="sec-tight">
  <div class="wrap">
    <div class="sechead center" style="margin-bottom:clamp(26px,3vw,38px)">
      <span class="eyebrow">Real screens</span>
      <h2 class="h2 rv">${p.galleryHead}</h2>
    </div>
    <div class="grid g3">
      ${p.gallery.map(([shot, cap], i) => `
      <figure class="rv ${i % 3 ? 'rv' + ((i % 3) + 1) : ''}">
        <div class="figure tilt"><img src="/assets/shots/${shot}.webp" alt="${cap}" loading="lazy"></div>
        <figcaption class="figure-cap">${cap}</figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>` : ''}

<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Made yours</span>
      <h2 class="h1 rv">${p.customHead}</h2>
      <p class="lead rv rv2">${p.customLead}</p>
    </div>
    <div class="grid g2" style="max-width:960px">
      ${p.custom.map((c, i) => `
      <div class="card-flat rv ${i ? 'rv2' : ''}" style="display:flex;gap:14px;align-items:flex-start">
        <div class="ico" style="margin-bottom:0;width:36px;height:36px;border-radius:10px">${icons.check}</div>
        <p style="font-size:15px">${c}</p>
      </div>`).join('')}
    </div>
    <div class="rv rv3" style="margin-top:32px">
      <a class="btn btn-em" href="/contact.html">Ask what it would take</a>
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Questions</span>
      <h2 class="h1 rv">${p.name}, answered.</h2>
    </div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta(p.ctaH, p.ctaS)}
`,
  };
}

/* ─────────────────────────────── FULL ERP ─────────────────────────────── */
const fullErp = {
  path: 'full-erp.html',
  name: 'Full business ERP',
  category: 'BusinessApplication',
  os: 'Web, Windows',
  tint: 'rgba(18,185,129,.16)',
  title: 'Custom ERP software for any business — try it live | Munimo',
  desc: 'A complete business ERP: invoicing and tax, purchases, stock, payroll, receivables and profit by branch. Try the real system live, then have it tailored.',
  keywords: 'custom ERP software, ERP for small and medium business, invoicing purchase stock payroll software, ERP with profit and loss by project, replace tally with custom ERP',
  h1: 'The whole office,<br>in one system.',
  lead: 'Quotations and invoices, purchase orders and stock, payroll, tax returns, who owes you and who you owe, and profit and loss cut by branch, project or client. One place, one set of numbers, every figure traceable to the entry that made it.',
  who: 'Built for any business that has outgrown separate tools and shared spreadsheets.',
  demoWide: true,
  demoSrc: '/web-app/app.html',
  demo: liveScreen({ src: '/web-app/app.html', url: 'munimo.online/web-app',
                     poster: '/assets/web/cashbook-hero.png', label: 'Start the live ERP',
                     note: 'Click anywhere to use the real system' }),
  galleryHead: 'Straight from the running product.',
  gallery: [['invoices', 'Sales invoices with tax per line'], ['purchases', 'Purchase orders and vendor bills'],
            ['reports', 'Reports that drill to the entry'], ['inventory', 'Stock across locations'],
            ['employees', 'Employees and payroll'], ['gst', 'Tax returns from live books']],
  featuresHead: 'Everything the office does,<br>without the gaps between tools.',
  features: [
    [icons.ledger, 'Sales and invoicing', 'Quotations, invoices, credit notes, payment tracking and reminders. Tax applied correctly per line and per customer.'],
    [icons.layers, 'Purchases and stock', 'Purchase orders, goods received, vendor bills matched against them, and stock that moves as the paperwork does.'],
    [icons.people, 'Payroll and people', 'Employees, attendance, wage and salary runs, advances, statutory deductions and payslips.'],
    [icons.tax, 'Tax and returns', 'Return-ready formats generated from your actual books, with the reconciliation done before you file.'],
    [icons.chart, 'Reports that hold up', 'Trial balance, profit and loss, balance sheet, ageing, and profitability by branch or project — all drillable to the entry.'],
    [icons.shield, 'Controls and permissions', 'Who may raise it, who must approve it, what closes the period. An audit trail nobody can quietly edit.'],
  ],
  customHead: 'Then we bend it to your business.',
  customLead: 'The demo is our standard build. Almost nobody runs it unchanged — here is the kind of thing we add once we understand how you actually work.',
  custom: [
    'Your own document numbering, approval limits and sign-off chain, matching how authority already works in your company.',
    'Industry fields and workflows that only your trade needs — retention, milestones, batch numbers, route plans, service contracts.',
    'The tax and statutory formats for the countries you operate in, including multi-currency and multi-entity consolidation.',
    'Connections to what you already use: your bank statements, your e-commerce orders, your payment gateway, your existing database.',
  ],
  faq: [
    ['Is this only for construction?', 'No. The engines underneath — ledger, tax, payroll, stock, approvals — are the same for any business. The demo happens to be seeded with a construction company because that is where we started, but we run it for trading, services, manufacturing and institutions. The fields and workflows get changed to match your trade.'],
    ['Can it replace what we use now?', 'Usually yes. We import your masters and opening balances, run the old and the new side by side for a period, and only switch when the numbers match and your team is comfortable. Nobody is asked to switch on a promise.'],
    ['How many people can use it?', 'As many as you need, each with their own login and their own permissions. What a person can see and do is set by role, and every entry records who made it.'],
    ['Does it work outside India?', 'Yes. Multi-currency, multi-tax and multi-language are built in, and the statutory formats are configured per country during the build.'],
  ],
  ctaH: 'Want this, shaped to your business?',
  ctaS: 'Tell us your trade and what your current system cannot do. We will tell you what changes and roughly what it takes.',
};

/* ─────────────────────────────── CASH BOOK ─────────────────────────────── */
const cashBook = {
  path: 'cash-book.html',
  name: 'Cash Book',
  category: 'FinanceApplication',
  os: 'Web, Android, iOS',
  tint: 'rgba(233,187,82,.13)',
  title: 'Digital cash book and khata software — try it live | Munimo',
  desc: 'A daily cash book that tallies: money in, money out, bank balances and approvals. Web and phone share one book. Try the real app live with sample data.',
  keywords: 'digital cash book software, khata app for business, daily cash book with bank balance, money in money out app, cash book with approval workflow',
  h1: 'The day&rsquo;s money,<br>clear by evening.',
  lead: 'Money in, money out, what is left in each bank and in hand, and what still needs approving. Entries can come from the office or from a phone on site, and they land in the same book. Balances tally against your bank, not against someone&rsquo;s memory.',
  who: 'For owners who want to know where the day ended without asking three people.',
  demoWide: true,
  demoSrc: '/web-app/lite.html',
  demo: liveScreen({ src: '/web-app/lite.html', url: 'munimo.online/web-app/lite',
                     poster: '/assets/web/cashbook-hero.png', label: 'Open the live Cash Book',
                     note: 'Add an entry and watch the balance move' }),
  galleryHead: 'The book, on a screen and in a pocket.',
  gallery: [['cashflow', 'Money in and out, by head'], ['cashbook', 'The simple cash book view'],
            ['phone-home', 'The same book on a phone']],
  featuresHead: 'A book that stays honest<br>without anyone policing it.',
  features: [
    [icons.ledger, 'Money in, money out', 'Every receipt and payment against a head you choose, with the party, the mode and a note. Two taps on a phone, one line in the book.'],
    [icons.chart, 'Balances that tally', 'Cash in hand and every bank account, live. When it does not match your bank, the book tells you where it went wrong.'],
    [icons.check, 'Approvals before posting', 'Entries raised on site wait for the office. Nothing hits the books because somebody was in a hurry.'],
    [icons.tax, 'Budget heads', 'Spending grouped the way you think about it, so the month-end question "where did it go" has an answer on screen.'],
    [icons.phone, 'Web and phone, one book', 'The office view and the phone app are the same records. No exports, no merging, no version with (2) in the name.'],
    [icons.ai, 'Type it in plain words', 'Write "diesel 3200 paid" and get a correctly categorised entry back to confirm. Useful for staff who will never learn a form.'],
  ],
  customHead: 'Most people want one or two things changed.',
  customLead: 'The cash book is the most personal system a business has. These are the changes we make most often.',
  custom: [
    'Your own heads and categories, named the way your team already talks about the money.',
    'Approval rules that match your reality — amount limits, who can approve whose entries, what needs a photo attached.',
    'Bank statement import and matching, so reconciliation stops being a monthly evening.',
    'The languages your staff actually use, on the phone screens where it matters most.',
  ],
  faq: [
    ['Is this an accounting package or just a register?', 'It is a real double-entry ledger underneath, presented as a simple book. You get the simplicity of a register and books that an accountant can actually work from — including a trial balance that balances.'],
    ['Can my site staff use it without training?', 'That is the point of the phone version. Two large buttons for money in and money out, and plain-language entry for anyone who will not fill in a form. The office keeps control through approvals.'],
    ['What happens with no internet?', 'The phone app keeps recording and syncs when signal returns. Nothing is lost and nothing is entered twice.'],
    ['Can it grow into the full ERP later?', 'Yes, and your data comes with you. The cash book is the same ledger the full ERP uses, so moving up is a change of screens, not a re-entry of history.'],
  ],
  ctaH: 'Want your cash book to look like this?',
  ctaS: 'Tell us how your money currently gets recorded, and who you wish had to stop doing it by hand.',
};

/* ─────────────────────────────── SCHOOL ERP ────────────────────────────── */
const schoolErp = {
  path: 'school-erp.html',
  name: 'School ERP',
  category: 'BusinessApplication',
  os: 'Web, Android, iOS',
  tint: 'rgba(96,165,250,.13)',
  title: 'Custom school management software | Munimo',
  desc: 'School ERP built to order: admissions, attendance, fees with receipts and dues, exams, staff payroll and parent communication. On a real accounting engine.',
  keywords: 'school management software, custom school ERP, fee collection software with receipts, student attendance and exam management system, coaching institute management software',
  h1: 'A school runs on<br>fees and attendance.',
  lead: 'Admissions and student records, daily attendance, fee collection with printed receipts and dues that chase themselves, exams and results, staff payroll, and a parent who can see it all without phoning the office. The money side sits on the same accounting engine as our finance software, so the accounts are real accounts.',
  who: 'For schools, colleges and coaching institutes, at any size.',
  demoWide: true,
  demoSrc: '/demos/school/',
  demo: liveScreen({ src: '/demos/school/', url: 'munimo.online/demos/school',
                     poster: '/assets/shots/school.webp', label: 'Open the live School ERP',
                     note: 'Collect a fee, print the receipt, mark a class present' }),
  galleryHead: 'Straight from the school demo.',
  gallery: [['school-fees', 'The dues list — who to chase first'], ['school-att', 'Marking a class in one pass'],
            ['school-exams', 'Marks, totals and grades']],
  featuresHead: 'The parts every institution needs,<br>and the ones only yours does.',
  features: [
    [icons.people, 'Students and admissions', 'Enquiry to enrolment, documents, sections and batches, transfers and leaving certificates, full student history.'],
    [icons.check, 'Attendance', 'Daily or period-wise, marked from a phone or a desk, with absence patterns visible before they become a problem.'],
    [icons.ledger, 'Fees and receipts', 'Fee heads, instalments, concessions, printed receipts, and a dues list that tells you exactly who and how much.'],
    [icons.chart, 'Exams and results', 'Marks entry, grade schemes, report cards in your own format, and progress that parents can actually read.'],
    [icons.tax, 'Staff and payroll', 'Teaching and non-teaching staff, attendance, salary runs, statutory deductions and payslips.'],
    [icons.phone, 'Parent communication', 'Fees due, attendance, results and notices, sent where parents will actually see them.'],
  ],
  customHead: 'No two institutions run the same way.',
  customLead: 'School software is where off-the-shelf packages fail hardest, because every board, state and management does it differently. This is the part we build to order.',
  custom: [
    'Your fee structure exactly as it is — instalments, late fees, sibling and staff concessions, transport and hostel heads, scholarship rules.',
    'Your report card format, your grading scheme and your board&rsquo;s requirements, printed the way you already print them.',
    'Your academic calendar, sections, streams, electives and timetable structure.',
    'The integrations you need: payment gateway for online fees, messaging for parents, biometric devices for attendance.',
  ],
  faq: [
    ['Is the demo the actual school software?', 'It is a working school system with sample data — collect a fee and the dues drop and a receipt prints, mark a class and the attendance percentage moves. Your build starts from this and then changes, because fee structures, report card formats and academic calendars are never the same at two institutions.'],
    ['Can parents pay fees online?', 'Yes, through a payment gateway connected during the build. Receipts are generated automatically and the dues list updates itself.'],
    ['We are a coaching institute, not a school. Does that work?', 'Yes. Batches instead of classes, flexible fee cycles and shorter courses are all normal configurations rather than special cases.'],
    ['What about our existing student data?', 'It comes across. Spreadsheets, an old system, or a mix of both — we map and import it, then run a checking period before you rely on it.'],
  ],
  ctaH: 'Tell us how your institution runs.',
  ctaS: 'Send us your fee structure and a sample report card. That is usually enough for us to tell you what a build would involve.',
};

/* ─────────────────────────────── MOBILE APP ────────────────────────────── */
const mobileApp = {
  path: 'mobile-app.html',
  name: 'Mobile field app',
  category: 'BusinessApplication',
  os: 'Android, iOS, Web',
  tint: 'rgba(167,139,250,.13)',
  title: 'Offline-first mobile app for field teams — try it live | Munimo',
  desc: 'A mobile app for staff away from a desk. Captures attendance, expenses and photo proof with no signal, then syncs. Office approves before anything posts.',
  keywords: 'offline mobile app for field staff, site attendance app without internet, field expense app with photo proof, offline first business app, field data collection app that syncs',
  h1: 'Works where there<br>is no signal.',
  lead: 'The people who create most of your data are rarely near a computer. This app records attendance, expenses and photo proof on a phone with no connection at all, and syncs the moment it finds one. Everything it captures waits for the office to approve before it reaches the books.',
  who: 'For sites, routes, branches, warehouses and service teams.',
  demoWide: false,
  demoSrc: '/lite-app/?demo=1',
  demo: `<div class="phone" style="width:min(390px,88vw);aspect-ratio:390/812;margin:0 auto">
           <span class="livedot">LIVE</span>
           <iframe src="/lite-app/?demo=1" title="Munimo mobile field app — live demo" loading="lazy"></iframe>
         </div>`,
  galleryHead: 'What the field sees, and what the office gets.',
  gallery: [['phone-home', 'The field home screen'], ['phone-attend', 'Marking a crew present'],
            ['labour', 'It lands in the office as wages']],
  featuresHead: 'Built for a phone in a pocket,<br>not a laptop on a desk.',
  features: [
    [icons.offline, 'No signal, no problem', 'Everything works offline and queues up. When the phone finds a network it syncs quietly, with no duplicates and nothing lost.'],
    [icons.people, 'Attendance in seconds', 'Mark a whole crew present, absent or on overtime in a few taps. Wages follow from it automatically.'],
    [icons.check, 'Office approves', 'Field entries are submissions, not postings. The office confirms them before they touch the accounts.'],
    [icons.ledger, 'Expenses with proof', 'Record what was spent and attach the photo of the bill at the same moment, before it goes missing.'],
    [icons.ai, 'Speak or type plainly', 'Staff who will never fill in a form can write or say a line and confirm what the app understood.'],
    [icons.phone, 'Installs like an app', 'Added to the home screen from the browser. No app store approval, no update anyone has to remember.'],
  ],
  customHead: 'Field work is never generic.',
  customLead: 'What your team captures on a phone is specific to your operation. This is where we build to order.',
  custom: [
    'The exact fields your team must capture — meter readings, batch numbers, delivery signatures, checklists, GPS-stamped visits.',
    'Your approval chain, including which supervisor covers which location and what limits apply to whom.',
    'Languages and screen layouts your staff are comfortable with, tested with people who will actually use it.',
    'Connection into your main system, so field data lands in the same books as everything else.',
  ],
  faq: [
    ['Does it need an app store download?', 'No. It installs to the home screen straight from the browser and behaves like a normal app after that. Updates arrive on their own, so nobody is stuck on an old version.'],
    ['What if a phone is lost or a person leaves?', 'Access is a login you control, not something tied to the device. Revoke it and the data stays where it belongs.'],
    ['How long can it stay offline?', 'Indefinitely for practical purposes. It holds what it captured and syncs when it can.'],
    ['Can field staff see the company accounts?', 'Only what you allow. By default they see their own site and their own submissions, never the full books.'],
  ],
  ctaH: 'Get your field team on the same page.',
  ctaS: 'Tell us what your people need to capture in the field and where the paper currently gets lost.',
};


/* ─────────────────────────────── CLINIC ERP ────────────────────────────── */
const clinicErp = {
  path: 'clinic-erp.html',
  name: 'Clinic ERP',
  category: 'BusinessApplication',
  os: 'Web, Android, iOS',
  tint: 'rgba(167,139,250,.14)',
  title: 'Custom clinic and hospital management software | Munimo',
  desc: 'Patient bookings and doctor appointments in the same system as billing, pharmacy stock, payroll and accounts. Try the real clinic demo live with sample data.',
  keywords: 'clinic management software, hospital ERP, patient appointment booking system, IVF clinic software, clinic billing and inventory software',
  h1: 'The clinic, not just<br>the accounts.',
  lead: 'Patient bookings and doctor slots, billing for consultations and procedures, pharmacy and lab stock, staff payroll, and the accounts &mdash; all one system. Nothing typed twice, and the day actually reconciles at the end of it.',
  who: 'For clinics, day-care hospitals, diagnostic centres and specialist practices.',
  demoWide: true,
  demoSrc: '/demos/clinic/',
  demo: liveScreen({ src: '/demos/clinic/', url: 'munimo.online/demos/clinic',
                     poster: '/assets/shots/clinic.webp', label: 'Open the live Clinic ERP',
                     note: 'Book a slot, raise a bill, check the stock alerts' }),
  galleryHead: 'Straight from the clinic demo.',
  gallery: [['clinic-appts', 'Doctor slots — tap a free one to book'], ['clinic-billing', 'Consultation, procedure and pharmacy billing'],
            ['clinic-stock', 'Drugs and consumables with reorder alerts']],
  featuresHead: 'One system from the front desk<br>to the year-end accounts.',
  features: [
    [icons.people, 'Patients and history', 'Records, treatment cycles, documents and visit history, all in one place instead of a file and a spreadsheet.'],
    [icons.check, 'Appointments', 'Doctor-wise slots with double-booking blocked, a live waiting list, and reminders to the patient.'],
    [icons.ledger, 'Billing that reconciles', 'Consultation, procedure, pharmacy and package billing, with balances tracked per patient.'],
    [icons.layers, 'Pharmacy and lab stock', 'Drugs and consumables with batch and expiry, reorder alerts before you run out mid-procedure.'],
    [icons.tax, 'Staff and payroll', 'Consultants, nurses, technicians and admin — attendance, salary runs and statutory deductions.'],
    [icons.chart, 'The real picture', 'Revenue per doctor, per procedure and per month, with every figure traceable to the bill behind it.'],
  ],
  customHead: 'No two practices work the same way.',
  customLead: 'A fertility clinic, a dental practice and a diagnostic centre share almost nothing on screen. This is what we build to order.',
  custom: [
    'Your treatment protocols and cycle stages, with the fields and consents your specialty actually needs.',
    'Your billing packages, insurance and TPA workflows, and the way you split fees with visiting consultants.',
    'Your report formats and templates, printed the way you already print them.',
    'Integrations: payment gateway, SMS and WhatsApp reminders, lab machines and diagnostic equipment.',
  ],
  faq: [
    ['Is the demo a real clinic system?', 'Yes — it is a working system with sample data. Book a free slot and it fills, raise a bill and the day\'s collection moves, look at inventory and you will see items below reorder level. Nothing you do is stored anywhere.'],
    ['We are an IVF clinic. Does it handle cycles?', 'Yes, and that is exactly the kind of thing that gets built to order. Cycle stages, protocols, consents and stage-wise billing are configured for your practice rather than forced into a generic appointment model.'],
    ['Can it handle more than one branch or doctor?', 'Yes. Doctors, rooms, branches and their calendars are all separate, and reporting rolls up across them or splits by whichever you need.'],
    ['What about patient data privacy?', 'Your data lives in your own store, access is by role, and every view and change is logged. If you host it yourself, it never leaves your premises at all.'],
  ],
  ctaH: 'Tell us how your clinic runs.',
  ctaS: 'The front desk, the doctors, the billing and the stock. We will tell you what a build would involve.',
};

export const pages = [fullErp, cashBook, schoolErp, clinicErp, mobileApp].map(build);
