import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
export default function TributeContainer() {
  return (
    <div className="my-50">
      <div className="display-grid justify-stretch my-100 text-24">
        후원을 기다리는 조공
      </div>
      <div className="display-flex">
        <Button size="extra-small" className="invert">
          <div>
            <Icon iconNm="chevron" />
          </div>
        </Button>
        <Button size="extra-small" className="invert mx-50">
          <div>
            <Icon iconNm="chevron" className="icon-rotate-180" />
          </div>
        </Button>
      </div>
    </div>
  );
}
