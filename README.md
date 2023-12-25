# article-url-summarize-api

A restful api to extract article text from a url and summarize it using Google Gemini.

Example usage requests are noted below using several implementation methods.

```
curl --request GET \
  --url 'http://127.0.0.1:3100/?url=https%3A%2F%2Fwww.zerohedge.com%2Fpolitical%2Fvelvet-fascism-protect-our-democracy' \
  --header 'Content-Type: application/json'
```

```
import http.client

conn = http.client.HTTPConnection("127.0.0.1:3100")

headers = { 'Content-Type': "application/json" }

conn.request("GET", "/?url=https%3A%2F%2Fwww.zerohedge.com%2Fpolitical%2Fvelvet-fascism-protect-our-democracy", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
```

```
const url = 'http://127.0.0.1:3100/?url=https%3A%2F%2Fwww.zerohedge.com%2Fpolitical%2Fvelvet-fascism-protect-our-democracy';
const options = {method: 'GET', headers: {'Content-Type': 'application/json'}, body: undefined};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```
