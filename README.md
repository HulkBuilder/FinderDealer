# Dealer Lookup Project

## Overview
This project is a **Dealer Lookup** system using **AWS CDK (TypeScript) for infrastructure** and **Amplify Gen2 (React) for the frontend**. It allows users to search for dealers from a CSV file stored in **S3**, processed by **Lambda**, and stored in **DynamoDB**.

## Project Structure
```
/dealer-lookup-repo
│── backend/                # AWS CDK backend infrastructure (TypeScript) + Lambda (Python)
│   ├── bin/                # CDK entry point
│   ├── lib/                # Defines AWS resources (S3, DynamoDB, Lambda, API Gateway)
│   ├── lambda/             # Python Lambda function
│   ├── cdk.json            # AWS CDK config
│   ├── package.json        # Node.js dependencies
│   ├── tsconfig.json       # TypeScript config
│── frontend/               # React + Amplify Gen2
│   ├── src/                # Frontend components
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page views
│   │   ├── App.js          # Main React file
│   ├── public/             # Static assets
│   ├── amplifyconfiguration.json  # Amplify Gen2 settings
│   ├── package.json        # React dependencies
│── README.md               # Project setup guide
```

---

## 🚀 Deployment Steps

### 1️⃣ **Upload to GitHub**
Upload both `backend/` and `frontend/` folders to your GitHub repository.

### 2️⃣ **Deploy the Backend (AWS CDK)**
- Navigate to the backend folder:
  ```sh
  cd backend
  npm install
  cdk bootstrap
  cdk deploy
  ```
- This will create:
  - **S3 bucket** for `dealers.csv`
  - **DynamoDB table** for storing dealer data
  - **Lambda function** for processing CSV
  - **API Gateway** for manual data refresh

### 3️⃣ **Deploy the Frontend (Amplify Gen2)**
- Go to **AWS Amplify Console** → **Create App** → **Connect to GitHub**.
- Select your repository and **deploy the frontend from `frontend/`**.

### 4️⃣ **Test the Application**
- Upload `dealers.csv` to the S3 bucket (`amplify-dealers-search`).
- Visit the deployed frontend and search for dealers.
- Click "Refresh Dealers Data" to manually trigger an update.

---

## 🛠 Technologies Used
- **AWS CDK (TypeScript)**: Infrastructure as Code (S3, Lambda, DynamoDB, API Gateway)
- **AWS Lambda (Python)**: Serverless function to process CSV
- **AWS DynamoDB**: NoSQL database for dealer data
- **AWS S3**: Stores `dealers.csv`
- **AWS API Gateway**: Allows frontend to trigger updates
- **React + Amplify Gen2**: Frontend for searching dealer data

---

## 📌 Notes
- **Amplify Gen2 automatically detects the `frontend/` folder**, making deployment easier.
- The backend **must be deployed first**, as the frontend depends on API Gateway.
- You can extend the project by adding **authentication with Cognito** or **additional API routes**.

---

## ❓ Need Help?
If you run into issues, check the **AWS Amplify Docs**, **AWS CDK Docs**, or reach out for assistance!
