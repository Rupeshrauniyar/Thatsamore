import { Navigate, useParams } from 'react-router-dom';
import { locationsData } from '../data/site';

export default function LocationDetail() {
  const { slug } = useParams();
  const loc = locationsData.find(l => l.slug === slug);
  if (!loc) return <Navigate to="/locations" replace />;
  return <Navigate to="/locations" replace />;
}
