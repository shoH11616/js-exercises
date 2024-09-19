// index.js

// アップロードボタンのクリックイベントリスナーを追加
document.getElementById("uploadButton").addEventListener("click", async () => {
  // ファイル入力とアクセストークンの要素を取得
  const fileInput = document.getElementById("fileInput");
  const accessToken = document.getElementById("accessToken").value;
  const statusDiv = document.getElementById("status");

  // ファイルが選択されていない場合のエラーメッセージ
  if (!fileInput.files.length) {
    statusDiv.textContent = "Please select a file to upload.";
    return;
  }

  // アクセストークンが入力されていない場合のエラーメッセージ
  if (!accessToken) {
    statusDiv.textContent = "Please enter an access token.";
    return;
  }

  // 選択されたファイルとその名前を取得
  const file = fileInput.files[0];
  const fileName = file.name;

  try {
    // アップロードURLを構築
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`;

    // ファイルをアップロードするためのリクエストを送信
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": file.type,
      },
      body: file,
    });

    // アップロードが成功した場合のメッセージ
    if (response.ok) {
      statusDiv.textContent = "File uploaded successfully!";
    } else {
      // エラーメッセージを取得して表示
      const errorData = await response.json();
      statusDiv.textContent = `Error: ${errorData.error.message}`;
    }
  } catch (error) {
    // 例外が発生した場合のエラーメッセージ
    statusDiv.textContent = `Error: ${error.message}`;
  }
});

/**
 * アップロードボタンのクリックイベントリスナー
 * ファイルが選択されているか、アクセストークンが入力されているかを確認し、
 * Microsoft Graph APIを使用してファイルをアップロードする
 */
