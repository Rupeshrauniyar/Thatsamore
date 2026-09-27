import MenuItem from './MenuItem';
import ImageReveal from './ImageReveal';

export default function MenuSection({ section }) {
  return (
    <section id={section.id} className="menu-section">
      <div className="menu-section__visual"><ImageReveal src={section.image} alt={`${section.title} at That's Amore`} caption={section.kicker} /></div>
      <div className="menu-section__content">
        <div className="menu-section__heading"><div className="eyebrow">{section.kicker}</div><h2>{section.title}</h2><p>{section.intro}</p></div>
        {section.note && <div className="menu-note">{section.note}</div>}
        <div className="menu-list">{section.items.map((item, i) => <MenuItem item={item} key={`${section.id}-${i}`} />)}</div>
      </div>
    </section>
  );
}
