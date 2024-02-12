foo === void 0の理由
: undefinedは上書き可能であり、undefinedが常にundefinedの値を返す保証がなかった
　それに対しvoid 0は常にundefinedを返した
今は使われない理由
: undefinedが設定不可・書き込み不可のプロパティとなり、上書きすることが不可能になったため