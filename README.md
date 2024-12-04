# EventEase

EventEase is a Web3 platform designed for managing and purchasing event tickets, leveraging blockchain technology for transparent and secure transactions. Built on the Internet Computer platform, EventEase ensures that every ticket sale is recorded on the blockchain, offering full accountability. The platform allows users to create, list, purchase, and manage event tickets with ease. It provides an API built using Node.js and Express.js, and uses Azle for smart contract development to manage tickets and event details. With its decentralized nature, EventEase guarantees trust and transparency for event organizers and participants alike.

## Features
- Decentralized event ticketing system
- Transparent and auditable ticket transactions on blockchain
- Secure ticket purchasing and management
- Built with Node.js, Express.js, and Azle
- Data persistence with StableBTreeMap for ticket storage

## Installation

### Prerequisites
- Node.js (version 20 or later)
- DFX (Internet Computer SDK)

### Setup

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/eventease.git
    cd eventease
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the DFX project:
    ```bash
    dfx start
    ```

4. Deploy the canister:
    ```bash
    dfx deploy
    ```

5. Run the application locally:
    ```bash
    npm run dev
    ```

## API Endpoints

- **POST** `/tickets`: Create a new ticket
- **GET** `/tickets`: Retrieve all tickets
- **GET** `/tickets/:id`: Retrieve a specific ticket by ID
- **PUT** `/tickets/:id`: Update a ticket by ID
- **DELETE** `/tickets/:id`: Delete a ticket by ID

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
