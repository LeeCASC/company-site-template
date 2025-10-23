import Link from "next/link";
import { siteConfig } from "@/lib/site";

function Kicker({ children }:{ children:React.ReactNode }){ return <p className="section-kicker">{children}</p>; }

export default function Home(){
  return (
    <>
      <section className="border-b" style={{background:'linear-gradient(135deg, rgba(245,158,11,.10), rgba(245,158,11,.25))'}}>
        <div className="container py-16 md:py-24">
          <Kicker>WIN THE WAY</Kicker>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">以「无界创新」重构跨境工程物流</h1>
          <p className="mt-4 max-w-2xl text-gray-700 text-lg">
            开创“中国港口 → 菲律宾近海”全程不换载的平板驳船直达方案，攻克超限件跨国端到端运输难题。我们专注清洁能源（风电/光伏/水电）等大型工程项目。
          </p>
          <div className="mt-8 flex gap-3">
            <a href="#contact" className="btn btn-primary">获取方案</a>
            <a href="#cases" className="btn">查看案例</a>
          </div>
        </div>
      </section>

      <section id="mission" className="container py-16 md:py-20">
        <Kicker>Our Vision</Kicker>
        <div className="grid grid-2">
          <div className="block block-brand">
            <h2 className="text-2xl font-semibold mb-2">企业愿景</h2>
            <p>助力客户跨海越洋，将重型设备、成套机组运往世界各地；坚持卓越与可持续发展，为员工、客户与伙伴创造长期价值。</p>
          </div>
          <div className="block block-neutral">
            <h3 className="font-semibold mb-1">核心理念</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>无界创新 · 重构供应链逻辑</li>
              <li>端到端交付 · 海陆联运一体化</li>
              <li>安全准时 · 标准化SOP与风控</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="cases" className="container py-16 md:py-20">
        <Kicker>Successful Practices</Kicker>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">成功案例（2023—2025）</h2>
        <div className="grid grid-3">
          {['Liangan Hydroelectric','Labrador Solar','Tanay Wind','Alabat Wind','Dedicated Jetty','Last-mile Delivery'].map((t,i)=>(
            <article key={i} className="block block-neutral">
              <h3 className="font-semibold mb-1">{t}</h3>
              <p className="text-gray-700">根据项目特点定制运输方案，确保安全准时交付。</p>
            </article>
          ))}
        </div>
      </section>

      <section id="equipment" className="container py-16 md:py-20">
        <Kicker>Equipment Strength</Kicker>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">装备实力</h2>
        <div className="grid grid-3">
          {['Super Heavy-Duty Prime Mover','Hydraulic Modular Trailer','Blade Lifting Vehicle','Low-Bed Transporter','Truck-mounted Crane','Multi-axle Blade Transporter'].map((t,i)=>(
            <article key={i} className="block block-brand">
              <h3 className="font-semibold mb-1">{t}</h3>
              <p className="text-gray-700">适配复杂地形与超长超重件，匹配风机机舱/塔筒/叶片等部件运输。</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="container pb-20">
        <div className="card">
          <div className="card-body flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Kicker>Let’s Work Together</Kicker>
              <h3 className="text-2xl font-semibold mt-1">专业工程物流 · 值得信赖</h3>
              <p className="text-gray-600 mt-2">货运代理、超限/重大件海陆空运输、设备租赁、仓储、清关、方案设计与项目管理等服务。</p>
              <ul className="mt-3 text-gray-700">
                <li>📞 {siteConfig.contact.phone}</li>
                <li>✉️ {siteConfig.contact.email}</li>
                <li>📍 {siteConfig.contact.address}</li>
              </ul>
            </div>
            <Link href="/careers" className="btn btn-primary">加入我们</Link>
          </div>
        </div>
      </section>
    </>
  );
}