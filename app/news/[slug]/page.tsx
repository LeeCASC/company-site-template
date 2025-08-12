
import { notFound } from "next/navigation";
import { posts } from "@/lib/news";
export default function Post({params}:{params:{slug:string}}){
  const post=posts.find(p=>p.slug===params.slug);
  if(!post) return notFound();
  return (<section className="container py-12"><h1 className="text-3xl font-semibold">{post.title}</h1></section>);
}
