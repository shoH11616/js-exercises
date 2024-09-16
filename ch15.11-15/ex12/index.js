// index.js

document.getElementById("uploadButton").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const accessToken = document.getElementById("accessToken").value;
  const statusDiv = document.getElementById("status");

  if (!fileInput.files.length) {
    statusDiv.textContent = "Please select a file to upload.";
    return;
  }

  if (!accessToken) {
    statusDiv.textContent = "Please enter an access token.";
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name;

  try {
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`;

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type,
      },
      body: file,
    });

    if (response.ok) {
      statusDiv.textContent = "File uploaded successfully!";
    } else {
      const errorData = await response.json();
      statusDiv.textContent = `Error: ${errorData.error.message}`;
    }
  } catch (error) {
    statusDiv.textContent = `Error: ${error.message}`;
  }
});
