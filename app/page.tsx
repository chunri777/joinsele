import {
  OfficialLayout,
  SectionHeader,
  SeleMark,
  TextBlock,
} from './official-components';

export const metadata = {
  title: 'SELE｜有些人，适合晚一点看见',
  description:
    'SELE 是一个关于人与人如何认识彼此的互联网产品探索。先认识一点，再决定要不要靠近。',
};

export default function HomePage() {
  return (
    <OfficialLayout>
      <section className="official-hero" aria-labelledby="home-title">
        <div className="official-hero-mark" aria-hidden="true">
          <SeleMark />
        </div>
        <p className="official-kicker">SELE</p>
        <h1 id="home-title">有些人，适合晚一点看见。</h1>
        <div className="official-hero-copy">
          <p>一个关于人与人之间真实连接的探索。</p>
          <p>先认识一点，再决定要不要靠近。</p>
        </div>
        <a className="official-button" href="/about">
          了解 SELE
        </a>
      </section>

      <section className="official-section official-intro-section" id="intro">
        <SectionHeader title="关于 SELE" />
        <div className="official-prose">
          <p>SELE 是一个正在筹备内测的互联网产品。</p>
          <p>
            我们希望探索一种更克制的人际认识方式——不急于展示，不急于判断，也不急于定义关系。
          </p>
          <p>在 SELE，人们可以先通过有限的信息了解彼此，再决定是否继续认识。</p>
        </div>
        <a className="official-text-link" href="/about">
          了解更多
        </a>
      </section>

      <section className="official-section">
        <SectionHeader title="我们在探索什么" />
        <div className="official-three-lines">
          <TextBlock
            title="慢一点认识"
            body="不以快速滑动和即时判断作为认识一个人的起点。"
          />
          <TextBlock title="真实一点表达" body="给人与人之间的表达留下更多空间。" />
          <TextBlock
            title="把选择交给彼此"
            body="是否继续认识，由双方在逐渐了解之后决定。"
          />
        </div>
      </section>

      <section className="official-section">
        <SectionHeader title="SELE Beta" />
        <div className="official-prose">
          <p>SELE 目前处于早期测试准备阶段。</p>
          <p>
            我们正在邀请少量成年用户参与第一阶段体验，并通过真实反馈持续完善产品。
          </p>
        </div>
        <a className="official-text-link" href="/beta">
          了解内测计划
        </a>
      </section>

      <section className="official-section official-age-note">
        <SectionHeader eyebrow="18+" title="面向成年人的早期测试" />
        <div className="official-prose">
          <p>SELE 面向年满 18 周岁的成年人。</p>
          <p>未成年人暂不参与当前阶段的产品体验与测试。</p>
        </div>
      </section>
    </OfficialLayout>
  );
}
