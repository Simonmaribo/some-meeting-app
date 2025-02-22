import { NextApiRequest, NextApiResponse } from "next";
import KukkeePoll, { PollDoc } from "../../../../models/poll";
import connectToDatabase from "../../../../utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id, secret },
    method,
    body,
  } = req;

  switch (method) {
    case "PUT":
      try {
        await connectToDatabase();
        const poll: PollDoc | null = await KukkeePoll.findOne({
          _id: id,
        }).lean();
        if (poll) {
          if (poll.secret !== secret) {
            res.status(403).json({ message: "Forbidden" });
          } else {
            try {
              const updatedPoll: PollDoc | null = await KukkeePoll.findOneAndUpdate(
                { _id: id },
                JSON.parse(body),
                { new: true }
              );
              res.status(201).json(updatedPoll);
            } catch (err) {
              res.status(400).json({ message: err.message });
            }
          }
        } else {
          res.status(404).json({ message: "Poll not found" });
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      break;
    case "DELETE":
      try {
        await connectToDatabase();
        const poll: PollDoc | null = await KukkeePoll.findOne({
          _id: id,
        }).lean();
        if (poll) {
          if (poll.secret !== secret) {
            res.status(403).json({ message: "Forbidden" });
          } else {
            try {
              const deletedPoll = await KukkeePoll.findByIdAndRemove(id);
              res.status(200).json(deletedPoll);
            } catch (err) {
              res.status(400).json({ message: err.message });
            }
          }
        } else {
          res.status(404).json({ message: "Poll not found" });
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
