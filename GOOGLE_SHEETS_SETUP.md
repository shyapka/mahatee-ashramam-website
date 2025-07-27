# 📊 Google Sheets Database Setup

## Step 1: Create Your Google Sheet

1. **Go to**: [sheets.google.com](https://sheets.google.com)
2. **Create new sheet** titled: "Mahatee Payment Confirmations"
3. **Set up columns** (Row 1 headers):

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Amount | Currency | Payment_Method | Location | Reference_ID | Message | Status |

## Step 2: Get Sheet ID
From your sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
Copy the **SHEET_ID_HERE** part

## Step 3: Make Sheet Public (Simple Method)
1. Click **Share** button
2. Click **"Anyone with the link"**  
3. Set to **"Editor"** (so we can add rows)
4. Copy the **Sheet ID** for the code

## Example Data:
```
2025-01-21 10:30 AM | John Doe | john@email.com | 3500 | INR | UPI Payment | india | TXN123 | Thank you! | New
2025-01-21 11:45 AM | Jane Smith | jane@email.com | 50 | USD | Wise | us | WS456 | Great work | New
```

This creates a simple database that you can:
- ✅ **View anytime** in Google Sheets
- ✅ **Filter/sort** donations
- ✅ **Export** as Excel/CSV  
- ✅ **Share** with team members
- ✅ **Create charts** and reports
