# DevTinder❤️

A full-stack developer networking/matchmaking platform — "Tinder for developers." Built with the MERN stack, DevTinder lets developers create profiles, browse a feed of other devs, send/review connection requests, and build their network.

**Live:** [devtinder.quest](https://devtinder.quest) [currently instance is off]

---

## Features

- **Authentication** — Signup/Login/Logout with JWT (stored in HTTP-only cookies) and bcrypt password hashing
- **Profile Management** — Users can view and update their profile, with built-in checks that only allow safe, approved fields to be changed — blocking anyone from tampering with sensitive account data.
- **Connection Requests** — Send requests (`interested` / `ignored`) and review incoming ones (`accepted` / `rejected`)
- **Feed API** — Paginated feed that excludes already-connected/requested users using efficient Set-based filtering
- **Connections & Requests** — View accepted connections and pending incoming requests
- **Email Notifications** — Daily cron job (via `node-cron`) that emails users about new interested requests, powered by AWS SES
- **Security** — Password field exclusion (`select: false`), input validation with `validator`, schema-level enum validation, compound indexing on connection requests, and duplicate-request prevention

---

## Tech Stack

| Layer | Technology |
| Runtime | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT, bcrypt, cookie-parser |
| Validation | validator.js |
| Email | AWS SES (`@aws-sdk/client-ses`) |
| Scheduling | node-cron, date-fns |
| Deployment | AWS EC2, Nginx (reverse proxy), PM2, Cloudflare (SSL/CDN/DNS proxy), GoDaddy (domain) |

---

##  Project Structure

```
devtinder-backend/
├── config/
│   └── database.js          # MongoDB connection
├── middlewares/
│   └── auth.js               # JWT verification middleware
├── model/
│   ├── user.js                # User schema + JWT instance method
│   └── connectionRequest.js   # Connection request schema + pre-save hook
├── routes/
│   ├── auth.js                # Signup / Login / Logout
│   ├── profile.js             # Profile view / edit
│   ├── request.js             # Send / review connection requests
│   └── user.js                 # Feed, connections, received requests
├── utils/
│   ├── validation.js          # Signup & profile edit validators
│   ├── sendEmail.js           # SES email sender
│   ├── sesClient.js           # SES client config
│   └── cronJobs.js            # Daily notification cron job
└── app.js                      # Entry point
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/Login` | Log in and receive JWT cookie |
| POST | `/Logout` | Clear auth cookie |

### Profile
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/profile/view` | Get logged-in user's profile | 
| PATCH | `/profile/edit` | Edit allowed profile fields | 

### Connection Requests
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/request/send/:status/:toUserId` | Send a request (`interested`/`ignored`) |
| POST | `/request/review/:status/:requestId` | Review a request (`accepted`/`rejected`) |

### User
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/user/requests/received` | Get pending incoming requests |
| GET | `/user/connections` | Get all accepted connections | 
| GET | `/user/feed` | Paginated feed of discoverable users |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=7777
DB_CONNECTION_SECRET=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_REGION=your_aws_region
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET=your_aws_secret_key
```

---

##  Getting Started

```bash
# Clone the repo
git clone https://github.com/<your-username>/devtinder-backend.git
cd devtinder-backend

# Install dependencies
npm install

# Add your .env file (see above)

# Start the server
npm start
```

The server will run on `http://localhost:7777` (or your configured `PORT`).

---

##  Deployment

Deployed on **AWS EC2 (Ubuntu)** with:
- **Nginx** as a reverse proxy
- **PM2** for process management and auto-restart on reboot
- **Elastic IP** for a stable public address
- **Custom domain** (`devtinder.quest`) via GoDaddy
- **SSL/TLS** via  Cloudflare (SSL/CDN/DNS proxy)

---

##  Roadmap

-  OTP-based email verification 
-  Razorpay payment integration (premium membership)
-  Rate limiting & `mongo-sanitize` for NoSQL injection protection
-  live chat via websocket


---

## 📄 License

This project is licensed under the MIT License.
