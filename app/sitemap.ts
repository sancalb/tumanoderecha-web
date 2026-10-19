import type { MetadataRoute } from 'next';
import { business } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {return [{url:business.url,changeFrequency:'monthly',priority:1},{url:`${business.url}/aviso-de-privacidad`,changeFrequency:'yearly',priority:.2}];}
