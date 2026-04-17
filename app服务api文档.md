### 体育API域名

黑豹体育不需要区分地区域名，全部使用 api.bpapiglobal.com 请求。

### 登录模式

当使用API获取游戏登陆链接成功后，可以得到如下链接:  
https://${host}/games/enter?id=200101&lang=zh&playerGameToken=abc123&reqt=xxx&esign=xxx

### HB SPORT 场次gameField （胜率）定义，字段类型为整数，目前HB Sport生效

| **GameFeild** | 说明 |
| --- | --- |
| 20001 | A级别：不进行赔率调整 |
| 20002 | B级别：浮动范围 ±0.01（总幅度 0.02，默认等级） |
| 20003 | C级别：浮动范围 ±0.02（总幅度 0.04） |
| 20004 | D级别：浮动范围 ±0.03（总幅度 0.06） |
| 20005 | E级别：浮动范围 ±0.05（总幅度 0.10） |
| 20006 | F级别：浮动范围 ±0.10（总幅度 0.20） |
| 20007 | G级别：浮动范围 ±0.15（总幅度 0.30） |

## Query 参数

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 游戏ID，固定：200101 |
| lang | string | 是 | 语言（小写：en / zh / pt） |
| playerGameToken | string | 否 | 玩家Token，不传则为游客模式 |
| reqt | string | 是 | 请求唯一标识 |
| esign | string | 是 | 请求签名 |
| ui | string | 否 | UI版本（h5 / pcOld / pcNew） |

---

### 游客模式

不传 playerGameToken 时，将以游客身份进入游戏。  
https://${host}/games/enter?id=200101&lang=en&reqt=xxx&esign=xxx

### 登录模式并指定 UI 版本

h5 → 手机端（移动端版）  
pcOld → PC经典版  
pcNew → PC国际版

示例：  
https://${host}/games/enter?id=200101&playerGameToken&lang=zh&ui=h5&reqt=xxx&esign=xxx

## 说明

playerGameToken 决定登录或游客模式  
lang 必须为小写，不合法值默认使用英语  
ui 可覆盖默认设备判断，若不传，系统将根据设备自动选择  
reqt 和 esign 必须传递以保证安全性

# 结算流程

## 系统钱包/单一钱包

系统钱包对接的模式下不需要调整，保持正常的回调。  
**rt 字段说明：**rt=0,正常结算；rt=10，说明这次得分是订单退款或者订单取消返回的现金。

**rde 字段说明：** 回调参数的 rde，说明这一次余额变动的类型，具体说明如下。  
| 类型 | 说明 |  
| -- | -- |  
| BET | 押注 |  
| WIN | 派彩 |  
| REFUND | 退款 |  
| CASHOUT | 提前结算 |  
| CANCEL_DEDUCT | 订单取消补扣 |  
| CANCEL_RETURN | 订单取消返还 |  
| SETTLEMENT_ROLLBACK_DEDUCT | 结算回滚补扣 |  
| SETTLEMENT_ROLLBACK_RETURN | 结算回滚返還 |  
| CASHOUT_CANCEL_DEDUCT | 提前结算订单取消补扣 |  
| CASHOUT_CANCEL_RETURN | 提前结算订单取消返还 |  
| CASHOUT_CANCEL_ROLLBACK_DEDUCT | 提前结算取消回滚补扣 |  
| CASHOUT_CANCEL_ROLLBACK_RETURN | 提前结算取消回滚返还 |

## 转账钱包

**黑豹体育在转账钱包模式也需要在后台填写回调地址**，如果扣款遇到转账钱包余额不足，系统会通过回调地址通知第三方进行转入，需要转入的余额为 co 字段。

测试方式，操作转账钱包转出余额后，再次进行投注即可触发转账钱包的回调通知。

# 订单详情解析（Order Analyze）

## 接口地址

GET https://${host}/analyze/order/index.html#content=xxx

---

## host 说明

host 为页面访问域名，例如：  
hbsports.southasiabp.biz

---

## 参数

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| content | string | 是 | 订单数据（Base64 编码后的 JSON 字符串） |

## 示例

### 基础使用

将订单数据通过 `#content` 传入页面：  
https://${host}/analyze/order/index.html#content=xxx

---

### content 生成方式

数据需按以下步骤处理：  
JSON → Base64 →（可选）URL 编码

示例：

```js
const data = [/* 订单数据 */]
const json = JSON.stringify(data)
const base64 = btoa(unescape(encodeURIComponent(json)))
const content = encodeURIComponent(base64)
```

示例订单数据：

```json
[{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"3.82","betScore":"S: 1-0","extraInfo":"","id":"1692783442032329535","isInplay":true,"leaguePhase":0,"marketId":"9650507","marketName":"独赢","marketType":1005,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"3.82","oddsFormat":1,"optionName":"Sassuolo Calcio","optionType":1,"orderId":"1692783442032329279","period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774873929612","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692783442032329279","ip":"172.71.211.53","itemCount":1,"liabilityStake":"20","loseAmount":"76.4","maxStake":"770000","maxWinAmount":"56.4","modifyTime":"1774873930192","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"76.4","settleTime":"1775009152845","stakeAmount":"20","tranType":1,"unitStake":"20","userId":"2885951","userName":"test_123321113","validSettleAmount":"76.4","validSettleStakeAmount":"20","version":5,"walletType":2}]
```

最终生成 URL：  
[https://hbsports.southasiabp.biz/analyze/order/index.html#content=W3siYWxsVXAiOjEsImFsbFVwQWxpdmUiOjAsImJldExpc3QiOlt7ImJldE9kZHMiOiIzLjgyIiwiYmV0U2NvcmUiOiJTOiAxLTAiLCJleHRyYUluZm8iOiIiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjk1MzUiLCJpc0lucGxheSI6dHJ1ZSwibGVhZ3VlUGhhc2UiOjAsIm1hcmtldElkIjoiOTY1MDUwNyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQxMDIxNyIsIm1hdGNoTmFtZSI6IlNhc3N1b2xvIENhbGNpbyB2cyBKdXZlbnR1cyBUdXJpbiIsIm1hdGNoVGltZSI6IjE3Njc5ODc5MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIzLjgyIiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6IlNhc3N1b2xvIENhbGNpbyIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkyNzgzNDQyMDMyMzI5Mjc5IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4NzM5Mjk2MTIiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjkyNzkiLCJpcCI6IjE3Mi43MS4yMTEuNTMiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiMjAiLCJsb3NlQW1vdW50IjoiNzYuNCIsIm1heFN0YWtlIjoiNzcwMDAwIiwibWF4V2luQW1vdW50IjoiNTYuNCIsIm1vZGlmeVRpbWUiOiIxNzc0ODczOTMwMTkyIiwib2Rkc0NoYW5nZSI6MSwib3BlcmF0b3JJRCI6MjU0MzY1Miwib3JkZXJTdGF0dXMiOjUsInBheVN0YXR1cyI6NCwicGxheWVySWQiOjI3NzQ4NzM5MDgyNTg2NjA0MDAsInJvbGxCYWNrQ291bnQiOjAsInNlcmllc1R5cGUiOjAsInNlcmllc1ZhbHVlIjoxLCJzZXR0bGVBbW91bnQiOiI3Ni40Iiwic2V0dGxlVGltZSI6IjE3NzUwMDkxNTI4NDUiLCJzdGFrZUFtb3VudCI6IjIwIiwidHJhblR5cGUiOjEsInVuaXRTdGFrZSI6IjIwIiwidXNlcklkIjoiMjg4NTk1MSIsInVzZXJOYW1lIjoidGVzdF8xMjMzMjExMTMiLCJ2YWxpZFNldHRsZUFtb3VudCI6Ijc2LjQiLCJ2YWxpZFNldHRsZVN0YWtlQW1vdW50IjoiMjAiLCJ2ZXJzaW9uIjo1LCJ3YWxsZXRUeXBlIjoyfV0=](https://fbsports.southasiabp.biz/analyze/order/index.html#content=W3siYWxsVXAiOjEsImFsbFVwQWxpdmUiOjAsImJldExpc3QiOlt7ImJldE9kZHMiOiIzLjgyIiwiYmV0U2NvcmUiOiJTOiAxLTAiLCJleHRyYUluZm8iOiIiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjk1MzUiLCJpc0lucGxheSI6dHJ1ZSwibGVhZ3VlUGhhc2UiOjAsIm1hcmtldElkIjoiOTY1MDUwNyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQxMDIxNyIsIm1hdGNoTmFtZSI6IlNhc3N1b2xvIENhbGNpbyB2cyBKdXZlbnR1cyBUdXJpbiIsIm1hdGNoVGltZSI6IjE3Njc5ODc5MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIzLjgyIiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6IlNhc3N1b2xvIENhbGNpbyIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkyNzgzNDQyMDMyMzI5Mjc5IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4NzM5Mjk2MTIiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjkyNzkiLCJpcCI6IjE3Mi43MS4yMTEuNTMiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiMjAiLCJsb3NlQW1vdW50IjoiNzYuNCIsIm1heFN0YWtlIjoiNzcwMDAwIiwibWF4V2luQW1vdW50IjoiNTYuNCIsIm1vZGlmeVRpbWUiOiIxNzc0ODczOTMwMTkyIiwib2Rkc0NoYW5nZSI6MSwib3BlcmF0b3JJRCI6MjU0MzY1Miwib3JkZXJTdGF0dXMiOjUsInBheVN0YXR1cyI6NCwicGxheWVySWQiOjI3NzQ4NzM5MDgyNTg2NjA0MDAsInJvbGxCYWNrQ291bnQiOjAsInNlcmllc1R5cGUiOjAsInNlcmllc1ZhbHVlIjoxLCJzZXR0bGVBbW91bnQiOiI3Ni40Iiwic2V0dGxlVGltZSI6IjE3NzUwMDkxNTI4NDUiLCJzdGFrZUFtb3VudCI6IjIwIiwidHJhblR5cGUiOjEsInVuaXRTdGFrZSI6IjIwIiwidXNlcklkIjoiMjg4NTk1MSIsInVzZXJOYW1lIjoidGVzdF8xMjMzMjExMTMiLCJ2YWxpZFNldHRsZUFtb3VudCI6Ijc2LjQiLCJ2YWxpZFNldHRsZVN0YWtlQW1vdW50IjoiMjAiLCJ2ZXJzaW9uIjo1LCJ3YWxsZXRUeXBlIjoyfV0%3D)

---

## 页面行为

页面加载后自动读取 `#content`参数，并按以下流程解析：

1. 读取 URL 中的 `content` 参数。
2. 对 `content` 执行 `decodeURIComponent`。
3. 校验内容是否为合法 Base64 字符串。
4. 使用 `atob` 解码，再通过 `TextDecoder` 转为 UTF-8 字符串。
5. 对字符串执行 `JSON.parse`，得到订单数组。
6. 遍历订单数组生成表格。
7. 每条订单默认只取 `betList[0]` 作为投注详情展示对象。

## 表头字段映射

页面表头与数据字段的映射关系如下：

| 页面字段 | 来源字段 | 展示规则 |
| --- | --- | --- |
| 订单号 | `o.id` | 原样展示 |
| 用户名 | `o.userName` | 原样展示 |
| 投注时间/状态 | `o.createTime`、`o.orderStatus`、`o.remark` | `createTime` 转本地时间，`orderStatus` 转状态文案，若有 `remark` 则追加显示 |
| 投注类型 | `o.seriesType`、`o.betType` | `seriesType == 0` 时固定显示“单关/Single”，否则显示 `betType` |
| 赛事 | `b.sportName`、`b.matchTime`、`b.tournamentId`、`b.matchName`、`b.tournamentName`、`b.matchId` | 组合展示赛事基础信息 |
| 投注详情 | `b.isInplay`、`b.marketName`、`b.optionName`、`b.betScore` | 展示滚球/赛前、盘口名、投注项、下注时比分 |
| 投注结果 | `b.settleResult`、`b.matchResult` | `settleResult` 转结果文案；若 `matchResult` 有值则追加展示赛果 |
| 赔率 | `b.odds`、`b.oddsFormat` | 展示赔率值和赔率格式 |
| 名义投注额 | `o.stakeAmount` | 原样展示 |
| 扣款额 | `o.stakeAmount` | 当前页面与名义投注额一致 |
| 正常结算本金 | `o.stakeAmount`、`o.orderStatus` | 仅 `orderStatus == 5` 时显示投注本金，否则显示 `0` |
| 正常结算返还 | `o.validSettleAmount` | 无值时显示 `0` |
| 实际提前结算本金 | `o.cashOutCount` | 无值时显示 `0` |
| 名义提前结算本金 | `o.liabilityCashoutStake` | 无值时显示 `0` |
| 提前结算返还 | `o.cashOutPayoutStake` | 无值时显示 `0` |
| 结算时间 | `o.settleTime`、`o.orderStatus` | 仅 `orderStatus == 5` 时展示结算时间 |
| 公司 输/赢 | `o.stakeAmount`、`o.settleAmount` | 仅 `orderStatus == 5` 时展示，计算方式为 `stakeAmount - settleAmount` |
| 注单币种 | `o.currency` | 优先走币种映射表，取不到则原样展示 |
| IP地址 | `o.ip` | 原样展示 |
| 设备 | `o.device` | 原样展示 |
| 第三方备注 | `o.extraInfo` | 原样展示 |
| 存活关数 | `o.allUpAlive` | 表示串关订单中当前仍然有效的关数 |
| 付款状态 | `o.payStatus` | 付款状态字段，接口文档中标注为“弃用”，通常不建议作为主判断字段 |
| 数据版本 | `o.version` | 数据变更标记，按升序递增。若同一订单在多个文件中重复出现，应以 `version` 更大的那条数据为最新数据 |
| 投注项结算状态 | `b.settleStatus` | 用于判断该投注项是否已经完成结算 |
| 投注项结算结果 | `b.settleResult` | 用于表示该投注项最终赛果，例如胜、负、平、取消等 |

说明：

- `o` 表示订单对象。
- `b` 表示投注对象，取值方式为 `const b = (o.betList && o.betList[0]) || {}`。

## 投注详情字段说明

订单详情区域主要使用 `betList[0]` 中的以下字段：

| 字段名 | 说明 |
| --- | --- |
| `sportName` | 体育类型名称，如足球、篮球 |
| `matchTime` | 开赛时间，页面会转换为本地时间展示 |
| `tournamentId` | 联赛 ID |
| `matchName` | 对阵名称 |
| `tournamentName` | 联赛名称 |
| `matchId` | 比赛 ID |
| `isInplay` | 是否滚球 |
| `marketName` | 盘口名称 |
| `optionName` | 投注项名称 |
| `betScore` | 投注时比分 |
| `settleResult` | 投注结算结果 |
| `matchResult` | 赛果展示文本 |
| `odds` | 赔率值 |
| `oddsFormat` | 赔率格式 |

## 枚举定义

### 订单状态 `orderStatusMap`

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `0` | 已创建 | Created |
| `1` | 确认中 | Confirming |
| `2` | 拒绝 | Rejected |
| `3` | 取消 | Canceled |
| `4` | 已确认 | Confirmed |
| `5` | 已结算 | Settled |

### 赔率格式 `oddsTypeMap`

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `1` | 欧盘 | EUROPE |
| `2` | 香港盘 | HONGKONG |
| `3` | 马来盘 | MALAY |
| `4` | 印尼盘 | INDONESIA |
| `5` | 美盘 | AMERICAN |

### 结算结果 `resultMap`

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `0` | 无结果 | NoResult |
| `2` | 平 | Push |
| `3` | 负 | Lost |
| `4` | 胜 | Won |
| `5` | 赢半 | HalfWon |
| `6` | 输半 | HalfLost |
| `7` | 取消 | Canceled |

### 是否滚球 `inplayMap`

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `true` | 滚球 | Live |
| `false` | 赛前 | PreMatch |

### 赛果提示 `resultTipMap`

| 语言 | 文案 |
| --- | --- |
| `zh` | 赛果 |
| `en` | matchResult |


## 衍生字段计算规则

### 投注类型

- `seriesType == 0` 时显示“单关（Single）”。
- 其他情况下显示 `betType` 原始值。

### 投注结果

- 仅当 `b.settleResult` 有值时显示结果文案。
- 若 `b.matchResult` 有值，则追加显示“赛果/ matchResult”。

### 公司 输/赢

- 仅当 `o.orderStatus == 5` 时显示。
- 计算公式：`stakeAmount - settleAmount`。
- 结果大于 `0` 时显示红色，小于 `0` 时显示绿色，等于 `0` 时显示灰色。

## 注意事项

- `content` 必须为合法 Base64 字符串。
- `content` 解码后必须为合法 JSON 数组，否则页面无法解析。
- 建议对 Base64 结果做 URL 编码，避免 `+`、`=` 等特殊字符影响 URL 传参。
- 页面仅解析 URL 中的 `#content` 或查询参数中的 `content`。
- 页面默认使用 `lang=zh`，传 `lang=en` 可切换英文文案。
- 页面当前只展示 `betList[0]`，若 `betList` 中存在多条投注项，不会在页面中全部展开。
- `settleResult = 0` 虽然在枚举中定义为“无结果”，但由于页面渲染判断使用的是 `if (b.settleResult)`，实际不会显示该结果文案。
- `注单币种` 同时兼容数值枚举和字符串直传，渲染逻辑为 `currencyMap[o.currency] || o.currency`。

## 说明

所有数据仅在前端解析，不经过服务端。  
适用于订单展示、调试、对账等场景。

---
# 常见问题说明

## 页面数据不一致

**问：为什么页面看到的数据不一致，菜单内容不一致？**

答1：  
页面数据会根据用户所在时区进行展示，不同时区下的数据（如时间、赛事状态、菜单列表等）可能存在差异，因此会出现显示不一致的情况。

答2：  
游客用户和登入用户看到的数据可能存在差异。

## 赔率浮动不一致

**问：为什么不同用户看到的赔率浮动不一样？**

答：  
系统会根据用户等级对赔率进行差异化调整，不同等级对应不同的浮动范围。

**说明：**  
浮动范围为在基础赔率上的上下调整区间  
用户等级越高，赔率浮动范围越大  
默认用户等级为 B级别
