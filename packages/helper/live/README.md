LiveReload用のScriptです。

main.tsで
```
const server = new NaxtServer(import.meta.url.replace('/main.ts', '') + '/routes/', 8080);
```

となっている三番目の引数に入れます。

内部的には server.fire() 時に Token(Date.now())を設定。
ブラウザにはそのトークンを配信、ファイルが変更されれば再度fire()されるのでトークンが変わります。 それをクライアント側で確かめます。