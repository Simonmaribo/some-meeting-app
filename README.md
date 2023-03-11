<div align="center">
  <a href="https://www.kukkee.com/">
    <img
      src="./public/favicon.svg"
      alt="Kukkee Logo"
      height="64"
    />
  </a>
  <p>
    <b>
      Kukkee — free and open source meeting poll tool
    </b>
  </p>
  <p>

[![License](https://img.shields.io/github/license/Kukkee/Kukkee?color=%23000000&style=for-the-badge)](https://github.com/Kukkee/Kukkee/blob/main/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/Kukkee/Kukkee?color=%23000000&&style=for-the-badge)](https://github.com/Kukkee/Kukkee/graphs/contributors)
[![Create a poll](https://shields.io/badge/style-Now-black?&style=for-the-badge&label=Create%20a%20poll)](https://kukkee.com/)

  </p>
  <br/>
</div>

Kukkee is a fast, free and open source meeting poll tool. Quickly create a meeting poll by choosing the time slots based on your availability. Copy and share the poll link with the participants to let them mark their availability. Find the most popular times and see who's free with "yes" votes - or who can be - with "if need be" votes, and book the meeting! Create a poll now at [Kukkee.com](https://kukkee.com/)!


## Self-hosting

### Deployment

Kukkee is built with Next.js, hence you would need to deploy Kukkee to a platform that supports Next.js (Vercel, AWS EC2, DigitalOcean Droplet, etc).

#### Vercel

In case you don't have a platform already, you can get started with Vercel for free.

1. Fork this repo to your own GitHub account and then clone it.
2. Go to https://vercel.com/dashboard
3. Create a new project
4. Import your forked git repository
5. Set the environment variables (according to the instructions in .env.example)
6. Deploy

### Database

Kukkee uses MongoDB, hence you would need a MongoDB server hosted somewhere.

#### MongoDB Atlas

In case you don't have a hosted MongoDB server, you can [get started with MongoDB Atlas](https://www.mongodb.com/basics/mongodb-atlas-tutorial) for free. If you're planning to use Vercel to deploy your own Kukkee, you must add all IP addresses (0.0.0.0/0) to the IP access list of your Atlas cluster since it is not possible to determine the IP addresses of Vercel deployments.

## License

Kukkee is distributed under the [MIT License](https://github.com/AnandBaburajan/Kukkee/blob/main/LICENSE). 