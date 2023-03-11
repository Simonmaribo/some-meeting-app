import { Badge } from "react-bootstrap";
import { CalendarCheck, GeoAltFill, Globe } from "react-bootstrap-icons";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import { PollFromDB } from "../../models/poll";

require("dayjs/locale/da");
dayjs.locale("da");
dayjs.extend(localizedFormat);
dayjs.extend(timezone);

const PollInfo = (props: {
  poll: PollFromDB;
  showFinalTime: boolean;
}): JSX.Element => {
  const { poll, showFinalTime } = props;
  return (
    <div>
      <Badge
        pill
        variant={poll.open ? "success" : "secondary"}
        className={
          poll.open
            ? "voter-page-poll-badge-open"
            : "voter-page-poll-badge-closed"
        }
      >
        {poll.open ? "Åben" : "Afsluttet"}
      </Badge>
      {poll.title && (
        <span className="voter-page-poll-info-title">{poll.title}</span>
      )}
      {!poll.title && (
        <span className="voter-page-poll-info-title">Ingen titel</span>
      )}
      {poll.description && (
        <span className="voter-page-poll-info-desc">{poll.description}</span>
      )}
      {poll.location && (
        <span className="voter-page-poll-info-detail-title">
          <GeoAltFill className="voter-page-poll-info-icon" />
          {poll.location}
        </span>
      )}
      {showFinalTime && (
        <span className="voter-page-poll-info-detail-title">
          <CalendarCheck className="voter-page-poll-info-icon" />
          {dayjs(poll.finalTime?.start).format("ddd")},{" "}
          {dayjs(poll.finalTime?.start).format("MMM")}{" "}
          {dayjs(poll.finalTime?.start).format("DD")},{" "}
          {dayjs(poll.finalTime?.start).format("LT")} -{" "}
          {dayjs(poll.finalTime?.end).format("LT")}
        </span>
      )}
    </div>
  );
};

export default PollInfo;
