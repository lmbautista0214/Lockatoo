import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, setSeconds } from "date-fns";

export const BookingDates = ({
  label,
  name, 
  selected,
  onChange,
  error,
  minDate,
  minTime,
  maxTime
}) => {
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div className="">
      <label>{label}</label>
      <DatePicker
        name={name}
        selected={selected}
        onChange={onChange}
        placeholderText="Select date and time"
        showTimeSelect
        timeIntervals={60}
        dateFormat="MMMM d, yyyy h:mm aa"
        timeFormat="HH:mm"
        required
        portalId='react-datepicker-portal'
        minDate={minDate}
        minTime={minTime}
        maxTime={maxTime}
        filterTime={filterPassedTime}
        className="ml-2 form-input"
      //   popperModifiers={[
      //   {
      //     name: "offset",
      //     options: {
      //       offset: [0, 10], // [horizontal, vertical] - Adds 10px spacing
      //     },
      //   },
      // ]}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};