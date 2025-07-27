# 🔧 Google Apps Script Setup for Donation Tracking

## Quick Fix for Column Population Issue

The current issue is that only timestamps are being recorded because the Google Form entry IDs don't match. Here's the **proper solution**:

## Step 1: Create Google Apps Script Web App

1. **Go to**: [script.google.com](https://script.google.com)
2. **Click**: "New Project"
3. **Replace** the default code with:

```javascript
function doPost(e) {
  // Get the spreadsheet by ID (replace with your sheet ID)
  const SHEET_ID = 'YOUR_SHEET_ID_HERE'
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet()
  
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents)
    
    // Add row with all the data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || 'Anonymous',
      data.email || '',
      data.amount || 0,
      data.currency || 'USD',
      data.payment_method || '',
      data.location || '',
      data.reference_id || '',
      data.message || '',
      data.status || 'New'
    ])
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (error) {
    console.error('Error:', error)
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
```

## Step 2: Deploy the Script

1. **Click**: "Deploy" > "New Deployment"
2. **Select Type**: "Web app"
3. **Set Execute as**: "Me" 
4. **Set Access**: "Anyone" (required for webhook)
5. **Click**: "Deploy"
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC.../exec`)

## Step 3: Update Your Environment

Add to your `.env.local` file:
```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 4: Replace Sheet ID

In the Apps Script code, replace `YOUR_SHEET_ID_HERE` with your actual Google Sheet ID from the URL:
`https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`

## ✅ Result

This will properly populate ALL columns:
- ✅ Timestamp 
- ✅ Name
- ✅ Email  
- ✅ Amount
- ✅ Currency
- ✅ Payment Method
- ✅ Location (US/India)
- ✅ Reference ID
- ✅ Message
- ✅ Status

## 🔄 Fallback Option

If you prefer not to use Apps Script, the updated code also falls back to **Formspree** with all fields properly structured, which will send you detailed emails with all the donation information.

---

**Next Steps**: After setting this up, test a donation and all columns should populate correctly!
