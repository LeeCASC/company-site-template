// 新闻数据
export const newsData: { [key: string]: { image: string; title: string; content: string } } = {
    '1': {
      image: '/moveinner.JPG',
      title: 'Wintex Logistics 乔迁新址，持续提升服务品质',
      content: `日期：2024年9月10日

尊敬的客户及合作伙伴：

我们很高兴地宣布，Wintex Logistics Corporation 已于2024年9月10日正式乔迁至新的办公地址：菲律宾马尼拉BGC（博尼法西奥环球城）贸易金融大厦。

此次乔迁标志着Wintex Logistics发展历程中的一个重要里程碑。新的办公场所位于马尼拉核心商务区，不仅为我们团队提供了更现代化、更高效的工作环境，也为我们进一步整合资源、优化运营流程、贴近客户需求奠定了坚实基础。这体现了公司持续投资于未来发展、不断提升服务能力的坚定承诺。

自成立以来，Wintex Logistics始终致力于为客户提供可靠、高效、具竞争力的综合物流与运输解决方案。我们深知，公司所取得的每一点进步，都离不开各位客户长期以来的信任、支持与合作。在此，我们谨向所有客户致以最诚挚的感谢！

迁入新址后，Wintex Logistics将以全新的面貌，继续秉承"客户至上、服务为本"的宗旨，依托更优越的区位条件与升级的硬件设施，持续优化我们的大件运输物流服务，海、陆、空货运代理、供应链管理及相关配套服务。我们的团队将一如既往地以专业、专注的态度，确保您的货物安全、准时送达目的地，努力为广大客户创造更大价值。

新环境，新起点，新征程。Wintex Logistics Corporation 全体同仁期待在新址继续为您提供更优质、更便捷的服务。我们欢迎各位客户及伙伴莅临指导，共叙合作，共谋发展。

新办公室联系方式将于近期正式更新至公司官方平台，敬请留意。

再次感谢您的支持！让我们携手并进，共创物流新篇章。

关于 Wintex Logistics Corporation: Wintex Logistics Corporation 是一家专业的综合物流服务提供商，业务涵盖大件运输业务，国际货运代理、工程物流、供应链咨询等，致力于为客户提供定制化、一站式的物流解决方案。`
  },
  '2': {
    image: '/news_tanay.jpeg',
    title: '再传捷报：菲律宾Tanay风电项目首船设备成功交付',
    content: `日期：2024年7月2日

继菲律宾阿尔拜特（Alabat）风电项目首船设备顺利交付后，我司在菲承建的另一个重要项目——Tanay风电项目再传捷报。

2024年7月2日凌晨5时30分，运载着Tanay风电项目首批关键机组的"JY Cheng Rong"轮准时抵达菲律宾因凡塔（Infanta）港外锚地。经过高效的联检与准备工作，该轮于当日下午4时30分成功完成技术要求较高的尾靠作业，安全泊入项目临时码头。

尤为值得一提的是，在各方的大力协调与推动下，海关部门于船舶靠泊当日即高效完成清关放行手续。项目运输团队随即紧锣密鼓地展开行动，于当晚立即启动卸货作业，确保了整个物流环节无缝衔接、高效推进。

本次首船设备的成功交付，标志着Tanay风电项目正式进入现场安装阶段，为项目后续建设按计划推进奠定了坚实基础。我们衷心感谢菲律宾因凡塔（Infanta）市政府、海关及港务局在此过程中给予的大力支持与高效协作，同时也对项目团队及所有合作伙伴的专业付出致以诚挚谢意。

我司将继续凭借在重大件物流领域的丰富经验与专业能力，安全、高效地保障后续设备的运输与交付，全力推动Tanay风电项目及菲律宾其他绿色能源项目的成功建设。`
  },
  '3': {
    image: '/alabat-content.JPG',
    title: '金湾时代轮成功首航 阿尔拜特临时码头喜迎风机设备',
    content: `日期：2024年4月8日

2024年4月8日清晨，在我司项目团队的高效组织和精心操作下，运载着两套完整风力发电机组设备的"金湾时代"轮，于天气晴好、海况平稳的有利条件下，成功安全靠泊菲律宾阿尔拜特（Alabat）临时码头。

本次作业采用技术要求较高的尾靠方式，"金湾时代"轮在各方通力协作下，操作精准，过程顺利，圆满完成了首航靠泊任务。这不仅标志着该项目关键大件设备运输取得了阶段性重大进展，也为后续现场安装工作奠定了坚实基础。

两套完整风机设备成功落地菲律宾Alabat岛，离不开项目团队的周密策划、船方的专业操作以及现场所有工作人员的密切配合与辛勤付出。我们对所有参与首航作业的团队及合作伙伴表示衷心感谢！

未来，我们将继续秉持专业、安全、高效的服务宗旨，确保项目后续物流环节的顺利推进，为项目的成功建设和绿色能源发展贡献力量。`
  }
};

// 获取新闻预览文本（标题 + 前两行正文 + 日期）
export function getNewsPreview(id: string): { title: string; preview: string; date: string } {
  const news = newsData[id] || newsData['1'];
  // 提取日期
  let date = '';
  const dateMatch = news.content.match(/日期：(.+)/);
  if (dateMatch) {
    date = dateMatch[1].trim();
  }
  
  // 移除日期行（如果存在），然后获取前两行正文
  const lines = news.content.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed !== '' && !trimmed.startsWith('日期：');
  });
  const firstTwoLines = lines.slice(0, 2).map(line => line.trim()).join(' ');
  return {
    title: news.title,
    preview: firstTwoLines.length > 0 ? firstTwoLines : news.content.substring(0, 100),
    date: date
  };
}

