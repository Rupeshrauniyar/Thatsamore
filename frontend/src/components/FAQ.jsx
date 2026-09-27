import { Plus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  ['Do you take reservations?', 'Yes. You can book a table online via OpenTable or call the restaurant directly on 01444 484 824.'],
  ['Do you cater for dietary requirements?', 'Vegetarian (V), vegan (VG) and gluten-free (GF) options are marked on the menu. Please let staff know of any allergies or requirements when booking or on arrival.'],
  ['Is the restaurant family-friendly?', 'Yes. The reference site says the restaurant welcomes families and has a children’s menu, pushchair and high-chair accommodation.'],
  ['Do you offer takeaway or collection?', 'Yes. Collection orders can be placed by calling 01444 484 824.'],
  ['Do you have a car park?', 'The restaurant is on Lindfield High Street, with public car parking nearby and village car parks within walking distance.'],
  ['Do you offer special menus for occasions?', 'The reference site notes a set menu as well as a pizza party package for groups; contact the restaurant to discuss requirements.']
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{faqs.map(([q, a], i) => <div key={q} className={`faq ${open === i ? 'is-open' : ''}`}><button type="button" onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><Plus size={18} /></button><div className="faq__answer"><p>{a}</p></div></div>)}</div>;
}
