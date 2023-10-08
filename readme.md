# Jsonify

## Problem

We are trying to build a single source API hub that can be used to learn api handling in any programming language. Users can build their multiple web apps and test this using this api hub.

**Open Source:** Jsonify is an open-source API, which means its source code is freely available for inspection, modification, and collaboration. This open nature promotes transparency and community-driven development.

**Mock Data Generation:** Jsonify specializes in generating mock data. It offers a convenient way for developers to create simulated data that mimics real-world scenarios, making it invaluable for testing and development purposes.

**Project Building:** Developers can utilize Jsonify to build projects effectively. The ability to generate custom mock data allows for seamless integration into web applications, websites, or any software project where realistic data is needed.

**Teaching and Learning:** Jsonify serves as an educational tool. It can be used to teach data generation and manipulation techniques, making it a valuable resource for both students and educators looking to explore real-world data scenarios in a controlled environment.

**Expanding Data Collection:** Jsonify boasts a growing collection of mock data sets. With data covering various domains, including restaurants, developers, and more on the horizon, Jsonify ensures a diverse and expanding range of data to suit different project needs.

**Documentation:** The Jsonify API offers comprehensive documentation available at Jsonify API Documentation https://jsonify-docs.vercel.app . This resource likely provides detailed information on how to use the API effectively, further enhancing its usability for developers and project builders.

# 🏁 Installation

### 📦 Using Docker (recommended)

To run the Jsonify API project, follow these steps:

1. Install [Docker](https://www.docker.com/) on your machine.
2. Clone the project repository.
3. Navigate to the project directory.
4. Create `.env` file in the root folder and copy paste the content of `.env.sample`, and add necessary credentials.
5. Run the Docker Compose command:

```bash
docker-compose up --build --attach jsonify

# --build: Rebuild the image and run the containers
# --attach: only show logs of Node app container and not mongodb
```

### 💻 Running locally

To run the Jsonify project locally, follow these steps:

1. Install [NodeJs](https://www.nodejs.org/),[Redis](https://redis.io/),[MongoDB](https://www.mongodb.com) and [MongoDB Compass (optional)](https://www.mongodb.com/products/compass) on your machine.
2. Clone the project repository.
3. Navigate to the project directory.
4. Create `.env` file in the root folder and copy paste the content of `.env.sample`, and add necessary credentials.
5. Install the packages:

```bash
npm install
```

6. Run the project:

```bash
npm run dev
```

🙏 Thank You!

We want to express our gratitude to all the contributors and users of Jsonify. Your support and involvement in this open-source project make it what it is today. Jsonify wouldn't be possible without the community's collaboration and feedback.

If you have any questions, feedback, or would like to contribute, please don't hesitate to reach out. Together, we can continue to improve and expand Jsonify for the benefit of developers and learners worldwide.

Happy coding!
