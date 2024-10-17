import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

/**
 * 指定されたポートで待ち受けるHTTPサーバを介して、
 * 指定されたルートディレクトリのファイルを提供し、
 * ファイルのアップロードも可能にする。
 *
 * @param {string} rootDirectory - ファイルを提供するルートディレクトリ
 * @param {number} port - サーバが待ち受けるポート番号
 */
function serve(rootDirectory, port) {
  const server = new http.Server(); // 新しいHTTPサーバを作成する。
  server.listen(port); // 指定されたポートで待ち受ける。
  console.log("Listening on port", port);

  // リクエストが届いたら、この関数で処理を行う。
  server.on("request", (request, response) => {
    const endpoint = url.parse(request.url).pathname;

    // リクエストが「/test/mirror」の場合、リクエストをそのまま送り返す。
    if (endpoint === "/test/mirror") {
      response.setHeader("Content-Type", "text/plain;charset=UTF-8");
      response.writeHead(200); // 200 OK
      response.write(
        `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
      );
      const headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }
      response.write("\r\n");
      request.pipe(response); // リクエストの内容をそのままレスポンスとして返す
    }
    // PUTリクエストの場合、ファイルをアップロードする。
    else if (request.method === "PUT") {
      const filename = path.resolve(
        rootDirectory,
        endpoint.substring(1).replace(/\.\.\//g, "")
      );
      const directory = path.dirname(filename);

      // アップロード先のディレクトリが存在しない場合は作成する
      fs.mkdir(directory, { recursive: true }, (err) => {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end(`Error creating directory: ${err.message}`);
          return;
        }

        // アップロードされたファイルを書き込む
        const fileStream = fs.createWriteStream(filename);
        request.pipe(fileStream);

        fileStream.on("finish", () => {
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.end("File uploaded successfully");
        });

        fileStream.on("error", (err) => {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end(`Error uploading file: ${err.message}`);
        });
      });
    }
    // ローカルディレクトリからファイルを提供する。
    else {
      const filename = path.resolve(
        rootDirectory,
        endpoint.substring(1).replace(/\.\.\//g, "")
      );
      const type =
        {
          ".html": "text/html",
          ".htm": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".png": "image/png",
          ".txt": "text/plain",
        }[path.extname(filename)] || "application/octet-stream";

      const stream = fs.createReadStream(filename);

      stream.on("open", () => {
        response.setHeader("Content-Type", type);
        response.writeHead(200); // 200 OK
        stream.pipe(response); // ファイルの内容をレスポンスとして返す
      });

      stream.on("error", (err) => {
        response.setHeader("Content-Type", "text/plain; charset=UTF-8");
        response.writeHead(404); // 404 Not Found
        response.end(err.message);
      });
    }
  });
}

// コマンドラインから起動された場合は、serve()関数を呼び出す。
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
