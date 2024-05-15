import globalConfig from "../constants/config";
import Order from "../models/order.models";
const mongoose = require("mongoose");
import Customer from "../models/customers.model";
import Staff from "../models/staffs.model";
const { faker } = require("@faker-js/faker");
const MONGO_CONNECT = globalConfig.MOBGODB_CONNECTION_STRING;
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
console.log(MONGO_CONNECT);

mongoose
  .connect(MONGO_CONNECT, mongooseDbOptions)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err: any) => console.error("Could not connect to MongoDB...", err));
async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(async (collection: any) => {
      await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
    })
  );
}
async function createData() {
  clearCollections();
  const now = new Date();

  const order = new Order({
    orderDate: now,
    shippedDate: new Date(),
    customerMobile: "0903462434",
    customerEmail: "hoa1234@gmail.com",
    paymentType: "COD",
    shippingAddress: "Quang Binh",
    orderStatus: "pending",
    createdAt: now,
  });
  order.save();
  console.log("create order");
  //create 10 customer
  for (let i = 1; i <= 10; i++) {
    const rPhone = faker.helpers.fromRegExp(/0[3|5|7|8|9][0-9]{8}/i);
    const fakeCustomer = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: rPhone,
      password: "HoangHoa0801@03",
      address: faker.location.streetAddress(false),
      yard: faker.location.street(),
      district: faker.location.state(),
      province: faker.location.city(),
    };
    console.log(rPhone);
    const customer = new Customer(fakeCustomer);
    await customer.save();
    console.log(`Create Customer ${i} successfully !`);
  }
  // create staff
  const staff = new Staff({
    firstName: "admin",
    lastName: "admin",
    email: "admin@gmail.com",
    password: "Admin@123456",
    role: "admin",
    isEmailVerified: true,
  });
  await staff.save();
  console.log(`Create Staff Admin successfully !`);
}
try {
  createData();
} catch (error) {
  console.log(error);
}
