import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { bindMagnetic } from '../animations/magnetic';

export default function MagneticButton({ children, to, href, external = false, variant = 'solid', className = '', onClick }) {
  const ref = useRef(null);
  useEffect(() => bindMagnetic(ref.current), []);

  const classes = `magnetic-btn magnetic-btn--${variant} ${className}`;
  const content = <><span>{children}</span><ArrowUpRight size={16} aria-hidden="true" /></>;

  if (href) return <a ref={ref} className={classes} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} onClick={onClick}>{content}</a>;
  return <Link ref={ref} className={classes} to={to} onClick={onClick}>{content}</Link>;
}
