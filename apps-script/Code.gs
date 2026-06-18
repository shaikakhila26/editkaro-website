function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.formType === "newsletter") {
      const sheet = getOrCreateSheet(ss, "Emails", ["Timestamp", "Email"]);
      sheet.appendRow([new Date(), data.email || ""]);
    } else if (data.formType === "contact") {
      const sheet = getOrCreateSheet(ss, "Contacts", [
        "Timestamp",
        "Name",
        "Email",
        "Phone",
        "Message",
      ]);
      sheet.appendRow([
        new Date(),
        data.name || "",
        data.email || "",
        data.phone || "",
        data.message || "",
      ]);
    } else {
      return jsonOutput({ result: "error", message: "Unknown formType" });
    }

    return jsonOutput({ result: "success" });
  } catch (err) {
    return jsonOutput({ result: "error", message: err.message });
  }
}

function doGet(e) {
  return jsonOutput({
    result: "ok",
    message: "EditKaro form endpoint is live.",
  });
}

function getOrCreateSheet(ss, name, headerRow) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headerRow);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
