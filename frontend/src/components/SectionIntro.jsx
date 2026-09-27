export default function SectionIntro({ kicker, title, body, align = 'left', dark = false }) {
  return (
    <div className={`section-intro section-intro--${align} ${dark ? 'section-intro--dark' : ''}`}>
      {kicker && <div className="eyebrow">{kicker}</div>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
