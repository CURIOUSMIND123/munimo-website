import { SITE, ORG, icons } from './layout.mjs';

export const meta = {
  path: 'contact.html',
  title: 'Tell us what your business needs | Munimo',
  desc: 'Describe the problem in your own words and we will tell you honestly whether we are the right people to build it, what it would involve, and roughly what it costs.',
  keywords: 'custom software quote, get a price for custom software, software development enquiry, discuss custom ERP build',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [ORG, {
      '@type': 'ContactPage', url: SITE.domain + '/contact.html',
      about: { '@id': SITE.domain + '/#org' },
    }],
  },
};

/* A static site cannot process a form. Rather than fake one that silently
   fails, the form composes a well-structured message and hands it to WhatsApp
   or the mail client — which is also how these clients prefer to talk. */
export const body = `
<section class="sec" style="padding:clamp(102px,11vw,130px) 0 clamp(26px,3.4vw,42px)">
  <div class="glow" style="width:900px;height:520px;top:-210px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(18,185,129,.16),transparent 66%)"></div>
  <div class="wrap" style="position:relative;z-index:1">
    <div class="grid" style="grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,64px);align-items:start">
      <div>
        <span class="pill rv">Get a quote</span>
        <h1 class="h1 rv rv2" style="margin-top:18px">Tell us what your<br>business needs.</h1>
        <p class="lead rv rv3" style="margin-top:20px">
          In your own words — the problem, not a specification. We will tell you what it would
          involve, roughly what it costs, and whether we are the right people to build it.
          If we are not, we will say so.
        </p>
        <div class="rv rv4" style="margin-top:32px;display:grid;gap:18px">
          ${[
            [icons.bolt, 'You get a real answer', 'Usually the same day. From someone who builds the software, not a sales desk.'],
            [icons.check, 'No obligation, no pressure', 'Plenty of these conversations end with us telling someone they do not need us.'],
            [icons.lock, 'What you tell us stays private', 'We never discuss one client\'s business with another.'],
          ].map(([ico, h, p]) => `
          <div style="display:flex;gap:14px;align-items:flex-start">
            <div class="ico" style="margin-bottom:0;width:38px;height:38px;border-radius:11px;flex-shrink:0">${ico}</div>
            <div><div class="h4">${h}</div><p class="muted" style="font-size:14px;margin-top:3px">${p}</p></div>
          </div>`).join('')}
        </div>
        <div class="rv rv5" style="margin-top:32px;padding-top:26px;border-top:1px solid var(--hair)">
          <p class="faint" style="font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase">Or reach us directly</p>
          <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
            <a class="btn btn-wa" href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener">WhatsApp ${SITE.waPretty}</a>
            <a class="btn btn-ghost" href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
      </div>

      <div class="rv rv2">
        <form class="card-flat" id="qform" style="padding:clamp(24px,3vw,34px)">
          <div style="display:grid;gap:16px">
            <label>
              <span class="fl">Your name</span>
              <input required name="name" autocomplete="name" placeholder="Who are we talking to?">
            </label>
            <label>
              <span class="fl">Business name</span>
              <input required name="company" autocomplete="organization" placeholder="Your company or institution">
            </label>
            <label>
              <span class="fl">Where are you based?</span>
              <input name="country" autocomplete="country-name" placeholder="City and country">
            </label>
            <label>
              <span class="fl">What do you need the software to do?</span>
              <textarea required name="need" rows="5" placeholder="For example: we run four branches and every one keeps its own spreadsheet. We never know the real stock position until month end."></textarea>
            </label>
            <label>
              <span class="fl">Rough budget <span class="faint" style="font-weight:600;text-transform:none;letter-spacing:0">(optional, but it helps)</span></span>
              <input name="budget" placeholder="A range is fine — it tells us what to scope">
            </label>
            <label>
              <span class="fl">Licence or subscription?</span>
              <select name="model">
                <option value="Not sure yet">Not sure yet — explain both</option>
                <option value="Perpetual licence">Perpetual licence — we want to own it</option>
                <option value="Subscription">Subscription — monthly is easier</option>
              </select>
            </label>
          </div>
          <div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">
            <button type="submit" class="btn btn-em btn-big" style="flex:1;min-width:190px">Send on WhatsApp</button>
            <button type="button" id="byEmail" class="btn btn-ghost btn-big">Send by email</button>
          </div>
          <p class="faint" style="margin-top:14px;font-size:12.5px">
            This opens WhatsApp or your mail app with the message written for you. Nothing is
            stored on this website and nothing is sent until you press send yourself.
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
.fl{display:block;font-size:12px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;
    color:var(--f);margin-bottom:8px}
#qform input,#qform textarea,#qform select{width:100%;background:var(--ink);border:1px solid var(--hair2);
  border-radius:11px;padding:13px 15px;color:var(--t);font-family:inherit;font-size:15.5px;
  transition:border-color .2s,box-shadow .2s;resize:vertical}
#qform input::placeholder,#qform textarea::placeholder{color:#4d5a53}
#qform input:focus,#qform textarea:focus,#qform select:focus{outline:none;border-color:var(--em);
  box-shadow:0 0 0 3px rgba(18,185,129,.13)}
#qform select{appearance:none;cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2393a49c' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 14px center;background-size:17px;padding-right:42px}
@media(max-width:860px){.sec .grid[style*="1fr 1fr"]{grid-template-columns:1fr!important}}
</style>

<script>
(function () {
  var f = document.getElementById('qform');
  if (!f) return;
  function compose() {
    var d = new FormData(f), get = function (k) { return (d.get(k) || '').toString().trim(); };
    return [
      'New enquiry from munimo.online',
      '',
      'Name: ' + get('name'),
      'Business: ' + get('company'),
      (get('country') ? 'Location: ' + get('country') : ''),
      '',
      'What they need:',
      get('need'),
      '',
      (get('budget') ? 'Budget: ' + get('budget') : 'Budget: not stated'),
      'Preference: ' + get('model')
    ].filter(function (l) { return l !== ''; }).join('\\n');
  }
  function valid() {
    if (f.checkValidity()) return true;
    f.reportValidity();
    return false;
  }
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valid()) return;
    window.open('https://wa.me/${SITE.wa}?text=' + encodeURIComponent(compose()), '_blank', 'noopener');
  });
  document.getElementById('byEmail').addEventListener('click', function () {
    if (!valid()) return;
    window.location.href = 'mailto:${SITE.email}'
      + '?subject=' + encodeURIComponent('Software enquiry — ' + (new FormData(f).get('company') || ''))
      + '&body=' + encodeURIComponent(compose());
  });
})();
</script>
`;
