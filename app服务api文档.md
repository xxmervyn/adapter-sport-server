# 游戏进入接口（Game Enter）

## 接口地址

```
GET https://${host}/games/enter
```
## host 说明
`host` 为接入方使用的游戏服务域名，例如：

fbsports.appplaygasdsd.org

## Query 参数

| 参数名             | 类型     | 必填 | 说明                   |
| --------------- | ------ | -- | ------------------------ |
| id              | string | 是  | 游戏ID，固定：200101         |
| lang            | string | 是  | 语言（小写：en / zh / pt）   |
| playerGameToken | string | 否  | 玩家Token，不传则为游客模式   |
| reqt            | string | 是  | 请求唯一标识                 |
| esign           | string | 是  | 请求签名                     |
| ui              | string | 否  | UI版本（h5 / pcOld / pcNew） |

---

## 使用说明

### 登录模式

当传入 `playerGameToken` 时，接口将以登录状态进入游戏。

```
https://${host}/games/enter?id=200101&lang=zh&playerGameToken=abc123&reqt=xxx&esign=xxx
```

---

### 游客模式

不传 `playerGameToken` 时，将以游客身份进入游戏。

```
https://${host}/games/enter?id=200101&lang=en&reqt=xxx&esign=xxx
```

---

### 登录模式并指定 UI 版本

```
h5     → 手机端（移动端版）  
pcOld  → PC经典版  
pcNew  → PC国际版  
```

示例：

```
https://${host}/games/enter?id=200101&playerGameToken&lang=zh&ui=h5&reqt=xxx&esign=xxx
```

---

## 说明

* `playerGameToken` 决定登录或游客模式
* `lang` 必须为小写，不合法值默认使用英语
* `ui` 可覆盖默认设备判断，若不传，系统将根据设备自动选择
* `reqt` 和 `esign` 必须传递以保证安全性

---
