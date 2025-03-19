import { forwardRef } from "react";
import deleteIcon from "../../../assets/icon/ic_delete.svg";
import checkIcon from "../../../assets/icon/ic_check.svg";
import styled from "styled-components";

const IdolProfile = forwardRef(({ idol, selected = false, onCheck = () => {}, checked, onDelete }, ref) => {
    // 체크표시를 하는 함수
    const handleCheckClick = () => {
        const newChecked = !checked;
        onCheck(idol, newChecked);
    };

    // 프로필을 삭제하는 함수
    const handleDeleteClick = () => onDelete(idol.id);

    return (
        <IdolCard selected={selected} onClick={handleCheckClick} ref={ref}>
            <IdolImgContainer selected={selected}>
                <IdolImg src={idol.profilePicture} selected={selected} />
                {checked && !selected && (
                    <Overlay>
                        <CheckIcon src={checkIcon} alt="체크 아이콘" />
                    </Overlay>
                )}
            </IdolImgContainer>
            <IdolName>{idol.name}</IdolName>
            <IdolGroup>{idol.group}</IdolGroup>
            {selected && <DeleteButton onClick={handleDeleteClick} src={deleteIcon} alt="삭제버튼" />}
        </IdolCard>
    );
});

export default IdolProfile;



// Overlay는 체크 상태일 때 표시되는 오버레이를 스타일링
const Overlay = styled.div`
    position: absolute;
    top: 6.52px;
    left: 6.52px;
    width: 115px;
    height: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    border-radius: 50%;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(271.36deg, #f96e68 -9.84%, #fe578f 107.18%);
        opacity: 0.5;
        z-index: -1;
        border-radius: 50%;
    }

    @media (max-width: 768px) {
        top: 5px;
        left: 5px;
        width: 88px;
        height: 88px;
    }
`;

