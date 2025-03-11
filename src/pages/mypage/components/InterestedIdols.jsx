import { useContext, useEffect } from 'react';
import IdolProfile from './IdolProfile';
import { MyDispatchContext, MyStateContext } from '../MyPage';
import "../../mypage.scss"

const InterestedIdols = () => {
    const { selectedDatas } = useContext(MyStateContext);
    const { setSelectedDatas } = useContext(MyDispatchContext);

    // 로컬스토리지에서 데이터를 불러옴
    useEffect(() => {
        const savedIdols = localStorage.getItem('selectedIdols');
        if (savedIdols) {
            setSelectedDatas(JSON.parse(savedIdols));
        }
    }, [setSelectedDatas]);

    // 데이터가 변경될 때마다 로컬스토리지에 저장함
    useEffect(() => {
        localStorage.setItem('selectedIdols', JSON.stringify(selectedDatas));
    }, [selectedDatas]);

    // 특정 아이돌을 관심 목록에서 삭제하는 함수
    const onDelete = (id) => {
        const nextIdols = selectedDatas.filter((idol) => idol.id !== id);
        setSelectedDatas(nextIdols);
    };

    return (
        <section id='IdolWrapper'>
            <h2>내가 관심있는 아이돌</h2>

            {selectedDatas.length > 0 ? (
                <section id="InterestedIdolList">
                    {selectedDatas.map((idol) => {
                        return <IdolProfile key={idol.id} idol={idol} selected={true} onDelete={onDelete} />;
                    })}
                </section>
            ) : (
                <section id="EmptyMessage">관심있는 아이돌을 추가해주세요!😎</section>
            )}
        </section>
    );
};

export default InterestedIdols;