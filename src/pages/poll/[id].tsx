import React, { useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getPoll } from "../../utils/api/server";
import VoterPollInfo from "../../components/poll/VoterPollInfo";
import PollTableVoter from "../../components/poll/PollTableVoter";
import SubmitTimes from "../../components/poll/SubmitTimes";
import { TimeFromDB, Vote, PollFromDB } from "../../models/poll";
import { decrypt } from "../../helpers";

require("dayjs/locale/da");
dayjs.locale("da");
dayjs.extend(localizedFormat);

const Poll = (props: {
  pollFromDB: PollFromDB;
  pollID: string;
}): JSX.Element => {
  const { pollFromDB, pollID } = props;

  let pageSection = <></>;

  const sortedTimes: TimeFromDB[] = pollFromDB.times.sort(
    (a: TimeFromDB, b: TimeFromDB) => a.start - b.start
  );

  const [newVote, setNewVote] = useState<Vote>({
    name: "",
    times: [],
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setNewVote({ name: value, times: newVote.times });
  };

  if (typeof window !== "undefined") {
    let createdPollsFromLS = JSON.parse(
      localStorage.getItem("kukkeeCreatedPolls")
    );

    if (createdPollsFromLS && createdPollsFromLS.polls.length) {
      const lSKeyForPoll = `${pollID}-${
        pollFromDB.title ? pollFromDB.title : ""
      }`;

      for (let i = 0; i < createdPollsFromLS.polls.length; i += 1) {
        let poll = createdPollsFromLS.polls[i];

        if (
          Object.keys(poll)[0] === lSKeyForPoll &&
          poll[Object.keys(poll)[0]] === pollFromDB.secret
        ) {
          Router.push(`/poll/${pollID}/${decrypt(pollFromDB.secret)}`);
          return <></>;
        }
      }
    }

    let votedPollsFromLS = JSON.parse(localStorage.getItem("kukkeeVotedPolls"));

    if (votedPollsFromLS && votedPollsFromLS.polls.length) {
      for (let i = 0; i < votedPollsFromLS.polls.length; i += 1) {
        let poll = votedPollsFromLS.polls[i];

        if (Object.keys(poll)[0] === pollID && pollFromDB.open) {
          pageSection = (
            <>
              <div className="voter-page-final-container">
                <span className="voter-page-vote-recorded">
                  Dine fortrukne tider er blevet registreret.
                </span>
              </div>
            </>
          );
          break;
        } else if (pollFromDB.open) {
          pageSection = (
            <>
              <div className="voter-page-main-container">
                <PollTableVoter
                  pollFromDB={pollFromDB}
                  sortedTimes={sortedTimes}
                  newVote={newVote}
                  setNewVote={setNewVote}
                />
              </div>
              <div className="voter-page-final-container">
                <Form.Control
                  className="voter-page-poll-mark-time-name"
                  type="text"
                  maxLength={30}
                  placeholder="Dit navn"
                  onChange={handleNameChange}
                  autoFocus
                />
                <SubmitTimes
                  newVote={newVote}
                  pollID={pollID}
                  pollFromDB={pollFromDB}
                />
              </div>
            </>
          );
        }
      }
    } else if (pollFromDB.open) {
      pageSection = (
        <>
          <div className="voter-page-main-container">
            <PollTableVoter
              pollFromDB={pollFromDB}
              sortedTimes={sortedTimes}
              newVote={newVote}
              setNewVote={setNewVote}
            />
          </div>
          <div className="voter-page-final-container">
            <Form.Control
              className="voter-page-poll-mark-time-name"
              type="text"
              maxLength={30}
              placeholder="Dit navn"
              onChange={handleNameChange}
              autoFocus
            />
            <SubmitTimes
              newVote={newVote}
              pollID={pollID}
              pollFromDB={pollFromDB}
            />
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Markér din tilgængelighed</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="global-flex-wrapper">
        <main className="voter-page-main">
          <div
            className={`voter-page-info-container ${
              pollFromDB.open ? "" : "closed"
            }`}
          >
            <VoterPollInfo poll={pollFromDB} showFinalTime={!pollFromDB.open} />
          </div>
          {pageSection}
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let pollID = null;
  if (context.params) {
    pollID = context.params.id;
  }
  const getPollResponse = await getPoll(pollID);
  const pollFromDB = getPollResponse.data;

  if (getPollResponse.statusCode === 404) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { pollFromDB, pollID }, // will be passed to the page component as props
  };
};

export default Poll;
