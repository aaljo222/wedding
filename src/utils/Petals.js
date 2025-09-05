export const Petals = () => {
  const petals = [];

  for (let i = 0; i < 30; i++) {
    const style = {
      left: `${Math.random() * 100}vw`, // 랜덤 가로 위치
      animationDuration: `${5 + Math.random() * 40}s`, // 5~10초 애니메이션 지속
      animationDelay: `${Math.random() * 10}s`, // 시작 시간 랜덤화
      width: `${10 + Math.random() * 15}px`, // 크기 랜덤화
      height: `${10 + Math.random() * 15}px`,
    };

    petals.push(<div key={i} className="petal" style={style}></div>);
  }

  return <>{petals}</>;
};
