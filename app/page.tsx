
import Link from "next/link";
import { siteConfig } from "@/lib/site";

function Section({ id, title, kicker, children }:{ id: string; title: string; kicker?: string; children: React.ReactNode }){
  return (
    <section id={id} className="container py-16 md:py-20">
      {kicker && (<p className="text-sm tracking-widest text-gray-500 uppercase">{kicker}</p>)}
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">{title}</h2>
      <div className="mt-6 text-gray-700 leading-7">{children}</div>
    </section>
  );
}

export default function Home(){
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/wintex/hero.jpg" alt="Wintex Logistics Hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative container pt-28 pb-16 md:pt-40 md:pb-28 text-white">
          <p className="text-sm tracking-widest uppercase text-white/80">Boundless Defines Logistics</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
            无界定义物流 · <span className="text-[var(--brand)]">Sailing Beyond Boundaries</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">
            以“无界创新”重构跨境工程物流：推出中国港口→菲律宾近海<b> 平板驳船直达不换载</b> 方案，
            解决超限件端到端运输难题，服务清洁能源与大型工程项目。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">获取方案</a>
            <a href="#proof" className="btn border-white/30 text-white hover:shadow">成功实践</a>
          </div>
        </div>
      </section>

      {/* Mission */}
      <Section id="mission" kicker="Mission Across Oceans" title="跨海之志 · 以卓越与诚信成就长期价值">
        <p>助力客户跨海越洋，把重型设备、成套机组运往世界各地。我们坚持可持续发展与最高诚信标准，
        通过持续创新与协作，为员工、客户与伙伴创造长期价值。</p>
      </Section>

      {/* Proof */}
      <Section id="proof" kicker="Proof Of Strength" title="成功实践 · 清洁能源项目（2023–2025）">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "项目案例 1", desc: "项目现场 / 设备转运 / 关键工序", img: "/wintex/case1.jpg" },
            { title: "项目案例 2", desc: "光伏/风电/水电等清洁能源项目", img: "/wintex/case2.jpg" },
            { title: "项目案例 3", desc: "山区长距离曲线道路段运输", img: "/wintex/case3.jpg" },
            { title: "项目案例 4", desc: "端到端安全交付（海+陆）", img: "/wintex/case4.jpg" }
          ].map((c) => (
            <article key={c.title} className="card overflow-hidden">
              <img src={c.img} alt={c.title} className="h-56 w-full object-cover" />
              <div className="card-body">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-gray-600">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Equipment */}
      <Section id="equipment" kicker="Equipment Strength" title="装备实力 · 适配复杂地形与超长超重件">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Super Heavy-Duty Prime Mover", d: "8×8 全驱液力变扭，山地牵引性能卓越", img: "/wintex/equip1.jpg" },
            { t: "Hydraulic Modular Trailer", d: "多轴线模块化，适配机舱 / 塔筒 / 轮毂", img: "/wintex/equip2.jpg" },
            { t: "Blade Lifting Vehicle", d: "山地叶片举升 / 回转 / 变桨，狭窄弯道通过", img: "/wintex/equip3.jpg" }
          ].map((e) => (
            <article key={e.t} className="card overflow-hidden">
              <img src={e.img} alt={e.t} className="h-48 w-full object-cover" />
              <div className="card-body">
                <h3 className="font-semibold">{e.t}</h3>
                <p className="text-gray-600">{e.d}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <section id="contact" className="container pb-20">
        <div className="card">
          <div className="card-body flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm tracking-widest text-gray-500 uppercase">Let’s Work Together</p>
              <h3 className="text-2xl font-semibold mt-1">专业工程物流 · 值得信赖</h3>
              <p className="text-gray-600 mt-2">
                端到端工程物流：货运代理、超限/重大件海陆空运输、设备租赁、仓储、进出口清关、方案设计与项目管理等。
              </p>
              <ul className="mt-3 text-gray-700">
                <li>📞 {siteConfig.contact?.phone}</li>
                <li>✉️ {siteConfig.contact?.email}</li>
                <li>📍 {siteConfig.contact?.address}</li>
              </ul>
            </div>
            <Link href="/contact" className="btn btn-primary">提交需求</Link>
          </div>
        </div>
      </section>
    </>
  );
}
