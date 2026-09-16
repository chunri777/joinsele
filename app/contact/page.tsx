import { DocumentPage } from '../official-components';

export const metadata = {
  title: '联系 SELE｜joinsele.cn',
  description: '联系 SELE，了解内测计划、个人信息保护或网站内容相关问题。',
};

export default function ContactPage() {
  return (
    <DocumentPage title="联系 SELE">
      <section className="official-document-section">
        <p>
          如果你对 SELE、内测计划、个人信息保护或网站内容有任何问题，可以通过以下方式联系我们。
        </p>
      </section>
      <section className="official-contact-list" aria-label="联系方式">
        <p>
          <span>联系邮箱</span>
          <strong>joinsele@qq.com</strong>
        </p>
        <p>
          <span>网站名称</span>
          <strong>微光拾语</strong>
        </p>
        <p>
          <span>隐私相关联系</span>
          <strong>joinsele@qq.com</strong>
        </p>
      </section>
      <section className="official-document-section">
        <p>我们会认真阅读收到的反馈。</p>
      </section>
    </DocumentPage>
  );
}
