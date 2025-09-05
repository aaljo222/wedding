// 최대한 간단하게 수정한 버전
import React from "react";
import { Link } from "react-router-dom";
import { cards } from "../../data/InvitationCardsData";
import "../../css/InvitationCards.css";

export default function InvitationCards() {
  const handleCopy = (url, title) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => alert(`${title} 카드 링크가 복사되었습니다.`))
        .catch(() => alert(`${title} 카드 링크 복사에 실패했습니다.`));
    } else {
      prompt("아래 링크를 복사하세요:", url);
    }
  };

  return (
    <div className="cards-page">
      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card.id} className="invite-card cards-grid__item">
            <a href={card.url} target="_blank" rel="noopener noreferrer">
              <img
                src={card.img}
                alt={card.title}
                className="invite-card__image"
              />
            </a>
            <div className="invite-card__body">
              <h3 className="invite-card__title">{card.title}</h3>
              <p className="invite-card__subtitle">{card.subtitle}</p>
              <div className="invite-card__cta">
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--line"
                >
                  초대장 보기
                </a>
                <button
                  onClick={() => handleCopy(card.url, card.title)}
                  className="btn btn--icon"
                >
                  링크 복사
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cards-page__footer">
        <Link to="/InvitationAdd" className="cta-btn">
          청첩장 제작하기
        </Link>
      </div>
    </div>
  );
}
