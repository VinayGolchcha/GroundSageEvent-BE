import { setupDatabase } from './config/db.js';
await setupDatabase();
import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import profileRoutes from './v1/profile/routes/routes.js'
import teamRoutes from './v1/team/routes/routes.js'
import eventRoutes from './v1/event/routes/routes.js'
import roleRoutes from './v1/roles/routes/routes.js'
import shopRoutes from './v1/shop/routes/routes.js'
import transactionRoutes from './v1/transactions/routes/routes.js'
import rentalAgreementRoutes from './v1/rental agreement/routes/routes.js';
const app = express();
config();
app.use(json());
app.use(cors());
// Disable the X-Powered-By header
app.disable('x-powered-by');
// Import & Define API versions
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/team', teamRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1/role', roleRoutes);
app.use('/api/v1/shop', shopRoutes);
app.use('/api/v1/transaction', transactionRoutes);
app.use('/api/v1/rentalagreement',rentalAgreementRoutes);


app.use('/', (req, res) => {
  res.send("Hey, I'm online now!!")
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
