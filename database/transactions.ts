import { baseData } from "./seed";
import { DataTypes, Sequelize, Op } from "sequelize";

let TransactionTable;
const filepath = ".data/transactions.db";

export const dbConnection = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: filepath,
  logging: true,
});

export const setupDb = async (): Promise<void> => {
  dbConnection.authenticate().then(async (err) => {
    console.log(`SQLite3 Connection has been established successfully.`);
  });

  TransactionTable = dbConnection.define("Transaction", {
    status: DataTypes.STRING,
    amountCents: DataTypes.NUMBER,
    merchantName: DataTypes.STRING,
    description: DataTypes.STRING,
    cardLast4Digits: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    direction: DataTypes.STRING,
  });

  await TransactionTable.sync();
  if (!(await TransactionTable.findOne())) {
    await setup();
  }
};

async function setup() {
  await TransactionTable.destroy({ where: {} });
  for (const transaction of baseData) {
    await TransactionTable.create(transaction);
  }
}

export type Transaction = {
  id?: string;
  status: string;
  amountCents: number;
  merchantName: string;
  description: string;
  cardLast4Digits: string;
  createdAt: string;
  updatedAt?: string;
  direction: string;
};

export const insertTransaction = async (transaction: Transaction) => {
  await TransactionTable.create(transaction);
};

export const searchTransactions = async ({
  minAmountCents,
  maxAmountCents,
  status,
  merchantName,
  cardLastFourDigits,
}: {
  minAmountCents?: number;
  maxAmountCents?: number;
  status?: "settled" | "pending";
  merchantName?: string;
  cardLastFourDigits?: string;
}) => {
  return await TransactionTable.findAll({
    where: {
      ...(status
        ? {
            status,
          }
        : null),
      ...(merchantName
        ? {
            merchantName,
          }
        : null),
      ...(cardLastFourDigits
        ? {
            cardLast4Digits: {
              [Op.substring]: cardLastFourDigits,
            },
          }
        : null),
      ...(minAmountCents && !maxAmountCents
        ? {
            amountCents: {
              [Op.gte]: minAmountCents,
            },
          }
        : null),
      ...(maxAmountCents && !minAmountCents
        ? {
            amountCents: {
              [Op.lte]: maxAmountCents,
            },
          }
        : null),
      ...(minAmountCents && maxAmountCents
        ? {
            amountCents: {
              [Op.between]: [minAmountCents - 1, maxAmountCents + 1],
            },
          }
        : null),
    },
  });
};

export const findTransactionById = async (id: string) => {
  return await TransactionTable.findByPk(id);
};
