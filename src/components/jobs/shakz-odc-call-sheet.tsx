import {
  SHAKZ_ODC_OUTLETS,
  SHAKZ_ODC_PHONE_DISPLAY,
  SHAKZ_ODC_PHONES,
  SHAKZ_ODC_TOTAL_BOYS,
  shakzOdcWhatsAppUrl,
} from "@/content/jobs/shakz-events-odc-boys";
import "@/styles/shakz-odc-call-sheet.css";

export function ShakzOdcCallSheet() {
  return (
    <div className="mcc-shakz-odc">
      <div className="mcc-shakz-odc__banner">
        <p className="mcc-shakz-odc__banner-kicker">Tomorrow · Sunday 18 Oct 2026</p>
        <p className="mcc-shakz-odc__banner-total">{SHAKZ_ODC_TOTAL_BOYS} boys · one shift</p>
      </div>
      <p className="mcc-shakz-odc__lead">
        Shakz Events is staffing outdoor catering (direct catering) across the
        outlets below. The notice asks for boys. Same dress, same hours, same
        spot-payment line for every code — name the code you can reach when you
        message them.
      </p>
      <dl className="mcc-shakz-odc__facts">
        <div className="mcc-shakz-odc__fact">
          <dt>Date</dt>
          <dd>Sunday, 18 Oct 2026</dd>
        </div>
        <div className="mcc-shakz-odc__fact">
          <dt>Timing</dt>
          <dd>10:30 AM – 4:00 PM</dd>
        </div>
        <div className="mcc-shakz-odc__fact">
          <dt>Dress</dt>
          <dd>White shirt, black pant, any shoes</dd>
        </div>
        <div className="mcc-shakz-odc__fact">
          <dt>Payment</dt>
          <dd>Spot payment — amount on DM</dd>
        </div>
      </dl>

      <div className="mcc-shakz-odc__roster-head">
        <h3>Outlet-wise requirement</h3>
        <p>{SHAKZ_ODC_OUTLETS.length} codes · {SHAKZ_ODC_TOTAL_BOYS} boys</p>
      </div>
      <ul className="mcc-shakz-odc__roster">
        {SHAKZ_ODC_OUTLETS.map((row) => (
          <li key={row.code} className="mcc-shakz-odc__outlet">
            <span className="mcc-shakz-odc__code">{row.code}</span>
            <span className="mcc-shakz-odc__area">{row.area}</span>
            <span className="mcc-shakz-odc__count">
              {row.boys} {row.boys === 1 ? "boy" : "boys"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mcc-shakz-odc__note">
        The notice names the area and the code only — no street or door number.
        Ask Shakz Events for the exact venue and which codes are still open.
        Do not pay a fee to be added to the list. Confirm the spot-payment
        amount on WhatsApp before you travel.
      </p>
      <div className="mcc-shakz-odc__contacts">
        {SHAKZ_ODC_PHONES.map((phone) => (
          <span key={phone.display} className="mcc-shakz-odc__contact-pair">
            <a href={phone.tel}>Call {phone.display}</a>
            <a href={shakzOdcWhatsAppUrl(phone.whatsapp)} target="_blank" rel="noopener noreferrer">
              WhatsApp {phone.display}
            </a>
          </span>
        ))}
      </div>

      <div className="mcc-shakz-odc__faqs">
        <details>
          <summary>When is the shift?</summary>
          <p>Sunday 18 October 2026, 10:30 AM to 4:00 PM. One day, not a monthly role.</p>
        </details>
        <details>
          <summary>What is the dress code?</summary>
          <p>White shirt, black pant, and any shoes.</p>
        </details>
        <details>
          <summary>How much is the spot payment?</summary>
          <p>
            The notice does not print a rupee figure. It says spot payment and
            asks candidates to DM {SHAKZ_ODC_PHONE_DISPLAY} for the amount.
          </p>
        </details>
      </div>
    </div>
  );
}
