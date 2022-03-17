import React from "react";
import CustomCheckbox from "../../input/custom-checkbox/custom-checkbox";
import IWeekdayCheckboxList from "./IWeekdayCheckboxList";
export function WeekdayCheckboxList({
  readOnly,
  mon, setMon,
  tue, setTue,
  wed, setWed,
  thu, setThu,
  fri, setFri,
  sat, setSat,
  sun, setSun
}: IWeekdayCheckboxList) {
  return <>
    <CustomCheckbox inputId="monday" labelText="Mon" isChecked={mon} onChange={() => setMon(!mon)} readOnly={readOnly} />
    <CustomCheckbox inputId="tuesday" labelText="Tue" isChecked={tue} onChange={() => setTue(!tue)} readOnly={readOnly} />
    <CustomCheckbox inputId="wednesday" labelText="Wed" isChecked={wed} onChange={() => setWed(!wed)} readOnly={readOnly} />
    <CustomCheckbox inputId="thursday" labelText="Thu" isChecked={thu} onChange={() => setThu(!thu)} readOnly={readOnly} />
    <CustomCheckbox inputId="friday" labelText="Fri" isChecked={fri} onChange={() => setFri(!fri)} readOnly={readOnly} />
    <CustomCheckbox inputId="saturday" labelText="Sat" isChecked={sat} onChange={() => setSat(!sat)} readOnly={readOnly} />
    <CustomCheckbox inputId="sunday" labelText="Sun" isChecked={sun} onChange={() => setSun(!sun)} readOnly={readOnly} />
  </>;
}
