import { DocumentPage, TextBlock } from '../official-components';

export const metadata = {
  title: '关于 SELE｜joinsele.cn',
  description: 'SELE 是一个关于人与人如何认识彼此的互联网产品探索。',
};

const productLanguage = [
  ['片刻', '一段关于当下的表达。'],
  ['回声', '当一段表达被另一个人理解或回应时产生的连接。'],
  ['靠近', '在进一步了解之后，由用户自主做出的关系选择。'],
  ['Heartbox', 'SELE 正在探索的一种认识彼此的体验方式。'],
  ['暗格', '为更私人表达保留的产品概念。当前只是理念介绍。'],
];

export default function AboutPage() {
  return (
    <DocumentPage title="SELE 是什么">
      <section className="official-document-section">
        <p>SELE 是一个关于人与人如何认识彼此的互联网产品探索。</p>
        <p>
          我们观察到，在快速的信息环境里，人们常常需要在很短的时间里，根据照片、标签或有限的信息判断另一个人。
        </p>
        <p>SELE 希望尝试另一种方式：</p>
        <p>
          先看到一些表达。
          <br />
          再了解一点彼此。
          <br />
          最后决定是否继续靠近。
        </p>
      </section>
      <section className="official-document-section">
        <h2>产品语言</h2>
        <div className="official-language-list">
          {productLanguage.map(([title, body]) => (
            <TextBlock key={title} title={title} body={body} />
          ))}
        </div>
      </section>
    </DocumentPage>
  );
}
