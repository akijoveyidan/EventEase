import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap } from "azle";
import express from "express";
import { time } from "azle";

/**
 * ticketStorage - it's a key-value datastructure that is used to store event tickets.
 * {@link StableBTreeMap} is a self-balancing tree that acts as a durable data storage that keeps data across canister upgrades.
 * For the sake of this contract we've chosen {@link StableBTreeMap} as a storage for the next reasons:
 * - insert, get and remove operations have a constant time complexity - O(1)
 * - data stored in the map survives canister upgrades unlike using HashMap where data is stored in the heap and it's lost after the canister is upgraded
 */

/**
    This type represents an event ticket.
*/
class Ticket {
  id: string;
  eventName: string;
  price: number;
  buyer?: string;
  createdAt: Date;
}

const ticketStorage = StableBTreeMap<string, Ticket>(0);

const app = express();
app.use(express.json());

app.post("/tickets", (req, res) => {
  const ticket: Ticket = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    ...req.body,
  };
  ticketStorage.insert(ticket.id, ticket);
  res.json(ticket);
});

app.get("/tickets", (req, res) => {
  res.json(ticketStorage.values());
});

app.get("/tickets/:id", (req, res) => {
  const ticketId = req.params.id;
  const ticketOpt = ticketStorage.get(ticketId);
  if (!ticketOpt) {
    res.status(404).send(`Ticket with id=${ticketId} not found`);
  } else {
    res.json(ticketOpt);
  }
});

app.put("/tickets/:id", (req, res) => {
  const ticketId = req.params.id;
  const ticketOpt = ticketStorage.get(ticketId);
  if (!ticketOpt) {
    res
      .status(400)
      .send(`Couldn't update ticket with id=${ticketId}. Ticket not found`);
  } else {
    const ticket = ticketOpt;

    const updatedTicket = {
      ...ticket,
      ...req.body,
      createdAt: ticket.createdAt, // Keep original createdAt
    };
    ticketStorage.insert(ticket.id, updatedTicket);
    res.json(updatedTicket);
  }
});

app.delete("/tickets/:id", (req, res) => {
  const ticketId = req.params.id;
  const deletedTicket = ticketStorage.remove(ticketId);
  if (!deletedTicket) {
    res
      .status(400)
      .send(`Couldn't delete ticket with id=${ticketId}. Ticket not found`);
  } else {
    res.json(deletedTicket);
  }
});

app.listen();

function getCurrentDate() {
  const timestamp = new Number(time());
  return new Date(timestamp.valueOf() / 1000_000);
}
