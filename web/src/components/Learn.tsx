import { lessons, glossary } from '../data/lessons';
import { Icon } from './Icon';
export function Learn({ onPlay }: { onPlay: () => void }) {
  return (
    <div className="learn-page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">A LITTLE CURIOSITY GOES A LONG WAY</p>
          <h1>
            Good moves start here<span className="lime-text">.</span>
          </h1>
          <p>You don’t need to know crypto. You just need a little curiosity.</p>
        </div>
        <button className="button primary" onClick={onPlay}>
          Give it a go
          <Icon name="arrow" size={17} />
        </button>
      </div>
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <article className="lesson-card" key={lesson.number}>
            <span className="lesson-number">{lesson.number}</span>
            <h2>{lesson.title}</h2>
            <p>{lesson.text}</p>
          </article>
        ))}
      </div>
      <section className="glossary">
        <div>
          <p className="eyebrow">GET TO KNOW THE NEIGHBORHOOD</p>
          <h2>A few names you’ll meet.</h2>
          <p className="muted">Real ideas behind your virtual properties.</p>
        </div>
        <dl>
          {glossary.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.definition}</dd>
            </div>
          ))}
        </dl>
      </section>
      <p className="fine-print">
        LumenPoly is an independent educational game. It is not affiliated with the Stellar
        Development Foundation.
      </p>
    </div>
  );
}
