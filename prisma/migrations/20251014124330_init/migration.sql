-- CreateTable
CREATE TABLE "Account" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT,
    "provider" TEXT,
    "providerAccountId" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" TEXT,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT,
    "deliveryStatus" TEXT,
    "products" JSONB NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderObj" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "user" JSONB NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT,
    "status" TEXT,
    "deliveryStatus" TEXT,
    "products" JSONB NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderObj_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "brand" TEXT,
    "category" TEXT,
    "inStock" BOOLEAN,
    "images" TEXT[],
    "reviews" JSONB NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "emailVerified" TEXT,
    "password" TEXT,
    "image" TEXT,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "accounts" JSONB,
    "orders" JSONB,
    "reviews" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "comment" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" JSONB NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
