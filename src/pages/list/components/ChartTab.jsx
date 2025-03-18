import Button from "../../../components/button/Button";

export default function ChartTab({ selectedTab, setSelectedTab, setCursor }) {
  const tabs = [
    { key: "female", label: "이달의 여자 아이돌" },
    { key: "male", label: "이달의 남자 아이돌" },
  ];

  return (
    <div className="display-grid direction-column">
      {tabs.map(({ key, label }) => (
        <Button
          key={key}
          size="free"
          btnStyle={selectedTab === key ? "outlined-bottom" : "invert"}
          onClick={() => {
            setSelectedTab(key);
            setCursor([0]);
          }}
          className="text-regular line-height-18 letter-spacing-small"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
