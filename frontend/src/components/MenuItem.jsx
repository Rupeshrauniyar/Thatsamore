import { ArrowUpRight } from 'lucide-react';

export default function MenuItem({ item }) {
  const [name, description, price, diet, featured] = item;
  return (
    <article className={`menu-item ${featured ? 'menu-item--featured' : ''}`}>
      <div className="menu-item__main">
        <div className="menu-item__name-row"><h3>{name}</h3>{featured && <ArrowUpRight size={17} />}</div>
        {description && <p>{description}</p>}
        {diet && <div className="diet-tags">{diet.split(' ').map((tag) => <span key={tag}>{tag}</span>)}</div>}
      </div>
      <div className="menu-item__price">£{Number(price).toFixed(2)}</div>
    </article>
  );
}
