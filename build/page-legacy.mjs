import { SITE, cta, faq, ORG, icons, beforeAfter } from './layout.mjs';

const COMPARE = [
  ['When you need something changed',
   'Raise a request. Wait for a release. Hear it is on the roadmap, or that your version no longer gets changes.',
   'Say it on a call. Small changes usually land in days, because the people who built it still have it open.'],
  ['When your process is unusual',
   'You change your process to suit the software, or you keep a spreadsheet beside it. Usually both.',
   'The software is built around the process you already have, including the parts that are unusual for a reason.'],
  ['Who understands the system',
   'One person. Everyone hopes they do not leave.',
   'It is documented, and the way it works matches how the business already thinks. New staff learn it in days.'],
  ['Getting your data out',
   'A flat export, if you are lucky. Structure and history stay behind.',
   'Your data is yours, exportable with its structure intact, whenever you want it.'],
  ['What it costs each year',
   'Licence renewals per user, plus fifteen to twenty per cent annual maintenance, plus charges for changes.',
   'Buy the licence outright or subscribe. Three years of maintenance included, no per-change invoice.'],
  ['When you grow',
   'A bigger edition, a bigger bill, and a migration you did not plan for.',
   'More users, branches or modules added to the same system. No re-implementation.'],
  ['Working away from a desk',
   'A cut-down mobile view that needs a live connection, or nothing at all.',
   'An offline-first app that captures in the field with no signal, and syncs into the same books.'],
  ['When something goes wrong',
   'A ticket number, a queue, and a support tier that decides how long you wait.',
   'A message to the people who wrote the code, and a fix rather than a workaround.'],
];

const F = faq([
  ['Is off-the-shelf software always the wrong choice?',
   'No, and we will tell you when it is the right one. If what you do is genuinely standard, a well-supported package is cheaper and faster than anything custom. Custom earns its money when your process is a real competitive difference, when the gap is being filled by spreadsheets and manual work, or when the package is dictating how you operate instead of the other way round.'],
  ['How do we know if we have outgrown our current system?',
   'The usual signs: numbers are re-keyed between systems, month-end takes days, several people keep private spreadsheets that the real answer actually lives in, one person is the only one who understands the file, and simple questions from management take hours to answer. If two or three of those are true, the software is costing you more than its licence.'],
  ['What does a migration actually involve?',
   'We map your existing data, import masters and opening balances, and reconcile until the new system agrees with the old one. Then both run together for a period — usually a month — while your team gets comfortable. Only when the numbers match and people trust it do you switch. Nobody is asked to go live on a promise.'],
  ['How much history can we bring across?',
   'Usually as much as you want. Opening balances and masters are essential; full transaction history is normally possible and worth doing when you need year-on-year comparison. We will tell you what is realistic once we have seen your data.'],
  ['What if the old system cannot export properly?',
   'That is common with older software. We can usually read the underlying database directly, or work from reports and printouts where there is genuinely nothing else. It adds time but it is rarely a blocker.'],
  ['Will our team cope with the change?',
   'Better than they cope with the current workarounds, generally. The screens are built around what they already do, and the running-in-parallel period means nobody is forced to learn under pressure. Training people on software shaped like their own process is a much shorter conversation.'],
]);

export const meta = {
  path: 'legacy-vs-custom.html',
  title: 'Legacy vs custom software: the real cost of staying | Munimo',
  desc: 'What old software quietly costs you, how to tell when you have outgrown it, and how a migration actually runs without a risky switchover day.',
  keywords: 'legacy software migration, replace legacy business system, off the shelf vs custom software, cost of outdated software, when to move from spreadsheets to custom software, legacy system modernisation',
  css: ['motion.css'],
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, {
      '@type': 'Article',
      headline: 'Legacy software vs custom software: the real cost of staying',
      description: 'An honest comparison of staying on legacy or off-the-shelf software against commissioning a custom build, including migration risk and how to judge which is right.',
      author: { '@id': SITE.domain + '/#org' },
      publisher: { '@id': SITE.domain + '/#org' },
      articleSection: 'Business software',
    }, F.schema],
  },
};

export const body = `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:900px;height:520px;top:-210px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(248,113,113,.1),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div style="max-width:830px">
      <span class="pill rv">The honest comparison</span>
      <h1 class="h-display rv rv2" style="margin-top:18px;font-size:clamp(31px,5vw,58px)">
        Old software rarely fails.<br><span class="gold">It just quietly taxes you.</span>
      </h1>
      <p class="lead rv rv3" style="margin-top:22px;max-width:640px">
        It never breaks outright. It just costs you an hour here, a wrong number there,
        and one person nobody can afford to lose. Here is the same Monday, both ways.
      </p>
    </div>
  </div>
</section>

<section class="sec-tight">
  <div class="wrap">
    ${beforeAfter(
      { head: 'Nobody knows the real number',
        sub: 'And finding out takes half a day.',
        items: [
          'Every branch keeps its own spreadsheet',
          'The same figure typed in three places',
          'One person understands the file &mdash; and they are on leave',
          'Month-end takes a week and still does not tally',
          'You hear about a problem after it cost you money',
        ],
        foot: 'You work around the software' },
      { head: 'One screen. The real number.',
        sub: 'Before your first cup of tea is finished.',
        items: [
          'Every branch on one live screen',
          'Entered once, correct everywhere',
          'Anyone in your team can run it',
          'Books close on the first of the month',
          'You get told the moment something goes wrong',
        ],
        foot: 'The software works the way you do' }
    )}
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Where it actually hurts</span>
      <h2 class="h1 rv">Five costs that never<br>appear on the invoice.</h2>
    </div>
    <div class="grid g2" style="max-width:1000px">
      ${[
        [icons.swap, 'Re-keying between systems', 'The same number typed in three places. At least one is wrong, and nobody finds out until month-end.'],
        [icons.lock, 'The person who is the system', 'One employee understands the file and the workaround. Their notice period is your business risk.'],
        [icons.chart, 'Answers that take days', 'A simple question means pulling exports and matching them by hand. So decisions get made on instinct.'],
        [icons.bolt, 'Change you have stopped asking for', 'After enough refusals, people stop asking. Your business improves; the software never does.'],
        [icons.shield, 'Risk you cannot see', 'No updates, untested backups, and logins for people who left years ago. Invisible until the day it is not.'],
        [icons.people, 'Training that never ends', 'New staff learn the software and the folklore around it. Both take months.'],
      ].map(([ico, h, p], i) => `
      <div class="card rv ${i % 2 ? 'rv2' : ''}">
        <div class="ico">${ico}</div>
        <h3 class="h4">${h}</h3>
        <p class="muted" style="margin-top:8px;font-size:14.5px">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Side by side</span>
      <h2 class="h1 rv">The same eight questions,<br>answered both ways.</h2>
    </div>
    <div class="vs rv rv2">
      <div class="vh">Situation</div>
      <div class="vh old">Legacy / off-the-shelf</div>
      <div class="vh new">Custom-built</div>
      ${COMPARE.map(([q, o, n]) => `
      <div class="vq">${q}</div><div class="vo">${o}</div><div class="vn">${n}</div>`).join('')}
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Be fair about it</span>
      <h2 class="h1 rv">When you should <em>not</em><br>build custom software.</h2>
      <p class="lead rv rv2">
        We would rather say this now than take a project that should not exist. Custom is the
        wrong answer more often than our industry admits.
      </p>
    </div>
    <div class="grid g3" style="max-width:1040px">
      ${[
        ['What you do is genuinely standard', 'If your process is the same as everyone else\'s in your trade, a well-supported package will be cheaper, faster and better tested than anything built for you alone.'],
        ['Nobody internally will own it', 'Custom software needs one person on your side who can decide what it should do. Without that, the build drifts and everyone ends up disappointed.'],
        ['The real problem is the process', 'If the workflow itself is broken, new software will only make the mess run faster. Fix the process first, then build to it.'],
      ].map(([h, p], i) => `
      <div class="card-flat rv ${i ? 'rv' + (i + 1) : ''}">
        <h3 class="h4 gold">${h}</h3>
        <p class="muted" style="margin-top:9px;font-size:14.5px">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <span class="eyebrow">Moving across</span>
      <h2 class="h1 rv">Nobody switches on a promise.</h2>
      <p class="lead rv rv2">
        The fear of migration keeps more companies on bad software than the cost of replacing it.
        So we take the risky day out of it entirely.
      </p>
    </div>
    <div style="max-width:860px">
      ${[
        ['We read what you have', 'Exports where they exist, the underlying database where they do not, printouts where there is genuinely nothing else. Old software being uncooperative is normal and rarely a blocker.'],
        ['We import and reconcile', 'Masters, opening balances and as much history as is worth bringing. Then we reconcile until the new system agrees with the old one, figure for figure.'],
        ['Both systems run together', 'Usually for a month. Your team uses the new one for real work while the old one stays available. Any disagreement between them gets found here, not after the switch.'],
        ['You decide when to stop', 'When the numbers match and your people are comfortable, the old system becomes an archive. There is no single dramatic switchover night.'],
      ].map(([h, p], i) => `
      <div class="rv ${i ? 'rv' + (i + 1) : ''}" style="display:flex;gap:22px;padding:24px 0;border-top:1px solid var(--hair)">
        <div class="mono em" style="font-size:13px;font-weight:800;flex-shrink:0;padding-top:4px">0${i + 1}</div>
        <div><h3 class="h3">${h}</h3><p class="muted" style="margin-top:8px;font-size:15px">${p}</p></div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap-n">
    <div class="sechead center">
      <span class="eyebrow">Questions</span>
      <h2 class="h1 rv">Before you move.</h2>
    </div>
    <div class="rv rv2">${F.html}</div>
  </div>
</section>

${cta('Not sure which side you are on?',
      'Tell us what your current system does badly. We will tell you honestly whether it is worth replacing — including when it is not.')}
`;
