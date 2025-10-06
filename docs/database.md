# Database Setup & Access

This document explains how to connect to the local PostgreSQL database used in this project and basic Prisma setup.

---

## **1️⃣ PostgreSQL Connection**

### **Connect as Superuser (postgres)**

psql -h localhost -p 5435 -U postgres -d portfolio

Host: localhost

Port: 5435

User: postgres

Database: portfolio

### **Connect as normal user (me) (postgres)**

psql -h localhost -p 5435 -U me -d portfolio

Host: localhost

Port: 5435

User: me

Database: portfolio

## **2️⃣ PostgreSQL Notes**

Make sure the PostgreSQL bin folder is added to your PATH to use psql from any terminal.

Use \dt to list all tables and \d <table_name> to describe a table.

The port 5435 is used in this setup; if you chose a different port, replace it in the commands above.

## **3️⃣ Prisma Setup**

### **.env Configuration**

Create a .env file in /api with the database connection URL:
DATABASE_URL="postgresql://me:YOUR_PASSWORD@localhost:5435/portfolio?schema=public"

### **Migrate Database**

To create the database schema from Prisma:
npx prisma migrate dev --name init

### **Seed Database**

To insert initial sample data:
npx ts-node prisma/seed.ts

## **4️⃣ Additional Commands**

List tables: \dt

Describe table: \d table_name

Exit psql: \q
