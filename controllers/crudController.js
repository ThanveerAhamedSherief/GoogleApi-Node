const {
    google
} = require('googleapis');
let auth = new google.auth.GoogleAuth({
    keyFile: 'keen-apogee-365414-03ad329eb5e4.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
});
let spreadsheetId = process.env.SPREAD_SHEER_ID;

let getAllData = async (req, res) => {
    try {
        let data = await getClient();
        let finalSet = {};
        if(data != undefined) {
            data.forEach(i => {
                finalSet[i[0]] = i[1];
            })
            res.send(finalSet)
        } else {
            res.send('No records found, Please enter the data')
        }
       
    } catch (error) {
        console.log("Error from the get method", error);
    }
}
let addData = async (req, res) => {
    try {
        let {
            key,
            value
        } = req.body;
        console.log(key, value)
        const client = await auth.getClient();
        const googleSheet = google.sheets({
            version: 'v4',
            auth: client
        });
        await googleSheet.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!A:B",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [key, value]
                ],
            },
        });
        res.send('Data added successfully')
    } catch (error) {
        console.log('Error while adding the data', error);
    }
}
let updateData = async (req, res) => {
    try {
        let data = req.body;
        let {
            rangeFrom,
            rangeTo
        } = data[0];
        let {
            key,
            value
        } = data[1];
        const client = await auth.getClient();
        const googleSheet = google.sheets({
            version: 'v4',
            auth: client
        });
        await googleSheet.spreadsheets.values.update({
            auth,
            spreadsheetId,
            valueInputOption: 'USER_ENTERED',
            range: `Sheet1!${rangeFrom}:${rangeTo}`,
            resource: {
                values: [
                    [key, value]
                ]
            }
        });
        res.send('Record updated successfully');
    } catch (error) {
        console.log("Error while updating", error);
    }
}
let deleteData = async (req, res) => {
    try {
        let {
            rangeFrom,
            rangeTo
        } = req.body;
        const client = await auth.getClient();
        const googleSheet = google.sheets({
            version: 'v4',
            auth: client
        });
        await googleSheet.spreadsheets.values.clear({
            auth,
            spreadsheetId,
            range: `Sheet1!${rangeFrom}:${rangeTo}`
        });
        res.send('Deleted successfully..!');
    } catch (error) {
        console.log('Error while deleting the data', error);
    }
}
let getClient = async () => {
    const client = await auth.getClient();
    const googleSheet = google.sheets({
        version: 'v4',
        auth: client
    });
    const getMetaData = await googleSheet.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A2:B"
    });
    return getMetaData.data.values
}


module.exports = {
    getAllData,
    addData,
    updateData,
    deleteData
}