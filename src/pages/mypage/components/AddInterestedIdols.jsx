import { useContext, useMemo, useEffect, useRef, useCallback } from 'react';
import IdolProfile from "../../components/IdolProfile"
import Button from '../../../components/Button';
import plusIcon from '../../../assets/icon/Ic_plus_24px.svg';
import arrowIcon from '../../../assets/icon/ic_arrow_left.svg';
import { MyDispatchContext, MyStateContext } from '../MyPage';
import { toast } from 'react-toastify';
import useDataNum from '../../../hooks/useDataNum';
import useScrollTo from '../../../hooks/useScrollTo';
import usePagination from '../../../hooks/usePagination';
import "../../mypage.scss"

const AddInterestedIdols = ({ cursor, setCursor, isLoading, loadMore, option, setOption, error, onRetry }) => {
    const { datas, selectedDatas, checkedIdols } = useContext(MyStateContext);
    const { setDatas, setSelectedDatas, setCheckedIdols } = useContext(MyDispatchContext);
    const dataNum = useDataNum(); // 페이지당 렌더링되어야 할 아이템 수를 가져옴.
    const lastItemRef = useRef(null); // 마지막 아이템을 참조하는 ref.
    const { ref: idolListRef, scrollTo } = useScrollTo(); // 훅 사용
    const { page, setPage, handleNextPage, handlePrevPage } = usePagination(scrollTo);

    const handleChange = (e) => {
        setOption(e.target.value); // 옵션을 업데이트함.
        setPage(0); // 페이지를 0으로 초기화.
        setDatas([]);
        setCursor(null); // 커서를 초기화.
        setCheckedIdols([]); // 체크된 아이돌을 초기화.
    };

    // '추가하기' 버튼 클릭 시 호출되는 함수
    const handleAddClick = () => {
        if (!checkedIdols.length) {
            toast.error('카드를 선택해주세요!');
            return;
        }
        setSelectedDatas([...selectedDatas, ...checkedIdols]); // 선택된 아이돌을 추가함.

        setCheckedIdols([]); // 체크된 아이돌을 초기화.
    };

    // 아이돌 체크 상태 변경 시 호출되는 함수
    const handleCheck = (idol, checked) => {
        if (checked) {
            setCheckedIdols([...checkedIdols, idol]); // 체크된 아이돌을 추가.
        } else {
            setCheckedIdols(checkedIdols.filter((checkedIdol) => checkedIdol.id !== idol.id)); // 체크 해제된 아이돌을 제거.
        }
    };

    // 관심 목록에 있는 데이터를 제외하고 정렬된 데이터를 생성함.
    const sortedDatas = useMemo(() => {
        if (!datas || datas.length === 0) return [];
        return datas.filter((item) => !selectedDatas.some((selected) => selected.id === item.id));
    }, [datas, option, selectedDatas, checkedIdols]);

    // 데이터를 더 로드하는 함수
    const loadMoreDatas = useCallback(() => {
        if (isLoading || !cursor || !lastItemRef.current) return;

        const observerInstance = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMore(dataNum);

                    // loadMore 호출 후 관찰 중지
                    if (lastItemRef.current) {
                        observerInstance.unobserve(lastItemRef.current);
                    }
                }
            },
            { threshold: 0.25 },
        );

        if (lastItemRef.current) {
            observerInstance.observe(lastItemRef.current);
        }

        return () => {
            observerInstance.disconnect(); // 옵저버를 해제.
        };
    }, [isLoading, cursor, dataNum, option, loadMore]);

    useEffect(() => {
        loadMoreDatas();
    }, [datas]);


    // 더 이상 로드할 데이터가 없는지 판단하는 변수.
    const isDisabled = !cursor && (page + 1) * dataNum >= sortedDatas.length;

    return (
        <section id="ContentWrapper">
            (
                <>
                    <section id="ContentTitle">
                        <h2>관심 있는 아이돌을 추가해보세요.</h2>
                        <section id="ContentNav">
                        <Button id="toggle" onClick={handleChange}></Button>
                        </section>
                    </section>

                    <section id="CarouselPage">
                        <Button id="carousel" onClick={handlePrevPage} disabled={isLoading || page === 0}>
                            <img src={arrowIcon} alt="이전" />
                        </Button>
                        <section id="IdolList" ref={idolListRef}>
                            {sortedDatas.map((idol, index) => (
                                <IdolProfile
                                    key={idol.id}
                                    idol={idol}
                                    onCheck={handleCheck}
                                    checked={checkedIdols.some((checkedIdol) => checkedIdol.id === idol.id)}
                                    ref={index === sortedDatas.length - 1 ? lastItemRef : null}
                                />
                            ))}
                        </section>
                        <Button id="carousel" onClick={handleNextPage} disabled={isLoading || isDisabled}>
                            <RotatedIcon src={arrowIcon} alt="다음" />
                        </Button>
                    </section>

                    <Button onClick={handleAddClick} width="255" height="48" radius="24">
                        <ButtonInner>
                            <img src={plusIcon} alt="추가" />
                            <span>추가하기</span>
                        </ButtonInner>
                    </Button>
                </>
            )
        </section>
    );
};

export default AddInterestedIdols;

