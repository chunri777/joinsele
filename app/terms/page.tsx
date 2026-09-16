import { DocumentPage } from '../official-components';

export const metadata = {
  title: 'SELE 用户协议｜joinsele.cn',
  description: 'SELE 用户协议 v1.0，适用于展示型官网与 Beta 准备阶段。',
};

export default function TermsPage() {
  return (
    <DocumentPage
      title="SELE 用户协议 v1.0"
      intro="本协议适用于 SELE 展示型官网及 Beta 准备阶段。"
    >
      <section className="official-document-section">
        <h2>1. 协议说明</h2>
        <p>
          欢迎访问 SELE 网站（备案网站名称：微光拾语）。SELE 是一个关于人与人如何认识彼此的互联网产品探索。本协议用于说明当前官网访问、Beta 准备阶段及未来内测体验的基础规则。
        </p>
      </section>
      <section className="official-document-section">
        <h2>2. 当前服务状态</h2>
        <p>
          SELE 当前仍处于早期测试准备 / Beta 阶段。joinsele.cn 目前提供品牌介绍、产品理念介绍、Beta 内测信息、隐私政策、用户协议和联系方式展示。
        </p>
        <p>
          当前尚未开放注册、登录、用户发帖、评论、即时聊天、用户关系链、支付、Heart 或 Heart+ 购买、真实用户匹配及公开内容社区。
        </p>
      </section>
      <section className="official-document-section">
        <h2>3. 年龄要求</h2>
        <p>SELE 当前仅面向年满 18 周岁的成年人开放 Beta 申请及测试体验。</p>
        <p>未成年人暂不参与当前阶段的产品体验与测试。</p>
      </section>
      <section className="official-document-section">
        <h2>4. Beta 测试说明</h2>
        <p>
          SELE 第一阶段内测将用于观察产品体验、理解用户真实感受，并发现尚未解决的问题。测试期间，部分功能可能调整、暂停或更新。
        </p>
        <p>内测名额、范围、时间和体验内容以 SELE 实际通知为准。</p>
      </section>
      <section className="official-document-section">
        <h2>5. 用户基本行为规范</h2>
        <p>用户在未来使用 SELE 相关服务时，应遵守法律法规和基本尊重原则，不得：</p>
        <ul>
          <li>发布违法违规、侵害他人合法权益或违背公序良俗的内容；</li>
          <li>冒用他人身份，或以欺骗方式获取他人信息；</li>
          <li>骚扰、威胁、侮辱或恶意打扰他人；</li>
          <li>破坏、干扰或绕过服务安全机制；</li>
          <li>利用 SELE 从事违法活动或未经允许的商业推广。</li>
        </ul>
      </section>
      <section className="official-document-section">
        <h2>6. 内容与知识产权</h2>
        <p>
          SELE 的品牌名称、Logo、页面视觉、产品设计、文案、软件代码及 SELE 自有素材等相关权利依法受到保护。
        </p>
        <p>
          对于用户未来可能主动提交的反馈、申请信息或体验内容，我们仅会在提供服务、处理反馈、保障安全和改进产品所必要的范围内使用。涉及用户内容的授权规则将在正式开放相关功能前进一步明确。
        </p>
      </section>
      <section className="official-document-section">
        <h2>7. 用户个人信息</h2>
        <p>SELE 将按照《SELE 隐私政策》处理个人信息。隐私规则与本协议具有同等重要性。</p>
      </section>
      <section className="official-document-section">
        <h2>8. 服务调整</h2>
        <p>
          由于 SELE 处于早期测试准备阶段，我们可能根据产品规划、技术条件、合规要求或用户反馈调整、暂停或更新部分服务。
        </p>
      </section>
      <section className="official-document-section">
        <h2>9. 服务安全</h2>
        <p>
          用户不得尝试未经授权访问、扫描、攻击、干扰或破坏 SELE 网站、服务器、数据或相关系统。
        </p>
      </section>
      <section className="official-document-section">
        <h2>10. 第三方链接</h2>
        <p>
          网站未来可能包含第三方链接或工具入口。用户访问第三方服务时，应同时遵守对应第三方的服务条款和隐私规则。
        </p>
      </section>
      <section className="official-document-section">
        <h2>11. 合理责任边界</h2>
        <p>
          在法律允许范围内，SELE 会尽力维护服务稳定与内容准确，但早期测试阶段的部分信息、功能或体验可能存在调整、暂停或不完整情况。
        </p>
      </section>
      <section className="official-document-section">
        <h2>12. 协议更新</h2>
        <p>
          当 SELE 开放账号、内容、关系、聊天、支付或其他正式服务时，我们会根据实际业务更新本协议。
        </p>
      </section>
      <section className="official-document-section">
        <h2>13. 联系方式</h2>
        <p>产品品牌：SELE</p>
        <p>备案网站名称：微光拾语</p>
        <p>ICP备案号：沪ICP备2026046102号-1</p>
        <p>联系邮箱：joinsele@qq.com</p>
      </section>
      <section className="official-document-section">
        <h2>14. 生效日期</h2>
        <p>生效日期：2026年9月17日</p>
      </section>
    </DocumentPage>
  );
}
