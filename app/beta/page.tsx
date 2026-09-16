import { DocumentPage } from '../official-components';

export const metadata = {
  title: 'SELE Beta｜joinsele.cn',
  description: 'SELE 正在准备第一阶段小范围内测，当前申请流程尚未开放。',
};

export default function BetaPage() {
  return (
    <DocumentPage title="SELE Beta">
      <section className="official-document-section">
        <p>SELE 正在准备第一阶段小范围内测。</p>
        <p>
          第一阶段内测主要用于观察产品体验、理解用户真实感受，并发现尚未解决的问题。
        </p>
        <p>我们计划邀请少量年满 18 周岁的用户参与测试。</p>
      </section>
      <section className="official-document-section">
        <h2>内测会发生什么</h2>
        <p>参与者将在获得邀请后体验 SELE 的部分功能，并可以自愿向我们提供产品反馈。</p>
        <p>测试期间，部分功能可能调整、暂停或更新。</p>
      </section>
      <section className="official-document-section">
        <h2>关于隐私</h2>
        <p>我们仅在提供测试服务所必要的范围内收集信息，并按照 SELE 隐私政策进行处理。</p>
        <a className="official-text-link" href="/privacy">
          查看隐私政策
        </a>
      </section>
      <section className="official-document-section official-beta-status">
        <p>内测即将开放</p>
      </section>
    </DocumentPage>
  );
}
