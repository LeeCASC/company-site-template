import Link from "next/link";
import { siteConfig } from "@/lib/site";

function Section({ id, title, kicker, children }:{
  id:string; title:string; kicker?:string; children:React.ReactNode
}){
  return (
    <section id={id} className="container py-16 md:py-20">
      {kicker && <p className="text-sm tracking-widest text-gray-500 uppercase">{kicker}</p>}
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold">{title}</h2>
      <div className="mt-6 text-gray-700 leading-7">{children}</div>
    </section>
  );
}

export default function Home(){
  return (
    <>
      {/* HERO */}
      <section className="container pt-16 md:pt-24 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="text-sm tracking-widest text-gray-500 uppercase">Boundless Defines Logistics</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              无界定义物流 · <span className="text-[var(--brand)]">Sailing Beyond Boundaries</span>
            </h1>
            <p className="text-lg text-gray-700">
              我们以“无界创新”理念重构供应链逻辑，开创“中国港口 → 菲律宾近海”
              <b> 平板驳船直达不换载</b> 方案，攻克超限件跨国端到端运输难题，
              为清洁能源与大型工程项目提供可靠、准时、可扩展的交付能力。
            </p>
            <div className="flex gap-3">
              <Link href="#contact" className="btn btn-primary">获取方案</Link>
              <Link href="#proof" className="btn">成功实践</Link>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <ul className="grid grid-cols-2 gap-4">
                {[
                  ["清洁能源项目", "水电 / 光伏 / 风电"],
                  ["端到端交付", "海陆空联运 · 不换载"],
                  ["菲律宾深耕", "Alabat / Tanay 等"],
                  ["安全准时", "山地连续坡 · 90km+"]
                ].map(([t,s])=>(
                  <li key={t}>
                    <p className="font-semibold">{t}</p>
                    <p className="text-gray-600 text-sm">{s}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <Section id="mission" kicker="Mission Across Oceans" title="跨海之志 · 以卓越与诚信成就长期价值">
        <p>
          助力客户跨海越洋，把重型设备、成套机组运往世界各地。我们坚持可持续发展与最高诚信标准，
          通过持续创新与协作，为员工、客户与伙伴创造长期价值。
        </p>
      </Section>

      {/* Proof of Strength */}
      <Section id="proof" kicker="Proof Of Strength" title="实力见证 · 清洁能源项目全流程物流（2023–2025）">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card"><div className="card-body">
            <h3 className="font-semibold">Liangan Hydroelectric · 北拉瑙</h3>
            <p className="text-gray-600">发电机 / 变压器 / 输电材料运输</p>
          </div></div>
          <div className="card"><div className="card-body">
            <h3 className="font-semibold">Labrador Solar · 邦阿西南</h3>
            <p className="text-gray-600">组件与电站物资运输（光伏）</p>
          </div></div>
          <div className="card"><div className="card-body">
            <h3 className="font-semibold">Tanay Wind · 奎松</h3>
            <p className="text-gray-600">
              菲律宾首台 <b>8MW</b> 机组全流程超限物流；<b>90km</b> 连续山地多弯坡道路段。
            </p>
          </div></div>
          <div className="card"><div className="card-body">
            <h3 className="font-semibold">Alabat Wind · 奎松</h3>
            <p className="text-gray-600">
              首台 <b>8MW</b> 单机部件全流程运输与特种作业，端到端安全交付。
            </p>
          </div></div>
        </div>
      </Section>

      {/* Focus: Alabat & Tanay */}
      <Section id="focus" kicker="Focus: Alabat & Tanay" title="聚焦阿拉巴特与塔奈 · 全链协同，交付落地">
        <ul className="list-disc pl-6 space-y-2">
          <li>风机部件港口与内陆装卸、超大件/重载货物管理</li>
          <li>专用码头、路线改造与超限运输许可办理</li>
          <li>最后一公里进场与现场吊装协调</li>
          <li>全流程清关与合规管理</li>
        </ul>
      </Section>

      {/* Equipment Strength */}
      <Section id="equipment" kicker="Equipment Strength" title="装备实力 · 适配复杂地形与超长超重件">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Super Heavy-Duty Prime Mover","8×8 全驱液力变扭，山地牵引性能卓越"],
            ["Hydraulic Modular Trailer","多轴线模块化，适配机舱/塔筒/轮毂"],
            ["Blade Lifting Vehicle","山地叶片举升/回转/变桨，狭窄弯道通过"],
            ["Low-Bed Transporter","低平板半挂，提升通过性与稳定性"],
            ["Truck-mounted Crane","汽车起重机与甲板双机联吊"],
            ["Multi-axle Telescopic Blade Transporter","≥55m 叶片伸缩式长途运输"]
          ].map(([title,desc])=>(
            <article key={title} className="card">
              <div className="card-body">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* On-site */}
      <Section id="onsite" kicker="On-Site Execution" title="项目执行实景 · 装卸 / 运输 / 堆存一体化">
        <p>
          从码头联吊、转运、堆存，到山区长距离爬坡曲线道路运输，形成标准化 SOP 与风控体系，
          确保准时与安全。
        </p>
      </Section>

      {/* CTA + 联系方式 */}
      <section id="contact" className="container pb-20">
        <div className="card">
          <div className="card-body flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm tracking-widest text-gray-500 uppercase">Let’s Work Together</p>
              <h3 className="text-2xl font-semibold mt-1">专业工程物流 · 值得信赖</h3>
              <p className="text-gray-600 mt-2">
                我们提供端到端工程物流：货运代理、超限/重大件海陆空运输、设备租赁、仓储、进出口清关、
                方案设计与项目管理等。
              </p>
              <ul className="mt-3 text-gray-700">
                <li>📞 {siteConfig.contact.phone}</li>
                <li>✉️ {siteConfig.contact.email}</li>
                <li>📍 {siteConfig.contact.address}</li>
              </ul>
            </div>
            <Link href="/contact" className="btn btn-primary">提交需求</Link>
          </div>
        </div>
      </section>
    </>
  );
}
