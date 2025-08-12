
import Link from "next/link";
import { posts } from "@/lib/news";
export default function NewsList(){return (<section className="container py-12"><h1 className="text-3xl font-semibold mb-6">新闻动态</h1>{posts.map(p=>(<article key={p.slug}><h2 className="text-xl font-semibold"><Link href={`/news/${p.slug}`}>{p.title}</Link></h2></article>))}</section>);}
